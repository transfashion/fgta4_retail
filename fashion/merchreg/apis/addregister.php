<?php namespace FGTA4\apis;


/* 
   PENTING:
   ========  
   PERLU: ditambahkan "addregister" : { "allowanonymous": true, "allowedgroups" : ["public"] }
   di merchreg.json pada bagian apis
*/   


if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends merchregBase {
	public function execute($id, $interface, $user) {
		try {

			// cek dulu apakah datanya sudah ada
			$sqlcek = "select merchreg_id from fsn_merchreg where merchreg_id = :merchreg_id";
			$stmt = $this->db->prepare($sqlcek);
			$stmt->execute(['merchreg_id' => $id]);
			if ($stmt->rowCount() == 0) {

				$data = new \stdClass;
				$data->merchreg_id = $id;
				$data->merchreg_date = date('Y-m-d');
				$data->interface_id = $interface;
				$data->merchreg_isinsynprogress = 1;
				$data->_createby = '5effbb0a0f7d1';

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("fsn_merchreg", $data);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			}
		
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}

	}
};