<?php


function salesstat_generatedata_sales($self, $dateparam, $mapping, $classgroup) {
	try {

		// hapus dulu data sebelumnya yang tanggal $dateparam->current_date_end
		debug::log("Hapus traffic GTT_DAILYTRAFFIC tanggal  $dateparam->current_date_end... ", ['nonewline'=>true]);
		ClearTemporarySalesData($self, $dateparam);
		debug::log('done.');

		$gendatalist = [
			["descr"=>"Current Daily", "fieldprefix" => "D_CURR", "dtstart" => $dateparam->current_date_end, "dtend" => $dateparam->current_date_end],
			["descr"=>"Current Weekly", "fieldprefix" => "W_CURR", "dtstart" => $dateparam->current_week_date_start, "dtend" => $dateparam->current_date_end],
			["descr"=>"Current Monthly", "fieldprefix" => "M_CURR", "dtstart" => $dateparam->current_month_date_start, "dtend" => $dateparam->current_date_end],
			["descr"=>"Current Year", "fieldprefix" => "Y_CURR", "dtstart" => $dateparam->current_year_date_start, "dtend" => $dateparam->current_date_end],
			["descr"=>"Lastyear Daily", "fieldprefix" => "D_PREV", "dtstart" => $dateparam->lastyear_date_end, "dtend" => $dateparam->lastyear_date_end],
			["descr"=>"Lastyear Weekly", "fieldprefix" => "W_PREV", "dtstart" => $dateparam->lastyear_week_date_start, "dtend" => $dateparam->lastyear_date_end],
			["descr"=>"Lastyear Monthly", "fieldprefix" => "M_PREV", "dtstart" => $dateparam->lastyear_month_date_start, "dtend" => $dateparam->lastyear_date_end],
			["descr"=>"Lastyear Yearly", "fieldprefix" => "Y_PREV", "dtstart" => $dateparam->lastyear_year_date_start, "dtend" => $dateparam->lastyear_date_end]
		];

		foreach ($gendatalist as $gendata) {
			salesstat_generatedata_sales_date($self, $dateparam, $mapping, $classgroup, $gendata);
		}

	} catch (Exception $ex) {
		throw $ex;
	}		
}	


function ClearTemporarySalesData($self, $dateparam) {
	try {
		$tablename = GTT_DAILYSALES;
		$sql = "DELETE FROM $tablename WHERE DT = :DT AND BL='SAL'";
		$stmt = $self->db->prepare($sql);
		$stmt->execute([':DT' => $dateparam->current_date_end ]);
	} catch (Exception $ex) {
		throw $ex;
	}
}


function salesstat_generatedata_sales_date($self, $dateparam, $mapping, $classgroup, $gendata) {
	$dtstart = $gendata['dtstart'];
	$dtend = $gendata['dtend'];
	debug::log("Get sales ". $gendata['descr'] ." dari DSR tanggal $dtstart s/d $dtend ... ", ['nonewline'=>true]);
	try {

		// siapkan query buat insert data sales
		$sql_insert = getSqlInsertSales($gendata['fieldprefix']);
		$stmt_insert = $self->db->prepare($sql_insert);


		$sql = getSqlSales();
		$stmt = $self->db->prepare($sql);
		$stmt->execute([
			":DTSTART" => $dtstart,
			":DTEND" => $dtend,
		]);

		$dt = new DateTime(date("Y-m-d", strtotime($dateparam->current_date_end)));
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		foreach ($rows as $row) {
			$mapid = $row['REGION_ID'] . ":" . $row['BRANCH_ID'];
			if (array_key_exists($mapid, $mapping)) {
				$SITE_ID = $mapping[$mapid]->SITE_ID;
				$UNIT_ID = $mapping[$mapid]->UNIT_ID;
				$CITY_ID = $mapping[$mapid]->CITY_ID;
				$LOCATION_ID = $mapping[$mapid]->LOCATION_ID;
			} else {
				debug::log("$mapid tidak ditemukan!");
				$SITE_ID = $mapid;
				$UNIT_ID = $mapid;
				$CITY_ID = $mapid;
				$LOCATION_ID = $mapid;
			}

			if (array_key_exists($row['HEINVCTG_CLASS'], $classgroup)) {
				$row['ITEMCLASS_ID'] = $classgroup[$row['HEINVCTG_CLASS']]->invcls_gro;
			} else {
				$row['ITEMCLASS_ID'] = "#UNMAPPED";
			}

			if ($row['HEINVCTG_CLASS']=='' || $row['HEINVCTG_CLASS']==null) {
				$row['HEINVCTG_CLASS'] = "#UNMAPPED";
			}

			$UNITGROUP_ID = getUnitGroup($UNIT_ID);

			$stmt_insert->execute([
				':YE' => $dt->format('Y'),
				':MO' => $dt->format('m'),
				':DT' => $dt->format('Y-m-d'),
				':CITY_ID' => $CITY_ID, 
				':LOCATION_ID' => $LOCATION_ID, 
				':SITE_ID' => $SITE_ID,       //$row['SITE_ID'], 
				':UNIT_ID' => $UNIT_ID,       //$row['UNIT_ID'], 
				':UNITGROUP_ID' => $UNITGROUP_ID,
				':REGION_ID' => $row['REGION_ID'],
				':BRANCH_ID' => $row['BRANCH_ID'],
				':ITEMCLASS_ID' => $row['ITEMCLASS_ID'], 
				':HEINVCTG_CLASS' =>  $row['HEINVCTG_CLASS'], 
				':CUST' => $row['CUST'], 
				':TX' => $row['TX'], 
				':QTY' => $row['QTY'], 
				':GROSS' => $row['GROSS'], 
				':NETT' => $row['NETT'], 
				':NETT_FP' => $row['NETT_FP'], 
				':NETT_MD' => $row['NETT_MD'], 
				':COGS' => $row['COGS'], 
				':GP' => $row['GP'],
				':OLD_QTY' => $row['QTY_OLD'],
				':OLD_NETT' => $row['NETT_OLD'],
				':OLD_GP' => $row['GP_OLD']
			]);
		}

		debug::log('done.');		
	} catch (Exception $ex) {
		throw $ex;
	}
}


