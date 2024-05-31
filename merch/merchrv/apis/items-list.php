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
 * retail/merch/merchrv/apis/items-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel items merchrv (trn_merchrvitem)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 02/11/2023
 */
$API = new class extends merchrvBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\merchrv_itemsHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchrv_itemsHandler($options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			if (method_exists(get_class($hnd), 'init')) {
				// init(object &$options) : void
				$hnd->init($options);
			}

			$criteriaValues = [
				"id" => " A.merchrv_id = :id"
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
				'merchrvitem_id' => 'A.`merchrvitem_id`', 'merchitem_id' => 'A.`merchitem_id`', 'merchitem_combo' => 'A.`merchitem_combo`', 'merchitem_name' => 'A.`merchitem_name`',
				'merchrvitem_valuepo' => 'A.`merchrvitem_valuepo`', 'merchrvitem_value' => 'A.`merchrvitem_value`', 'merchrvitem_qtyinit' => 'A.`merchrvitem_qtyinit`', 'merchrvitem_qty' => 'A.`merchrvitem_qty`',
				'merchrvitem_rate' => 'A.`merchrvitem_rate`', 'merchrvitem_subtotalvaluefrg' => 'A.`merchrvitem_subtotalvaluefrg`', 'merchrvitem_subtotalvalueidr' => 'A.`merchrvitem_subtotalvalueidr`', 'merchrvitem_budgetaddcostidr' => 'A.`merchrvitem_budgetaddcostidr`',
				'merchrvitem_budgetlandedcostidr' => 'A.`merchrvitem_budgetlandedcostidr`', 'merchrvitem_budgetmarkupidr' => 'A.`merchrvitem_budgetmarkupidr`', 'merchrvitem_budgetbillidr' => 'A.`merchrvitem_budgetbillidr`', 'merchrvitem_budgetbillppn' => 'A.`merchrvitem_budgetbillppn`',
				'merchrvitem_budgetbilldpp' => 'A.`merchrvitem_budgetbilldpp`', 'merchrvitem_actualvaluefrg' => 'A.`merchrvitem_actualvaluefrg`', 'merchrvitem_actualrate' => 'A.`merchrvitem_actualrate`', 'merchrvitem_actualvalueidr' => 'A.`merchrvitem_actualvalueidr`',
				'merchrvitem_actualaddcostidr' => 'A.`merchrvitem_actualaddcostidr`', 'merchrvitem_actuallandedcostidr' => 'A.`merchrvitem_actuallandedcostidr`', 'merchrv_id' => 'A.`merchrv_id`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchrvitem A";
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
				if (is_object($options->sortData)) {
					$options->sortData = (array)$options->sortData;
				} else {
					$options->sortData = [];
				}
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
					'itemstock_id' => \FGTA4\utils\SqlUtility::Lookup($record['merchitem_id'], $this->db, 'mst_merchitem', 'merchitem_id', 'itemstock_id'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('itemstock_id', 'merchitem_id', $record, 'mst_merchitem', 'itemstock_id', 'merchitem_id');
					 


				if ($handleloop) {
					// ** DataListLooping(array &$record) : void
					//    apabila akan menambahkan field di record
					$hnd->DataListLooping($record);
				}

				array_push($records, $record);
			}




			// kembalikan hasilnya
			$result = new \stdClass; 
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;


			/* modify and finalize records */
			if (method_exists(get_class($hnd), 'DataListFinal')) {
				// ** DataListFinal(array &$records, object &$result) : void
				//    finalisasi data list
				$hnd->DataListFinal($records, $result);
			}

			$result->records = $records;

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};