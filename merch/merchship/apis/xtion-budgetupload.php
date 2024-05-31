<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xapi.base.php';



use \FGTA4\exceptions\WebException;
use \FGTA4\utils\SqlUtility;

$API = new class extends merchshipBase {

	public function execute($id, $data) {
		$userdata = $this->auth->session_get_user();

		try {
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$tablename = "trn_merchshipbudget";

				$obj = new \stdClass;
				$obj->merchshipbudgetacc_id = $data->BudgetAccount;
				$obj->merchshipbudget_descr = $data->Descr;
				$obj->merchshipbudget_value = $data->Value;
				$obj->curr_id = $data->Curr;
				$obj->curr_rate = $data->Rate;
				$obj->merchshipbudget_idr = $data->IDR;
				$obj->merchship_id = $id;

				$sqlCek = "
					select merchshipbudget_id from trn_merchshipbudget 
					where 
					merchship_id=:merchship_id and merchshipbudgetacc_id=:merchshipbudgetacc_id
				";
				$stmtCek = $this->db->prepare($sqlCek);
				$stmtCek->execute([
					':merchship_id' => $id,
					':merchshipbudgetacc_id' => $data->BudgetAccount
				]);
				$row = $stmtCek->fetch();
				if ($row==null) {
					// insert baru
					$obj->merchshipbudget_id = uniqid();
					$obj->_createby = $userdata->username;
					$obj->_createdate = date('Y-m-d H:i:s');
					$cmd = SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					// update existing
					$obj->merchshipbudget_id = $row['merchshipbudget_id'];
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date('Y-m-d H:i:s');

					$key = new \stdClass;
					$key->merchshipbudget_id = $obj->merchshipbudget_id;
					$cmd = SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}

				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				$this->db->commit();
				return (object)[
					'success' => true
				];
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


