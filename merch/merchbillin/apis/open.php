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
 * retail/merch/merchbillin/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchbillin (trn_merchbillin)
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
		$tablename = 'trn_merchbillin';
		$primarykey = 'merchbillin_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchbillin_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchbillin_headerHandler($options);
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
				"merchbillin_id" => " merchbillin_id = :merchbillin_id "
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
				'merchbillin_id' => 'A.`merchbillin_id`', 'merchbilltype_id' => 'A.`merchbilltype_id`', 'merchbillin_isproforma' => 'A.`merchbillin_isproforma`', 'unit_id' => 'A.`unit_id`',
				'merchship_id' => 'A.`merchship_id`', 'merchbillin_ref' => 'A.`merchbillin_ref`', 'merchbillin_date' => 'A.`merchbillin_date`', 'merchbillin_datedue' => 'A.`merchbillin_datedue`',
				'merchbillin_descr' => 'A.`merchbillin_descr`', 'periodemo_id' => 'A.`periodemo_id`', 'merchbillin_version' => 'A.`merchbillin_version`', 'merchbillin_iscommit' => 'A.`merchbillin_iscommit`',
				'merchbillin_commitby' => 'A.`merchbillin_commitby`', 'merchbillin_commitdate' => 'A.`merchbillin_commitdate`', 'merchbillin_ispost' => 'A.`merchbillin_ispost`', 'merchbillin_postby' => 'A.`merchbillin_postby`',
				'merchbillin_postdate' => 'A.`merchbillin_postdate`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchbillin A";
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
				'merchbillin_date' => date("d/m/Y", strtotime($record['merchbillin_date'])),
				'merchbillin_datedue' => date("d/m/Y", strtotime($record['merchbillin_datedue'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'merchbilltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchbilltype_id'], $this->db, 'mst_merchbilltype', 'merchbilltype_id', 'merchbilltype_name'),
				'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
				'merchship_descr' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_id'], $this->db, 'trn_merchship', 'merchship_id', 'merchship_descr'),
				'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				'merchbillin_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['merchbillin_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchbillin_postby' => \FGTA4\utils\SqlUtility::Lookup($record['merchbillin_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


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