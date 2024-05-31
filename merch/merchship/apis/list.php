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
 * retail/merch/merchship/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header merchship (trn_merchship)
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

		$handlerclassname = "\\FGTA4\\apis\\merchship_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchship_headerHandler($options);
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
				"search" => " A.merchship_id LIKE CONCAT('%', :search, '%') "
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
					 
				]);
				*/


				// lookup data id yang refer ke table lain
				$this->addFields('unit_name', 'unit_id', $record, 'mst_unit', 'unit_name', 'unit_id');
				$this->addFields('principal_partner_name', 'principal_partner_id', $record, 'mst_partner', 'partner_name', 'partner_id');
				$this->addFields('fowarder_partner_name', 'fowarder_partner_id', $record, 'mst_partner', 'partner_name', 'partner_id');
				$this->addFields('periodemo_name', 'periodemo_id', $record, 'mst_periodemo', 'periodemo_name', 'periodemo_id');
				$this->addFields('curr_name', 'curr_id', $record, 'mst_curr', 'curr_name', 'curr_id');
				$this->addFields('dept_name', 'dept_id', $record, 'mst_dept', 'dept_name', 'dept_id');
				$this->addFields('merchship_commitby', 'merchship_commitby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('merchship_verifyby', 'merchship_verifyby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('merchship_calculateby', 'merchship_calculateby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('merchship_executeby', 'merchship_executeby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('merchship_billby', 'merchship_billby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
				$this->addFields('merchship_costby', 'merchship_costby', $record, $GLOBALS['MAIN_USERTABLE'], 'user_fullname', 'user_id');
					 


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