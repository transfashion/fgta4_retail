<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __CLIENT_PUBLIC_PATH . '/app-config-allotopup.php';

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __ROOT_DIR . '/core/webuser.php';
require_once __DIR__ . '/xapi.base.php';
require_once __DIR__ . '/allotopup.lib.php';

use \FGTA4\WebUser;
use \FGTA4\exceptions\WebException;
use \transfashion\allo\allotopuplib;
// use \FGTA4\utils\Sequencer;


$API = new class extends allotopupBase {


	public function execute(object $parameter) : object {
		$userdata = $this->auth->session_get_user();

		try {

			WebUser::setDb($this->db);
			if (!WebUser::hasPermissions($userdata->username, ['TOPUP_ALLOBANK'])) {
				throw new \Exception('anda tidak diperbolehkan untuk generate barcode TopUp');
			}


			$site_id = $parameter->storeId; 
			$sql = "select * from mst_site where site_id = :site_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':site_id'=> $parameter->storeId ]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new \Exception("store id belum di definisikan untuk '" . $site_id . "'");
			}
			$storeId = "tfisto".$row['site_code'];


			$at = new allotopuplib();
			$topup_id = str_replace('.', '', uniqid('tfi'.date('Ymd'), true));
			$param = (object)[
				'topup_id' => $topup_id,
				'storeId' => $storeId,
				'cashierId' => $parameter->cashierId,
				'value' => $parameter->value,
			];
			$res = $at->generate_barcode_topup($param);

			$result = new \stdClass; 
			$result->success = true;
			$result->topup_id = $topup_id;
			$result->barcode = $res->barcode; 
			$result->referenceNo = $res->referenceNo;

			$customer = (object)[
				'allotopup_name' => $parameter->nama,
				'allotopup_email' => $parameter->email,
				'allotopup_phone' => $parameter->phone
			];
			
			$this->SaveToTable($site_id, $param, $customer, $result);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function SaveToTable($site_id, $param, $customer , $result) {
		try {
			$obj = new \stdClass;
			$obj->allotopup_id = $param->topup_id;
			$obj->site_id = $site_id;
			$obj->allotopup_date = date('Y-m-d');
			$obj->allotopup_name = $customer->allotopup_name;
			$obj->allotopup_email = $customer->allotopup_email;
			$obj->allotopup_phone = $customer->allotopup_phone;
			$obj->allotopup_validr = $param->value;
			$obj->allotopup_clientref = $param->topup_id;
			$obj->allotopup_barcode = $result->barcode;
			$obj->allotopup_alloref = $result->referenceNo;
			$obj->allotopup_txid = $result->transactionNo;
			$obj->allotopup_isgen = 1;
			$obj->allotopup_genby = $param->cashierId;;
			$obj->allotopup_gendate = date('Y-m-d H:i:s');
			$obj->_createby = $param->cashierId;
			$obj->_createdate = date('Y-m-d H:i:s');

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_allotopup", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};