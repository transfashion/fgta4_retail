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
 * retail/merch/merchbillin/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header merchbillin (trn_merchbillin)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/08/2023
 */
$API = new class extends merchbillinBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchbillin_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchbillin_headerHandler($options);
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
				"search" => " A.merchbillin_id LIKE CONCAT('%', :search, '%') "
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
				'merchbillin_id' => 'A.`merchbillin_id`', 'merchbilltype_id' => 'A.`merchbilltype_id`', 'merchbillin_isproforma' => 'A.`merchbillin_isproforma`', 'unit_id' => 'A.`unit_id`',
				'merchship_id' => 'A.`merchship_id`', 'merchbillin_ref' => 'A.`merchbillin_ref`', 'merchbillin_date' => 'A.`merchbillin_date`', 'merchbillin_datedue' => 'A.`merchbillin_datedue`',
				'merchbillin_descr' => 'A.`merchbillin_descr`', 'periodemo_id' => 'A.`periodemo_id`', 'merchbillin_version' => 'A.`merchbillin_version`', 'merchbillin_iscommit' => 'A.`merchbillin_iscommit`',
				'merchbillin_commitby' => 'A.`merchbillin_commitby`', 'merchbillin_commitdate' => 'A.`merchbillin_commitdate`', 'merchbillin_ispost' => 'A.`merchbillin_ispost`', 'merchbillin_postby' => 'A.`merchbillin_postby`',
				'merchbillin_postdate' => 'A.`merchbillin_postdate`', '_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchbillin A";
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
					'merchbilltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchbilltype_id'], $this->db, 'mst_merchbilltype', 'merchbilltype_id', 'merchbilltype_name'),
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'merchship_descr' => \FGTA4\utils\SqlUtility::Lookup($record['merchship_id'], $this->db, 'trn_merchship', 'merchship_id', 'merchship_descr'),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'merchbillin_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['merchbillin_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'merchbillin_postby' => \FGTA4\utils\SqlUtility::Lookup($record['merchbillin_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('merchbilltype_name', 'merchbilltype_id', $record, 'mst_merchbilltype', 'merchbilltype_name', 'merchbilltype_id');
				$this->addFields('unit_name', 'unit_id', $record, 'mst_unit', 'unit_name', 'unit_id');
				$this->addFields('merchship_descr', 'merchship_id', $record, 'trn_merchship', 'merchship_descr', 'merchship_id');
				$this->addFields('periodemo_name', 'periodemo_id', $record, 'mst_periodemo', 'periodemo_name', 'periodemo_id');
				$this->addFields('merchbillin_commitby', 'merchbillin_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('merchbillin_postby', 'merchbillin_postby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


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