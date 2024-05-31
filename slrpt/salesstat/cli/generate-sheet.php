<?php

use PhpOffice\PhpSpreadsheet\Style\Fill;


function mio($value) {
	// $number = 0;
	$vv = $value/1000000;
	$number = round($vv, 2);
	return $number;
	// return $value;
}

function percent($value) {
	$number = 100 * round($value, 2);
	return $number;
}



function FormatColumnGroup($self, $sheet, $i, $row, $fields, $prefix, $options) {
	// data
	$prev_qty = $row[$prefix . 'PREV_QTY'];
	$prev_nett = $row[$prefix . 'PREV_NETT'];
	$prev_gp = $row[$prefix . 'PREV_GP'];
	$prev_gppercent = $prev_nett==0 ? 0 : $prev_gp/$prev_nett;


	$curr_qty = $row[$prefix . 'CURR_QTY'];
	$curr_nett = $row[$prefix . 'CURR_NETT'];
	$curr_nett_total = $row[$prefix . 'CURR_NETT_ALL'];
	$curr_nett_share = $curr_nett_total==0 ? 0 : $curr_nett / $curr_nett_total;
	$curr_nett_fp = $row[$prefix . 'CURR_NETT_FP'];
	$curr_nett_md = $row[$prefix . 'CURR_NETT_MD'];
	$curr_cogs = $row[$prefix . 'CURR_COGS'];
	$curr_qty = $row[$prefix . 'CURR_QTY'];
	$curr_bill = $row[$prefix . 'CURR_TX'];
	$curr_billavg = $curr_bill==0 ? 0 : $curr_nett/$curr_bill;
	$curr_gp = $row[$prefix . 'CURR_GP'];
	$curr_gppercent = $curr_nett==0 ? 0 : $curr_gp/$curr_nett; 	
	$curr_deltagp = round((100 * ($curr_gppercent - $prev_gppercent)), 2);
	$curr_qtyvsly = $prev_qty==0 ? ($curr_qty==0?0:1) : (($curr_qty-$prev_qty)/$prev_qty); 
	$curr_nettvsly = $prev_nett==0 ? ($curr_nett==0?0:1) : (($curr_nett-$prev_nett)/$prev_nett); 
	$curr_gpvsly = $prev_gp==0 ? ($curr_gp==0?0:1) : (($curr_gp-$prev_gp)/$prev_gp); 


	$curr_old_qty = $row[$prefix . 'CURR_OLD_QTY'];
	$curr_old_nett = $row[$prefix . 'CURR_OLD_NETT'];
	$curr_old_gp = $row[$prefix . 'CURR_OLD_GP'];

	$curr_old_qtypercent = $curr_qty==0 ? 0 : $curr_old_qty/$curr_qty; 	
	$curr_old_nettpercent = $curr_nett==0 ? 0 : $curr_old_nett/$curr_nett; 	
	$curr_old_gppercent = $curr_gp==0 ? 0 : $curr_old_gp/$curr_gp; 	


	SetValueMio($sheet, $fields, $i, $prefix.'NETT', $curr_nett, $options);
	SetValuePercent($sheet, $fields, $i, $prefix.'NETTSHARE', $curr_nett_share, $options);
	SetValueMio($sheet, $fields, $i, $prefix.'COGS', $curr_cogs, $options);
	SetValue($sheet, $fields, $i, $prefix.'QTY', $curr_qty, $options);
	SetValue($sheet, $fields, $i, $prefix.'BILL', $curr_bill, $options);
	SetValueMio($sheet, $fields, $i, $prefix.'AVGBILL', $curr_billavg, $options);
	SetValueMio($sheet, $fields, $i, $prefix.'GP', $curr_gp, $options);
	SetValuePercent($sheet, $fields, $i, $prefix.'PGP', $curr_gppercent, $options);
	SetValue($sheet, $fields, $i, $prefix.'DGP', $curr_deltagp, $options);
	SetValuePercent($sheet, $fields, $i, $prefix.'LYQTY', $curr_qtyvsly, $options);
	SetValuePercent($sheet, $fields, $i, $prefix.'LYNETT', $curr_nettvsly, $options);
	SetValuePercent($sheet, $fields, $i, $prefix.'LYGP', $curr_gpvsly, $options);


	SetValuePercent($sheet, $fields, $i, $prefix.'OSQTY', $curr_old_qtypercent, $options);
	SetValuePercent($sheet, $fields, $i, $prefix.'OSNETT', $curr_old_nettpercent, $options);
	SetValuePercent($sheet, $fields, $i, $prefix.'OSGP', $curr_old_gppercent, $options);


	//sementara nol
	SetValue($sheet, $fields, $i, $prefix.'TRF', 0, $options);
	SetValue($sheet, $fields, $i, $prefix.'NEWCUST', 0, $options);

	SetValue($sheet, $fields, $i, $prefix.'TNETT', 0, $options);
	SetValue($sheet, $fields, $i, $prefix.'TGP', 0, $options);
	SetValue($sheet, $fields, $i, $prefix.'ANETT', 0, $options);
	SetValue($sheet, $fields, $i, $prefix.'AGP', 0, $options);

}


