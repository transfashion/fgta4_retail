<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-items-handler.php')) {
	require_once __DIR__ .'/data-items-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * retail/merch/merchrv/apis/items-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel items merchrv (trn_merchrvitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 27/09/2024
 */
$API = new class extends merchrvBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'trn_merchrvitem';
		$primarykey = 'merchrvitem_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchrv_itemsHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchrv_itemsHandler($options);
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
				"merchrvitem_id" => " merchrvitem_id = :merchrvitem_id "
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
				'merchrvitem_id' => 'A.`merchrvitem_id`', 'merchitem_id' => 'A.`merchitem_id`', 'merchitem_combo' => 'A.`merchitem_combo`', 'merchitem_name' => 'A.`merchitem_name`',
				'merchrvitem_valuepo' => 'A.`merchrvitem_valuepo`', 'merchrvitem_value' => 'A.`merchrvitem_value`', 'merchrvitem_qtyinit' => 'A.`merchrvitem_qtyinit`', 'merchrvitem_qty' => 'A.`merchrvitem_qty`',
				'merchrvitem_rate' => 'A.`merchrvitem_rate`', 'merchrvitem_subtotalvaluefrg' => 'A.`merchrvitem_subtotalvaluefrg`', 'merchrvitem_subtotalvalueidr' => 'A.`merchrvitem_subtotalvalueidr`', 'merchrvitem_budgetaddcostidr' => 'A.`merchrvitem_budgetaddcostidr`',
				'merchrvitem_budgetlandedcostidr' => 'A.`merchrvitem_budgetlandedcostidr`', 'merchrvitem_budgetmarkupidr' => 'A.`merchrvitem_budgetmarkupidr`', 'merchrvitem_budgetbillidr' => 'A.`merchrvitem_budgetbillidr`', 'merchrvitem_actualvaluefrg' => 'A.`merchrvitem_actualvaluefrg`',
				'merchrvitem_actualrate' => 'A.`merchrvitem_actualrate`', 'merchrvitem_actualvalueidr' => 'A.`merchrvitem_actualvalueidr`', 'merchrvitem_actualaddcostidr' => 'A.`merchrvitem_actualaddcostidr`', 'merchrvitem_actuallandedcostidr' => 'A.`merchrvitem_actuallandedcostidr`',
				'merchrv_id' => 'A.`merchrv_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchrvitem A";
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
				
				'itemstock_id' => \FGTA4\utils\SqlUtility::Lookup($record['merchitem_id'], $this->db, 'mst_merchitem', 'merchitem_id', 'itemstock_id'),

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