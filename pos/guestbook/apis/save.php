<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


$API = new class extends guestbookBase {
	public function execute(object $data) : object {
		$userdata = $this->auth->session_get_user();

		try {
			$sqlcek = "
				select * from trn_crmeventattendant
				where
				crmevent_id = :crmevent_id and crmeventattendant_phone =:phone
			";
			$stmt = $this->db->prepare($sqlcek);
			$stmt->execute([
				':crmevent_id' => $data->crmevent_id,
				':phone' => $data->phone
			]);
			$row = $stmt->fetch();
			
			
			$ret = new \stdClass;
			if (!$row==null) {
				$ret->success = true;
				$ret->message = '';
				return $ret;
			}	

			try {

				$obj = new \stdClass;
				$obj->crmeventattendant_id = uniqid();
				$obj->invitation_id = $data->invitation_id;
				$obj->crmeventattendant_phone = $data->phone;
				$obj->crmeventattendant_name = $data->name;
				$obj->crmeventattendant_address = $data->address;
				$obj->crmeventattendant_city = '';
				$obj->crmeventattendant_date = date('Y-m-d');
				$obj->crmeventattendant_time = date('H:i:s');
				$obj->crmevent_id = $data->crmevent_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date('Y-m-d H:i:s');


				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_crmeventattendant", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);


				$ret->success = true;
				$ret->message = '';
			} catch (\Exception $ex) {
				$ret->success = false;
				$ret->message = $ex->getMessage();
			}

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};