function FormatColumnPeriodeToDate($self, $sheet, $i, $row, $fields, $options) {
	$w_prev_nett = $row['W_PREV_NETT'];
	$m_prev_nett = $row['M_PREV_NETT'];
	$y_prev_nett = $row['Y_PREV_NETT'];

	$w_curr_nett = $row['W_CURR_NETT'];
	$m_curr_nett = $row['M_CURR_NETT'];
	$y_curr_nett = $row['Y_CURR_NETT'];

	$w_nettvsly = $w_prev_nett==0 ? ($w_curr_nett==0?0:1) : (($w_curr_nett-$w_prev_nett)/$w_prev_nett); 
	$m_nettvsly = $m_prev_nett==0 ? ($m_curr_nett==0?0:1) : (($m_curr_nett-$m_prev_nett)/$m_prev_nett); 
	$y_nettvsly = $y_prev_nett==0 ? ($y_curr_nett==0?0:1) : (($y_curr_nett-$y_prev_nett)/$y_prev_nett); 
	
	
	SetValueMio($sheet, $fields, $i, "S_WNETT", $w_curr_nett, $options);
	SetValuePercent($sheet, $fields, $i, "S_WLY", $w_nettvsly, $options);
	SetValueMio($sheet, $fields, $i, "S_MNETT", $m_curr_nett, $options);
	SetValuePercent($sheet, $fields, $i, "S_MLY", $m_nettvsly, $options);
	SetValueMio($sheet, $fields, $i, "S_YNETT", $y_curr_nett, $options);
	SetValuePercent($sheet, $fields, $i, "S_YLY", $y_nettvsly, $options);

}

function FormatColumnInventory($self, $sheet, $i, $row, $fields, $options) {
	$inv_qty = $row['INV_QTY'];
	$inv_val = $row['INV_VAL'];
	$inv_old_qty = $row['INV_OLD_QTY'];
	$inv_old_val = $row['INV_OLD_VAL'];

	$inv_old_qty_p = $inv_qty==0 ? 0 : $inv_old_qty/$inv_qty;
	$inv_old_val_p = $inv_val==0 ? 0 : $inv_old_val/$inv_val;

	SetValue($sheet, $fields, $i, "I_QTY", $inv_qty, $options);
	SetValueMio($sheet, $fields, $i, "I_VAL", $inv_val, $options);
	SetValuePercent($sheet, $fields, $i, "I_OQTY", $inv_old_qty_p, $options);
	SetValuePercent($sheet, $fields, $i, "I_OVAL", $inv_old_val_p, $options);

}


