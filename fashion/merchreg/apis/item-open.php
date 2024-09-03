<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-item-handler.php')) {
	require_once __DIR__ .'/data-item-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * retail/fashion/merchreg/apis/item-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel item merchreg (fsn_merchregitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/09/2024
 */
$API = new class extends merchregBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'fsn_merchregitem';
		$primarykey = 'merchregitem_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchreg_itemHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchreg_itemHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
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

			$result = new \stdClass; 

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
				'merchregitem_id' => 'A.`merchregitem_id`', 'merchitem_refitem' => 'A.`merchitem_refitem`', 'merchitem_barcode' => 'A.`merchitem_barcode`', 'merchitem_art' => 'A.`merchitem_art`',
				'merchitem_mat' => 'A.`merchitem_mat`', 'merchitem_col' => 'A.`merchitem_col`', 'merchitem_size' => 'A.`merchitem_size`', 'merchitem_combo' => 'A.`merchitem_combo`',
				'merchitem_name' => 'A.`merchitem_name`', 'merchitem_descr' => 'A.`merchitem_descr`', 'merchitem_colnum' => 'A.`merchitem_colnum`', 'merchitem_isdisabled' => 'A.`merchitem_isdisabled`',
				'merchitem_pcpline' => 'A.`merchitem_pcpline`', 'merchitem_pcpgroup' => 'A.`merchitem_pcpgroup`', 'merchitem_pcpcategory' => 'A.`merchitem_pcpcategory`', 'merchitem_colorcode' => 'A.`merchitem_colorcode`',
				'merchitem_colordescr' => 'A.`merchitem_colordescr`', 'merchitem_gender' => 'A.`merchitem_gender`', 'merchitem_fit' => 'A.`merchitem_fit`', 'merchitem_hscodeship' => 'A.`merchitem_hscodeship`',
				'merchitem_hscodeina' => 'A.`merchitem_hscodeina`', 'merchitem_gtype' => 'A.`merchitem_gtype`', 'merchitem_labelname' => 'A.`merchitem_labelname`', 'merchitem_labelproduct' => 'A.`merchitem_labelproduct`',
				'merchitem_bahan' => 'A.`merchitem_bahan`', 'merchitem_pemeliharaan' => 'A.`merchitem_pemeliharaan`', 'merchitem_logo' => 'A.`merchitem_logo`', 'merchitem_dibuatdi' => 'A.`merchitem_dibuatdi`',
				'merchitem_width' => 'A.`merchitem_width`', 'merchitem_length' => 'A.`merchitem_length`', 'merchitem_height' => 'A.`merchitem_height`', 'merchitem_weight' => 'A.`merchitem_weight`',
				'merchitem_fob' => 'A.`merchitem_fob`', 'merchitem_initqty' => 'A.`merchitem_initqty`', 'merchitemctg_id' => 'A.`merchitemctg_id`', 'unit_id' => 'A.`unit_id`',
				'dept_id' => 'A.`dept_id`', 'merchreg_id' => 'A.`merchreg_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "fsn_merchregitem A";
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

			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				

/*{__LOOKUPUSERMERGE__}*/
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);


	


			if (method_exists(get_class($hnd), 'DataOpen')) {
				//  DataOpen(array &$record) : void 
				$hnd->DataOpen($result->record);
			}


			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};