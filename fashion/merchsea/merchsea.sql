-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `fsn_merchsea`;
-- drop table if exists `fsn_merchsearef`;


CREATE TABLE IF NOT EXISTS `fsn_merchsea` (
	`merchsea_id` varchar(10) NOT NULL , 
	`merchsea_name` varchar(90) NOT NULL , 
	`merchsea_namedisplay` varchar(90) NOT NULL , 
	`merchsea_year` int(4) NOT NULL , 
	`merchsea_yearmaxvisible` int(4) NOT NULL , 
	`merchsea_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`merchsea_datestart` date NOT NULL , 
	`merchsea_dateend` date NOT NULL , 
	`merchseagroup_id` varchar(2) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchsea_name` (`merchsea_name`),
	PRIMARY KEY (`merchsea_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Season';


ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchsea_name` varchar(90) NOT NULL  AFTER `merchsea_id`;
ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchsea_namedisplay` varchar(90) NOT NULL  AFTER `merchsea_name`;
ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchsea_year` int(4) NOT NULL  AFTER `merchsea_namedisplay`;
ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchsea_yearmaxvisible` int(4) NOT NULL  AFTER `merchsea_year`;
ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchsea_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchsea_yearmaxvisible`;
ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchsea_datestart` date NOT NULL  AFTER `merchsea_isdisabled`;
ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchsea_dateend` date NOT NULL  AFTER `merchsea_datestart`;
ALTER TABLE `fsn_merchsea` ADD COLUMN IF NOT EXISTS  `merchseagroup_id` varchar(2) NOT NULL  AFTER `merchsea_dateend`;


ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchsea_name` varchar(90) NOT NULL   AFTER `merchsea_id`;
ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchsea_namedisplay` varchar(90) NOT NULL   AFTER `merchsea_name`;
ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchsea_year` int(4) NOT NULL   AFTER `merchsea_namedisplay`;
ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchsea_yearmaxvisible` int(4) NOT NULL   AFTER `merchsea_year`;
ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchsea_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchsea_yearmaxvisible`;
ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchsea_datestart` date NOT NULL   AFTER `merchsea_isdisabled`;
ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchsea_dateend` date NOT NULL   AFTER `merchsea_datestart`;
ALTER TABLE `fsn_merchsea` MODIFY COLUMN IF EXISTS  `merchseagroup_id` varchar(2) NOT NULL   AFTER `merchsea_dateend`;


ALTER TABLE `fsn_merchsea` ADD CONSTRAINT `merchsea_name` UNIQUE IF NOT EXISTS  (`merchsea_name`);

ALTER TABLE `fsn_merchsea` ADD KEY IF NOT EXISTS `merchseagroup_id` (`merchseagroup_id`);

ALTER TABLE `fsn_merchsea` ADD CONSTRAINT `fk_fsn_merchsea_fsn_merchseagroup` FOREIGN KEY IF NOT EXISTS  (`merchseagroup_id`) REFERENCES `fsn_merchseagroup` (`merchseagroup_id`);





CREATE TABLE IF NOT EXISTS `fsn_merchsearef` (
	`merchsearef_id` varchar(14) NOT NULL , 
	`interface_id` varchar(7) NOT NULL , 
	`merchsearef_name` varchar(30) NOT NULL , 
	`merchsearef_code` varchar(30) NOT NULL , 
	`merchsearef_otherdata` varchar(1000)  , 
	`merchsearef_notes` varchar(255)  , 
	`merchsea_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchsearef_pair` (`interface_id`, `merchsearef_name`, `merchsearef_code`),
	PRIMARY KEY (`merchsearef_id`)
) 
ENGINE=InnoDB
COMMENT='Kode referensi season untuk keperluan interfacing dengan system lain';


ALTER TABLE `fsn_merchsearef` ADD COLUMN IF NOT EXISTS  `interface_id` varchar(7) NOT NULL  AFTER `merchsearef_id`;
ALTER TABLE `fsn_merchsearef` ADD COLUMN IF NOT EXISTS  `merchsearef_name` varchar(30) NOT NULL  AFTER `interface_id`;
ALTER TABLE `fsn_merchsearef` ADD COLUMN IF NOT EXISTS  `merchsearef_code` varchar(30) NOT NULL  AFTER `merchsearef_name`;
ALTER TABLE `fsn_merchsearef` ADD COLUMN IF NOT EXISTS  `merchsearef_otherdata` varchar(1000)   AFTER `merchsearef_code`;
ALTER TABLE `fsn_merchsearef` ADD COLUMN IF NOT EXISTS  `merchsearef_notes` varchar(255)   AFTER `merchsearef_otherdata`;
ALTER TABLE `fsn_merchsearef` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(14) NOT NULL  AFTER `merchsearef_notes`;


ALTER TABLE `fsn_merchsearef` MODIFY COLUMN IF EXISTS  `interface_id` varchar(7) NOT NULL   AFTER `merchsearef_id`;
ALTER TABLE `fsn_merchsearef` MODIFY COLUMN IF EXISTS  `merchsearef_name` varchar(30) NOT NULL   AFTER `interface_id`;
ALTER TABLE `fsn_merchsearef` MODIFY COLUMN IF EXISTS  `merchsearef_code` varchar(30) NOT NULL   AFTER `merchsearef_name`;
ALTER TABLE `fsn_merchsearef` MODIFY COLUMN IF EXISTS  `merchsearef_otherdata` varchar(1000)    AFTER `merchsearef_code`;
ALTER TABLE `fsn_merchsearef` MODIFY COLUMN IF EXISTS  `merchsearef_notes` varchar(255)    AFTER `merchsearef_otherdata`;
ALTER TABLE `fsn_merchsearef` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(14) NOT NULL   AFTER `merchsearef_notes`;


ALTER TABLE `fsn_merchsearef` ADD CONSTRAINT `merchsearef_pair` UNIQUE IF NOT EXISTS  (`interface_id`, `merchsearef_name`, `merchsearef_code`);

ALTER TABLE `fsn_merchsearef` ADD KEY IF NOT EXISTS `interface_id` (`interface_id`);
ALTER TABLE `fsn_merchsearef` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);

ALTER TABLE `fsn_merchsearef` ADD CONSTRAINT `fk_fsn_merchsearef_mst_interface` FOREIGN KEY IF NOT EXISTS  (`interface_id`) REFERENCES `mst_interface` (`interface_id`);
ALTER TABLE `fsn_merchsearef` ADD CONSTRAINT `fk_fsn_merchsearef_fsn_merchsea` FOREIGN KEY IF NOT EXISTS (`merchsea_id`) REFERENCES `fsn_merchsea` (`merchsea_id`);