function FormatColumnTarget($self, $sheet, $i, $row, $fields, $prefix, $options) {
	$curr_nett = $row[$prefix . 'CURR_NETT'];
	$curr_gp = $row[$prefix . 'CURR_GP'];

	$target_nett =  $row[$prefix . 'CURR_TARGET_NETT'];
	$target_cogs =  $row[$prefix . 'CURR_TARGET_COGS'];
	if ($target_cogs==0) {
		$target_gp = 0;
	} else {
		$target_gp = ($target_nett/1.1) - $target_cogs;
	}
	

	$acv_nett_percent = $target_nett==0 ? 0 : $curr_nett/$target_nett; 	
	$acv_gp_percent = $target_gp==0 ? 0 : $curr_gp/$target_gp; 	

	// echo $target_nett."\r\n";

	SetValueMio($sheet, $fields, $i, $prefix . "TNETT", $target_nett, $options);
	SetValueMio($sheet, $fields, $i, $prefix . "TGP", $target_gp, $options);
	SetValuePercent($sheet, $fields, $i, $prefix .  "ANETT", $acv_nett_percent, $options);
	SetValuePercent($sheet, $fields, $i, $prefix .  "AGP", $acv_gp_percent, $options);

}



function SetValue($sheet, $fields, $i, $xls_col_name, $value, $options) {
	// echo "cek $xls_col_name ... ";	
	if (array_key_exists($xls_col_name, $fields)) {
		$realcolname = $fields[$xls_col_name]  . $i;
		// echo "$realcolname.\r\n";
		$sheet->setCellValue($realcolname, $value);	
		if (array_key_exists('row', $options)) {
			$rowtype = $options['row'];
			if ($rowtype=='total' || $rowtype=='subtotal') {
				$sheet->getStyle($realcolname)->getFont()->setBold(true);
				$sheet->getStyle($realcolname)->applyFromArray(array(
					'fill' => [
						'fillType' => Fill::FILL_SOLID,
						'color' => ['argb' => 'FFFFFF00'],
					]
				));

			}
		}		
	} else {
		// echo "\r\n";
	}
}


function SetValueMio($sheet, $fields, $i, $xls_col_name, $value, $options=[]) {
	// echo "cek $xls_col_name ... ";	
	if (array_key_exists($xls_col_name, $fields)) {
		$realcolname = $fields[$xls_col_name]  . $i;
		// echo "$realcolname.\r\n";
		$sheet->setCellValue($realcolname, mio($value));	
		if (array_key_exists('row', $options)) {
			$rowtype = $options['row'];
			if ($rowtype=='total' || $rowtype=='subtotal') {
				$sheet->getStyle($realcolname)->getFont()->setBold(true);
				$sheet->getStyle($realcolname)->applyFromArray(array(
					'fill' => [
						'fillType' => Fill::FILL_SOLID,
						'color' => ['argb' => 'FFFFFF00'],
					]
				));

			}
		}
	} else {
		// echo "\r\n";
	}
}

function SetValuePercent($sheet, $fields, $i, $xls_col_name, $value, $options=[]) {
	// echo "cek $xls_col_name ... ";	
	if (array_key_exists($xls_col_name, $fields)) {
		$realcolname = $fields[$xls_col_name]  . $i;
		// echo "$realcolname.\r\n";
		$sheet->setCellValue($realcolname, percent($value));	
		if (array_key_exists('row', $options)) {
			$rowtype = $options['row'];
			if ($rowtype=='total' || $rowtype=='subtotal') {
				$sheet->getStyle($realcolname)->getFont()->setBold(true);
				$sheet->getStyle($realcolname)->applyFromArray(array(
					'fill' => array(
						'fillType' => Fill::FILL_SOLID,
						'color' => ['argb' => 'FFFFFF00'],
					)
				));

			}
		}

	} else {
		// echo "\r\n";
	}
}


function SumRow(&$SUM, $row) {
	foreach ($row as $key => $value) {
		if (is_numeric($value)) {
			if (!array_key_exists($key, $SUM)) {
				$SUM[$key] = (float)0;
			}
			$SUM[$key] += (float)$value;
		}
	}
}

function ResetSum($SUM) {
	foreach ($SUM as $key => $value) {
		if (is_numeric($value)) {
			$SUM[$key] = 0;
		}
	}
}