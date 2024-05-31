-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `pos_itemstock`;
-- drop table if exists `pos_itemstockbarcode`;


CREATE TABLE IF NOT EXISTS `pos_itemstock` (
	`positemstock_id` varchar(36) NOT NULL DEFAULT UUID(), 
	`site_id` varchar(30) NOT NULL , 
	`itemstock_id` varchar(14) NOT NULL , 
	`itemstock_code` varchar(150) NOT NULL , 
	`itemstock_name` varchar(150) NOT NULL , 
	`itemstock_descr` varchar(2500)  , 
	`itemstock_couchdbid` varchar(255)  , 
	`itemstock_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`itemstock_isupdating` tinyint(1) NOT NULL DEFAULT 0, 
	`itemstock_grossprice` decimal(16, 0)  , 
	`itemstock_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0, 
	`itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0, 
	`itemstock_sellprice` decimal(16, 0)  , 
	`itemstock_lastqty` decimal(14, 2)  , 
	`itemgroup_id` varchar(17)  , 
	`itemgroup_name` varchar(60)  , 
	`itemctg_id` varchar(30)  , 
	`itemctg_name` varchar(90)  , 
	`itemclass_id` varchar(14)  , 
	`itemclass_name` varchar(30)  , 
	`dept_id` varchar(30)  , 
	`dept_name` varchar(60) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemstock_keys` (`site_id`, `itemstock_id`),
	PRIMARY KEY (`positemstock_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Stock POS';


ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30) NOT NULL  AFTER `positemstock_id`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_id` varchar(14) NOT NULL  AFTER `site_id`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_code` varchar(150) NOT NULL  AFTER `itemstock_id`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_name` varchar(150) NOT NULL  AFTER `itemstock_code`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_descr` varchar(2500)   AFTER `itemstock_name`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_couchdbid` varchar(255)   AFTER `itemstock_descr`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemstock_couchdbid`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_isupdating` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemstock_isdisabled`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_grossprice` decimal(16, 0)   AFTER `itemstock_isupdating`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemstock_grossprice`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `itemstock_isdiscvalue`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `itemstock_disc`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_sellprice` decimal(16, 0)   AFTER `itemstock_discval`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemstock_lastqty` decimal(14, 2)   AFTER `itemstock_sellprice`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemgroup_id` varchar(17)   AFTER `itemstock_lastqty`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemgroup_name` varchar(60)   AFTER `itemgroup_id`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemctg_id` varchar(30)   AFTER `itemgroup_name`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemctg_name` varchar(90)   AFTER `itemctg_id`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14)   AFTER `itemctg_name`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `itemclass_name` varchar(30)   AFTER `itemclass_id`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `itemclass_name`;
ALTER TABLE `pos_itemstock` ADD COLUMN IF NOT EXISTS  `dept_name` varchar(60) NOT NULL  AFTER `dept_id`;


ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `site_id` varchar(30) NOT NULL   AFTER `positemstock_id`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_id` varchar(14) NOT NULL   AFTER `site_id`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_code` varchar(150) NOT NULL   AFTER `itemstock_id`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_name` varchar(150) NOT NULL   AFTER `itemstock_code`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_descr` varchar(2500)    AFTER `itemstock_name`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_couchdbid` varchar(255)    AFTER `itemstock_descr`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemstock_couchdbid`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_isupdating` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemstock_isdisabled`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_grossprice` decimal(16, 0)    AFTER `itemstock_isupdating`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemstock_grossprice`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0  AFTER `itemstock_isdiscvalue`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `itemstock_disc`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_sellprice` decimal(16, 0)    AFTER `itemstock_discval`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemstock_lastqty` decimal(14, 2)    AFTER `itemstock_sellprice`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemgroup_id` varchar(17)    AFTER `itemstock_lastqty`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemgroup_name` varchar(60)    AFTER `itemgroup_id`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemctg_id` varchar(30)    AFTER `itemgroup_name`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemctg_name` varchar(90)    AFTER `itemctg_id`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14)    AFTER `itemctg_name`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `itemclass_name` varchar(30)    AFTER `itemclass_id`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `itemclass_name`;
ALTER TABLE `pos_itemstock` MODIFY COLUMN IF EXISTS  `dept_name` varchar(60) NOT NULL   AFTER `dept_id`;


ALTER TABLE `pos_itemstock` ADD CONSTRAINT `itemstock_keys` UNIQUE IF NOT EXISTS  (`site_id`, `itemstock_id`);







CREATE TABLE IF NOT EXISTS `pos_itemstockbarcode` (
	`positemstockbarcode_id` varchar(36) NOT NULL DEFAULT UUID(), 
	`site_id` varchar(30) NOT NULL , 
	`itemstock_id` varchar(14) NOT NULL , 
	`itemstockbarcode_text` varchar(26)  , 
	`dept_id` varchar(30)  , 
	`itemstockbarcode_isupdating` tinyint(1) NOT NULL DEFAULT 0, 
	`itemstockbarcode_isinternal` tinyint(1) NOT NULL DEFAULT 0, 
	`positemstock_id` varchar(36) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `positemstockbarcode_keys` (`itemstockbarcode_text`, `site_id`, `dept_id`),
	PRIMARY KEY (`positemstockbarcode_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Barcode Item Stock POS';


ALTER TABLE `pos_itemstockbarcode` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30) NOT NULL  AFTER `positemstockbarcode_id`;
ALTER TABLE `pos_itemstockbarcode` ADD COLUMN IF NOT EXISTS  `itemstock_id` varchar(14) NOT NULL  AFTER `site_id`;
ALTER TABLE `pos_itemstockbarcode` ADD COLUMN IF NOT EXISTS  `itemstockbarcode_text` varchar(26)   AFTER `itemstock_id`;
ALTER TABLE `pos_itemstockbarcode` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `itemstockbarcode_text`;
ALTER TABLE `pos_itemstockbarcode` ADD COLUMN IF NOT EXISTS  `itemstockbarcode_isupdating` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `pos_itemstockbarcode` ADD COLUMN IF NOT EXISTS  `itemstockbarcode_isinternal` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemstockbarcode_isupdating`;
ALTER TABLE `pos_itemstockbarcode` ADD COLUMN IF NOT EXISTS  `positemstock_id` varchar(36) NOT NULL  AFTER `itemstockbarcode_isinternal`;


ALTER TABLE `pos_itemstockbarcode` MODIFY COLUMN IF EXISTS  `site_id` varchar(30) NOT NULL   AFTER `positemstockbarcode_id`;
ALTER TABLE `pos_itemstockbarcode` MODIFY COLUMN IF EXISTS  `itemstock_id` varchar(14) NOT NULL   AFTER `site_id`;
ALTER TABLE `pos_itemstockbarcode` MODIFY COLUMN IF EXISTS  `itemstockbarcode_text` varchar(26)    AFTER `itemstock_id`;
ALTER TABLE `pos_itemstockbarcode` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `itemstockbarcode_text`;
ALTER TABLE `pos_itemstockbarcode` MODIFY COLUMN IF EXISTS  `itemstockbarcode_isupdating` tinyint(1) NOT NULL DEFAULT 0  AFTER `dept_id`;
ALTER TABLE `pos_itemstockbarcode` MODIFY COLUMN IF EXISTS  `itemstockbarcode_isinternal` tinyint(1) NOT NULL DEFAULT 0  AFTER `itemstockbarcode_isupdating`;
ALTER TABLE `pos_itemstockbarcode` MODIFY COLUMN IF EXISTS  `positemstock_id` varchar(36) NOT NULL   AFTER `itemstockbarcode_isinternal`;


ALTER TABLE `pos_itemstockbarcode` ADD CONSTRAINT `positemstockbarcode_keys` UNIQUE IF NOT EXISTS  (`itemstockbarcode_text`, `site_id`, `dept_id`);

ALTER TABLE `pos_itemstockbarcode` ADD KEY IF NOT EXISTS `positemstock_id` (`positemstock_id`);

ALTER TABLE `pos_itemstockbarcode` ADD CONSTRAINT `fk_pos_itemstockbarcode_pos_itemstock` FOREIGN KEY IF NOT EXISTS (`positemstock_id`) REFERENCES `pos_itemstock` (`positemstock_id`);





