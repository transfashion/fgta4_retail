<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __CLIENT_PUBLIC_PATH . '/app-config-allotopup.php';

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
require_once __DIR__ . '/allotopup.lib.php';


use \FGTA4\exceptions\WebException;
use \transfashion\allo\allotopuplib;
// use \FGTA4\utils\Sequencer;


$API = new class extends allotopupBase {


	public function execute(object $parameter) : object {
		try {

			$site_id = $parameter->storeId; 
			$sql = "select site_code from mst_site where site_id = :site_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':site_id'=> $site_id ]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new \Exception("store id belum di definisikan untuk '" . $site_id .  "'");
			}
			$storeId = "tfisto".$row['site_code'];


			$at = new allotopuplib();
			
			$param = (object)[
				'topup_id' => $parameter->topup_id,
				'storeId' => $storeId,
				'cashierId' => $parameter->cashierId,
				'value' => $parameter->value,
				'barcode' => $parameter->barcode,
				'referenceNo' => $parameter->referenceNo
			];
			$status = $at->cek_status($param);	
			if (property_exists($status, 'topUpStatus')) {
				if ($status->topUpStatus=='00') {
					$this->update($param, $status->topUpStatus, $status->topUpMessage);
				}
			}

			$result = new \stdClass; 
			$result->success = true;
			$result->status = $status; 
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}

	}

	function update($param, $statuscode, $statusmessage) {
		try {
			$obj = new \stdClass;
			$obj->allotopup_id = $param->topup_id;
			$obj->allotopup_status = $statuscode;
			$obj->allotopup_message = $statusmessage;
			$obj->allotopup_message = $statusmessage;
			$obj->allotopup_isdone = 1;
			$obj->_modifyby = $param->cashierId;
			$obj->_modifydate = date('Y-m-d H:i:s');

			$key = new \stdClass;
			$key->allotopup_id = $obj->allotopup_id;

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_allotopup", $obj, $key);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};