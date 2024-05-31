<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-ref-handler.php')) {
	require_once __DIR__ .'/data-ref-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * retail/master/merchitemctg/apis/ref-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel ref merchitemctg (mst_merchitemctgref)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/07/2023
 */
$API = new class extends merchitemctgBase {

	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_merchitemctgref';
		$primarykey = 'merchitemctgref_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchitemctg_refHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchitemctg_refHandler($options);
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
				"merchitemctgref_id" => " merchitemctgref_id = :merchitemctgref_id "
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
				'merchitemctgref_id' => 'A.`merchitemctgref_id`', 'brand_id' => 'A.`brand_id`', 'interface_id' => 'A.`interface_id`', 'merchitemctgref_code' => 'A.`merchitemctgref_code`',
				'merchitemctgref_value' => 'A.`merchitemctgref_value`', 'merchitemctg_id' => 'A.`merchitemctg_id`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_merchitemctgref A";
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
				
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
				'interface_name' => \FGTA4\utils\SqlUtility::Lookup($record['interface_id'], $this->db, 'mst_interface', 'interface_id', 'interface_name'),

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