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
 * retail/pos/pospaymethod/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header pospaymethod (pos_paymethod)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 19/03/2023
 */
$API = new class extends pospaymethodBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'pos_paymethod';
		$primarykey = 'paymethod_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\pospaymethod_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new pospaymethod_headerHandler($options);
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

			$obj->paymethod_name = strtoupper($obj->paymethod_name);
			$obj->paytype_nameinputtype = strtolower($obj->paytype_nameinputtype);
			$obj->paytype_cardinputtype = strtolower($obj->paytype_cardinputtype);
			$obj->paytype_apprinputtype = strtolower($obj->paytype_apprinputtype);


			if ($obj->paymethod_name=='') { $obj->paymethod_name = '--NULL--'; }
			if ($obj->paymethod_code=='') { $obj->paymethod_code = '--NULL--'; }
			if ($obj->paymethod_setting=='') { $obj->paymethod_setting = '--NULL--'; }
			if ($obj->paymethod_shortcut=='') { $obj->paymethod_shortcut = '--NULL--'; }
			if ($obj->paytype_nameinputtype=='') { $obj->paytype_nameinputtype = '--NULL--'; }
			if ($obj->paytype_cardinputtype=='') { $obj->paytype_cardinputtype = '--NULL--'; }
			if ($obj->paytype_apprinputtype=='') { $obj->paytype_apprinputtype = '--NULL--'; }




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
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"paymethod_id" => $obj->paymethod_id
				];

				$criteriaValues = [
					"paymethod_id" => " paymethod_id = :paymethod_id "
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
					'paymethod_id' => 'A.`paymethod_id`', 'site_id' => 'A.`site_id`', 'paymethod_name' => 'A.`paymethod_name`', 'paymethod_isdisabled' => 'A.`paymethod_isdisabled`',
					'paymethod_order' => 'A.`paymethod_order`', 'paytype_id' => 'A.`paytype_id`', 'posterminal_id' => 'A.`posterminal_id`', 'paymethod_code' => 'A.`paymethod_code`',
					'paymethod_isintegrated' => 'A.`paymethod_isintegrated`', 'paymethod_setting' => 'A.`paymethod_setting`', 'paymethod_shortcut' => 'A.`paymethod_shortcut`', 'paytype_iscash' => 'A.`paytype_iscash`',
					'paytype_isvoucher' => 'A.`paytype_isvoucher`', 'paytype_isedc' => 'A.`paytype_isedc`', 'paytype_istransfer' => 'A.`paytype_istransfer`', 'paytype_isonline' => 'A.`paytype_isonline`',
					'paytype_nameinputtype' => 'A.`paytype_nameinputtype`', 'paytype_cardinputtype' => 'A.`paytype_cardinputtype`', 'paytype_apprinputtype' => 'A.`paytype_apprinputtype`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "pos_paymethod A";
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
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'paytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paytype_id'], $this->db, 'pos_paytype', 'paytype_id', 'paytype_name'),
					'posterminal_code' => \FGTA4\utils\SqlUtility::Lookup($record['posterminal_id'], $this->db, 'mst_posterminal', 'posterminal_id', 'posterminal_code'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				if (method_exists(get_class($hnd), 'DataOpen')) {
					//  DataOpen(array &$record) : void 
					$hnd->DataOpen($dataresponse);
				}

				$result->dataresponse = (object) $dataresponse;
				if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
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