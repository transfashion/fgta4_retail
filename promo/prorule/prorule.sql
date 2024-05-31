-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_prorule`;
-- drop table if exists `mst_prorulesec`;


CREATE TABLE IF NOT EXISTS `mst_prorule` (
	`prorule_id` varchar(14) NOT NULL , 
	`prolevel_id` varchar(2)  , 
	`problock_id` varchar(2)  , 
	`prorule_name` varchar(90) NOT NULL , 
	`prorule_descr` varchar(255)  , 
	`prorule_lib` varchar(90)  , 
	`prorule_fn` varchar(90)  , 
	`a_prospot_id` varchar(2)  , 
	`a_prostep_id` varchar(2)  , 
	`prorule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0, 
	`prorule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `prorule_name` (`prorule_name`),
	PRIMARY KEY (`prorule_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Rule Promo';


ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `prolevel_id` varchar(2)   AFTER `prorule_id`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `problock_id` varchar(2)   AFTER `prolevel_id`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `prorule_name` varchar(90) NOT NULL  AFTER `problock_id`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `prorule_descr` varchar(255)   AFTER `prorule_name`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `prorule_lib` varchar(90)   AFTER `prorule_descr`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `prorule_fn` varchar(90)   AFTER `prorule_lib`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `a_prospot_id` varchar(2)   AFTER `prorule_fn`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `a_prostep_id` varchar(2)   AFTER `a_prospot_id`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `prorule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0 AFTER `a_prostep_id`;
ALTER TABLE `mst_prorule` ADD COLUMN IF NOT EXISTS  `prorule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0 AFTER `prorule_ishasgroupa`;


ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `prolevel_id` varchar(2)    AFTER `prorule_id`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `problock_id` varchar(2)    AFTER `prolevel_id`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `prorule_name` varchar(90) NOT NULL   AFTER `problock_id`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `prorule_descr` varchar(255)    AFTER `prorule_name`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `prorule_lib` varchar(90)    AFTER `prorule_descr`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `prorule_fn` varchar(90)    AFTER `prorule_lib`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `a_prospot_id` varchar(2)    AFTER `prorule_fn`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `a_prostep_id` varchar(2)    AFTER `a_prospot_id`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `prorule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0  AFTER `a_prostep_id`;
ALTER TABLE `mst_prorule` MODIFY COLUMN IF EXISTS  `prorule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0  AFTER `prorule_ishasgroupa`;


ALTER TABLE `mst_prorule` ADD CONSTRAINT `prorule_name` UNIQUE IF NOT EXISTS  (`prorule_name`);

ALTER TABLE `mst_prorule` ADD KEY IF NOT EXISTS `prolevel_id` (`prolevel_id`);
ALTER TABLE `mst_prorule` ADD KEY IF NOT EXISTS `problock_id` (`problock_id`);
ALTER TABLE `mst_prorule` ADD KEY IF NOT EXISTS `a_prospot_id` (`a_prospot_id`);
ALTER TABLE `mst_prorule` ADD KEY IF NOT EXISTS `a_prostep_id` (`a_prostep_id`);

ALTER TABLE `mst_prorule` ADD CONSTRAINT `fk_mst_prorule_mst_prolevel` FOREIGN KEY IF NOT EXISTS  (`prolevel_id`) REFERENCES `mst_prolevel` (`prolevel_id`);
ALTER TABLE `mst_prorule` ADD CONSTRAINT `fk_mst_prorule_mst_problock` FOREIGN KEY IF NOT EXISTS  (`problock_id`) REFERENCES `mst_problock` (`problock_id`);
ALTER TABLE `mst_prorule` ADD CONSTRAINT `fk_mst_prorule_mst_prospot` FOREIGN KEY IF NOT EXISTS  (`a_prospot_id`) REFERENCES `mst_prospot` (`prospot_id`);
ALTER TABLE `mst_prorule` ADD CONSTRAINT `fk_mst_prorule_mst_prostep` FOREIGN KEY IF NOT EXISTS  (`a_prostep_id`) REFERENCES `mst_prostep` (`prostep_id`);





CREATE TABLE IF NOT EXISTS `mst_prorulesec` (
	`prorulesec_id` varchar(14) NOT NULL , 
	`prorulesec_name` varchar(20) NOT NULL , 
	`prorulesec_label` varchar(20) NOT NULL , 
	`prorulesec_descr` varchar(255)  , 
	`prorule_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `prorulesec_name` (`prorule_id`, `prorulesec_name`),
	PRIMARY KEY (`prorulesec_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Section Rule Promo';


ALTER TABLE `mst_prorulesec` ADD COLUMN IF NOT EXISTS  `prorulesec_name` varchar(20) NOT NULL  AFTER `prorulesec_id`;
ALTER TABLE `mst_prorulesec` ADD COLUMN IF NOT EXISTS  `prorulesec_label` varchar(20) NOT NULL  AFTER `prorulesec_name`;
ALTER TABLE `mst_prorulesec` ADD COLUMN IF NOT EXISTS  `prorulesec_descr` varchar(255)   AFTER `prorulesec_label`;
ALTER TABLE `mst_prorulesec` ADD COLUMN IF NOT EXISTS  `prorule_id` varchar(14) NOT NULL  AFTER `prorulesec_descr`;


ALTER TABLE `mst_prorulesec` MODIFY COLUMN IF EXISTS  `prorulesec_name` varchar(20) NOT NULL   AFTER `prorulesec_id`;
ALTER TABLE `mst_prorulesec` MODIFY COLUMN IF EXISTS  `prorulesec_label` varchar(20) NOT NULL   AFTER `prorulesec_name`;
ALTER TABLE `mst_prorulesec` MODIFY COLUMN IF EXISTS  `prorulesec_descr` varchar(255)    AFTER `prorulesec_label`;
ALTER TABLE `mst_prorulesec` MODIFY COLUMN IF EXISTS  `prorule_id` varchar(14) NOT NULL   AFTER `prorulesec_descr`;


ALTER TABLE `mst_prorulesec` ADD CONSTRAINT `prorulesec_name` UNIQUE IF NOT EXISTS  (`prorule_id`, `prorulesec_name`);

ALTER TABLE `mst_prorulesec` ADD KEY IF NOT EXISTS `prorule_id` (`prorule_id`);

ALTER TABLE `mst_prorulesec` ADD CONSTRAINT `fk_mst_prorulesec_mst_prorule` FOREIGN KEY IF NOT EXISTS (`prorule_id`) REFERENCES `mst_prorule` (`prorule_id`);





