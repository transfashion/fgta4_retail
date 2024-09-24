<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\utils\Sequencer;

class promoab_headerHandler extends WebAPI  {
	public function CreateNewId(object $obj) : string {
		$seqname = $obj->brand_nameshort;

		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['seqgroup', 'ye', 'mo']);
		$raw = $seq->getraw(['seqgroup'=>'promoab', 'ye'=>$ye, 'mo'=>0]);
		$id = $seqname . $raw['ye'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;		
	}


	public function DataSaving(object &$obj, object &$key) : void {
		// $this->log($obj);
		if ($obj->a_promoabrulesection_id=='') { $obj->a_promoabrulesection_id = '--NULL--'; }
		if ($obj->b_promoabrulesection_id=='') { $obj->b_promoabrulesection_id = '--NULL--'; }


		try {

			// connect ke db
			$FRMCONNAME = $GLOBALS['TBDB'];
			$DB_CONFIG_FRM = DB_CONFIG[$FRMCONNAME];
			$DB_CONFIG_FRM['param'] = DB_CONFIG_PARAM['mssql'];
			$db_frm2 = new \PDO(
				$DB_CONFIG_FRM['DSN'], 
				$DB_CONFIG_FRM['user'], 
				$DB_CONFIG_FRM['pass'],
				$DB_CONFIG_FRM['param']
			);

			// cek promoabrule_ishasgroupa
			// promoab_a_itemlist
			//
			if ($obj->promoabrule_ishasgroupa==1) {
				$this->cek_pricing($db_frm2, $obj->promoab_a_itemlist, 'A');
			}

			if ($obj->promoabrule_ishasgroupb==1) {
				$this->cek_pricing($db_frm2, $obj->promoab_b_itemlist, 'B');
			}


			// throw new \Exception('Error Data', 100);
		} catch  (\Exception $ex) {
			throw $ex;
		} 
	}


	function cek_pricing($db_frm2, $str_price_ids, $groupname) {

		// $price_id
		try {
			$sql = "select * from transaksi_heinvprice where price_id = :price_id ";
			$stmt = $db_frm2->prepare($sql);

			$arr_price_id = explode(';', $str_price_ids);
			foreach ($arr_price_id as $price_id) {
				$price_id = trim($price_id);

				$stmt->execute([':price_id' => $price_id]);
				$rows = $stmt->fetchall();
				if (count($rows)==0) {
					throw new \Exception("Pricing '$price_id' di group $groupname tidak ditemukan.", 1001); // Code > 1000 munculkan alert 
				}
	
				$price_isverified = $rows[0]['price_isverified'];
				if ($price_isverified==0) {
					throw new \Exception("Pricing '$price_id' di group $groupname belum di verifikasi.", 1002); // Code > 1000 munculkan alert 
				}

			}
			
		} catch  (\Exception $ex) {
			throw $ex;
		} 	
	}

	function  sortListOrder(array &$sortData) : void {
		$sortData['promoabrule_dtstart'] = 'DESC';
	}


	public function DataListLooping(array &$record) : void {
		$promoabrule_dtstart = $record['promoabrule_dtstart'];
		$promoabrule_dtend = $record['promoabrule_dtend'];

		$dtactive = strtotime($promoabrule_dtstart);
		$dtexpired = strtotime($promoabrule_dtend);

		$now = strtotime(date('Y-m-d'));
		if ($now >= $dtactive && $now <= $dtexpired) {
			$record['promoab_status'] = 'active';
		} else if ($now > $dtexpired) {
			$record['promoab_status'] = 'expired';
		} else {
			$record['promoab_status'] = 'pending';
		}

	}

}		
		
		
		