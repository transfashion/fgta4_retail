<?php

use PhpOffice\PhpSpreadsheet\Style\Fill;



function salesstat_generatesheet_byunit($self, $reportdate, $sheet, $rows) {
	$sheet->setCellValue('A3', $reportdate->format('Y-m-d'));

	$TOTAL = [];
	$i = 9;
	$LAST_UNITGROUP_ID = "xxx";
	$SUBTOTAL = [];
	foreach ($rows as $row) {
		$UNITGROUP_ID = $row['UNITGROUP_ID'] == "" ? "CLOSED BRAND" : $row['UNITGROUP_ID'];
		if (!array_key_exists($UNITGROUP_ID, $SUBTOTAL)) {
			$SUBTOTAL[$UNITGROUP_ID] = [];
		}


		if ($UNITGROUP_ID != $LAST_UNITGROUP_ID) {
			if ($LAST_UNITGROUP_ID!='xxx') {
				$SUBTOTAL[$LAST_UNITGROUP_ID]['UNIT_ID'] = '';
				$SUBTOTAL[$LAST_UNITGROUP_ID]['UNITGROUP_ID'] = "TOTAL $LAST_UNITGROUP_ID";
				ByUnit_PrintRow($self, $sheet, $i, $SUBTOTAL[$LAST_UNITGROUP_ID], ['row'=>'subtotal']);
				$i++;
				$i++;
			}
		}



		ByUnit_PrintRow($self, $sheet, $i, $row);
		SumRow($TOTAL, $row);
		SumRow($SUBTOTAL[$UNITGROUP_ID], $row);


		$LAST_UNITGROUP_ID = $UNITGROUP_ID;
		$i++;
	}

	$SUBTOTAL[$LAST_UNITGROUP_ID]['UNIT_ID'] = '';
	$SUBTOTAL[$LAST_UNITGROUP_ID]['UNITGROUP_ID'] = "TOTAL $LAST_UNITGROUP_ID";
	ByUnit_PrintRow($self, $sheet, $i, $SUBTOTAL[$LAST_UNITGROUP_ID], ['row'=>'subtotal']);
	$i++;
	$i++;	



	// Print Total
	$TOTAL['UNIT_ID'] = '';
	$TOTAL['UNITGROUP_ID'] = "TOTAL";
	ByUnit_PrintRow($self, $sheet, $i, $TOTAL, ['row'=>'total']);	

}



function ByUnit_PrintRow($self, $sheet, $i, $row, $options=[]) {
	$fields = getFieldUnit();
	$UNITGROUP_ID = $row['UNITGROUP_ID'];
	$UNIT_ID = $row['UNIT_ID'];

	// echo "$UNIT_ID";

	$sheet->setCellValue('A'.$i, $UNITGROUP_ID);
	$sheet->setCellValue('B'.$i, $UNIT_ID);

	if (array_key_exists('row', $options)) {
		$rowtype = $options['row'];
		if ($rowtype=='total' || $rowtype=='subtotal') {
			$sheet->getStyle("A$i:B$i")->applyFromArray([
				'font'  => array(
					'bold'  =>  true
				),
				'fill' => [
					'fillType' => Fill::FILL_SOLID,
					'color' => ['argb' => 'FFFFFF00'],
				]		
			]);
		}
	}	


	if ($UNIT_ID=='HBS') {
		// print_r($row);
	}


	FormatColumnGroup($self, $sheet, $i, $row, $fields, "D_", $options);
	FormatColumnGroup($self, $sheet, $i, $row, $fields, "W_", $options);
	FormatColumnGroup($self, $sheet, $i, $row, $fields, "M_", $options);
	FormatColumnGroup($self, $sheet, $i, $row, $fields, "Y_", $options);

	FormatColumnTarget($self, $sheet, $i, $row, $fields, "M_", $options);
	FormatColumnTarget($self, $sheet, $i, $row, $fields, "Y_", $options);


	FormatColumnPeriodeToDate($self, $sheet, $i, $row, $fields, $options);
	FormatColumnInventory($self, $sheet, $i, $row, $fields, $options);

	

	// echo "\r\n";
}





function getFieldUnit() {
	return [
		'D_NETT' => 'C', 
		'D_NETTSHARE' => 'D', 
		'D_COGS' => 'E', 
		'D_QTY' => 'F', 
		'D_BILL' => 'G', 
		'D_AVGBILL' => 'H', 
		'D_PGP' => 'I', 
		'D_OSQTY' => 'J', 
		'D_OSNETT' => 'K', 
		'D_OSGP' => 'L', 
		'D_TRF' => 'M', 
		'D_NEWCUST' => 'N', 
		'W_NETT' => 'P', 
		'W_NETTSHARE' => 'Q', 
		'W_COGS' => 'R', 
		'W_QTY' => 'S', 
		'W_BILL' => 'T', 
		'W_AVGBILL' => 'U', 
		'W_PGP' => 'V', 
		'W_DGP' => 'W', 
		'W_LYQTY' => 'X', 
		'W_LYNETT' => 'Y', 
		'W_LYGP' => 'Z', 
		'W_OSQTY' => 'AA', 
		'W_OSNETT' => 'AB', 
		'W_OSGP' => 'AC', 
		'W_TRF' => 'AD', 
		'W_NEWCUST' => 'AE', 
		'M_NETT' => 'AG', 
		'M_NETTSHARE' => 'AH', 
		'M_COGS' => 'AI', 
		'M_QTY' => 'AJ', 
		'M_BILL' => 'AK', 
		'M_AVGBILL' => 'AL', 
		'M_GP' => 'AM', 
		'M_PGP' => 'AN', 
		'M_DGP' => 'AO', 
		'M_LYQTY' => 'AP', 
		'M_LYNETT' => 'AQ', 
		'M_LYGP' => 'AR', 
		'M_TNETT' => 'AS', 
		'M_TGP' => 'AT', 
		'M_ANETT' => 'AU', 
		'M_AGP' => 'AV', 
		'M_OSQTY' => 'AW', 
		'M_OSNETT' => 'AX', 
		'M_OSGP' => 'AY', 
		'M_TRF' => 'AZ', 
		'M_NEWCUST' => 'BA', 
		'Y_NETT' => 'BC', 
		'Y_NETTSHARE' => 'BD', 
		'Y_COGS' => 'BE', 
		'Y_QTY' => 'BF', 
		'Y_BILL' => 'BG', 
		'Y_AVGBILL' => 'BH', 
		'Y_GP' => 'BI', 
		'Y_PGP' => 'BJ', 
		'Y_DGP' => 'BK', 
		'Y_LYQTY' => 'BL', 
		'Y_LYNETT' => 'BM', 
		'Y_LYGP' => 'BN', 
		'Y_TNETT' => 'BO', 
		'Y_TGP' => 'BP', 
		'Y_ANETT' => 'BQ', 
		'Y_AGP' => 'BR', 
		'Y_OSQTY' => 'BS', 
		'Y_OSNETT' => 'BT', 
		'Y_OSGP' => 'BU', 
		'Y_TRF' => 'BV', 
		'Y_NEWCUST' => 'BW', 
		'S_WNETT' => 'BY', 
		'S_WLY' => 'BZ', 
		'S_MNETT' => 'CA', 
		'S_MLY' => 'CB', 
		'S_YNETT' => 'CC', 
		'S_YLY' => 'CD', 
		'I_QTY' => 'CF', 
		'I_VAL' => 'CG', 
		'I_OQTY' => 'CH', 
		'I_OVAL' => 'CI' 
	];
}