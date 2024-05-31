<?php


function salesstat_generatedata_target($self, $dateparam, $mapping) {
	try {

		// hapus dulu data sebelumnya yang tanggal $dateparam->current_date_end
		debug::log("Hapus target GTT_DAILYSALES tanggal  $dateparam->current_date_end... ", ['nonewline'=>true]);
		ClearTemporaryTargetData($self, $dateparam);
		debug::log('done.');

		$gendatalist = [
			["descr"=>"Current Target Month", "prefix" => "M_CURR_", "dummyregion"=>"1", "sql" => getSqlTargetMonthly($dateparam->current_date_end)],
			["descr"=>"Current Target Year", "prefix" => "Y_CURR_", "dummyregion"=>"2", "sql" => getSqlTargetYearly($dateparam->current_date_end)  ],
		];

		foreach ($gendatalist as $gendata) {
			salesstat_generatedata_target_period($self, $dateparam, $mapping, $gendata);
		}

	} catch (Exception $ex) {
		throw $ex;
	}		
}


function ClearTemporaryTargetData($self, $dateparam) {
	try {
		$tablename = GTT_DAILYSALES;
		$sql = "DELETE FROM $tablename WHERE DT = :DT AND BL='TAR'";
		$stmt = $self->db->prepare($sql);
		$stmt->execute([':DT' => $dateparam->current_date_end ]);
	} catch (Exception $ex) {
		throw $ex;
	}		
}


function salesstat_generatedata_target_period($self, $dateparam, $mapping, $gendata) {
	$descr = $gendata['descr'];
	$dummyregion = $gendata['dummyregion'];


	debug::log("Get target  $descr  ... ", ['nonewline'=>true]);
	try {

		$sql_insert = getSqlTargetInsert($gendata["prefix"]);
		$stmt_insert = $self->db->prepare($sql_insert);


		$sql = $gendata['sql'];
		$stmt = $self->db_fgta2->prepare($sql);
		$stmt->execute();

		$dt = new DateTime(date("Y-m-d", strtotime($dateparam->current_date_end)));
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		$i = 0;
		foreach ($rows as $row) {
			$i++;
			$REGION_ID = $dummyregion;
			$BRANCH_ID = $i;
			$SITE_ID = $row['SITE_ID'];
			$UNIT_ID = $row['UNIT_ID'];
			$mapid = $UNIT_ID . ":" . $SITE_ID;
			if (array_key_exists($mapid, $mapping)) {
				$SITE_ID = $mapping[$mapid]->SITE_ID;
				$UNIT_ID = $mapping[$mapid]->UNIT_ID;
				$CITY_ID = $mapping[$mapid]->CITY_ID;
				$LOCATION_ID = $mapping[$mapid]->LOCATION_ID;				
			} else {
				$CITY_ID = 'UNALLOC';
				$LOCATION_ID = 'UNALLOC';
			}

			$UNITGROUP_ID = getUnitGroup($UNIT_ID);

			$stmt_insert->execute([
				':YE' => $dt->format('Y'),
				':MO' => $dt->format('m'),
				':DT' => $dt->format('Y-m-d'),
				':CITY_ID' => $CITY_ID, 
				':LOCATION_ID' => $LOCATION_ID, 
				':SITE_ID' => $SITE_ID, 
				':UNIT_ID' => $UNIT_ID,
				':UNITGROUP_ID' => $UNITGROUP_ID,
				':REGION_ID' => $REGION_ID ,
				':BRANCH_ID' => $BRANCH_ID,
				':ITEMCLASS_ID' => '#UNMAPPED',
				':HEINVCTG_CLASS' => '#UNMAPPED',
				':TARGET_NETT' => $row['TARGET_NETT'], 
				':TARGET_NETT_FP' => $row['TARGET_NETT_FP'], 
				':TARGET_NETT_MD' => $row['TARGET_NETT_MD'], 
				':TARGET_COGS' => $row['TARGET_COGS']
			]);
			
		}

		debug::log('done.');
	} catch (Exception $ex) {
		throw $ex;
	} 
}


function getSqlTargetInsert($prefix) {
	$FNETT		= $prefix . "TARGET_NETT";
	$FNETTFP	= $prefix . "TARGET_NETT_FP";
	$FNETTMD	= $prefix . "TARGET_NETT_MD";
	$FCOGS		= $prefix . "TARGET_COGS";

	$tablename = GTT_DAILYSALES;
	return "
		UPDATE OR INSERT INTO $tablename
		(BL,     YE,  MO,  DT,  CITY_ID,  LOCATION_ID,  SITE_ID,  UNIT_ID,  UNITGROUP_ID,  REGION_ID,  BRANCH_ID,  ITEMCLASS_ID,  HEINVCTG_CLASS,  $FNETT, $FNETTFP, $FNETTMD, $FCOGS)
		VALUES
		('TAR', :YE, :MO, :DT, :CITY_ID, :LOCATION_ID, :SITE_ID, :UNIT_ID, :UNITGROUP_ID, :REGION_ID, :BRANCH_ID, :ITEMCLASS_ID, :HEINVCTG_CLASS,  :TARGET_NETT, :TARGET_NETT_FP, :TARGET_NETT_MD, :TARGET_COGS)
		MATCHING
		(BL, DT, REGION_ID, BRANCH_ID, HEINVCTG_CLASS)	
	
	";
}


function getSqlTargetMonthly($date) {
	$month = (int)date('m', strtotime($date));
	$year = (int)date('Y', strtotime($date));
	return "
		select 
			SITE_ID,
			UNIT_ID,
			SUM(SLTRGSITE_GROSS) AS TARGET_GROSS,
			SUM(SLTRGSITE_NETT) AS TARGET_NETT,
			SUM(SLTRGSITE_NETT_FP) AS TARGET_NETT_FP,
			SUM(SLTRGSITE_NETT_MD) AS TARGET_NETT_MD,
			SUM(SLTRGSITE_COGS) AS TARGET_COGS
		from MST_SLTRGSITE
		WHERE
			SLTRG_YEAR=$year and SLTRG_MONTH=$month
			and SLTRGSITE_NETT<>0
		group by
		SITE_ID, UNIT_ID
	";
}


function getSqlTargetYearly($date) {
	$year = (int)date('Y', strtotime($date));
	return "
		select 
			SITE_ID,
			UNIT_ID,
			SUM(SLTRGSITE_GROSS) AS TARGET_GROSS,
			SUM(SLTRGSITE_NETT) AS TARGET_NETT,
			SUM(SLTRGSITE_NETT_FP) AS TARGET_NETT_FP,
			SUM(SLTRGSITE_NETT_MD) AS TARGET_NETT_MD,
			SUM(SLTRGSITE_COGS) AS TARGET_COGS
		from MST_SLTRGSITE
		WHERE
			SLTRG_YEAR=$year 
			and SLTRGSITE_NETT<>0
		group by
		SITE_ID, UNIT_ID	
	";
}