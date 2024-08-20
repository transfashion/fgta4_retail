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
 * retail/sales/promoab/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header promoab (mst_promoab)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 21/03/2023
 */
$API = new class extends promoabBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\promoab_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new promoab_headerHandler($options);
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
				"search" => " A.promoabrule_name LIKE CONCAT('%', :search, '%') OR A.promoab_descr LIKE CONCAT('%', :search, '%') "
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
				'promoab_id' => 'A.`promoab_id`', 'brand_id' => 'A.`brand_id`', 'promoabmodel_id' => 'A.`promoabmodel_id`', 'promoabrule_name' => 'A.`promoabrule_name`',
				'promoab_descr' => 'A.`promoab_descr`', 'promoabrule_dtstart' => 'A.`promoabrule_dtstart`', 'promoabrule_timestart' => 'A.`promoabrule_timestart`', 'promoabrule_dtend' => 'A.`promoabrule_dtend`',
				'promoabrule_timeend' => 'A.`promoabrule_timeend`', 'promoabrule_ispaymdiscallowed' => 'A.`promoabrule_ispaymdiscallowed`', 'promoabrule_valuethreshold' => 'A.`promoabrule_valuethreshold`', 'a_promoabrulesection_id' => 'A.`a_promoabrulesection_id`',
				'promoab_a_label' => 'A.`promoab_a_label`', 'promoab_a_itemlist' => 'A.`promoab_a_itemlist`', 'promoab_a_qtythreshold' => 'A.`promoab_a_qtythreshold`', 'promoab_a_valuethreshold' => 'A.`promoab_a_valuethreshold`',
				'promoab_a_disc' => 'A.`promoab_a_disc`', 'promoab_a_qtymax' => 'A.`promoab_a_qtymax`', 'promoab_a_isreplacedisc' => 'A.`promoab_a_isreplacedisc`', 'promoab_a_isblockonmeet' => 'A.`promoab_a_isblockonmeet`',
				'b_promoabrulesection_id' => 'A.`b_promoabrulesection_id`', 'promoab_b_label' => 'A.`promoab_b_label`', 'promoab_b_itemlist' => 'A.`promoab_b_itemlist`', 'promoab_b_qtythreshold' => 'A.`promoab_b_qtythreshold`',
				'promoab_b_valuethreshold' => 'A.`promoab_b_valuethreshold`', 'promoab_b_disc' => 'A.`promoab_b_disc`', 'promoab_b_qtymax' => 'A.`promoab_b_qtymax`', 'promoab_b_isreplacedisc' => 'A.`promoab_b_isreplacedisc`',
				'promoab_b_isblockonmeet' => 'A.`promoab_b_isblockonmeet`', 'promoabrule_id' => 'A.`promoabrule_id`', 'promoabrule_code' => 'A.`promoabrule_code`', 'brand_nameshort' => 'A.`brand_nameshort`',
				'promoabrule_ishasgroupa' => 'A.`promoabrule_ishasgroupa`', 'promoabrule_ishasgroupb' => 'A.`promoabrule_ishasgroupb`', 'promoab_version' => 'A.`promoab_version`', 'promoab_iscommit' => 'A.`promoab_iscommit`',
				'promoab_commitby' => 'A.`promoab_commitby`', 'promoab_commitdate' => 'A.`promoab_commitdate`', 'promoab_isdownload' => 'A.`promoab_isdownload`', '_createby' => 'A.`_createby`',
				'_createby' => 'A.`_createby`', '_createdate' => 'A.`_createdate`', '_modifyby' => 'A.`_modifyby`', '_modifydate' => 'A.`_modifydate`'
			];
			$sqlFromTable = "mst_promoab A";
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
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'promoabmodel_descr' => \FGTA4\utils\SqlUtility::Lookup($record['promoabmodel_id'], $this->db, 'mst_promoabmodel', 'promoabmodel_id', 'promoabmodel_descr'),
					'a_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['a_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),
					'b_promoabrulesection_name' => \FGTA4\utils\SqlUtility::Lookup($record['b_promoabrulesection_id'], $this->db, 'mst_promoabrulesection', 'promoabrulesection_id', 'promoabrulesection_name'),
					'promoabrule_name' => \FGTA4\utils\SqlUtility::Lookup($record['promoabrule_id'], $this->db, 'mst_promoabrule', 'promoabrule_id', 'promoabrule_name'),
					'promoab_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['promoab_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('brand_name', 'brand_id', $record, 'mst_brand', 'brand_name', 'brand_id');
				$this->addFields('promoabmodel_descr', 'promoabmodel_id', $record, 'mst_promoabmodel', 'promoabmodel_descr', 'promoabmodel_id');
				$this->addFields('a_promoabrulesection_name', 'a_promoabrulesection_id', $record, 'mst_promoabrulesection', 'promoabrulesection_name', 'promoabrulesection_id');
				$this->addFields('b_promoabrulesection_name', 'b_promoabrulesection_id', $record, 'mst_promoabrulesection', 'promoabrulesection_name', 'promoabrulesection_id');
				$this->addFields('promoabrule_name', 'promoabrule_id', $record, 'mst_promoabrule', 'promoabrule_name', 'promoabrule_id');
				$this->addFields('promoab_commitby', 'promoab_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


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