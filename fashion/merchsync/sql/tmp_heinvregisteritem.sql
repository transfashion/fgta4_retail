create table tmp_heinvregisteritem (
	heinvregister_id varchar(30),
	heinvregisteritem_line int,
	heinv_id varchar(13),
	heinv_art varchar(30),
	heinv_mat varchar(30),
	heinv_col varchar(30),
	heinv_size varchar(30),
	heinv_barcode varchar(30),
	heinv_name varchar(40),
	heinv_descr varchar(50),
	heinv_box varchar(50),
	heinv_gtype varchar(50),
	heinv_produk varchar(50),
	heinv_bahan varchar(70),
	heinv_pemeliharaan varchar(100),
	heinv_logo varchar(30),
	heinv_dibuatdi varchar(30),
	heinv_other1 varchar(50),
	heinv_other2 varchar(50),
	heinv_other3 varchar(50),
	heinv_other4 varchar(50),
	heinv_other5 varchar(50),
	heinv_other6 varchar(50),
	heinv_other7 varchar(50),
	heinv_other8 varchar(50),
	heinv_other9 varchar(50),
	heinv_plbname varchar(100),
	heinvitem_colnum varchar(5),
	heinvgro_id varchar(30),
	heinvctg_id varchar(30),
	heinvctg_sizetag varchar(50),
	branch_id varchar(30),
	C00 int,
	heinv_isweb tinyint,
	heinv_webdescr varchar(2500),
	invcls_id Varchar(10),
	heinv_hscode_ship bigint,
	heinv_hscode_ina bigint,
	heinv_weight decimal(5,2),
	heinv_length decimal(5,2),
	heinv_width decimal(5,2),
	heinv_height decimal(5,2),
	heinv_price decimal(18,2),
	primary key(heinvregister_id, heinvregisteritem_line)
) ENGINE=MyISAM COMMENT='Table Temporary Register Item Detil untuk diproses lebih lanjut';

