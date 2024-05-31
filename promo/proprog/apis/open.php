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
 * retail/promo/proprog/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header proprog (mst_proprog)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/07/2023
 */
$API = new class extends proprogBase {
	
	public function execute($options) {
		$event = 'on-open';
		$tablename = 'mst_proprog';
		$primarykey = 'proprog_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\proprog_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new proprog_headerHandler($options);
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
				"proprog_id" => " proprog_id = :proprog_id "
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
				'proprog_id' => 'A.`proprog_id`', 'proprog_descr' => 'A.`proprog_descr`', 'proprog_display' => 'A.`proprog_display`', 'prorule_id' => 'A.`prorule_id`',
				'dept_id' => 'A.`dept_id`', 'promodel_id' => 'A.`promodel_id`', 'problock_id' => 'A.`problock_id`', 'proprog_ispermanent' => 'A.`proprog_ispermanent`',
				'proprog_dtstart' => 'A.`proprog_dtstart`', 'proprog_timestart' => 'A.`proprog_timestart`', 'proprog_dtend' => 'A.`proprog_dtend`', 'proprog_timeend' => 'A.`proprog_timeend`',
				'proprog_valuethreshold' => 'A.`proprog_valuethreshold`', 'proprog_qtythreshold' => 'A.`proprog_qtythreshold`', 'proprog_priority' => 'A.`proprog_priority`', 'proprog_ishasgroupa' => 'A.`proprog_ishasgroupa`',
				'a_proprog_label' => 'A.`a_proprog_label`', 'a_prospot_id' => 'A.`a_prospot_id`', 'a_prostep_id' => 'A.`a_prostep_id`', 'a_progrouping_id' => 'A.`a_progrouping_id`',
				'a_proprog_qtythreshold' => 'A.`a_proprog_qtythreshold`', 'a_proprog_valuethreshold' => 'A.`a_proprog_valuethreshold`', 'a_proprog_sellprice' => 'A.`a_proprog_sellprice`', 'a_proprog_disc' => 'A.`a_proprog_disc`',
				'a_proprog_discval' => 'A.`a_proprog_discval`', 'proprog_ishasgroupb' => 'A.`proprog_ishasgroupb`', 'b_proprog_label' => 'A.`b_proprog_label`', 'b_prospot_id' => 'A.`b_prospot_id`',
				'b_proprog_qtythreshold' => 'A.`b_proprog_qtythreshold`', 'b_proprog_valuethreshold' => 'A.`b_proprog_valuethreshold`', 'b_proprog_sellprice' => 'A.`b_proprog_sellprice`', 'a_proprog_qtyapplied' => 'A.`a_proprog_qtyapplied`',
				'b_proprog_isblockonmeet' => 'A.`b_proprog_isblockonmeet`', 'proprog_version' => 'A.`proprog_version`', 'proprog_isdisabled' => 'A.`proprog_isdisabled`', 'proprog_iscommit' => 'A.`proprog_iscommit`',
				'proprog_commitby' => 'A.`proprog_commitby`', 'proprog_commitdate' => 'A.`proprog_commitdate`', 'proprog_isapprovalprogress' => 'A.`proprog_isapprovalprogress`', 'proprog_isapproved' => 'A.`proprog_isapproved`',
				'proprog_approveby' => 'A.`proprog_approveby`', 'proprog_approvedate' => 'A.`proprog_approvedate`', 'proprog_isdeclined' => 'A.`proprog_isdeclined`', 'proprog_declineby' => 'A.`proprog_declineby`',
				'proprog_declinedate' => 'A.`proprog_declinedate`', 'doc_id' => 'A.`doc_id`', 'proprog_isdownload' => 'A.`proprog_isdownload`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_proprog A";
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


			$approverow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_approveby"=>$userdata->username, "$this->approval_field_approve"=>'1'], $this->db, $this->approval_tablename);
			$declinerow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_declineby"=>$userdata->username, "$this->approval_field_decline"=>'1'], $this->db, "$this->approval_tablename");
			

			$result->record = array_merge($record, [
				'proprog_dtstart' => date("d/m/Y", strtotime($record['proprog_dtstart'])),
				'proprog_dtend' => date("d/m/Y", strtotime($record['proprog_dtend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'prorule_name' => \FGTA4\utils\SqlUtility::Lookup($record['prorule_id'], $this->db, 'mst_prorule', 'prorule_id', 'prorule_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'promodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['promodel_id'], $this->db, 'mst_promodel', 'promodel_id', 'promodel_name'),
				'problock_name' => \FGTA4\utils\SqlUtility::Lookup($record['problock_id'], $this->db, 'mst_problock', 'problock_id', 'problock_name'),
				'a_prospot_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prospot_id'], $this->db, 'mst_prospot', 'prospot_id', 'prospot_name'),
				'a_prostep_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prostep_id'], $this->db, 'mst_prostep', 'prostep_id', 'prostep_name'),
				'a_progrouping_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_progrouping_id'], $this->db, 'mst_progrouping', 'progrouping_id', 'progrouping_name'),
				'b_prospot_name' => \FGTA4\utils\SqlUtility::Lookup($record['b_prospot_id'], $this->db, 'mst_prospot', 'prospot_id', 'prospot_name'),
				'proprog_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['proprog_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'proprog_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['proprog_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'proprog_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['proprog_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
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