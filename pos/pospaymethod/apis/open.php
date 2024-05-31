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
 * retail/pos/pospaymethod/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header pospaymethod (pos_paymethod)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 19/03/2023
 */
$API = new class extends pospaymethodBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'pos_paymethod';
		$primarykey = 'paymethod_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\pospaymethod_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new pospaymethod_headerHandler($options);
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
				"paymethod_id" => " paymethod_id = :paymethod_id "
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
				'paymethod_id' => 'A.`paymethod_id`', 'site_id' => 'A.`site_id`', 'paymethod_name' => 'A.`paymethod_name`', 'paymethod_isdisabled' => 'A.`paymethod_isdisabled`',
				'paymethod_order' => 'A.`paymethod_order`', 'paytype_id' => 'A.`paytype_id`', 'posterminal_id' => 'A.`posterminal_id`', 'paymethod_code' => 'A.`paymethod_code`',
				'paymethod_isintegrated' => 'A.`paymethod_isintegrated`', 'paymethod_setting' => 'A.`paymethod_setting`', 'paymethod_shortcut' => 'A.`paymethod_shortcut`', 'paytype_iscash' => 'A.`paytype_iscash`',
				'paytype_isvoucher' => 'A.`paytype_isvoucher`', 'paytype_isedc' => 'A.`paytype_isedc`', 'paytype_istransfer' => 'A.`paytype_istransfer`', 'paytype_isonline' => 'A.`paytype_isonline`',
				'paytype_nameinputtype' => 'A.`paytype_nameinputtype`', 'paytype_cardinputtype' => 'A.`paytype_cardinputtype`', 'paytype_apprinputtype' => 'A.`paytype_apprinputtype`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "pos_paymethod A";
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
				
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'paytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paytype_id'], $this->db, 'pos_paytype', 'paytype_id', 'paytype_name'),
				'posterminal_code' => \FGTA4\utils\SqlUtility::Lookup($record['posterminal_id'], $this->db, 'mst_posterminal', 'posterminal_id', 'posterminal_code'),


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