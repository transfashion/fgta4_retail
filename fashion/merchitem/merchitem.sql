-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `fsn_merchitem`;


CREATE TABLE IF NOT EXISTS `fsn_merchitem` (
	`merchitem_id` varchar(14) NOT NULL , 
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
	`merchitemctg_id` varchar(30) NOT NULL , 
	`merchsea_id` varchar(10) NOT NULL , 
	`unit_id` varchar(10) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitem_uniq` (`unit_id`, `merchitem_art`, `merchitem_mat`, `merchitem_col`, `merchitem_size`),
	UNIQUE KEY `merchitem_combo` (`unit_id`, `merchitem_combo`),
	PRIMARY KEY (`merchitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item merchandise';


ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(20)   AFTER `merchitem_col`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_combo` varchar(103)   AFTER `merchitem_size`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_combo`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_descr` varchar(2500)   AFTER `merchitem_name`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colnum` varchar(3)   AFTER `merchitem_descr`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_colnum`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpline` varchar(90)   AFTER `merchitem_isdisabled`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpgroup` varchar(90)   AFTER `merchitem_pcpline`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pcpcategory` varchar(90)   AFTER `merchitem_pcpgroup`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colorcode` varchar(30)   AFTER `merchitem_pcpcategory`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colordescr` varchar(30)   AFTER `merchitem_colorcode`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_gender` varchar(1)   AFTER `merchitem_colordescr`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_fit` varchar(10)   AFTER `merchitem_gender`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscodeship` varchar(30)   AFTER `merchitem_fit`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscodeina` varchar(30)   AFTER `merchitem_hscodeship`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_gtype` varchar(5)   AFTER `merchitem_hscodeina`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_labelname` varchar(90)   AFTER `merchitem_gtype`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_labelproduct` varchar(90)   AFTER `merchitem_labelname`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_bahan` varchar(150)   AFTER `merchitem_labelproduct`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pemeliharaan` varchar(150)   AFTER `merchitem_bahan`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_logo` varchar(30)   AFTER `merchitem_pemeliharaan`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_dibuatdi` varchar(30)   AFTER `merchitem_logo`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30) NOT NULL  AFTER `merchitem_dibuatdi`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10) NOT NULL  AFTER `merchitemctg_id`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `merchsea_id`;
ALTER TABLE `fsn_merchitem` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `unit_id`;


ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)    AFTER `merchitem_id`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)    AFTER `merchitem_art`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)    AFTER `merchitem_mat`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(20)    AFTER `merchitem_col`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_combo` varchar(103)    AFTER `merchitem_size`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)    AFTER `merchitem_combo`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_descr` varchar(2500)    AFTER `merchitem_name`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colnum` varchar(3)    AFTER `merchitem_descr`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchitem_colnum`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpline` varchar(90)    AFTER `merchitem_isdisabled`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpgroup` varchar(90)    AFTER `merchitem_pcpline`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pcpcategory` varchar(90)    AFTER `merchitem_pcpgroup`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colorcode` varchar(30)    AFTER `merchitem_pcpcategory`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colordescr` varchar(30)    AFTER `merchitem_colorcode`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_gender` varchar(1)    AFTER `merchitem_colordescr`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_fit` varchar(10)    AFTER `merchitem_gender`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_hscodeship` varchar(30)    AFTER `merchitem_fit`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_hscodeina` varchar(30)    AFTER `merchitem_hscodeship`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_gtype` varchar(5)    AFTER `merchitem_hscodeina`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_labelname` varchar(90)    AFTER `merchitem_gtype`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_labelproduct` varchar(90)    AFTER `merchitem_labelname`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_bahan` varchar(150)    AFTER `merchitem_labelproduct`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pemeliharaan` varchar(150)    AFTER `merchitem_bahan`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_logo` varchar(30)    AFTER `merchitem_pemeliharaan`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_dibuatdi` varchar(30)    AFTER `merchitem_logo`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30) NOT NULL   AFTER `merchitem_dibuatdi`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10) NOT NULL   AFTER `merchitemctg_id`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10) NOT NULL   AFTER `merchsea_id`;
ALTER TABLE `fsn_merchitem` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL   AFTER `unit_id`;


ALTER TABLE `fsn_merchitem` ADD CONSTRAINT `merchitem_uniq` UNIQUE IF NOT EXISTS  (`unit_id`, `merchitem_art`, `merchitem_mat`, `merchitem_col`, `merchitem_size`);
ALTER TABLE `fsn_merchitem` ADD CONSTRAINT `merchitem_combo` UNIQUE IF NOT EXISTS  (`unit_id`, `merchitem_combo`);

ALTER TABLE `fsn_merchitem` ADD KEY IF NOT EXISTS  `merchitem_id` (`merchitem_id`);
ALTER TABLE `fsn_merchitem` ADD KEY IF NOT EXISTS  `merchitemctg_id` (`merchitemctg_id`);
ALTER TABLE `fsn_merchitem` ADD KEY IF NOT EXISTS  `merchsea_id` (`merchsea_id`);
ALTER TABLE `fsn_merchitem` ADD KEY IF NOT EXISTS  `unit_id` (`unit_id`);
ALTER TABLE `fsn_merchitem` ADD KEY IF NOT EXISTS  `dept_id` (`dept_id`);

ALTER TABLE `fsn_merchitem` ADD CONSTRAINT `fk_fsn_merchitem_mst_itemstock` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `fsn_merchitem` ADD CONSTRAINT `fk_fsn_merchitem_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);
ALTER TABLE `fsn_merchitem` ADD CONSTRAINT `fk_fsn_merchitem_mst_merchsea` FOREIGN KEY IF NOT EXISTS (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `fsn_merchitem` ADD CONSTRAINT `fk_fsn_merchitem_mst_unit` FOREIGN KEY IF NOT EXISTS (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `fsn_merchitem` ADD CONSTRAINT `fk_fsn_merchitem_mst_dept` FOREIGN KEY IF NOT EXISTS (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





