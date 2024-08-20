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
 * retail/sales/promoab/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header promoab (mst_promoab)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 21/03/2023
 */
$API = new class extends promoabBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'mst_promoab';
		$primarykey = 'promoab_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\promoab_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new promoab_headerHandler($options);
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
			$obj->promoabrule_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->promoabrule_dtstart))->format('Y-m-d');
			$obj->promoabrule_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->promoabrule_dtend))->format('Y-m-d');

			$obj->promoabrule_name = strtoupper($obj->promoabrule_name);
			$obj->brand_nameshort = strtoupper($obj->brand_nameshort);


			if ($obj->promoab_descr=='') { $obj->promoab_descr = '--NULL--'; }
			if ($obj->promoab_a_label=='') { $obj->promoab_a_label = '--NULL--'; }
			if ($obj->promoab_a_itemlist=='') { $obj->promoab_a_itemlist = '--NULL--'; }
			if ($obj->promoab_b_label=='') { $obj->promoab_b_label = '--NULL--'; }
			if ($obj->promoab_b_itemlist=='') { $obj->promoab_b_itemlist = '--NULL--'; }


			unset($obj->promoab_iscommit);
			unset($obj->promoab_commitby);
			unset($obj->promoab_commitdate);
			unset($obj->promoab_isdownload);


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
					"promoab_id" => $obj->promoab_id
				];

				$criteriaValues = [
					"promoab_id" => " promoab_id = :promoab_id "
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
					'promoab_id' => 'A.`promoab_id`', 'brand_id' => 'A.`brand_id`', 'promoabmodel_id' => 'A.`promoabmodel_id`', 'promoabrule_name' => 'A.`promoabrule_name`',
					'promoab_descr' => 'A.`promoab_descr`', 'promoabrule_dtstart' => 'A.`promoabrule_dtstart`', 'promoabrule_timestart' => 'A.`promoabrule_timestart`', 'promoabrule_dtend' => 'A.`promoabrule_dtend`',
					'promoabrule_timeend' => 'A.`promoabrule_timeend`', 'promoabrule_ispaymdiscallowed' => 'A.`promoabrule_ispaymdiscallowed`', 'promoabrule_valuethreshold' => 'A.`promoabrule_valuethreshold`', 'a_promoabrulesection_id' => 'A.`a_promoabrulesection_id`',
					'promoab_a_label' => 'A.`promoab_a_label`', 'promoab_a_itemlist' => 'A.`promoab_a_itemlist`', 'promoab_a_qtythreshold' => 'A.`promoab_a_qtythreshold`', 'promoab_a_valuethreshold' => 'A.`promoab_a_valuethreshold`',
					'promoab_a_disc' => 'A.`promoab_a_disc`', 'promoab_a_qtymax' => 'A.`promoab_a_qtymax`', 'promoab_a_isreplacedisc' => 'A.`promoab_a_isreplacedisc`', 'promoab_a_isblockonmeet' => 'A.`promoab_a_isblockonmeet`',
					'b_promoabrulesection_id' => 'A.`b_promoabrulesection_id`', 'promoab_b_label' => 'A.`promoab_b_label`', 'promoab_b_itemlist' => 'A.`promoab_b_itemlist`', 'promoab_b_qtythreshold' => 'A.`promoab_b_qtythreshold`',
					'promoab_b_valuethreshold' => 'A.`promoab_b_valuethreshold`', 'promoab_b_disc' => 'A.`promoab_b_disc`', 'promoab_b_qtymax' => 'A.`promoab_b_qtymax`', 'promoab_b_isreplacedisc' => 'A.`promoab_b_isreplacedisc`',
					'promoab_b_isblockonmeet' => 'A.`promoab_b_isblockonmeet`', 'promoabrule_id' => 'A.`promoabrule_id`', 'promoabrule_code' => 'A.`promoabrule_code`', 'brand_nameshort' => 'A.`brand_nameshort`',
					'promoabrule_ishasgroupa' => 'A.`promoabrule_ishasgroupa`', 'promoabrule_ishasgroupb' => 'A.`promoabrule_ishasgroupb`', 'promoab_version' => 'A.`promoab_version`', 'promoab_iscommit' => 'A.`promoab_iscommit`',
					'promoab_commitby' => 'A.`promoab_commitby`', 'promoab_commitdate' => 'A.`promoab_commitdate`', 'promoab_isdownload' => 'A.`promoab_isdownload`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "mst_promoab A";
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
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'promoabmodel_descr' => \FGTA4\utils\SqlUtility::Lookup($record['promoabmodel_id'], $this->db, 'mst_promoabmodel', 'promoabmodel_id', 'promoabmodel_descr'),
					'promoabrule_dtstart' => date("d/m/Y", strtotime($row['promoabrule_dtstart'])),
					'promoabrule_dtend' => date("d/m/Y", strtotime($row['promoabrule_dtend'])),
					'a_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),
					'b_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['b_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),
					'promoabrule_name' => \FGTA4\utils\SqlUtility::Lookup($record['promoabrule_id'], $this->db, 'mst_promoabrule', 'promoabrule_id', 'promoabrule_name'),
					'promoab_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['promoab_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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