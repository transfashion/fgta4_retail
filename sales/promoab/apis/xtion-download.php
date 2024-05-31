<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;




/**
 * retail/sales/promoab/apis/xtion-download.php
 *
 * ========
 * Download
 * ========
 * Download data setting promo.dat yang akan di copy ke POS
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * dibuat tanggal 23/12/2022
 */
$API = new class extends promoabBase {

	function __construct() {
		parent::__construct();

		$TBCONFNAME = $GLOBALS['TBDB'];
		$DB_CONFIG = DB_CONFIG[$TBCONFNAME];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM['mssql'];		
		$this->db_frm2 = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}


	public function download($id) {

		$userdata = $this->auth->session_get_user();

		try {
			$downloadfilename = "promo-$id.dat";
			$session_id = session_id();

			$tempfile = __TEMP_DIR . "/$session_id-$downloadfilename.dat";
			$this->CreatePromoData($id, $tempfile);
			//$fp = fopen($tempfile, "w");
			//fputs($fp, "satu dua tiga empat");
			//fclose($fp);


			//application/dat .dat
			header('Content-Description: File Transfer');
			header('Content-Type: application/dat');
			header('Content-Disposition: attachment; filename="'.$downloadfilename.'"');
			header('Content-Transfer-Encoding: binary');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize($tempfile));
			
			
			//debug::log("write tempfile to output");
			$fp = fopen($tempfile, "r");
			$output = fread($fp, filesize($tempfile));

			//debug::log("removing temp file.");
			unlink($tempfile);
			return $output;


			/*
			return (object)[
				'success' => true,
				'inidatayangdikirim' => ["satu", "dua", "tiga"]
			];
			*/
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function CreatePromoData(string $id, string $tempfile) : void {
		try {
			$sql = "select * from mst_promoab where promoab_id = :promoab_id ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':promoab_id' => $id]);
			$row = $stmt->fetch();

			if ($row==null) {
				throw new \Exception("Promo rule $id doesn't exists!");
			}


			$promoab_a_itemlist = $row['promoab_a_itemlist'] ?? '';
			$promoab_b_itemlist = $row['promoab_b_itemlist'] ?? '';

			$brand_id = $row['brand_id'];
			
			$region_id = $this->getRegion($brand_id);

			$itemDataA = $this->getItemPricing($promoab_a_itemlist);
			$itemDataB = $this->getItemPricing($promoab_b_itemlist);
			$validBranch = $this->getValidBranch($id);
			$allowedPaymentType = $this->getAllowedPaymentType($id);			
		

			$data = (object)[
				'Rule' => $row['promoabrule_id'],
				'PromoId' => $row['promoab_id'],
				'PromoName' => $row['promoabrule_code'],
				"ValidRegion" => $region_id,
				"ValidBranch" => $validBranch,
				"Descr" => $row['promoab_descr'],
				"startDate" => $row['promoabrule_dtstart'],
				"endDate" => $row['promoabrule_dtend'],
				"PaymentDiscAllowed" => $row['promoabrule_ispaymdiscallowed']==1 ? true: false,
				"PaymentTypeAllowed" => $allowedPaymentType,
				"TotalValueThreshold" => $row['promoabrule_valuethreshold'],
				"isMemberOnly" => false,
				
				"groupA" => [
					"pricing_id" => $promoab_a_itemlist,
					"qtyThreshold" => $row['promoab_a_qtythreshold'],
					"qtyMaxApllied" => $row['promoab_a_qtymax'],
					"valueThreshold" => $row['promoab_a_valuethreshold'],
					"percentDiscount" => $row['promoab_a_disc'],
					"replaceDiscount" => $row['promoab_a_isreplacedisc']==1 ? true : false,
					"rowProcedureInfo" => $row['promoab_a_label'],
					"blockOnUnmeetCondition" => $row['promoab_a_isblockonmeet']==1 ? true : false,
				],

				"groupB" => [
					"pricing_id" => $promoab_b_itemlist,
					"qtyThreshold" => $row['promoab_b_qtythreshold'],
					"qtyMaxApllied" => $row['promoab_b_qtymax'],
					"valueThreshold" => $row['promoab_b_valuethreshold'],
					"percentDiscount" =>   $row['promoab_b_disc'],
					"replaceDiscount" => $row['promoab_b_isreplacedisc']==1 ? true : false,
					"rowProcedureInfo" => $row['promoab_b_label'],
					"blockOnUnmeetCondition" => $row['promoab_b_isblockonmeet']==1 ? true : false,
				],
			
				"DataA" => $itemDataA, 
				"DataB" => $itemDataB,
			];

			$jsonstr = json_encode($data);
			$data = chunk_split(base64_encode($jsonstr));

			$fp = fopen($tempfile, "w");
			fputs($fp, $data);
			fclose($fp);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function getRegion(string $brand_id) : string {
		try {
			$sql = "
				select * from mst_brandref where brand_id = :brand_id and brandref_name='region_id' 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':brand_id'=>$brand_id]);
			$row = $stmt->fetch();

			if ($row==null) {
				throw new \Exception("kode region belum di map di master brand");
			}

			$region_id = $row['brandref_code'];
			return $region_id;
		} catch (\Exception $ex) {
			throw $ex;
		}
	} 

	public function getValidBranch(string $promoab_id) : array {
		return [];
	}

	public function getAllowedPaymentType(string $promoab_id) : array {
		return [];
	}


	public function getItemPricing(string $price_id) : array {
		try {
			

			$sql = "
				select heinv_id from transaksi_heinvpricedetil where price_id = :price_id
			";
			$stmt = $this->db_frm2->prepare($sql);
			$stmt->execute([':price_id'=>$price_id]);
			$rows = $stmt->fetchall();

			$items = [];
			foreach ($rows as $row) {
				$items[] = $row['heinv_id'];
			}
			return $items;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};


