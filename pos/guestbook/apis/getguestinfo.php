<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


$API = new class extends guestbookBase {
	public function execute(object $data) : object {
		try {

			$nama = $data->nama;
			$crmevent_id = $data->event_id;
 			$crmeventinvited_phone = $data->phonenumber;
			$invitation_id = $data->ticket_id;

			$sql = "
				select 
				crmeventinvited_name,
				crmeventinvited_address,
				crmeventinvited_phone,
				crmeventinvited_email,
				invitation_id
				from trn_crmeventinvited 
				WHERE 
				crmevent_id = :crmevent_id
				and crmeventinvited_phone = :crmeventinvited_phone
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':crmevent_id' => $crmevent_id,
				':crmeventinvited_phone' => $crmeventinvited_phone
			]);
			$row = $stmt->fetch();


			$ret = new \stdClass;
			$ret->datarequested = $data;
			if ($row==null) {
				$ret->success = false;
				$ret->message = "no $crmeventinvited_phone ($nama) tidak terdaftar.";
				$ret->datarespond = [];
			} else {
				$ret->success = true;
				$ret->datarespond = [
					'name' => $row['crmeventinvited_name'],
					'address' => $row['crmeventinvited_address'],
					'phone' => $row['crmeventinvited_phone'],
					'invitation_id' => $row['invitation_id'],
					'crmevent_id' => $crmevent_id
				];
			}
			return $ret; 
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};