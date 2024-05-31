<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


// A.itemstock_grossprice as price_gross, 
// A.itemstock_isdiscvalue as price_isdiscvalue, 
// A.itemstock_discval as price_discval, 
// A.itemstock_disc as price_disc, 				
// A.itemstock_sellprice as price_current,
// 0 as price_disc2,
// 0 as price_disc3,
// A.itemstock_sellprice as price_sell,

$API = new class extends posmainBase {
	public function execute(string $mode, string $site_id, string $searchtext) : object {
		try {
			
			$barcode = $searchtext;
			$sql = "
				select
				B.itemstockbarcode_text,
				A.itemstock_id, A.itemstock_code, A.itemstock_name, A.itemstock_descr, A.itemstock_couchdbid,
				A.itemstock_grossprice, A.itemstock_isdiscvalue, A.itemstock_disc, A.itemstock_discval, A.itemstock_sellprice,
				A.itemstock_lastqty,
				A.itemgroup_id, A.itemgroup_name ,
				A.itemctg_id, A.itemctg_name,
				A.itemclass_id, A.itemclass_name,
				A.dept_id, A.dept_name,
				
				A.itemstock_sellprice as currentsellprice
				from pos_itemstock A inner join pos_itemstockbarcode B on B.positemstock_id = A.positemstock_id 
				WHERE 
					A.itemstock_isdisabled = 0
				and A.site_id = :site_id
				and B.itemstockbarcode_text = :barcode;			
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':site_id' => $site_id,
				':barcode' => $barcode
			]);
			$rows = $stmt->fetchall();

			$ret = new \stdClass;
			if (count($rows)==0) {
				$ret->success = false;
				$ret->message = "barcode '$barcode' tidak ditemukan di $site_id";
				$ret->datarespond = [];
			} else {
				$ret->success = true;
				$ret->datarespond = [];

				$records = [];
				foreach ($rows as $row) {

					// $row['itemstock_grossprice'] = 2000000; //(float)$row['itemstock_grossprice'];
					// $row['itemstock_discval'] = 0; //(float)$row['itemstock_discval'];
					// $row['itemstock_disc'] = 0; // (float)$row['itemstock_disc'];
					// $row['itemstock_discval_ori'] = 0; //(float)$row['itemstock_discval'];
					// $row['itemstock_disc_ori'] = 0; // (float)$row['itemstock_disc'];
					// $row['itemstock_sellprice'] = 2000000; //(float)$row['itemstock_sellprice'];
					// $row['itemstock_sellprice_ori'] = 2000000; //(float)$row['itemstock_sellprice'];
					// $row['currentsellprice'] = 2000000; //(float)$row['currentsellprice'];

					// $row['itemstock_grossprice'] = 2000000; //(float)$row['itemstock_grossprice'];
					// $row['itemstock_discval'] = 400000; //(float)$row['itemstock_discval'];
					// $row['itemstock_disc'] = 20; // (float)$row['itemstock_disc'];
					// $row['itemstock_discval_ori'] = 400000; //(float)$row['itemstock_discval'];
					// $row['itemstock_disc_ori'] = 0; // (float)$row['itemstock_disc'];
					// $row['itemstock_sellprice'] = 1600000; //(float)$row['itemstock_sellprice'];
					// $row['itemstock_sellprice_ori'] = 1600000; //(float)$row['itemstock_sellprice'];
					// $row['currentsellprice'] = 1600000; //(float)$row['currentsellprice'];


					$row['itemstock_grossprice'] = (float)$row['itemstock_grossprice'];
					$row['itemstock_discval'] = (float)$row['itemstock_discval'];
					$row['itemstock_disc'] = (float)$row['itemstock_disc'];
					$row['itemstock_discval_ori'] = (float)$row['itemstock_discval'];
					$row['itemstock_disc_ori'] = (float)$row['itemstock_disc'];
					$row['itemstock_sellprice'] = (float)$row['itemstock_sellprice'];
					$row['itemstock_sellprice_ori'] = (float)$row['itemstock_sellprice'];
					$row['currentsellprice'] = (float)$row['currentsellprice'];

					$records[] = $row;
				}

				$ret->datarespond = $records;
			 
			}
			return $ret; 
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};