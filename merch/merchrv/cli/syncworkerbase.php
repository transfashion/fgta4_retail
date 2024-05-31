<?php namespace FGTA4;

require_once __ROOT_DIR . '/core/cliworker.php';	


class syncWorkerBase extends cliworker {
	protected const CurlOPTIONS = array(
		CURLOPT_RETURNTRANSFER => true,   // return web page
		CURLOPT_HEADER         => false,  // don't return headers
		CURLOPT_FOLLOWLOCATION => true,   // follow redirects
		CURLOPT_MAXREDIRS      => 10,     // stop after 10 redirects
		CURLOPT_ENCODING       => "",     // handle compressed
		CURLOPT_USERAGENT      => "test", // name of client
		CURLOPT_AUTOREFERER    => true,   // set referrer on redirect
		CURLOPT_CONNECTTIMEOUT => 120,    // time-out on connect
		CURLOPT_TIMEOUT        => 120,    // time-out on response
	); 

	function __construct($args) {
		parent::__construct($args);
	}



	protected function getPartnerId(string $rekanan_id) : string {
		$sql = "
			select partner_id from mst_partnerref
			where
			interface_id='TB' and partnerref_code=:rekanan_id  
		";

		try {
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':rekanan_id'=>$rekanan_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new \Exception("rekanan $rekanan_id belum di map di master partner");
			}

			$partner_id = $row['partner_id'];
			return $partner_id;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}

	protected function getMerchseaId(string $season_id) : string {
		$sql = "
			select merchsea_id from mst_merchsearef
			where
			interface_id='TB' and merchsearef_code=:season_id  
		";

		try {
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':season_id'=>$season_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new \Exception("season $season_id belum di map di master merchsea");
			}

			$merchsea_id = $row['merchsea_id'];
			return $merchsea_id;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}


	protected function getDeptId(string $region_id, ?string $branch_id) : string {
		
	}

	protected function getBrandId(string $region_id) : string {
		$sql = "
			select brand_id from mst_brandref 
			where 
			interface_id='TB' and brandref_name='region_id' and brandref_code=:region_id  
		";

		try {
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':region_id'=>$region_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new \Exception("region $region_id belum di map di master brand");
			}

			$brand_id = $row['brand_id'];
			return $brand_id;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	protected function getUnitRef(string $region_id) : array {
		$sql = "
			select unit_id, unitref_otherdata from mst_unitref 
			where 
			interface_id='TB' and unitref_name='region_id' and unitref_code=:region_id  
		";

		try {
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':region_id'=>$region_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new \Exception("region $region_id belum di map di master unit");
			}

			$jsondata = $row['unitref_otherdata'];
			$refdata = [
				'dept_id'=>null,
				'unit_id'=>$row['unit_id']
			];

			if (!empty($jsondata)) {
				$data = json_decode($jsondata);
				$refdata['dept_id'] = $data->dept_id;
			}
			return $refdata;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	protected function getCategoryMaps(string $brand_id, object $ctglist) : array {
		$sql = "
			select A.merchitemctg_id, B.itemctg_id, B.itemclass_id 
			from mst_merchitemctgref A left join mst_merchitemctg B on B.merchitemctg_id = A.merchitemctg_id 
			where
			A.interface_id ='TB' and A.merchitemctgref_code = 'heinvctg_id' 
			and A.brand_id = :brand_id
			and A.merchitemctgref_value = :heinvctg_id
		";
		$stmt = $this->db->prepare($sql);

		try {
			$maps = [];
			$notfound = [];
			foreach ($ctglist as $heinvctg_id=>$heinvctg_name) {
				//echo "  $brand_id $heinvctg_id ($heinvctg_name) ... ";
				$stmt->execute([
					':brand_id'=>$brand_id,
					':heinvctg_id'=>$heinvctg_id
				]);
				$row = $stmt->fetch();
				if ($row==null) {
					$notfound[] = "[$heinvctg_id] $heinvctg_name";
					//echo "not found\r\n";
				} else {
					//echo "ok\r\n";
					$maps[$heinvctg_id] = [
						'merchitemctg_id' => $row['merchitemctg_id'],
						'itemctg_id' => $row['itemctg_id'],
						'itemclass_id' => $row['itemclass_id']
					];
				}
			}

			if (count($notfound)) {
				$mapserror = implode("\r\n", $notfound);
				echo "MAPPING NOT FOUND for following items:\r\n";
				echo $mapserror;
				throw new \Exception("Ada kategori yang belum di map.");
			}

			return $maps;

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}