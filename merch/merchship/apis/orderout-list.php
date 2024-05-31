<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-orderout-handler.php')) {
	require_once __DIR__ .'/data-orderout-handler.php';
}

use \FGTA4\exceptions\WebException;


/**
 * retail/merch/merchship/apis/orderout-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel orderout merchship (trn_merchshiporderout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 06/11/2023
 */
$API = new class extends merchshipBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\merchship_orderoutHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchship_orderoutHandler($options);
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
				"id" => " A.merchship_id = :id"
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
				'merchshiporderout_id' => 'A.`merchshiporderout_id`', 'merchorderout_id' => 'A.`merchorderout_id`', 'merchsea_id' => 'A.`merchsea_id`', 'curr_id' => 'A.`curr_id`',
				'orderout_qty' => 'A.`orderout_qty`', 'orderout_valuefrg' => 'A.`orderout_valuefrg`', 'orderout_valueidr' => 'A.`orderout_valueidr`', 'merchship_id' => 'A.`merchship_id`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "trn_merchshiporderout A";
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
					'merchorderout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['merchorderout_id'], $this->db, 'trn_merchorderout', 'merchorderout_id', 'merchorderout_descr'),
					'merchsea_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsea_id'], $this->db, 'mst_merchsea', 'merchsea_id', 'merchsea_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('merchorderout_descr', 'merchorderout_id', $record, 'trn_merchorderout', 'merchorderout_descr', 'merchorderout_id');
				$this->addFields('merchsea_name', 'merchsea_id', $record, 'mst_merchsea', 'merchsea_name', 'merchsea_id');
				$this->addFields('curr_name', 'curr_id', $record, 'mst_curr', 'curr_name', 'curr_id');
					 


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