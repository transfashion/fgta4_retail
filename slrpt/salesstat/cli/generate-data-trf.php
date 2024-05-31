<?php


function salesstat_generatedata_traffic($self, $dateparam, $mapping) {
	try {

		// hapus dulu data sebelumnya yang tanggal $dateparam->current_date_end
		debug::log("Hapus traffic GTT_DAILYSALES tanggal  $dateparam->current_date_end... ", ['nonewline'=>true]);
		ClearTemporaryTrafficData($self, $dateparam);
		debug::log('done.');

		$gendatalist = [
			["descr"=>"Current Daily", "field" => "D_CURR_TRF", "dtstart" => $dateparam->current_date_end, "dtend" => $dateparam->current_date_end],
			["descr"=>"Current Weekly", "field" => "W_CURR_TRF", "dtstart" => $dateparam->current_week_date_start, "dtend" => $dateparam->current_date_end],
			["descr"=>"Current Monthly", "field" => "M_CURR_TRF", "dtstart" => $dateparam->current_month_date_start, "dtend" => $dateparam->current_date_end],
			["descr"=>"Current Year", "field" => "Y_CURR_TRF", "dtstart" => $dateparam->current_year_date_start, "dtend" => $dateparam->current_date_end],
			["descr"=>"Lastyear Daily", "field" => "D_PREV_TRF", "dtstart" => $dateparam->lastyear_date_end, "dtend" => $dateparam->lastyear_date_end],
			["descr"=>"Lastyear Weekly", "field" => "W_PREV_TRF", "dtstart" => $dateparam->lastyear_week_date_start, "dtend" => $dateparam->lastyear_date_end],
			["descr"=>"Lastyear Monthly", "field" => "M_PREV_TRF", "dtstart" => $dateparam->lastyear_month_date_start, "dtend" => $dateparam->lastyear_date_end],
			["descr"=>"Lastyear Dailyt", "field" => "Y_PREV_TRF", "dtstart" => $dateparam->lastyear_year_date_start, "dtend" => $dateparam->lastyear_date_end]
		];

		foreach ($gendatalist as $gendata) {
			salesstat_generatedata_traffic_date($self, $dateparam, $mapping, $gendata);
		}

	} catch (Exception $ex) {
		throw $ex;
	}		
}		


function ClearTemporaryTrafficData($self, $dateparam) {
	try {
		$tablename = GTT_DAILYSALES;
		$sql = "DELETE FROM $tablename WHERE DT = :DT AND BL='TRF'";
		$stmt = $self->db->prepare($sql);
		$stmt->execute([':DT' => $dateparam->current_date_end ]);
	} catch (Exception $ex) {
		throw $ex;
	}		
}

function salesstat_generatedata_traffic_date($self, $dateparam, $mapping, $gendata) {
	$dtstart = $gendata['dtstart'];
	$dtend = $gendata['dtend'];
	debug::log("Get traffic dari TB tanggal $dtstart s/d $dtend ... ", ['nonewline'=>true]);
	try {

		$sql_insert = getSqlTrafficInsert($gendata["field"]);
		$stmt_insert = $self->db->prepare($sql_insert);

		$sql = getSqlTraffic();
		$stmt = $self->db_frm2->prepare($sql);
		$stmt->execute([
			":dtstart" => $dtstart,
			":dtend" => $dtend,
		]);

		$dt = new DateTime(date("Y-m-d", strtotime($dateparam->current_date_end)));
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		foreach ($rows as $row) {

			$mapid = $row['region_id'] . ":" . $row['branch_id'];
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
				':REGION_ID' => $row['region_id'],
				':BRANCH_ID' => $row['branch_id'],
				':ITEMCLASS_ID' => '#UNMAPPED',
				':HEINVCTG_CLASS' => '#UNMAPPED',
				':TRFCOUNT' => $row['TRFCOUNT']
			]);

		}

		debug::log('done.');
	} catch (Exception $ex) {
		throw $ex;
	} 
}


function getSqlTrafficInsert($fields) {
	$tablename = GTT_DAILYSALES;
	return "
		UPDATE OR INSERT INTO $tablename
		(BL,     YE,  MO,  DT,  CITY_ID,  LOCATION_ID,  SITE_ID,  UNIT_ID,  UNITGROUP_ID,  REGION_ID,  BRANCH_ID,  ITEMCLASS_ID,  HEINVCTG_CLASS,  $fields)
		VALUES
		('TRF', :YE, :MO, :DT, :CITY_ID, :LOCATION_ID, :SITE_ID, :UNIT_ID, :UNITGROUP_ID, :REGION_ID, :BRANCH_ID, :ITEMCLASS_ID, :HEINVCTG_CLASS, :TRFCOUNT)
		MATCHING
		(BL, DT, REGION_ID, BRANCH_ID, HEINVCTG_CLASS)
	";
}


function getSqlTraffic() {
	return "
		select
		A.region_id, A.branch_id,
		C.region_name, D.branch_name,
		sum(B.custtrafficdetil_W) as TRFCOUNT
		from transaksi_custtraffic A inner join transaksi_custtrafficdetil B on A.custtraffic_id=B.custtraffic_id
									inner join master_region C on C.region_id=A.region_id
									inner join master_branch D on D.branch_id=A.branch_id
		where
			CONVERT(varchar(10), A.custtraffic_date, 120) >= :dtstart
		and CONVERT(varchar(10), A.custtraffic_date, 120) <= :dtend
		group by
		A.region_id, A.branch_id,C.region_name, D.branch_name	
	";
}

