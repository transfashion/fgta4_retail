-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `fsn_merchreg`;
-- drop table if exists `fsn_merchregitem`;


CREATE TABLE IF NOT EXISTS `fsn_merchreg` (
	`merchreg_id` varchar(30) NOT NULL , 
	`merchreg_date` date NOT NULL , 
	`merchreg_descr` varchar(255)  , 
	`curr_id` varchar(10)  , 
	`curr_rate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`partner_id` varchar(14)  , 
	`merchsea_id` varchar(10)  , 
	`unit_id` varchar(10)  , 
	`dept_id` varchar(30)  , 
	`merchreg_version` int(4) NOT NULL DEFAULT 0, 
	`merchreg_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchreg_commitby` varchar(14)  , 
	`merchreg_commitdate` datetime  , 
	`merchreg_isgenerate` tinyint(1) NOT NULL DEFAULT 0, 
	`merchreg_generateby` varchar(14)  , 
	`merchreg_generatedate` datetime  , 
	`interface_id` varchar(7)  , 
	`merchreg_isinsynprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchreg_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Register';


ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_date` date NOT NULL  AFTER `merchreg_id`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_descr` varchar(255)   AFTER `merchreg_date`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10)   AFTER `merchreg_descr`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(14)   AFTER `curr_rate`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `partner_id`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `merchsea_id`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_version` int(4) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchreg_version`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_commitby` varchar(14)   AFTER `merchreg_iscommit`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_commitdate` datetime   AFTER `merchreg_commitby`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_isgenerate` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchreg_commitdate`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_generateby` varchar(14)   AFTER `merchreg_isgenerate`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_generatedate` datetime   AFTER `merchreg_generateby`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `interface_id` varchar(7)   AFTER `merchreg_generatedate`;
ALTER TABLE `fsn_merchreg` ADD COLUMN IF NOT EXISTS  `merchreg_isinsynprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `interface_id`;


ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_date` date NOT NULL   AFTER `merchreg_id`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_descr` varchar(255)    AFTER `merchreg_date`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10)    AFTER `merchreg_descr`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `partner_id` varchar(14)    AFTER `curr_rate`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)    AFTER `partner_id`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)    AFTER `merchsea_id`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_version` int(4) NOT NULL DEFAULT 0  AFTER `dept_id`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchreg_version`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_commitby` varchar(14)    AFTER `merchreg_iscommit`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_commitdate` datetime    AFTER `merchreg_commitby`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_isgenerate` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchreg_commitdate`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_generateby` varchar(14)    AFTER `merchreg_isgenerate`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_generatedate` datetime    AFTER `merchreg_generateby`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `interface_id` varchar(7)    AFTER `merchreg_generatedate`;
ALTER TABLE `fsn_merchreg` MODIFY COLUMN IF EXISTS  `merchreg_isinsynprogress` tinyint(1) NOT NULL DEFAULT 0  AFTER `interface_id`;



ALTER TABLE `fsn_merchreg` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `fsn_merchreg` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `fsn_merchreg` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `fsn_merchreg` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `fsn_merchreg` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `fsn_merchreg` ADD KEY IF NOT EXISTS  `interface_id` (`interface_id`);

ALTER TABLE `fsn_merchreg` ADD CONSTRAINT `fk_fsn_merchreg_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `fsn_merchreg` ADD CONSTRAINT `fk_fsn_merchreg_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `fsn_merchreg` ADD CONSTRAINT `fk_fsn_merchreg_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `fsn_merchreg` ADD CONSTRAINT `fk_fsn_merchreg_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `fsn_merchreg` ADD CONSTRAINT `fk_fsn_merchreg_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `fsn_merchreg` ADD CONSTRAINT `fk_fsn_merchreg_mst_interface` FOREIGN KEY IF NOT EXISTS (`interface_id`) REFERENCES `mst_interface` (`interface_id`);





