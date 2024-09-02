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
 * retail/merch/merchship/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchship (trn_merchship)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 10/11/2023
 */
$API = new class extends merchshipBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'trn_merchship';
		$primarykey = 'merchship_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchship_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchship_headerHandler($options);
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
				"merchship_id" => " merchship_id = :merchship_id "
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
				'merchship_id' => 'A.`merchship_id`', 'unit_id' => 'A.`unit_id`', 'principal_partner_id' => 'A.`principal_partner_id`', 'fowarder_partner_id' => 'A.`fowarder_partner_id`',
				'merchship_descr' => 'A.`merchship_descr`', 'merchship_date' => 'A.`merchship_date`', 'periodemo_id' => 'A.`periodemo_id`', 'merchship_qty' => 'A.`merchship_qty`',
				'merchship_value' => 'A.`merchship_value`', 'curr_id' => 'A.`curr_id`', 'merchship_rate' => 'A.`merchship_rate`', 'dept_id' => 'A.`dept_id`',
				'merchship_version' => 'A.`merchship_version`', 'merchship_iscommit' => 'A.`merchship_iscommit`', 'merchship_commitby' => 'A.`merchship_commitby`', 'merchship_commitdate' => 'A.`merchship_commitdate`',
				'merchship_isverify' => 'A.`merchship_isverify`', 'merchship_verifyby' => 'A.`merchship_verifyby`', 'merchship_verifydate' => 'A.`merchship_verifydate`', 'merchship_iscalculate' => 'A.`merchship_iscalculate`',
				'merchship_calculateby' => 'A.`merchship_calculateby`', 'merchship_calculatedate' => 'A.`merchship_calculatedate`', 'merchship_isexecute' => 'A.`merchship_isexecute`', 'merchship_executeby' => 'A.`merchship_executeby`',
				'merchship_executedate' => 'A.`merchship_executedate`', 'merchship_isbill' => 'A.`merchship_isbill`', 'merchship_billby' => 'A.`merchship_billby`', 'merchship_billdate' => 'A.`merchship_billdate`',
				'merchship_iscost' => 'A.`merchship_iscost`', 'merchship_costby' => 'A.`merchship_costby`', 'merchship_costydate' => 'A.`merchship_costydate`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchship A";
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
				'merchship_date' => date("d/m/Y", strtotime($record['merchship_date'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
				'principal_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['principal_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'fowarder_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['fowarder_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'merchship_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchship_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchship_calculateby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_calculateby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchship_executeby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_executeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchship_billby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_billby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'merchship_costby' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_costby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


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