<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;


$API = new class extends posterminalBase {


	public function execute($id, $param) : object {

		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$tablename = "mst_posterminal";

				$obj = new \stdClass;
				$obj->posterminal_id = $id;
				$obj->posterminal_setupcode = rand(1000, 9999);
				$obj->posterminal_license = uniqid('', true);
				// if ($currentdata->header->posterminal_license==null) {
				// }

				$key = new \stdClass;
				$key->posterminal_id = $obj->posterminal_id;


				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);


				// get result  from current data;
				$updated = $this->get_header_row($id);


				$result = new \stdClass; 
				$result->success = true;
				$result->posterminal_setupcode = $updated->posterminal_setupcode;
				$result->posterminal_license = $updated->posterminal_license;
				$result->site_id = $updated->site_id;

				return $result;						
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}
		} catch (\Exception $ex) {
			throw $ex;
		}

	}

};