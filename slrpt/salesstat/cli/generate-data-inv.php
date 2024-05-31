<?php


function salesstat_generatedata_inv($self, $dateparam, $mapping, $classgroup) {
	try {

		// hapus dulu data sebelumnya yang tanggal $dateparam->current_date_end
		debug::log("Hapus inventori GTT_DAILYINV tanggal  $dateparam->current_date_end... ", ['nonewline'=>true]);
		ClearTemporaryInventoryData($self, $dateparam);
		debug::log('done.');

		// siapkan query buat insert data inventory
		$sql_insert = getSqlInsertInventory();
		$stmt_insert = $self->db->prepare($sql_insert);


		// ambil data inventori dari sql server
		debug::log('Ambil data inventori dari SQL server ... ', ['nonewline'=>true]);
		$dt = new DateTime(date("Y-m-d", strtotime($dateparam->current_date_end)));
		$sql = getSqlCurrentInventory();
		$stmt = $self->db_frm2->prepare($sql);
		$stmt->execute([
			":current_date_end" => $dateparam->current_date_end
		]);
		debug::log('done.');


		debug::log('Masukkan ke GTT_DAILYINV ... ', ['nonewline'=>true]);
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
			
			if (array_key_exists($row['heinvctg_class'], $classgroup)) {
				$ITEMCLASS_ID = $classgroup[$row['heinvctg_class']]->invcls_gro;
			} else {
				$ITEMCLASS_ID = "#UNMAPPED";
			}

			if ($row['heinvctg_class']=='' || $row['heinvctg_class']==null) {
				$row['heinvctg_class'] = "#UNMAPPED";
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
				':ITEMCLASS_ID' => $ITEMCLASS_ID,
				':HEINVCTG_CLASS' => $row['heinvctg_class'],
				':INV_QTY' => $row['QTY'],
				':INV_VAL' => $row['VAL'],
				':INV_OLD_QTY' => $row['OLD_QTY'],
				':INV_OLD_VAL' => $row['OLD_VAL']
			]);

		}
		debug::log('done.');

	} catch (Exception $ex) {
		throw $ex;
	}		
}


function ClearTemporaryInventoryData($self, $dateparam) {
	try {
		$tablename = GTT_DAILYSALES;
		$sql = "DELETE FROM $tablename WHERE DT = :DT AND BL='INV'";
		$stmt = $self->db->prepare($sql);
		$stmt->execute([':DT' => $dateparam->current_date_end ]);
	} catch (Exception $ex) {
		throw $ex;
	}		
}


function getSqlInsertInventory() {
	$tablename = GTT_DAILYSALES;
	return "
		UPDATE OR INSERT INTO $tablename
		(BL,     YE,  MO,  DT,  CITY_ID,  LOCATION_ID,  SITE_ID,  UNIT_ID,  UNITGROUP_ID,  REGION_ID,  BRANCH_ID,  ITEMCLASS_ID,  HEINVCTG_CLASS,  INV_QTY,  INV_VAL,  INV_OLD_QTY,  INV_OLD_VAL)
		VALUES
		('INV', :YE, :MO, :DT, :CITY_ID, :LOCATION_ID, :SITE_ID, :UNIT_ID, :UNITGROUP_ID, :REGION_ID, :BRANCH_ID, :ITEMCLASS_ID, :HEINVCTG_CLASS, :INV_QTY, :INV_VAL, :INV_OLD_QTY, :INV_OLD_VAL)
		MATCHING
		(BL, DT, REGION_ID, BRANCH_ID, HEINVCTG_CLASS)
	";
}


function getSqlCurrentInventory() {
	return "
		select
		AX.region_id,
		AX.branch_id,
		AX.heinvctg_class,
		(select region_name from master_region where region_id=AX.region_id) as region_name,
		(select branch_name from master_branch where branch_id=AX.branch_id) as branch_name,
		SUM(AX.QTY) AS QTY,
		SUM(AX.VALUE) AS VAL,
		SUM(AX.OLD_QTY) AS OLD_QTY,
		SUM(AX.OLD_VALUE) AS OLD_VAL
		from (
			select
			region_id,
			branch_id,
			isnull(heinvctg_class, 'OTHER') as heinvctg_class,
			[END] as QTY,
			[END]*lastcost as VALUE,
			case when age>180 then [END] else 0 end as OLD_QTY,
			case when age>180 then [END]*lastcost else 0 end as OLD_VALUE
			from
			cache_invsum
			where
			BLOCK='STORE'
			--and dt = :current_date_end
		) AX
		group by
		AX.region_id,
		AX.branch_id,
		AX.heinvctg_class	
	";
}