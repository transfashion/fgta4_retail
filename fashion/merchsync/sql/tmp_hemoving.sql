create table tmp_hemoving (
	hemoving_id varchar(30),
	hemoving_source varchar(30),
	hemoving_date date,
	hemoving_date_fr date,
	hemoving_date_to date,
	hemoving_sn varchar(30),
	hemoving_pol varchar(30),
	hemoving_etd date,
	hemoving_eta date,
	hemoving_logisticcosttmp varchar(30),
	hemoving_islogisticpost tinyint,
	hemoving_isprop tinyint,
	hemoving_isproplock tinyint,
	hemoving_issend tinyint,
	hemoving_isrecv tinyint,
	hemoving_ispost tinyint,
	hemoving_isdisabled tinyint,
	hemoving_descr varchar(255),
	hemoving_createby varchar(30),
	hemoving_createdate datetime,
	hemoving_modifyby varchar(30),
	hemoving_modifydate datetime,
	hemoving_propby varchar(30),
	hemoving_propdate datetime,
	hemoving_proplockby varchar(30),
	hemoving_sendby varchar(30),
	hemoving_senddate datetime,
	hemoving_recvby varchar(30),
	hemoving_recvdate datetime,
	hemoving_logisticpostby varchar(30),
	hemoving_logisticpostdate datetime,
	hemoving_postby varchar(30),
	hemoving_postdate datetime,
	hemovingtype_id varchar(50),
	region_id varchar(5),
	region_id_out varchar(5),
	branch_id_fr varchar(7),
	branch_id_to varchar(7),
	convert_fr varchar(10),
	convert_to varchar(10),
	rekanan_id varchar(7),
	currency_id varchar(15),
	currency_rate decimal(18,2),
	invoice_id varchar(30),
	disc_rate decimal(18,0),
	season_id varchar(50),
	ref_id varchar(50),
	channel_id varchar(50),
	rowid varchar(50),
	primary key(hemoving_id)
) ENGINE=MyISAM COMMENT='Table Temporary Hemoving untuk diproses lebih lanjut';