<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __ROOT_DIR . '/core/webuser.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\WebUser;
use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;


$API = new class extends posterminalBase {
	public function execute(string $id, object $param) : object {
		$tablename = "mst_posterminal";
		$primarykey = "posterminal_id";
		$action = $param->dolock ? 'LOCK' : 'UNLOCK';
		$userdata = $this->auth->session_get_user();
		try {

			try {
				WebUser::setDb($this->db);
				if ($param->dolock) {
					// cek permission apakah currentuser boleh lock
					if (!WebUser::hasPermissions($userdata->username, ['POSTERMINAL_LOCK'])) {
						throw new \Exception('anda tidak diperbolehkan untuk lock posterminal');
					}
				} else {
					// cek permission apakah currentuser boleh unlock
					if (!WebUser::hasPermissions($userdata->username, ['POSTERMINAL_UNLOCK'])) {
						throw new \Exception('anda tidak diperbolehkan untuk unlock posterminal');
					}
				}
			} catch (\Exception $ex) {
				$ret = new \stdClass;
				$ret->success = false;
				$ret->message = $ex->getMessage();
				return $ret;
			}


			$obj = new \stdClass;
			$obj->posterminal_id = $id;
			$obj->posterminal_islock = $param->dolock ? 1 : 0;

			$key = new \stdClass;
			$key->posterminal_id = $obj->posterminal_id;

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

			$ret = new \stdClass;
			$ret->success = true;

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};