<?php

use PhpOffice\PhpSpreadsheet\Style\Fill;



function salesstat_generatesheet_bysite($self, $reportdate, $sheet, $rows) {
	$sheet->setCellValue('A3', $reportdate->format('Y-m-d'));


	$TOTAL = [];
	$i = 9;
	foreach ($rows as $row) {
		// print_r($row);
		BySite_PrintRow($self, $sheet, $i, $row);
		SumRow($TOTAL, $row);
		$i++;
	}

	// Print Total
	$TOTAL['SITE_ID'] = '';
	$TOTAL['LOCATION_ID'] = '';
	$TOTAL['CITY_ID'] = "TOTAL";
	BySite_PrintRow($self, $sheet, $i, $TOTAL, ['row'=>'total']);	

}


function BySite_PrintRow($self, $sheet, $i, $row, $options=[]) {
	$fields = getFieldSite();
	$CITY_ID = $row['CITY_ID'];
	$LOCATION_ID = $row['LOCATION_ID'];
	$SITE_ID = $row['SITE_ID'];

	$sheet->setCellValue('A'.$i, $CITY_ID);
	$sheet->setCellValue('B'.$i, $LOCATION_ID);	
	$sheet->setCellValue('C'.$i, $SITE_ID);	

	if (array_key_exists('row', $options)) {
		$rowtype = $options['row'];
		if ($rowtype=='total' || $rowtype=='subtotal') {
			$sheet->getStyle("A$i:D$i")->applyFromArray([
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


function getFieldSite() {
	return [
		'D_NETT' => 'E', 
		'D_NETTSHARE' => 'F', 
		'D_COGS' => 'G', 
		'D_QTY' => 'H', 
		'D_BILL' => 'I', 
		'D_AVGBILL' => 'J', 
		'D_GP' => 'K', 
		'D_OSQTY' => 'L', 
		'D_OSNETT' => 'M', 
		'D_OSGP' => 'N', 
		'D_TRF' => 'O', 
		'D_NEWCUST' => 'P', 
		'W_NETT' => 'R', 
		'W_NETTSHARE' => 'S', 
		'W_COGS' => 'T', 
		'W_QTY' => 'U', 
		'W_BILL' => 'V', 
		'W_AVGBILL' => 'W', 
		'W_GP' => 'X', 
		'W_DGP' => 'Y', 
		'W_LYQTY' => 'Z', 
		'W_LYNETT' => 'AA', 
		'W_LYGP' => 'AB', 
		'W_OSQTY' => 'AC', 
		'W_OSNETT' => 'AD', 
		'W_OSGP' => 'AE', 
		'W_TRF' => 'AF', 
		'W_NEWCUST' => 'AG', 
		'M_NETT' => 'AI', 
		'M_NETTSHARE' => 'AJ', 
		'M_COGS' => 'AK', 
		'M_QTY' => 'AL', 
		'M_BILL' => 'AM', 
		'M_AVGBILL' => 'AN', 
		'M_GP' => 'AO', 
		'M_PGP' => 'AP', 
		'M_DGP' => 'AQ', 
		'M_LYQTY' => 'AR', 
		'M_LYNETT' => 'AS', 
		'M_LYGP' => 'AT', 
		'M_TNETT' => 'AU', 
		'M_TGP' => 'AV', 
		'M_ANETT' => 'AW', 
		'M_AGP' => 'AX', 
		'M_OSQTY' => 'AY', 
		'M_OSNETT' => 'AZ', 
		'M_OSGP' => 'BA', 
		'M_TRF' => 'BB', 
		'M_NEWCUST' => 'BC', 
		'Y_NETT' => 'BE', 
		'Y_NETTSHARE' => 'BF', 
		'Y_COGS' => 'BG', 
		'Y_QTY' => 'BH', 
		'Y_BILL' => 'BI', 
		'Y_AVGBILL' => 'BJ', 
		'Y_GP' => 'BK', 
		'Y_PGP' => 'BL', 
		'Y_DGP' => 'BM', 
		'Y_LYQTY' => 'BN', 
		'Y_LYNETT' => 'BO', 
		'Y_LYGP' => 'BP', 
		'Y_TNETT' => 'BQ', 
		'Y_TGP' => 'BR', 
		'Y_ANETT' => 'BS', 
		'Y_AGP' => 'BT', 
		'Y_OSQTY' => 'BU', 
		'Y_OSNETT' => 'BV', 
		'Y_OSGP' => 'BW', 
		'Y_TRF' => 'BX', 
		'Y_NEWCUST' => 'BY', 
		'S_WNETT' => 'CA', 
		'S_WLY' => 'CB', 
		'S_MNETT' => 'CC', 
		'S_MLY' => 'CD', 
		'S_YNETT' => 'CE', 
		'S_YLY' => 'CF', 
		'I_QTY' => 'CH', 
		'I_VAL' => 'CI', 
		'I_OQTY' => 'CJ', 
		'I_OVAL' => 'CK' 
	];
}
