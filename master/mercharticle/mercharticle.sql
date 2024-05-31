-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_mercharticle`;
-- drop table if exists `mst_mercharticleprop`;
-- drop table if exists `mst_merchitem`;
-- drop table if exists `mst_merchpic`;


CREATE TABLE IF NOT EXISTS `mst_mercharticle` (
	`mercharticle_id` varchar(14) NOT NULL , 
	`mercharticle_art` varchar(30)  , 
	`mercharticle_mat` varchar(30)  , 
	`mercharticle_matname` varchar(70)  , 
	`mercharticle_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`mercharticle_name` varchar(255)  , 
	`mercharticle_descr` varchar(2500)  , 
	`unit_id` varchar(10) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`mercharticle_couchdbid` varchar(255)  , 
	`mercharticle_picture` varchar(90)  , 
	`itemstock_id` varchar(14)  , 
	`mercharticle_isvarcolor` tinyint(1) NOT NULL DEFAULT 0, 
	`mercharticle_isvarsize` tinyint(1) NOT NULL DEFAULT 0, 
	`mercharticle_isupdating` tinyint(1) NOT NULL DEFAULT 0, 
	`mercharticle_updatebatch` varchar(30)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `mercharticle_art` (`brand_id`, `mercharticle_art`, `mercharticle_mat`),
	UNIQUE KEY `itemstock_id` (`itemstock_id`),
	PRIMARY KEY (`mercharticle_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Variance item merchandise';


ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_art` varchar(30)   AFTER `mercharticle_id`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_mat` varchar(30)   AFTER `mercharticle_art`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_matname` varchar(70)   AFTER `mercharticle_mat`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `mercharticle_matname`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_name` varchar(255)   AFTER `mercharticle_isdisabled`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_descr` varchar(2500)   AFTER `mercharticle_name`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `mercharticle_descr`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `unit_id`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14) NOT NULL  AFTER `dept_id`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_couchdbid` varchar(255)   AFTER `brand_id`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_picture` varchar(90)   AFTER `mercharticle_couchdbid`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `itemstock_id` varchar(14)   AFTER `mercharticle_picture`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_isvarcolor` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemstock_id`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_isvarsize` tinyint(1) NOT NULL DEFAULT 0 AFTER `mercharticle_isvarcolor`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_isupdating` tinyint(1) NOT NULL DEFAULT 0 AFTER `mercharticle_isvarsize`;
ALTER TABLE `mst_mercharticle` ADD COLUMN IF NOT EXISTS  `mercharticle_updatebatch` varchar(30)   AFTER `mercharticle_isupdating`;


ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_art` varchar(30)    AFTER `mercharticle_id`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_mat` varchar(30)    AFTER `mercharticle_art`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_matname` varchar(70)    AFTER `mercharticle_mat`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `mercharticle_matname`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_name` varchar(255)    AFTER `mercharticle_isdisabled`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_descr` varchar(2500)    AFTER `mercharticle_name`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10) NOT NULL   AFTER `mercharticle_descr`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL   AFTER `unit_id`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14) NOT NULL   AFTER `dept_id`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_couchdbid` varchar(255)    AFTER `brand_id`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_picture` varchar(90)    AFTER `mercharticle_couchdbid`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `itemstock_id` varchar(14)    AFTER `mercharticle_picture`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_isvarcolor` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemstock_id`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_isvarsize` tinyint(1) NOT NULL DEFAULT 0  AFTER `mercharticle_isvarcolor`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_isupdating` tinyint(1) NOT NULL DEFAULT 0  AFTER `mercharticle_isvarsize`;
ALTER TABLE `mst_mercharticle` MODIFY COLUMN IF EXISTS  `mercharticle_updatebatch` varchar(30)    AFTER `mercharticle_isupdating`;


ALTER TABLE `mst_mercharticle` ADD CONSTRAINT `mercharticle_art` UNIQUE IF NOT EXISTS  (`brand_id`, `mercharticle_art`, `mercharticle_mat`);
ALTER TABLE `mst_mercharticle` ADD CONSTRAINT `itemstock_id` UNIQUE IF NOT EXISTS  (`itemstock_id`);

ALTER TABLE `mst_mercharticle` ADD KEY IF NOT EXISTS  `unit_id` (`unit_id`);
ALTER TABLE `mst_mercharticle` ADD KEY IF NOT EXISTS  `dept_id` (`dept_id`);
ALTER TABLE `mst_mercharticle` ADD KEY IF NOT EXISTS  `brand_id` (`brand_id`);
ALTER TABLE `mst_mercharticle` ADD KEY IF NOT EXISTS  `itemstock_id` (`itemstock_id`);

ALTER TABLE `mst_mercharticle` ADD CONSTRAINT `fk_mst_mercharticle_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `mst_mercharticle` ADD CONSTRAINT `fk_mst_mercharticle_mst_dept` FOREIGN KEY IF NOT EXISTS (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_mercharticle` ADD CONSTRAINT `fk_mst_mercharticle_mst_brand` FOREIGN KEY IF NOT EXISTS (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_mercharticle` ADD CONSTRAINT `fk_mst_mercharticle_mst_itemstock` FOREIGN KEY IF NOT EXISTS (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);





CREATE TABLE IF NOT EXISTS `mst_mercharticleprop` (
	`mercharticleprop_id` varchar(14) NOT NULL , 
	`itemproptype_id` varchar(20) NOT NULL , 
	`mercharticleprop_keys` varchar(90) NOT NULL , 
	`mercharticleprop_value` varchar(255) NOT NULL , 
	`mercharticle_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemstockprop_keys` (`mercharticle_id`, `itemproptype_id`, `mercharticleprop_keys`),
	PRIMARY KEY (`mercharticleprop_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Properties Article';


ALTER TABLE `mst_mercharticleprop` ADD COLUMN IF NOT EXISTS  `itemproptype_id` varchar(20) NOT NULL  AFTER `mercharticleprop_id`;
ALTER TABLE `mst_mercharticleprop` ADD COLUMN IF NOT EXISTS  `mercharticleprop_keys` varchar(90) NOT NULL  AFTER `itemproptype_id`;
ALTER TABLE `mst_mercharticleprop` ADD COLUMN IF NOT EXISTS  `mercharticleprop_value` varchar(255) NOT NULL  AFTER `mercharticleprop_keys`;
ALTER TABLE `mst_mercharticleprop` ADD COLUMN IF NOT EXISTS  `mercharticle_id` varchar(14) NOT NULL  AFTER `mercharticleprop_value`;


ALTER TABLE `mst_mercharticleprop` MODIFY COLUMN IF EXISTS  `itemproptype_id` varchar(20) NOT NULL   AFTER `mercharticleprop_id`;
ALTER TABLE `mst_mercharticleprop` MODIFY COLUMN IF EXISTS  `mercharticleprop_keys` varchar(90) NOT NULL   AFTER `itemproptype_id`;
ALTER TABLE `mst_mercharticleprop` MODIFY COLUMN IF EXISTS  `mercharticleprop_value` varchar(255) NOT NULL   AFTER `mercharticleprop_keys`;
ALTER TABLE `mst_mercharticleprop` MODIFY COLUMN IF EXISTS  `mercharticle_id` varchar(14) NOT NULL   AFTER `mercharticleprop_value`;


ALTER TABLE `mst_mercharticleprop` ADD CONSTRAINT `itemstockprop_keys` UNIQUE IF NOT EXISTS  (`mercharticle_id`, `itemproptype_id`, `mercharticleprop_keys`);

ALTER TABLE `mst_mercharticleprop` ADD KEY IF NOT EXISTS `itemproptype_id` (`itemproptype_id`);
ALTER TABLE `mst_mercharticleprop` ADD KEY IF NOT EXISTS `mercharticle_id` (`mercharticle_id`);

ALTER TABLE `mst_mercharticleprop` ADD CONSTRAINT `fk_mst_mercharticleprop_mst_itemproptype` FOREIGN KEY IF NOT EXISTS  (`itemproptype_id`) REFERENCES `mst_itemproptype` (`itemproptype_id`);
ALTER TABLE `mst_mercharticleprop` ADD CONSTRAINT `fk_mst_mercharticleprop_mst_mercharticle` FOREIGN KEY IF NOT EXISTS (`mercharticle_id`) REFERENCES `mst_mercharticle` (`mercharticle_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitem` (
	`merchitem_id` varchar(14) NOT NULL , 
	`itemstock_id` varchar(14) NOT NULL , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`merchitem_size` varchar(20)  , 
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
	`merchitemctg_id` varchar(30) NOT NULL , 
	`merchsea_id` varchar(10) NOT NULL , 
	`unit_id` varchar(10) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`merchregitem_id` varchar(14)  , 
	`merchitem_isupdating` tinyint(1) NOT NULL DEFAULT 0, 
	`merchitem_updatebatch` varchar(30)  , 
	`mercharticle_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitem_uniq` (`brand_id`, `merchitem_art`, `merchitem_mat`, `merchitem_col`, `merchitem_size`),
	UNIQUE KEY `merchitem_combo` (`brand_id`, `merchitem_combo`),
	UNIQUE KEY `itemstock_id` (`itemstock_id`),
	PRIMARY KEY (`merchitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Detil Item Variance merchandise';


ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `itemstock_id` varchar(14) NOT NULL  AFTER `merchitem_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `itemstock_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(20)   AFTER `merchitem_col`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_combo` varchar(103)   AFTER `merchitem_size`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_combo`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_descr` varchar(2500)   AFTER `merchitem_name`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colnum` varchar(3)   AFTER `merchitem_descr`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_colnum`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpline` varchar(90)   AFTER `merchitem_isdisabled`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpgroup` varchar(90)   AFTER `merchitem_pcpline`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpcategory` varchar(90)   AFTER `merchitem_pcpgroup`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colorcode` varchar(30)   AFTER `merchitem_pcpcategory`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colordescr` varchar(30)   AFTER `merchitem_colorcode`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_gender` varchar(1)   AFTER `merchitem_colordescr`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_fit` varchar(10)   AFTER `merchitem_gender`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscodeship` varchar(30)   AFTER `merchitem_fit`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscodeina` varchar(30)   AFTER `merchitem_hscodeship`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_gtype` varchar(5)   AFTER `merchitem_hscodeina`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_labelname` varchar(90)   AFTER `merchitem_gtype`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_labelproduct` varchar(90)   AFTER `merchitem_labelname`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_bahan` varchar(150)   AFTER `merchitem_labelproduct`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pemeliharaan` varchar(150)   AFTER `merchitem_bahan`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_logo` varchar(30)   AFTER `merchitem_pemeliharaan`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_dibuatdi` varchar(30)   AFTER `merchitem_logo`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_width` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_dibuatdi`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_length` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_width`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_height` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_length`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_weight` decimal(7, 2) NOT NULL DEFAULT 0 AFTER `merchitem_height`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30) NOT NULL  AFTER `merchitem_weight`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10) NOT NULL  AFTER `merchitemctg_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `merchsea_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `unit_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14) NOT NULL  AFTER `dept_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchregitem_id` varchar(14)   AFTER `brand_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_isupdating` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchregitem_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_updatebatch` varchar(30)   AFTER `merchitem_isupdating`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `mercharticle_id` varchar(14) NOT NULL  AFTER `merchitem_updatebatch`;


ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `itemstock_id` varchar(14) NOT NULL   AFTER `merchitem_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)    AFTER `itemstock_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)    AFTER `merchitem_art`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)    AFTER `merchitem_mat`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(20)    AFTER `merchitem_col`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_combo` varchar(103)    AFTER `merchitem_size`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)    AFTER `merchitem_combo`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_descr` varchar(2500)    AFTER `merchitem_name`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colnum` varchar(3)    AFTER `merchitem_descr`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchitem_colnum`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpline` varchar(90)    AFTER `merchitem_isdisabled`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpgroup` varchar(90)    AFTER `merchitem_pcpline`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpcategory` varchar(90)    AFTER `merchitem_pcpgroup`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colorcode` varchar(30)    AFTER `merchitem_pcpcategory`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colordescr` varchar(30)    AFTER `merchitem_colorcode`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_gender` varchar(1)    AFTER `merchitem_colordescr`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_fit` varchar(10)    AFTER `merchitem_gender`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_hscodeship` varchar(30)    AFTER `merchitem_fit`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_hscodeina` varchar(30)    AFTER `merchitem_hscodeship`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_gtype` varchar(5)    AFTER `merchitem_hscodeina`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_labelname` varchar(90)    AFTER `merchitem_gtype`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_labelproduct` varchar(90)    AFTER `merchitem_labelname`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_bahan` varchar(150)    AFTER `merchitem_labelproduct`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pemeliharaan` varchar(150)    AFTER `merchitem_bahan`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_logo` varchar(30)    AFTER `merchitem_pemeliharaan`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_dibuatdi` varchar(30)    AFTER `merchitem_logo`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_width` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_dibuatdi`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_length` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_width`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_height` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_length`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_weight` decimal(7, 2) NOT NULL DEFAULT 0  AFTER `merchitem_height`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30) NOT NULL   AFTER `merchitem_weight`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10) NOT NULL   AFTER `merchitemctg_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10) NOT NULL   AFTER `merchsea_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL   AFTER `unit_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14) NOT NULL   AFTER `dept_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchregitem_id` varchar(14)    AFTER `brand_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_isupdating` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchregitem_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_updatebatch` varchar(30)    AFTER `merchitem_isupdating`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `mercharticle_id` varchar(14) NOT NULL   AFTER `merchitem_updatebatch`;


ALTER TABLE `mst_merchitem` ADD CONSTRAINT `merchitem_uniq` UNIQUE IF NOT EXISTS  (`brand_id`, `merchitem_art`, `merchitem_mat`, `merchitem_col`, `merchitem_size`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `merchitem_combo` UNIQUE IF NOT EXISTS  (`brand_id`, `merchitem_combo`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `itemstock_id` UNIQUE IF NOT EXISTS  (`itemstock_id`);

ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `merchitem_id` (`merchitem_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `itemstock_id` (`itemstock_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `merchitemctg_id` (`merchitemctg_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `merchsea_id` (`merchsea_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `unit_id` (`unit_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `dept_id` (`dept_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `brand_id` (`brand_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `merchregitem_id` (`merchregitem_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS `mercharticle_id` (`mercharticle_id`);

ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_itemstock` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_itemstock_2` FOREIGN KEY IF NOT EXISTS (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchsea` FOREIGN KEY IF NOT EXISTS (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_dept` FOREIGN KEY IF NOT EXISTS (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_brand` FOREIGN KEY IF NOT EXISTS (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_trn_merchregitem` FOREIGN KEY IF NOT EXISTS (`merchregitem_id`) REFERENCES `trn_merchregitem` (`merchregitem_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_mercharticle` FOREIGN KEY IF NOT EXISTS (`mercharticle_id`) REFERENCES `mst_mercharticle` (`mercharticle_id`);





CREATE TABLE IF NOT EXISTS `mst_merchpic` (
	`merchpic_id` varchar(14) NOT NULL , 
	`merchpic_couchdbid` varchar(255)  , 
	`merchpic_col` varchar(30)  , 
	`merchpic_name` varchar(30) NOT NULL , 
	`merchpic_descr` varchar(90) NOT NULL , 
	`merchpic_order` int(4) NOT NULL DEFAULT 0, 
	`merchpic_file` varchar(90)  , 
	`mercharticle_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchpic_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Picture Merch';


ALTER TABLE `mst_merchpic` ADD COLUMN IF NOT EXISTS  `merchpic_couchdbid` varchar(255)   AFTER `merchpic_id`;
ALTER TABLE `mst_merchpic` ADD COLUMN IF NOT EXISTS  `merchpic_col` varchar(30)   AFTER `merchpic_couchdbid`;
ALTER TABLE `mst_merchpic` ADD COLUMN IF NOT EXISTS  `merchpic_name` varchar(30) NOT NULL  AFTER `merchpic_col`;
ALTER TABLE `mst_merchpic` ADD COLUMN IF NOT EXISTS  `merchpic_descr` varchar(90) NOT NULL  AFTER `merchpic_name`;
ALTER TABLE `mst_merchpic` ADD COLUMN IF NOT EXISTS  `merchpic_order` int(4) NOT NULL DEFAULT 0 AFTER `merchpic_descr`;
ALTER TABLE `mst_merchpic` ADD COLUMN IF NOT EXISTS  `merchpic_file` varchar(90)   AFTER `merchpic_order`;
ALTER TABLE `mst_merchpic` ADD COLUMN IF NOT EXISTS  `mercharticle_id` varchar(14) NOT NULL  AFTER `merchpic_file`;


ALTER TABLE `mst_merchpic` MODIFY COLUMN IF EXISTS  `merchpic_couchdbid` varchar(255)    AFTER `merchpic_id`;
ALTER TABLE `mst_merchpic` MODIFY COLUMN IF EXISTS  `merchpic_col` varchar(30)    AFTER `merchpic_couchdbid`;
ALTER TABLE `mst_merchpic` MODIFY COLUMN IF EXISTS  `merchpic_name` varchar(30) NOT NULL   AFTER `merchpic_col`;
ALTER TABLE `mst_merchpic` MODIFY COLUMN IF EXISTS  `merchpic_descr` varchar(90) NOT NULL   AFTER `merchpic_name`;
ALTER TABLE `mst_merchpic` MODIFY COLUMN IF EXISTS  `merchpic_order` int(4) NOT NULL DEFAULT 0  AFTER `merchpic_descr`;
ALTER TABLE `mst_merchpic` MODIFY COLUMN IF EXISTS  `merchpic_file` varchar(90)    AFTER `merchpic_order`;
ALTER TABLE `mst_merchpic` MODIFY COLUMN IF EXISTS  `mercharticle_id` varchar(14) NOT NULL   AFTER `merchpic_file`;



ALTER TABLE `mst_merchpic` ADD KEY IF NOT EXISTS `mercharticle_id` (`mercharticle_id`);

ALTER TABLE `mst_merchpic` ADD CONSTRAINT `fk_mst_merchpic_mst_mercharticle` FOREIGN KEY IF NOT EXISTS (`mercharticle_id`) REFERENCES `mst_mercharticle` (`mercharticle_id`);





