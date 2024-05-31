-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchorderin`;
-- drop table if exists `trn_merchorderinitem`;


CREATE TABLE IF NOT EXISTS `trn_merchorderin` (
	`merchorderin_id` varchar(30) NOT NULL , 
	`merchorderin_descr` varchar(255) NOT NULL , 
	`merchorderin_ref` varchar(30)  , 
	`merchorderin_date` date NOT NULL , 
	`merchorderin_datedue` date NOT NULL , 
	`merchsea_id` varchar(10)  , 
	`unit_id` varchar(30)  , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(30)  , 
	`project_id` varchar(30)  , 
	`merchorderin_version` int(4) NOT NULL DEFAULT 0, 
	`merchorderin_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderin_commitby` varchar(14)  , 
	`merchorderin_commitdate` datetime  , 
	`merchorderin_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderin_postby` varchar(14)  , 
	`merchorderin_postdate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchorderin_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Sales Order Merchandise';


ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_descr` varchar(255) NOT NULL  AFTER `merchorderin_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_ref` varchar(30)   AFTER `merchorderin_descr`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_date` date NOT NULL  AFTER `merchorderin_ref`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_datedue` date NOT NULL  AFTER `merchorderin_date`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `merchorderin_datedue`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `merchsea_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30)   AFTER `dept_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `project_id` varchar(30)   AFTER `partner_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_version` int(4) NOT NULL DEFAULT 0 AFTER `project_id`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_version`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_commitby` varchar(14)   AFTER `merchorderin_iscommit`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_commitdate` datetime   AFTER `merchorderin_commitby`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderin_commitdate`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_postby` varchar(14)   AFTER `merchorderin_ispost`;
ALTER TABLE `trn_merchorderin` ADD COLUMN IF NOT EXISTS  `merchorderin_postdate` datetime   AFTER `merchorderin_postby`;


ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_descr` varchar(255) NOT NULL   AFTER `merchorderin_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_ref` varchar(30)    AFTER `merchorderin_descr`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_date` date NOT NULL   AFTER `merchorderin_ref`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_datedue` date NOT NULL   AFTER `merchorderin_date`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)    AFTER `merchorderin_datedue`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `merchsea_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30)    AFTER `dept_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `project_id` varchar(30)    AFTER `partner_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_version` int(4) NOT NULL DEFAULT 0  AFTER `project_id`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchorderin_version`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_commitby` varchar(14)    AFTER `merchorderin_iscommit`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_commitdate` datetime    AFTER `merchorderin_commitby`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_ispost` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchorderin_commitdate`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_postby` varchar(14)    AFTER `merchorderin_ispost`;
ALTER TABLE `trn_merchorderin` MODIFY COLUMN IF EXISTS  `merchorderin_postdate` datetime    AFTER `merchorderin_postby`;



ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_merchorderin` ADD KEY IF NOT EXISTS `project_id` (`project_id`);

ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_merchorderin` ADD CONSTRAINT `fk_trn_merchorderin_mst_project` FOREIGN KEY IF NOT EXISTS  (`project_id`) REFERENCES `mst_project` (`project_id`);





CREATE TABLE IF NOT EXISTS `trn_merchorderinitem` (
	`merchorderinitem_id` varchar(14) NOT NULL , 
	`merchitem_id` varchar(14)  , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`merchitem_size` varchar(10)  , 
	`merchitem_name` varchar(255)  , 
	`merchorderinitem_qty` int(4) NOT NULL DEFAULT 0, 
	`merchorderinitem_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`merchorderinitem_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`merchorderinitem_subvalfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchorderinitem_subvalidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchorderin_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchorderinitem_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';


ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(14)   AFTER `merchorderinitem_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(10)   AFTER `merchitem_col`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_size`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchitem_name`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_valfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchorderinitem_qty`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `merchorderinitem_valfrg`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_subvalfrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchorderinitem_valfrgrate`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderinitem_subvalidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchorderinitem_subvalfrg`;
ALTER TABLE `trn_merchorderinitem` ADD COLUMN IF NOT EXISTS  `merchorderin_id` varchar(30) NOT NULL  AFTER `merchorderinitem_subvalidr`;


ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(14)    AFTER `merchorderinitem_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)    AFTER `merchitem_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)    AFTER `merchitem_art`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)    AFTER `merchitem_mat`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(10)    AFTER `merchitem_col`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)    AFTER `merchitem_size`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_qty` int(4) NOT NULL DEFAULT 0  AFTER `merchitem_name`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_valfrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchorderinitem_qty`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `merchorderinitem_valfrg`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_subvalfrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchorderinitem_valfrgrate`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderinitem_subvalidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchorderinitem_subvalfrg`;
ALTER TABLE `trn_merchorderinitem` MODIFY COLUMN IF EXISTS  `merchorderin_id` varchar(30) NOT NULL   AFTER `merchorderinitem_subvalidr`;



ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_merchorderinitem` ADD KEY IF NOT EXISTS `merchorderin_id` (`merchorderin_id`);

ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_merchitem` FOREIGN KEY IF NOT EXISTS  (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_merchorderinitem` ADD CONSTRAINT `fk_trn_merchorderinitem_trn_merchorderin` FOREIGN KEY IF NOT EXISTS (`merchorderin_id`) REFERENCES `trn_merchorderin` (`merchorderin_id`);





