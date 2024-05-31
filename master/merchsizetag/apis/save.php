<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * retail/master/merchsizetag/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchsizetag (mst_merchsizetag)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 12/03/2022
 */
$API = new class extends merchsizetagBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_merchsizetag';
		$primarykey = 'merchsizetag_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchsizetag_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchsizetag_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');

			$obj->merchsizetag_id = strtoupper($obj->merchsizetag_id);
			$obj->merchsizetag_name = strtoupper($obj->merchsizetag_name);


			if ($obj->merchsizetag_c01=='') { $obj->merchsizetag_c01 = '--NULL--'; }
			if ($obj->merchsizetag_c02=='') { $obj->merchsizetag_c02 = '--NULL--'; }
			if ($obj->merchsizetag_c03=='') { $obj->merchsizetag_c03 = '--NULL--'; }
			if ($obj->merchsizetag_c04=='') { $obj->merchsizetag_c04 = '--NULL--'; }
			if ($obj->merchsizetag_c05=='') { $obj->merchsizetag_c05 = '--NULL--'; }
			if ($obj->merchsizetag_c06=='') { $obj->merchsizetag_c06 = '--NULL--'; }
			if ($obj->merchsizetag_c07=='') { $obj->merchsizetag_c07 = '--NULL--'; }
			if ($obj->merchsizetag_c08=='') { $obj->merchsizetag_c08 = '--NULL--'; }
			if ($obj->merchsizetag_c09=='') { $obj->merchsizetag_c09 = '--NULL--'; }
			if ($obj->merchsizetag_c10=='') { $obj->merchsizetag_c10 = '--NULL--'; }
			if ($obj->merchsizetag_c11=='') { $obj->merchsizetag_c11 = '--NULL--'; }
			if ($obj->merchsizetag_c12=='') { $obj->merchsizetag_c12 = '--NULL--'; }
			if ($obj->merchsizetag_c13=='') { $obj->merchsizetag_c13 = '--NULL--'; }
			if ($obj->merchsizetag_c14=='') { $obj->merchsizetag_c14 = '--NULL--'; }
			if ($obj->merchsizetag_c15=='') { $obj->merchsizetag_c15 = '--NULL--'; }
			if ($obj->merchsizetag_c16=='') { $obj->merchsizetag_c16 = '--NULL--'; }
			if ($obj->merchsizetag_c17=='') { $obj->merchsizetag_c17 = '--NULL--'; }
			if ($obj->merchsizetag_c18=='') { $obj->merchsizetag_c18 = '--NULL--'; }
			if ($obj->merchsizetag_c19=='') { $obj->merchsizetag_c19 = '--NULL--'; }
			if ($obj->merchsizetag_c20=='') { $obj->merchsizetag_c20 = '--NULL--'; }
			if ($obj->merchsizetag_c21=='') { $obj->merchsizetag_c21 = '--NULL--'; }
			if ($obj->merchsizetag_c22=='') { $obj->merchsizetag_c22 = '--NULL--'; }
			if ($obj->merchsizetag_c23=='') { $obj->merchsizetag_c23 = '--NULL--'; }
			if ($obj->merchsizetag_c24=='') { $obj->merchsizetag_c24 = '--NULL--'; }
			if ($obj->merchsizetag_c25=='') { $obj->merchsizetag_c25 = '--NULL--'; }





			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					  $primarykey
					, 'merchsizetag_id', 'merchsizetag_name', 'merchsizetag_c01', 'merchsizetag_c02', 'merchsizetag_c03', 'merchsizetag_c04', 'merchsizetag_c05', 'merchsizetag_c06', 'merchsizetag_c07', 'merchsizetag_c08', 'merchsizetag_c09', 'merchsizetag_c10', 'merchsizetag_c11', 'merchsizetag_c12', 'merchsizetag_c13', 'merchsizetag_c14', 'merchsizetag_c15', 'merchsizetag_c16', 'merchsizetag_c17', 'merchsizetag_c18', 'merchsizetag_c19', 'merchsizetag_c20', 'merchsizetag_c21', 'merchsizetag_c22', 'merchsizetag_c23', 'merchsizetag_c24', 'merchsizetag_c25', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
						$hnd->DataSavedSuccess($result);
					}
				}

				$this->db->commit();
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

	public function NewId($param) {
					return uniqid();
	}

};