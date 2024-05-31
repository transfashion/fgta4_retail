-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchitem`;


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
	`merchregitem_id` varchar(32)  , 
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
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchregitem_id` varchar(32)   AFTER `brand_id`;
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
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchregitem_id` varchar(32)    AFTER `brand_id`;
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

ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_itemstock` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_itemstock_2` FOREIGN KEY IF NOT EXISTS (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchsea` FOREIGN KEY IF NOT EXISTS (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_dept` FOREIGN KEY IF NOT EXISTS (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_brand` FOREIGN KEY IF NOT EXISTS (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_trn_merchregitem` FOREIGN KEY IF NOT EXISTS (`merchregitem_id`) REFERENCES `trn_merchregitem` (`merchregitem_id`);





