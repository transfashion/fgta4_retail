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
 * retail/sales/promoabmodel/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header promoabmodel (mst_promoabmodel)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 28/03/2023
 */
$API = new class extends promoabmodelBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'mst_promoabmodel';
		$primarykey = 'promoabmodel_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\promoabmodel_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new promoabmodel_headerHandler($options);
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

			$obj->promoabrule_code = strtoupper($obj->promoabrule_code);


			if ($obj->promoabmodel_descr=='') { $obj->promoabmodel_descr = '--NULL--'; }
			if ($obj->promoabrule_code=='') { $obj->promoabrule_code = '--NULL--'; }
			if ($obj->promoab_a_label=='') { $obj->promoab_a_label = '--NULL--'; }
			if ($obj->promoab_b_label=='') { $obj->promoab_b_label = '--NULL--'; }




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
					"promoabmodel_id" => $obj->promoabmodel_id
				];

				$criteriaValues = [
					"promoabmodel_id" => " promoabmodel_id = :promoabmodel_id "
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
					'promoabmodel_id' => 'A.`promoabmodel_id`', 'promoabmodel_descr' => 'A.`promoabmodel_descr`', 'promoabrule_id' => 'A.`promoabrule_id`', 'promoabrule_code' => 'A.`promoabrule_code`',
					'promoablevel_id' => 'A.`promoablevel_id`', 'promoabrule_ishasgroupa' => 'A.`promoabrule_ishasgroupa`', 'a_promoabrulesection_id' => 'A.`a_promoabrulesection_id`', 'promoab_a_label' => 'A.`promoab_a_label`',
					'promoab_a_disc' => 'A.`promoab_a_disc`', 'promoab_a_qtythreshold' => 'A.`promoab_a_qtythreshold`', 'promoab_a_qtymax' => 'A.`promoab_a_qtymax`', 'promoab_a_isreplacedisc' => 'A.`promoab_a_isreplacedisc`',
					'promoab_a_isblockonmeet' => 'A.`promoab_a_isblockonmeet`', 'promoabrule_ishasgroupb' => 'A.`promoabrule_ishasgroupb`', 'b_promoabrulesection_id' => 'A.`b_promoabrulesection_id`', 'promoab_b_label' => 'A.`promoab_b_label`',
					'promoab_b_disc' => 'A.`promoab_b_disc`', 'promoab_b_qtythreshold' => 'A.`promoab_b_qtythreshold`', 'promoab_b_qtymax' => 'A.`promoab_b_qtymax`', 'promoab_b_isreplacedisc' => 'A.`promoab_b_isreplacedisc`',
					'promoab_b_isblockonmeet' => 'A.`promoab_b_isblockonmeet`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "mst_promoabmodel A";
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
					'promoabrule_name' => \FGTA4\utils\SqlUtility::Lookup($record['promoabrule_id'], $this->db, 'mst_promoabrule', 'promoabrule_id', 'promoabrule_name'),
					'promoablevel_name' => \FGTA4\utils\SqlUtility::Lookup($record['promoablevel_id'], $this->db, 'mst_promoablevel', 'promoablevel_id', 'promoablevel_name'),
					'a_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),
					'b_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['b_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),

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