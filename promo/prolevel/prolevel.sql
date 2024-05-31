-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_prolevel`;


CREATE TABLE IF NOT EXISTS `mst_prolevel` (
	`prolevel_id` varchar(2) NOT NULL , 
	`prolevel_name` varchar(90) NOT NULL , 
	`prolevel_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `prolevel_name` (`prolevel_name`),
	PRIMARY KEY (`prolevel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Level Promo';


ALTER TABLE `mst_prolevel` ADD COLUMN IF NOT EXISTS  `prolevel_name` varchar(90) NOT NULL  AFTER `prolevel_id`;
ALTER TABLE `mst_prolevel` ADD COLUMN IF NOT EXISTS  `prolevel_descr` varchar(255)   AFTER `prolevel_name`;


ALTER TABLE `mst_prolevel` MODIFY COLUMN IF EXISTS  `prolevel_name` varchar(90) NOT NULL   AFTER `prolevel_id`;
ALTER TABLE `mst_prolevel` MODIFY COLUMN IF EXISTS  `prolevel_descr` varchar(255)    AFTER `prolevel_name`;


ALTER TABLE `mst_prolevel` ADD CONSTRAINT `prolevel_name` UNIQUE IF NOT EXISTS  (`prolevel_name`);







