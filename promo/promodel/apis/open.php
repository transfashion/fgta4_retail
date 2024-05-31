<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * retail/promo/promodel/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header promodel (mst_promodel)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 31/03/2023
 */
$API = new class extends promodelBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_promodel';
		$primarykey = 'promodel_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\promodel_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new promodel_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			if (method_exists(get_class($hnd), 'PreCheckOpen')) {
				// PreCheckOpen($data, &$key, &$options)
				$hnd->PreCheckOpen($data, $key, $options);
			}

			$criteriaValues = [
				"promodel_id" => " promodel_id = :promodel_id "
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
			

			if (method_exists(get_class($hnd), 'prepareOpenData')) {
				// prepareOpenData(object $options, $criteriaValues) : void
				$hnd->prepareOpenData($options, $criteriaValues);
			}


			$sqlFieldList = [
				'promodel_id' => 'A.`promodel_id`', 'promodel_name' => 'A.`promodel_name`', 'promodel_descr' => 'A.`promodel_descr`', 'prorule_id' => 'A.`prorule_id`',
				'prorule_fn' => 'A.`prorule_fn`', 'prolevel_id' => 'A.`prolevel_id`', 'prorule_ishasgroupa' => 'A.`prorule_ishasgroupa`', 'a_prorulesec_id' => 'A.`a_prorulesec_id`',
				'a_prorulesec_label' => 'A.`a_prorulesec_label`', 'a_prospot_id' => 'A.`a_prospot_id`', 'a_prostep_id' => 'A.`a_prostep_id`', 'a_proprog_disc' => 'A.`a_proprog_disc`',
				'a_proprog_qtythreshold' => 'A.`a_proprog_qtythreshold`', 'a_proprog_qtymax' => 'A.`a_proprog_qtymax`', 'a_proprog_isblockonmeet' => 'A.`a_proprog_isblockonmeet`', 'prorule_ishasgroupb' => 'A.`prorule_ishasgroupb`',
				'b_prorulesec_id' => 'A.`b_prorulesec_id`', 'b_prorulesec_label' => 'A.`b_prorulesec_label`', 'b_proprog_disc' => 'A.`b_proprog_disc`', 'b_proprog_qtythreshold' => 'A.`b_proprog_qtythreshold`',
				'b_proprog_qtymax' => 'A.`b_proprog_qtymax`', 'b_proprog_isblockonmeet' => 'A.`b_proprog_isblockonmeet`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_promodel A";
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
				
				'prorule_name' => \FGTA4\utils\SqlUtility::Lookup($record['prorule_id'], $this->db, 'mst_prorule', 'prorule_id', 'prorule_name'),
				'prolevel_name' => \FGTA4\utils\SqlUtility::Lookup($record['prolevel_id'], $this->db, 'mst_prolevel', 'prolevel_id', 'prolevel_name'),
				'a_prorulesec_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prorulesec_id'], $this->db, 'mst_prorulesec', 'prorulesec_id', 'prorulesec_name'),
				'a_prospot_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prospot_id'], $this->db, 'mst_prospot', 'prospot_id', 'prospot_name'),
				'a_prostep_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prostep_id'], $this->db, 'mst_prostep', 'prostep_id', 'prostep_name'),
				'b_prorulesec_name' => \FGTA4\utils\SqlUtility::Lookup($record['b_prorulesec_id'], $this->db, 'mst_prorulesec', 'prorulesec_id', 'prorulesec_name'),


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