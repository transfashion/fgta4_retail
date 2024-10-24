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
 * retail/fashion/mercharticle/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header mercharticle (fsn_mercharticle)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/10/2024
 */
$API = new class extends mercharticleBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'fsn_mercharticle';
		$primarykey = 'mercharticle_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\mercharticle_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new mercharticle_headerHandler($options);
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



			if ($obj->mercharticle_art=='') { $obj->mercharticle_art = '--NULL--'; }
			if ($obj->mercharticle_mat=='') { $obj->mercharticle_mat = '--NULL--'; }
			if ($obj->mercharticle_col=='') { $obj->mercharticle_col = '--NULL--'; }
			if ($obj->mercharticle_name=='') { $obj->mercharticle_name = '--NULL--'; }
			if ($obj->mercharticle_descr=='') { $obj->mercharticle_descr = '--NULL--'; }
			if ($obj->mercharticle_pcpline=='') { $obj->mercharticle_pcpline = '--NULL--'; }
			if ($obj->mercharticle_pcpgroup=='') { $obj->mercharticle_pcpgroup = '--NULL--'; }
			if ($obj->mercharticle_pcpcategory=='') { $obj->mercharticle_pcpcategory = '--NULL--'; }
			if ($obj->mercharticle_gender=='') { $obj->mercharticle_gender = '--NULL--'; }
			if ($obj->mercharticle_fit=='') { $obj->mercharticle_fit = '--NULL--'; }
			if ($obj->mercharticle_hscodeship=='') { $obj->mercharticle_hscodeship = '--NULL--'; }
			if ($obj->mercharticle_hscodeina=='') { $obj->mercharticle_hscodeina = '--NULL--'; }
			if ($obj->mercharticle_gtype=='') { $obj->mercharticle_gtype = '--NULL--'; }
			if ($obj->mercharticle_labelname=='') { $obj->mercharticle_labelname = '--NULL--'; }
			if ($obj->mercharticle_labelproduct=='') { $obj->mercharticle_labelproduct = '--NULL--'; }
			if ($obj->mercharticle_bahan=='') { $obj->mercharticle_bahan = '--NULL--'; }
			if ($obj->mercharticle_pemeliharaan=='') { $obj->mercharticle_pemeliharaan = '--NULL--'; }
			if ($obj->mercharticle_logo=='') { $obj->mercharticle_logo = '--NULL--'; }
			if ($obj->mercharticle_dibuatdi=='') { $obj->mercharticle_dibuatdi = '--NULL--'; }




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
					"mercharticle_id" => $obj->mercharticle_id
				];

				$criteriaValues = [
					"mercharticle_id" => " mercharticle_id = :mercharticle_id "
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
					'mercharticle_id' => 'A.`mercharticle_id`', 'mercharticle_art' => 'A.`mercharticle_art`', 'mercharticle_mat' => 'A.`mercharticle_mat`', 'mercharticle_col' => 'A.`mercharticle_col`',
					'mercharticle_name' => 'A.`mercharticle_name`', 'mercharticle_descr' => 'A.`mercharticle_descr`', 'mercharticle_isdisabled' => 'A.`mercharticle_isdisabled`', 'mercharticle_pcpline' => 'A.`mercharticle_pcpline`',
					'mercharticle_pcpgroup' => 'A.`mercharticle_pcpgroup`', 'mercharticle_pcpcategory' => 'A.`mercharticle_pcpcategory`', 'mercharticle_gender' => 'A.`mercharticle_gender`', 'mercharticle_fit' => 'A.`mercharticle_fit`',
					'mercharticle_hscodeship' => 'A.`mercharticle_hscodeship`', 'mercharticle_hscodeina' => 'A.`mercharticle_hscodeina`', 'mercharticle_gtype' => 'A.`mercharticle_gtype`', 'mercharticle_labelname' => 'A.`mercharticle_labelname`',
					'mercharticle_labelproduct' => 'A.`mercharticle_labelproduct`', 'mercharticle_bahan' => 'A.`mercharticle_bahan`', 'mercharticle_pemeliharaan' => 'A.`mercharticle_pemeliharaan`', 'mercharticle_logo' => 'A.`mercharticle_logo`',
					'mercharticle_dibuatdi' => 'A.`mercharticle_dibuatdi`', 'merchctg_id' => 'A.`merchctg_id`', 'merchsea_id' => 'A.`merchsea_id`', 'unit_id' => 'A.`unit_id`',
					'brand_id' => 'A.`brand_id`', 'dept_id' => 'A.`dept_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "fsn_mercharticle A";
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