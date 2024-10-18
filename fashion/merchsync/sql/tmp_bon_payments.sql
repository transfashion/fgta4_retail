create table tmp_bonpayment (
	bon_id varchar(40),
	payment_line int,
	payment_cardnumber varchar(40),
	payment_cardholder varchar(40),
	payment_mvalue decimal(18,0),
	payment_mcash decimal(18,0),
	payment_installment int,
	pospayment_id varchar(10),
	pospayment_name varchar(30),
	pospayment_bank varchar(30),
	posedc_id varchar(10),
	posedc_name varchar(30),
	posedc_approval varchar(30),
	bon_idext varchar(6),
	rowid varchar(50),
	primary key(bon_id, payment_line)
) ENGINE=MyISAM COMMENT='Table Temporary Bon Payment untuk diproses lebih lanjut';