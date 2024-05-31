<?php

require_once __DIR__ . '/generate-data-inv.php';
require_once __DIR__ . '/generate-data-trf.php';
require_once __DIR__ . '/generate-data-sales.php';
require_once __DIR__ . '/generate-data-target.php';
require_once __DIR__ . '/generate-data-get.php';



function salesstat_generatedata($self, $reportdate) {
	debug::log("generating report per $reportdate");
	try {
		$dateparam = salesstat_getdateparam($self, $reportdate);
		$mapping = salesstat_getmapping($self);
		$classgroup = salesstat_getclassgroup($self);

		debug::log('Generate inventori data...');
		salesstat_generatedata_inv($self, $dateparam, $mapping, $classgroup);		// generate-data-inv.php

		debug::log('Generate traffic data...');
		salesstat_generatedata_traffic($self, $dateparam, $mapping);				// generate-data-trf.php

		debug::log('Generate sales data...');
		salesstat_generatedata_sales($self, $dateparam, $mapping, $classgroup);		// generate-data-sales.php

		debug::log('Generate target data...');
		salesstat_generatedata_target($self, $dateparam, $mapping);
		// // salesstat_cleanup($self, $dateparam);

		
		debug::log('salesstat_getbyunit...');
		$data_byunit = salesstat_getbyunit($self, $dateparam);

		debug::log('salesstat_getbysite...');
		$data_bysite = salesstat_getbysite($self, $dateparam);

		debug::log('salesstat_getbyclassgro...');
		$data_byclassgro = salesstat_getbyclassgro($self, $dateparam);


		
		return (object) [
			"dateparam" => $dateparam,
			"data_byunit" => $data_byunit,
			"data_bysite" => $data_bysite,
			"data_byclassgro" => $data_byclassgro,
		];
	} catch (Exception $ex) {
		throw $ex;
	}		
}

function salesstat_cleanup($self, $dateparam) {
	try {
		$tablename = GTT_DAILYSALES;
		$sql = "
			DELETE FROM $tablename
			WHERE
			UNITGROUP_ID <> 'X-CLOSED BRANDS'
			and ITEMCLASS_ID = '#UNMAPPED'
			and INV_QTY=0 and INV_VAL=0 and Y_CURR_NETT=0
			and DT = :DT		
		";

		$stmt = $self->db->prepare($sql);
		$stmt->execute([':DT' => $dateparam->current_date_end ]);
	} catch (Exception $ex) {
		throw $ex;
	}
}

function salesstat_getmapping($self) {
	try {
		$sql = "select * from MST_SITEMAPPING";
		$mapping = [];
		foreach ($self->db->query($sql) as $row) {
			$region_id = $row->REGION_ID;
			$branch_id = $row->BRANCH_ID;
			$site_id   = $row->SITE_ID;
			$unit_id   = $row->UNIT_ID;
			$mapping["$region_id:$branch_id"] = $row;
			$mapping["$unit_id:$site_id"] = $row;
		}

		return $mapping;
	} catch (Exception $ex) {
		throw $ex;
	}	
}

function salesstat_getclassgroup($self) {
	try {
		$sql = "select * from master_invcls";
		$classgroup = [];
		foreach ($self->db_frm2->query($sql) as $row) {
			$invcls_name = $row['invcls_name'];
			$classgroup[$invcls_name] = (object)[
				'invcls_name' =>  $row['invcls_name'],
				'invcls_gro' => $row['invcls_gro']
			];
		}
		return $classgroup;
	} catch (Exception $ex) {
		throw $ex;
	}	
}


function salesstat_getdateparam($self, $reportdate) {
	try {
		$param = new stdClass;

		$param->current_date_end = $reportdate;
		// $param->current_date_end = '2020-08-13';
		// $param->current_week_date_start = '2020-08-10';
		

		$rows = array();
		foreach ($self->db->query("SELECT * FROM CON_DT WHERE DT_ID='$param->current_date_end'") as $row) { 
			$rows[] = $row; 
		}
		if (count($rows)==0) {  throw new Exception("data week untuk tanggal '$param->current_date_end' tidak ditemukan");  }
		$param->current_week_date_start = $rows[0]->WEEK_DTSTART;


		$current_month_date_start = new DateTime(date("Y-m-01", strtotime($param->current_date_end)));
		$param->current_month_date_start = $current_month_date_start->format('Y-m-d');

		$current_year_date_start = new DateTime(date("Y-01-01", strtotime($param->current_date_end)));
		$param->current_year_date_start = $current_year_date_start->format('Y-m-d');
		
		$lastyear_date_end = new DateTime(date("Y-m-d", strtotime($param->current_date_end." -1 year")));
		$param->lastyear_date_end = $lastyear_date_end->format('Y-m-d');

		$lastyear_week_date_start = new DateTime(date("Y-m-d", strtotime($param->current_week_date_start." -1 year")));
		$param->lastyear_week_date_start = $lastyear_week_date_start->format('Y-m-d');
		
		$lastyear_month_date_start = new DateTime(date("Y-m-d", strtotime($param->current_month_date_start." -1 year")));
		$param->lastyear_month_date_start = $lastyear_month_date_start->format('Y-m-d');
		
		$lastyear_year_date_start = new DateTime(date("Y-m-d", strtotime($param->current_year_date_start." -1 year")));
		$param->lastyear_year_date_start = $lastyear_year_date_start->format('Y-m-d');


		return $param;
	} catch (Exception $ex) {
		throw $ex;
	}	
}


function getUnitGroup($unit_id) {
	switch ($unit_id) {
		case "GEX" :
		case "CAN" :
		case "HBS" :
			return "MEN";
			
		case "FRG" :
		case "FKP" :
		case "TOD" :
		case "EAG" :
		case "FLA" :
			return "ACS";
			
		default:
			return "X-CLOSED BRANDS";	
	}
}

