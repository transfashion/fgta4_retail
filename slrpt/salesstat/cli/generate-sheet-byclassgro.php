<?php

use PhpOffice\PhpSpreadsheet\Style\Fill;



function salesstat_generatesheet_byclassgro($self, $reportdate, $sheet, $rows) {
	$sheet->setCellValue('A3', $reportdate->format('Y-m-d'));



	$LAST_UNIT_ID = "xxx";
	$TOTAL = [];
	$SUBTOTAL = [];
	$i = 9;
	foreach ($rows as $row) {
		$UNIT_ID = $row['UNIT_ID'];
		if (!array_key_exists($UNIT_ID, $SUBTOTAL)) {
			$SUBTOTAL[$UNIT_ID] = [];
		}

		if ($UNIT_ID != $LAST_UNIT_ID) {
			if ($LAST_UNIT_ID!='xxx') {

				$SUBTOTAL[$LAST_UNIT_ID]['UNITGROUP_ID'] = "";
				$SUBTOTAL[$LAST_UNIT_ID]['UNIT_ID'] = "TOTAL $LAST_UNIT_ID";
				$SUBTOTAL[$LAST_UNIT_ID]['ITEMCLASS_ID'] = "";
				ByClassgro_PrintRow($self, $sheet, $i, $SUBTOTAL[$LAST_UNIT_ID], ['row'=>'subtotal']);
				$i++;
				$i++;
			}
		}

		// print_r($row);
		ByClassgro_PrintRow($self, $sheet, $i, $row);
		SumRow($TOTAL, $row);
		SumRow($SUBTOTAL[$UNIT_ID], $row);

		$LAST_UNIT_ID = $UNIT_ID;
		$i++;
	}

	$SUBTOTAL[$LAST_UNIT_ID]['UNITGROUP_ID'] = "";
	$SUBTOTAL[$LAST_UNIT_ID]['UNIT_ID'] = "TOTAL $LAST_UNIT_ID";
	$SUBTOTAL[$LAST_UNIT_ID]['ITEMCLASS_ID'] = "";
	ByClassgro_PrintRow($self, $sheet, $i, $SUBTOTAL[$LAST_UNIT_ID], ['row'=>'subtotal']);
	$i++;
	$i++;


	// Print Total
	$TOTAL['UNITGROUP_ID'] = "TOTAL";
	$TOTAL['UNIT_ID'] = '';
	$TOTAL['ITEMCLASS_ID'] = '';
	ByClassgro_PrintRow($self, $sheet, $i, $TOTAL, ['row'=>'total']);	

}



function ByClassgro_PrintRow($self, $sheet, $i, $row, $options=[]) {
	$fields = getFieldClassgro();
	$UNITGROUP_ID = $row['UNITGROUP_ID'];
	$UNIT_ID = $row['UNIT_ID'];
	$ITEMCLASS_ID = $row['ITEMCLASS_ID'];

	$sheet->setCellValue('A'.$i, $UNITGROUP_ID);
	$sheet->setCellValue('B'.$i, $UNIT_ID);	
	$sheet->setCellValue('C'.$i, $ITEMCLASS_ID);	

	if (array_key_exists('row', $options)) {
		$rowtype = $options['row'];
		if ($rowtype=='total' || $rowtype=='subtotal') {
			$sheet->getStyle("A$i:C$i")->applyFromArray([
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



	FormatColumnGroup($self, $sheet, $i, $row, $fields, "D_", $options);
	FormatColumnGroup($self, $sheet, $i, $row, $fields, "W_", $options);
	FormatColumnGroup($self, $sheet, $i, $row, $fields, "M_", $options);
	FormatColumnGroup($self, $sheet, $i, $row, $fields, "Y_", $options);

	FormatColumnTarget($self, $sheet, $i, $row, $fields, "M_", $options);
	FormatColumnTarget($self, $sheet, $i, $row, $fields, "Y_", $options);

	FormatColumnPeriodeToDate($self, $sheet, $i, $row, $fields, $options);
	FormatColumnInventory($self, $sheet, $i, $row, $fields, $options);

}




function getFieldClassgro() {
	return [
		'D_NETT' => 'D', 
		'D_NETTSHARE' => 'E', 
		'D_COGS' => 'F', 
		'D_QTY' => 'G', 
		'D_GP' => 'H', 
		'D_DGP' => 'I', 
		'D_OSQTY' => 'J', 
		'D_OSNETT' => 'K', 
		'D_OSGP' => 'L', 
		'W_NETT' => 'N', 
		'W_NETTSHARE' => 'O', 
		'W_COGS' => 'P', 
		'W_QTY' => 'Q', 
		'W_GP' => 'R', 
		'W_DGP' => 'S', 
		'W_OSQTY' => 'T', 
		'W_OSNETT' => 'U', 
		'W_OSGP' => 'V', 
		'M_NETT' => 'X', 
		'M_NETTSHARE' => 'Y', 
		'M_COGS' => 'Z', 
		'M_QTY' => 'AA', 
		'M_GP' => 'AB', 
		'M_PGP' => 'AC', 
		'M_DGP' => 'AD', 
		'M_TNETT' => 'AE', 
		'M_TGP' => 'AF', 
		'M_ANETT' => 'AG', 
		'M_AGP' => 'AH', 
		'M_OSQTY' => 'AI', 
		'M_OSNETT' => 'AJ', 
		'M_OSGP' => 'AK', 
		'Y_NETT' => 'AM', 
		'Y_NETTSHARE' => 'AN', 
		'Y_COGS' => 'AO', 
		'Y_QTY' => 'AP', 
		'Y_GP' => 'AQ', 
		'Y_PGP' => 'AR', 
		'Y_DGP' => 'AS', 
		'Y_TNETT' => 'AT', 
		'Y_TGP' => 'AU', 
		'Y_ANETT' => 'AV', 
		'Y_AGP' => 'AW', 
		'Y_OSQTY' => 'AX', 
		'Y_OSNETT' => 'AY', 
		'Y_OSGP' => 'AZ', 
		'S_WNETT' => 'BB', 
		'S_WLY' => 'BC', 
		'S_MNETT' => 'BD', 
		'S_MLY' => 'BE', 
		'S_YNETT' => 'BF', 
		'S_YLY' => 'BG', 
		'I_QTY' => 'BI', 
		'I_VAL' => 'BJ', 
		'I_OQTY' => 'BK', 
		'I_OVAL' => 'BL'
	];
}
