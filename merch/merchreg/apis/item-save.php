<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
//require_once __ROOT_DIR . "/core/sequencer.php";


if (is_file(__DIR__ .'/data-item-handler.php')) {
	require_once __DIR__ .'/data-item-handler.php';
}



use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;



/**
 * retail/merch/merchreg/apis/item-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel item merchreg (trn_merchregitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 01/10/2023
 */
$API = new class extends merchregBase {
	
	public function execute($data, $options) {
		$event = 'on-save';
		$tablename = 'trn_merchregitem';
		$primarykey = 'merchregitem_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchreg_itemHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchreg_itemHandler($data, $options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {
			
			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}
			
			// data yang akan di update dari table
			$sqlUpdateField  = [
					'merchregitem_id', 'merchitem_refcode', 'merchitem_refitem', 'merchitem_barcode',
					'merchitem_art', 'merchitem_mat', 'merchitem_col', 'merchitem_size',
					'merchitem_combo', 'merchitem_name', 'merchitem_descr', 'merchitem_colnum',
					'merchitem_isdisabled', 'merchitem_pcpline', 'merchitem_pcpgroup', 'merchitem_pcpcategory',
					'merchitem_colorcode', 'merchitem_colordescr', 'merchitem_gender', 'merchitem_fit',
					'merchitem_hscodeship', 'merchitem_hscodeina', 'merchitem_gtype', 'merchitem_labelname',
					'merchitem_labelproduct', 'merchitem_bahan', 'merchitem_pemeliharaan', 'merchitem_logo',
					'merchitem_dibuatdi', 'merchitem_width', 'merchitem_length', 'merchitem_height',
					'merchitem_weight', 'merchitem_fob', 'merchitem_initqty', 'merchitemctg_id',
					'merchitem_id', 'mercharticle_id', 'unit_id', 'dept_id',
					'brand_id', 'mercharticle_paircode', 'merchreg_id'
			];
			if (method_exists(get_class($hnd), 'setUpdateField')) {
				// setUpdateField(&$sqlUpdateField, $data, $options)
				$hnd->setUpdateField($sqlUpdateField, $data, $options);
			}



			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($sqlUpdateField as $fieldname) {
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				if (property_exists($data, $fieldname)) {
					$obj->{$fieldname} = $data->{$fieldname};
				}
			}


			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');



			if ($obj->merchitem_refcode=='') { $obj->merchitem_refcode = '--NULL--'; }
			if ($obj->merchitem_refitem=='') { $obj->merchitem_refitem = '--NULL--'; }
			if ($obj->merchitem_barcode=='') { $obj->merchitem_barcode = '--NULL--'; }
			if ($obj->merchitem_combo=='') { $obj->merchitem_combo = '--NULL--'; }
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
			if ($obj->merchitem_id=='') { $obj->merchitem_id = '--NULL--'; }
			if ($obj->mercharticle_id=='') { $obj->mercharticle_id = '--NULL--'; }
			if ($obj->unit_id=='') { $obj->unit_id = '--NULL--'; }
			if ($obj->dept_id=='') { $obj->dept_id = '--NULL--'; }
			if ($obj->brand_id=='') { $obj->brand_id = '--NULL--'; }






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
				// ** DataSaving(object &$obj, object &$key) : void
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

				
				// Update user & timestamp di header
				$header_table = 'trn_merchreg';
				$header_primarykey = 'merchreg_id';
				$detil_primarykey = 'merchreg_id';
				$sqlrec = "update $header_table set _modifyby = :user_id, _modifydate=NOW() where $header_primarykey = :$header_primarykey";
				$stmt = $this->db->prepare($sqlrec);
				$stmt->execute([
					":user_id" => $userdata->username,
					":$header_primarykey" => $obj->{$detil_primarykey}
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $obj->{$detil_primarykey}, $action . "_DETIL", $userdata->username, (object)[]);




				// result
				$options->criteria = [
					"merchregitem_id" => $obj->merchregitem_id
				];

				$criteriaValues = [
					"merchregitem_id" => " merchregitem_id = :merchregitem_id "
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
					'merchregitem_id' => 'A.`merchregitem_id`', 'merchitem_refcode' => 'A.`merchitem_refcode`', 'merchitem_refitem' => 'A.`merchitem_refitem`', 'merchitem_barcode' => 'A.`merchitem_barcode`',
					'merchitem_art' => 'A.`merchitem_art`', 'merchitem_mat' => 'A.`merchitem_mat`', 'merchitem_col' => 'A.`merchitem_col`', 'merchitem_size' => 'A.`merchitem_size`',
					'merchitem_combo' => 'A.`merchitem_combo`', 'merchitem_name' => 'A.`merchitem_name`', 'merchitem_descr' => 'A.`merchitem_descr`', 'merchitem_colnum' => 'A.`merchitem_colnum`',
					'merchitem_isdisabled' => 'A.`merchitem_isdisabled`', 'merchitem_pcpline' => 'A.`merchitem_pcpline`', 'merchitem_pcpgroup' => 'A.`merchitem_pcpgroup`', 'merchitem_pcpcategory' => 'A.`merchitem_pcpcategory`',
					'merchitem_colorcode' => 'A.`merchitem_colorcode`', 'merchitem_colordescr' => 'A.`merchitem_colordescr`', 'merchitem_gender' => 'A.`merchitem_gender`', 'merchitem_fit' => 'A.`merchitem_fit`',
					'merchitem_hscodeship' => 'A.`merchitem_hscodeship`', 'merchitem_hscodeina' => 'A.`merchitem_hscodeina`', 'merchitem_gtype' => 'A.`merchitem_gtype`', 'merchitem_labelname' => 'A.`merchitem_labelname`',
					'merchitem_labelproduct' => 'A.`merchitem_labelproduct`', 'merchitem_bahan' => 'A.`merchitem_bahan`', 'merchitem_pemeliharaan' => 'A.`merchitem_pemeliharaan`', 'merchitem_logo' => 'A.`merchitem_logo`',
					'merchitem_dibuatdi' => 'A.`merchitem_dibuatdi`', 'merchitem_width' => 'A.`merchitem_width`', 'merchitem_length' => 'A.`merchitem_length`', 'merchitem_height' => 'A.`merchitem_height`',
					'merchitem_weight' => 'A.`merchitem_weight`', 'merchitem_fob' => 'A.`merchitem_fob`', 'merchitem_initqty' => 'A.`merchitem_initqty`', 'merchitemctg_id' => 'A.`merchitemctg_id`',
					'merchitem_id' => 'A.`merchitem_id`', 'mercharticle_id' => 'A.`mercharticle_id`', 'unit_id' => 'A.`unit_id`', 'dept_id' => 'A.`dept_id`',
					'brand_id' => 'A.`brand_id`', 'mercharticle_paircode' => 'A.`mercharticle_paircode`', 'merchreg_id' => 'A.`merchreg_id`', '_createby' => 'A.`_createby`',
					'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
				];
				$sqlFromTable = "trn_merchregitem A";
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

	public function NewId($hnd, $obj) {
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