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
 * retail/merch/merchship/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchship (trn_merchship)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 27/09/2024
 */
$API = new class extends merchshipBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'trn_merchship';
		$primarykey = 'merchship_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchship_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchship_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
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
			$obj->merchship_date = (\DateTime::createFromFormat('d/m/Y',$obj->merchship_date))->format('Y-m-d');



			if ($obj->merchship_descr=='') { $obj->merchship_descr = '--NULL--'; }


			unset($obj->merchship_iscommit);
			unset($obj->merchship_commitby);
			unset($obj->merchship_commitdate);
			unset($obj->merchship_isverify);
			unset($obj->merchship_verifyby);
			unset($obj->merchship_verifydate);
			unset($obj->merchship_iscalculate);
			unset($obj->merchship_calculateby);
			unset($obj->merchship_calculatedate);
			unset($obj->merchship_isexecute);
			unset($obj->merchship_executeby);
			unset($obj->merchship_executedate);
			unset($obj->merchship_isbill);
			unset($obj->merchship_billby);
			unset($obj->merchship_billdate);
			unset($obj->merchship_iscost);
			unset($obj->merchship_costby);
			unset($obj->merchship_costydate);


			// current user & timestamp	
			if ($datastate=='NEW') {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				if (method_exists(get_class($hnd), 'PreCheckInsert')) {
					// PreCheckInsert($data, &$obj, &$options)
					$hnd->PreCheckInsert($data, $obj, $options);
				}
			} else {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");	
		
				if (method_exists(get_class($hnd), 'PreCheckUpdate')) {
					// PreCheckUpdate($data, &$obj, &$key, &$options)
					$hnd->PreCheckUpdate($data, $obj, $key, $options);
				}
			}

			//handle data sebelum sebelum save
			if (method_exists(get_class($hnd), 'DataSaving')) {
				// ** DataSaving(object &$obj, object &$key)
				$hnd->DataSaving($obj, $key);
			}

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId($hnd, $obj);
					}
					
					// handle data sebelum pada saat pembuatan SQL Insert
					if (method_exists(get_class($hnd), 'RowInserting')) {
						// ** RowInserting(object &$obj)
						$hnd->RowInserting($obj);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';

					// handle data sebelum pada saat pembuatan SQL Update
					if (method_exists(get_class($hnd), 'RowUpdating')) {
						// ** RowUpdating(object &$obj, object &$key))
						$hnd->RowUpdating($obj, $key);
					}
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"merchship_id" => $obj->merchship_id
				];

				$criteriaValues = [
					"merchship_id" => " merchship_id = :merchship_id "
				];
				if (method_exists(get_class($hnd), 'buildOpenCriteriaValues')) {
					// buildOpenCriteriaValues(object $options, array &$criteriaValues) : void
					$hnd->buildOpenCriteriaValues($options, $criteriaValues);
				}

				$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
				$result = new \stdClass; 
	
				if (method_exists(get_class($hnd), 'prepareOpenData')) {
					// prepareOpenData(object $options, $criteriaValues) : void
					$hnd->prepareOpenData($options, $criteriaValues);
				}

				$sqlFieldList = [
					'merchship_id' => 'A.`merchship_id`', 'unit_id' => 'A.`unit_id`', 'principal_partner_id' => 'A.`principal_partner_id`', 'fowarder_partner_id' => 'A.`fowarder_partner_id`',
					'merchship_descr' => 'A.`merchship_descr`', 'merchship_date' => 'A.`merchship_date`', 'periodemo_id' => 'A.`periodemo_id`', 'merchship_qty' => 'A.`merchship_qty`',
					'merchship_value' => 'A.`merchship_value`', 'curr_id' => 'A.`curr_id`', 'merchship_rate' => 'A.`merchship_rate`', 'dept_id' => 'A.`dept_id`',
					'merchship_version' => 'A.`merchship_version`', 'merchship_iscommit' => 'A.`merchship_iscommit`', 'merchship_commitby' => 'A.`merchship_commitby`', 'merchship_commitdate' => 'A.`merchship_commitdate`',
					'merchship_isverify' => 'A.`merchship_isverify`', 'merchship_verifyby' => 'A.`merchship_verifyby`', 'merchship_verifydate' => 'A.`merchship_verifydate`', 'merchship_iscalculate' => 'A.`merchship_iscalculate`',
					'merchship_calculateby' => 'A.`merchship_calculateby`', 'merchship_calculatedate' => 'A.`merchship_calculatedate`', 'merchship_isexecute' => 'A.`merchship_isexecute`', 'merchship_executeby' => 'A.`merchship_executeby`',
					'merchship_executedate' => 'A.`merchship_executedate`', 'merchship_isbill' => 'A.`merchship_isbill`', 'merchship_billby' => 'A.`merchship_billby`', 'merchship_billdate' => 'A.`merchship_billdate`',
					'merchship_iscost' => 'A.`merchship_iscost`', 'merchship_costby' => 'A.`merchship_costby`', 'merchship_costydate' => 'A.`merchship_costydate`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "trn_merchship A";
				$sqlWhere = $where->sql;
					
				if (method_exists(get_class($hnd), 'SqlQueryOpenBuilder')) {
					// SqlQueryOpenBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
					$hnd->SqlQueryOpenBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
				}
				$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($sqlFieldList);
	
			
				$sqlData = "
					select 
					$sqlFields 
					from 
					$sqlFromTable 
					$sqlWhere 
				";
	
				$stmt = $this->db->prepare($sqlData);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
	
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$dataresponse = array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'principal_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['principal_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'fowarder_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['fowarder_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'merchship_date' => date("d/m/Y", strtotime($row['merchship_date'])),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'merchship_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchship_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchship_calculateby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_calculateby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchship_executeby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_executeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchship_billby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_billby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchship_costby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_costby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}

				$result->username = $userdata->username;
				$result->dataresponse = (object) $dataresponse;
				if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
					// DataSavedSuccess(object &$result) : void
					$hnd->DataSavedSuccess($result);
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

	public function NewId(object $hnd, object $obj) : string {
		// dipanggil hanya saat $autoid == true;

		$id = null;
		$handled = false;
		if (method_exists(get_class($hnd), 'CreateNewId')) {
			// CreateNewId(object $obj) : string 
			$id = $hnd->CreateNewId($obj);
			$handled = true;
		}

		if (!$handled) {
			$id = uniqid();
		}

		return $id;
	}

};