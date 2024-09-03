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
 * retail/fashion/merchitem/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchitem (fsn_merchitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/09/2024
 */
$API = new class extends merchitemBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'fsn_merchitem';
		$primarykey = 'merchitem_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchitem_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchitem_headerHandler($options);
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



			if ($obj->merchitem_art=='') { $obj->merchitem_art = '--NULL--'; }
			if ($obj->merchitem_mat=='') { $obj->merchitem_mat = '--NULL--'; }
			if ($obj->merchitem_col=='') { $obj->merchitem_col = '--NULL--'; }
			if ($obj->merchitem_size=='') { $obj->merchitem_size = '--NULL--'; }
			if ($obj->merchitem_combo=='') { $obj->merchitem_combo = '--NULL--'; }
			if ($obj->merchitem_name=='') { $obj->merchitem_name = '--NULL--'; }
			if ($obj->merchitem_descr=='') { $obj->merchitem_descr = '--NULL--'; }
			if ($obj->merchitem_colnum=='') { $obj->merchitem_colnum = '--NULL--'; }
			if ($obj->merchitem_pcpline=='') { $obj->merchitem_pcpline = '--NULL--'; }
			if ($obj->merchitem_pcpgroup=='') { $obj->merchitem_pcpgroup = '--NULL--'; }
			if ($obj->merchitem_pcpcategory=='') { $obj->merchitem_pcpcategory = '--NULL--'; }
			if ($obj->merchitem_colorcode=='') { $obj->merchitem_colorcode = '--NULL--'; }
			if ($obj->merchitem_colordescr=='') { $obj->merchitem_colordescr = '--NULL--'; }
			if ($obj->merchitem_gender=='') { $obj->merchitem_gender = '--NULL--'; }
			if ($obj->merchitem_fit=='') { $obj->merchitem_fit = '--NULL--'; }
			if ($obj->merchitem_hscodeship=='') { $obj->merchitem_hscodeship = '--NULL--'; }
			if ($obj->merchitem_hscodeina=='') { $obj->merchitem_hscodeina = '--NULL--'; }
			if ($obj->merchitem_gtype=='') { $obj->merchitem_gtype = '--NULL--'; }
			if ($obj->merchitem_labelname=='') { $obj->merchitem_labelname = '--NULL--'; }
			if ($obj->merchitem_labelproduct=='') { $obj->merchitem_labelproduct = '--NULL--'; }
			if ($obj->merchitem_bahan=='') { $obj->merchitem_bahan = '--NULL--'; }
			if ($obj->merchitem_pemeliharaan=='') { $obj->merchitem_pemeliharaan = '--NULL--'; }
			if ($obj->merchitem_logo=='') { $obj->merchitem_logo = '--NULL--'; }
			if ($obj->merchitem_dibuatdi=='') { $obj->merchitem_dibuatdi = '--NULL--'; }




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
					"merchitem_id" => $obj->merchitem_id
				];

				$criteriaValues = [
					"merchitem_id" => " merchitem_id = :merchitem_id "
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
					'merchitem_id' => 'A.`merchitem_id`', 'merchitem_art' => 'A.`merchitem_art`', 'merchitem_mat' => 'A.`merchitem_mat`', 'merchitem_col' => 'A.`merchitem_col`',
					'merchitem_size' => 'A.`merchitem_size`', 'merchitem_combo' => 'A.`merchitem_combo`', 'merchitem_name' => 'A.`merchitem_name`', 'merchitem_descr' => 'A.`merchitem_descr`',
					'merchitem_colnum' => 'A.`merchitem_colnum`', 'merchitem_isdisabled' => 'A.`merchitem_isdisabled`', 'merchitem_pcpline' => 'A.`merchitem_pcpline`', 'merchitem_pcpgroup' => 'A.`merchitem_pcpgroup`',
					'merchitem_pcpcategory' => 'A.`merchitem_pcpcategory`', 'merchitem_colorcode' => 'A.`merchitem_colorcode`', 'merchitem_colordescr' => 'A.`merchitem_colordescr`', 'merchitem_gender' => 'A.`merchitem_gender`',
					'merchitem_fit' => 'A.`merchitem_fit`', 'merchitem_hscodeship' => 'A.`merchitem_hscodeship`', 'merchitem_hscodeina' => 'A.`merchitem_hscodeina`', 'merchitem_gtype' => 'A.`merchitem_gtype`',
					'merchitem_labelname' => 'A.`merchitem_labelname`', 'merchitem_labelproduct' => 'A.`merchitem_labelproduct`', 'merchitem_bahan' => 'A.`merchitem_bahan`', 'merchitem_pemeliharaan' => 'A.`merchitem_pemeliharaan`',
					'merchitem_logo' => 'A.`merchitem_logo`', 'merchitem_dibuatdi' => 'A.`merchitem_dibuatdi`', 'merchitemctg_id' => 'A.`merchitemctg_id`', 'merchsea_id' => 'A.`merchsea_id`',
					'unit_id' => 'A.`unit_id`', 'dept_id' => 'A.`dept_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "fsn_merchitem A";
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