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
 * retail/promo/proprog/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header proprog (mst_proprog)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/07/2023
 */
$API = new class extends proprogBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\proprog_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new proprog_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$criteriaValues = [
				"search" => " A.proprog_name LIKE CONCAT('%', :search, '%') OR A.proprog_display LIKE CONCAT('%', :search, '%') "
			];

			if (method_exists(get_class($hnd), 'buildListCriteriaValues')) {
				// ** buildListCriteriaValues(object &$options, array &$criteriaValues) : void
				//    apabila akan modifikasi parameter2 untuk query
				//    $criteriaValues['fieldname'] = " A.fieldname = :fieldname";  <-- menambahkan field pada where dan memberi parameter value
				//    $criteriaValues['fieldname'] = "--";                         <-- memberi parameter value tanpa menambahkan pada where
				//    $criteriaValues['fieldname'] = null                          <-- tidak memberi efek pada query secara langsung, parameter digunakan untuk keperluan lain 
				//
				//    untuk memberikan nilai default apabila paramter tidak dikirim
				//    // \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
				$hnd->buildListCriteriaValues($options, $criteriaValues);
			}

			$where = \FGTA4\utils\SqlUtility::BuildCriteria($options->criteria, $criteriaValues);
			
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			/* prepare DbLayer Temporay Data Helper if needed */
			if (method_exists(get_class($hnd), 'prepareListData')) {
				// ** prepareListData(object $options, array $criteriaValues) : void
				//    misalnya perlu mebuat temporary table,
				//    untuk membuat query komplex dapat dibuat disini	
				$hnd->prepareListData($options, $criteriaValues);
			}


			/* Data Query Configuration */
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
			$sqlLimit = "LIMIT $maxrow OFFSET $offset";

			if (method_exists(get_class($hnd), 'SqlQueryListBuilder')) {
				// ** SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void
				//    menambah atau memodifikasi field-field yang akan ditampilkan
				//    apabila akan memodifikasi join table
				//    apabila akan memodifikasi nilai parameter
				$hnd->SqlQueryListBuilder($sqlFieldList, $sqlFromTable, $sqlWhere, $where->params);
			}
			
			// filter select columns
			if (!property_exists($options, 'selectFields')) {
				$options->selectFields = [];
			}
			$columsSelected = $this->SelectColumns($sqlFieldList, $options->selectFields);
			$sqlFields = \FGTA4\utils\SqlUtility::generateSqlSelectFieldList($columsSelected);


			/* Sort Configuration */
			if (!property_exists($options, 'sortData')) {
				$options->sortData = [];
			}
			if (!is_array($options->sortData)) {
				$options->sortData = [];
			}
		


			if (method_exists(get_class($hnd), 'sortListOrder')) {
				// ** sortListOrder(array &$sortData) : void
				//    jika ada keperluan mengurutkan data
				//    $sortData['fieldname'] = 'ASC/DESC';
				$hnd->sortListOrder($options->sortData);
			}
			$sqlOrders = \FGTA4\utils\SqlUtility::generateSqlSelectSort($options->sortData);


			/* Compose SQL Query */
			$sqlCount = "select count(*) as n from $sqlFromTable $sqlWhere";
			$sqlData = "
				select 
				$sqlFields 
				from 
				$sqlFromTable 
				$sqlWhere 
				$sqlOrders 
				$sqlLimit
			";

			/* Execute Query: Count */
			$stmt = $this->db->prepare($sqlCount );
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			/* Execute Query: Retrieve Data */
			$stmt = $this->db->prepare($sqlData);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);


			$handleloop = false;
			if (method_exists(get_class($hnd), 'DataListLooping')) {
				$handleloop = true;
			}

			/* Proces result */
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}


				/*
				$record = array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
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
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('prorule_name', 'prorule_id', $record, 'mst_prorule', 'prorule_name', 'prorule_id');
				$this->addFields('dept_name', 'dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('promodel_name', 'promodel_id', $record, 'mst_promodel', 'promodel_name', 'promodel_id');
				$this->addFields('problock_name', 'problock_id', $record, 'mst_problock', 'problock_name', 'problock_id');
				$this->addFields('a_prospot_name', 'a_prospot_id', $record, 'mst_prospot', 'prospot_name', 'prospot_id');
				$this->addFields('a_prostep_name', 'a_prostep_id', $record, 'mst_prostep', 'prostep_name', 'prostep_id');
				$this->addFields('a_progrouping_name', 'a_progrouping_id', $record, 'mst_progrouping', 'progrouping_name', 'progrouping_id');
				$this->addFields('b_prospot_name', 'b_prospot_id', $record, 'mst_prospot', 'prospot_name', 'prospot_id');
				$this->addFields('proprog_commitby', 'proprog_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('proprog_approveby', 'proprog_approveby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('proprog_declineby', 'proprog_declineby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('doc_name', 'doc_id', $record, 'mst_doc', 'doc_name', 'doc_id');
					 


				if ($handleloop) {
					// ** DataListLooping(array &$record) : void
					//    apabila akan menambahkan field di record
					$hnd->DataListLooping($record);
				}

				array_push($records, $record);
			}

			/* modify and finalize records */
			if (method_exists(get_class($hnd), 'DataListFinal')) {
				// ** DataListFinal(array &$records) : void
				//    finalisasi data list
				$hnd->DataListFinal($records);
			}

			// kembalikan hasilnya
			$result = new \stdClass; 
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};