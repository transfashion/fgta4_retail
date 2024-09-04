<?php namespace FGTA4\apis;


/* 
   PENTING:
   ========  
   PERLU: ditambahkan "addqueue" : { "allowanonymous": true, "allowedgroups" : ["public"] }
   di merchreg.json pada bagian apis
*/   


if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends merchsyncBase {
	public function execute($id, $type) {
		try {

			$data = new \stdClass;
			$data->merchsync_id = uniqid();
			$data->merchsync_doc = $id;
			$data->merchsync_type = $type;
			$data->_createby = '5effbb0a0f7d1';

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("fsn_merchsync", $data);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);
		
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}

	}
};