CREATE TABLE IF NOT EXISTS `fsn_merchregitem` (
	`merchregitem_id` varchar(32) NOT NULL , 
	`merchitem_refitem` varchar(30)  , 
	`merchitem_barcode` varchar(30)  , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`merchitem_size` varchar(10)  , 
	`merchitem_combo` varchar(103)  , 
	`merchitem_name` varchar(255)  , 
	`merchitem_descr` varchar(2500)  , 
	`merchitem_colnum` varchar(3)  , 
	`merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`merchitem_pcpline` varchar(90)  , 
	`merchitem_pcpgroup` varchar(90)  , 
	`merchitem_pcpcategory` varchar(90)  , 
	`merchitem_colorcode` varchar(30)  , 
	`merchitem_colordescr` varchar(30)  , 
	`merchitem_gender` varchar(1)  , 
	`merchitem_fit` varchar(10)  , 
	`merchitem_hscodeship` varchar(30)  , 
	`merchitem_hscodeina` varchar(30)  , 
	`merchitem_gtype` varchar(5)  , 
	`merchitem_labelname` varchar(90)  , 
	`merchitem_labelproduct` varchar(90)  , 
	`merchitem_bahan` varchar(150)  , 
	`merchitem_pemeliharaan` varchar(150)  , 
	`merchitem_logo` varchar(30)  , 
	`merchitem_dibuatdi` varchar(30)  , 
	`merchitem_width` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchitem_length` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchitem_height` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchitem_weight` decimal(7, 2) NOT NULL DEFAULT 0, 
	`merchitem_fob` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchitem_initqty` int(4) NOT NULL DEFAULT 0, 
	`merchitemctg_id` varchar(30) NOT NULL , 
	`unit_id` varchar(10)  , 
	`dept_id` varchar(30)  , 
	`merchreg_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchregitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Register';


ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_refitem` varchar(30)   AFTER `merchregitem_id`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_barcode` varchar(30)   AFTER `merchitem_refitem`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_barcode`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(10)   AFTER `merchitem_col`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_combo` varchar(103)   AFTER `merchitem_size`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_combo`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_descr` varchar(2500)   AFTER `merchitem_name`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_colnum` varchar(3)   AFTER `merchitem_descr`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_colnum`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpline` varchar(90)   AFTER `merchitem_isdisabled`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpgroup` varchar(90)   AFTER `merchitem_pcpline`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpcategory` varchar(90)   AFTER `merchitem_pcpgroup`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_colorcode` varchar(30)   AFTER `merchitem_pcpcategory`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_colordescr` varchar(30)   AFTER `merchitem_colorcode`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_gender` varchar(1)   AFTER `merchitem_colordescr`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_fit` varchar(10)   AFTER `merchitem_gender`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscodeship` varchar(30)   AFTER `merchitem_fit`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscodeina` varchar(30)   AFTER `merchitem_hscodeship`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_gtype` varchar(5)   AFTER `merchitem_hscodeina`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_labelname` varchar(90)   AFTER `merchitem_gtype`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_labelproduct` varchar(90)   AFTER `merchitem_labelname`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_bahan` varchar(150)   AFTER `merchitem_labelproduct`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_pemeliharaan` varchar(150)   AFTER `merchitem_bahan`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_logo` varchar(30)   AFTER `merchitem_pemeliharaan`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_dibuatdi` varchar(30)   AFTER `merchitem_logo`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_width` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_dibuatdi`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_length` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_width`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_height` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_length`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_weight` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_height`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_fob` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchitem_weight`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitem_initqty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_fob`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30) NOT NULL  AFTER `merchitem_initqty`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `merchitemctg_id`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `fsn_merchregitem` ADD COLUMN IF NOT EXISTS  `merchreg_id` varchar(30) NOT NULL  AFTER `dept_id`;


ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_refitem` varchar(30)    AFTER `merchregitem_id`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_barcode` varchar(30)    AFTER `merchitem_refitem`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)    AFTER `merchitem_barcode`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)    AFTER `merchitem_art`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)    AFTER `merchitem_mat`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(10)    AFTER `merchitem_col`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_combo` varchar(103)    AFTER `merchitem_size`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)    AFTER `merchitem_combo`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_descr` varchar(2500)    AFTER `merchitem_name`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_colnum` varchar(3)    AFTER `merchitem_descr`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchitem_colnum`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpline` varchar(90)    AFTER `merchitem_isdisabled`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpgroup` varchar(90)    AFTER `merchitem_pcpline`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpcategory` varchar(90)    AFTER `merchitem_pcpgroup`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_colorcode` varchar(30)    AFTER `merchitem_pcpcategory`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_colordescr` varchar(30)    AFTER `merchitem_colorcode`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_gender` varchar(1)    AFTER `merchitem_colordescr`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_fit` varchar(10)    AFTER `merchitem_gender`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_hscodeship` varchar(30)    AFTER `merchitem_fit`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_hscodeina` varchar(30)    AFTER `merchitem_hscodeship`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_gtype` varchar(5)    AFTER `merchitem_hscodeina`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_labelname` varchar(90)    AFTER `merchitem_gtype`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_labelproduct` varchar(90)    AFTER `merchitem_labelname`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_bahan` varchar(150)    AFTER `merchitem_labelproduct`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_pemeliharaan` varchar(150)    AFTER `merchitem_bahan`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_logo` varchar(30)    AFTER `merchitem_pemeliharaan`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_dibuatdi` varchar(30)    AFTER `merchitem_logo`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_width` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_dibuatdi`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_length` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_width`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_height` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_length`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_weight` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_height`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_fob` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchitem_weight`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitem_initqty` int(4) NOT NULL DEFAULT 0  AFTER `merchitem_fob`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30) NOT NULL   AFTER `merchitem_initqty`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)    AFTER `merchitemctg_id`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `fsn_merchregitem` MODIFY COLUMN IF EXISTS  `merchreg_id` varchar(30) NOT NULL   AFTER `dept_id`;



ALTER TABLE `fsn_merchregitem` ADD KEY IF NOT EXISTS  `merchitemctg_id` (`merchitemctg_id`);
ALTER TABLE `fsn_merchregitem` ADD KEY IF NOT EXISTS  `unit_id` (`unit_id`);
ALTER TABLE `fsn_merchregitem` ADD KEY IF NOT EXISTS  `dept_id` (`dept_id`);
ALTER TABLE `fsn_merchregitem` ADD KEY IF NOT EXISTS `merchreg_id` (`merchreg_id`);

ALTER TABLE `fsn_merchregitem` ADD CONSTRAINT `fk_fsn_merchregitem_fsn_merchitemctg` FOREIGN KEY IF NOT EXISTS (`merchitemctg_id`) REFERENCES `fsn_merchitemctg` (`merchitemctg_id`);
ALTER TABLE `fsn_merchregitem` ADD CONSTRAINT `fk_fsn_merchregitem_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `fsn_merchregitem` ADD CONSTRAINT `fk_fsn_merchregitem_mst_dept` FOREIGN KEY IF NOT EXISTS (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `fsn_merchregitem` ADD CONSTRAINT `fk_fsn_merchregitem_fsn_merchreg` FOREIGN KEY IF NOT EXISTS (`merchreg_id`) REFERENCES `fsn_merchreg` (`merchreg_id`);





