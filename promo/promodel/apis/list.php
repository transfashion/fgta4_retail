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
 * retail/promo/promodel/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header promodel (mst_promodel)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 31/03/2023
 */
$API = new class extends promodelBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\promodel_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new promodel_headerHandler($options);
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
				"search" => " A.promodel_name LIKE CONCAT('%', :search, '%') "
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
					'prolevel_name' => \FGTA4\utils\SqlUtility::Lookup($record['prolevel_id'], $this->db, 'mst_prolevel', 'prolevel_id', 'prolevel_name'),
					'a_prorulesec_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prorulesec_id'], $this->db, 'mst_prorulesec', 'prorulesec_id', 'prorulesec_name'),
					'a_prospot_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prospot_id'], $this->db, 'mst_prospot', 'prospot_id', 'prospot_name'),
					'a_prostep_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_prostep_id'], $this->db, 'mst_prostep', 'prostep_id', 'prostep_name'),
					'b_prorulesec_name' => \FGTA4\utils\SqlUtility::Lookup($record['b_prorulesec_id'], $this->db, 'mst_prorulesec', 'prorulesec_id', 'prorulesec_name'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('prorule_name', 'prorule_id', $record, 'mst_prorule', 'prorule_name', 'prorule_id');
				$this->addFields('prolevel_name', 'prolevel_id', $record, 'mst_prolevel', 'prolevel_name', 'prolevel_id');
				$this->addFields('a_prorulesec_name', 'a_prorulesec_id', $record, 'mst_prorulesec', 'prorulesec_name', 'prorulesec_id');
				$this->addFields('a_prospot_name', 'a_prospot_id', $record, 'mst_prospot', 'prospot_name', 'prospot_id');
				$this->addFields('a_prostep_name', 'a_prostep_id', $record, 'mst_prostep', 'prostep_name', 'prostep_id');
				$this->addFields('b_prorulesec_name', 'b_prorulesec_id', $record, 'mst_prorulesec', 'prorulesec_name', 'prorulesec_id');
					 


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