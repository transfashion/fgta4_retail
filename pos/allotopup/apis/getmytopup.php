<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


$API = new class extends allotopupBase {
	public function execute(object $parameter) : object {
		
		
		try {

			$userdata = $this->auth->session_get_user();
			// $userdata->username;

			$sql = "
				select * from trn_allotopup
				where 
				`_createby` = :username
				and allotopup_date between :datestart and :dateend
				and allotopup_isdone=1
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':username' => $userdata->username,
				':datestart' => $parameter->datestart,
				':dateend' => $parameter->dateend
			]);
			$rows = $stmt->fetchall();

			$total = 0;
			$records = [];
			foreach ($rows as $row) {
				$amount = $row['allotopup_validr'];
				$records[] = (object)[
					'date' => $row['allotopup_date'],
					'nomor' => $row['allotopup_phone'],
					'nama' => $row['allotopup_name'],
					'amount' => $amount
				];

				$total += $amount;
			}

			$ret = new \stdClass;
			$ret->success = true;
			$ret->message = '';
			$ret->records = $records;
			$ret->userfullname = $userdata->userfullname;
			$ret->datestart = $parameter->datestart;
			$ret->dateend = $parameter->dateend;
			$ret->totalamount = $total;

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};