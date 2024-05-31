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
 * retail/merch/merchbillin/apis/items-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel items merchbillin (trn_merchbillindet)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/08/2023
 */
$API = new class extends merchbillinBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'trn_merchbillindet';
		$primarykey = 'merchbillindet_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchbillin_itemsHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchbillin_itemsHandler($options);
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
				"merchbillindet_id" => " merchbillindet_id = :merchbillindet_id "
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
				'merchbillindet_id' => 'A.`merchbillindet_id`', 'merchbillindet_descr' => 'A.`merchbillindet_descr`', 'merchshipbudget_id' => 'A.`merchshipbudget_id`', 'merchbillindet_qty' => 'A.`merchbillindet_qty`',
				'merchbillindet_value' => 'A.`merchbillindet_value`', 'curr_id' => 'A.`curr_id`', 'curr_rate' => 'A.`curr_rate`', 'merchbillindet_idr' => 'A.`merchbillindet_idr`',
				'merchbillin_id' => 'A.`merchbillin_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchbillindet A";
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
				
				'merchshipbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchshipbudget_id'], $this->db, 'mst_merchshipbudget', 'merchshipbudget_id', 'merchshipbudget_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),

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