function getSqlInsertSales($fieldprefix) {
	$FCUST		= $fieldprefix . "_CUST";
	$FTX		= $fieldprefix . "_TX";
	$FQTY 		= $fieldprefix . "_QTY"; 
	$FGROSS		= $fieldprefix . "_GROSS"; 
	$FNETT 		= $fieldprefix . "_NETT";
	$FNETT_FP 	= $fieldprefix . "_NETT_FP";
	$FNETT_MD 	= $fieldprefix . "_NETT_MD";
	$FCOGS 		= $fieldprefix . "_COGS";
	$FGP 		= $fieldprefix . "_GP";
	$FOLDQTY 	= $fieldprefix . "_OLD_QTY";
	$FOLDNETT	= $fieldprefix . "_OLD_NETT";
	$FOLDGP 	= $fieldprefix . "_OLD_GP";


	$tablename = GTT_DAILYSALES;
	return "
		UPDATE OR INSERT INTO $tablename
		(BL,     YE,  MO,  DT,  CITY_ID,  LOCATION_ID,  SITE_ID,  UNIT_ID,  UNITGROUP_ID,  REGION_ID,  BRANCH_ID,  ITEMCLASS_ID,  HEINVCTG_CLASS, $FCUST, $FTX,  $FQTY, $FGROSS, $FNETT, $FNETT_FP, $FNETT_MD, $FCOGS, $FGP, $FOLDQTY, $FOLDNETT, $FOLDGP)
		VALUES
		('SAL', :YE, :MO, :DT, :CITY_ID, :LOCATION_ID, :SITE_ID, :UNIT_ID, :UNITGROUP_ID, :REGION_ID, :BRANCH_ID, :ITEMCLASS_ID, :HEINVCTG_CLASS, :CUST, :TX, :QTY, :GROSS, :NETT, :NETT_FP, :NETT_MD, :COGS, :GP, :OLD_QTY, :OLD_NETT ,:OLD_GP)
		MATCHING
		(BL, DT, REGION_ID, BRANCH_ID, HEINVCTG_CLASS)
	";
}


function getSqlSales() {
	return "
		SELECT
		A.UNIT_ID,
		A.SITE_ID,
		A.REGION_ID,
		A.BRANCH_ID,
		A.HEINVCTG_CLASS,
		COUNT(DISTINCT A.BON_ID) AS TX,
		COUNT(DISTINCT A.CUST_ID) AS CUST,
		SUM(A.SALES_QTY) AS QTY,
		SUM(A.SALES_GROSS) AS GROSS,
		SUM(A.SALES_NETT) AS NETT,
		SUM(A.SALES_NETT_FP) AS NETT_FP,
		SUM(A.SALES_NETT_MD) AS NETT_MD,
		SUM(A.SALES_COGS_FINAL) AS COGS,
		((SUM(A.SALES_NETT)/1.1)-SUM(A.SALES_COGS_FINAL)) AS GP,
		SUM(CASE WHEN A.HEINV_AGE>180 THEN A.SALES_QTY ELSE 0 END) AS QTY_OLD,
		SUM(CASE WHEN A.HEINV_AGE>180 THEN A.SALES_NETT ELSE 0 END) AS NETT_OLD,
		SUM(CASE WHEN A.HEINV_AGE>180 THEN (A.SALES_NETT/1.1)-A.SALES_COGS_FINAL ELSE 0 END) AS GP_OLD
		from
		TMP_BON_ITEM A
		WHERE
		A.BON_ISVOID=0
		AND A.BON_DATE BETWEEN :DTSTART AND :DTEND
		GROUP BY
		A.UNIT_ID, A.SITE_ID,
		A.REGION_ID, A.BRANCH_ID,
		A.HEINVCTG_CLASS	
	";
}

