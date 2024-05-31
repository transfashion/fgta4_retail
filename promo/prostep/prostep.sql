-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_prostep`;


CREATE TABLE IF NOT EXISTS `mst_prostep` (
	`prostep_id` varchar(2) NOT NULL , 
	`prostep_name` varchar(90) NOT NULL , 
	`prostep_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `prostep_name` (`prostep_name`),
	PRIMARY KEY (`prostep_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Step Disc Promo';


ALTER TABLE `mst_prostep` ADD COLUMN IF NOT EXISTS  `prostep_name` varchar(90) NOT NULL  AFTER `prostep_id`;
ALTER TABLE `mst_prostep` ADD COLUMN IF NOT EXISTS  `prostep_descr` varchar(255)   AFTER `prostep_name`;


ALTER TABLE `mst_prostep` MODIFY COLUMN IF EXISTS  `prostep_name` varchar(90) NOT NULL   AFTER `prostep_id`;
ALTER TABLE `mst_prostep` MODIFY COLUMN IF EXISTS  `prostep_descr` varchar(255)    AFTER `prostep_name`;


ALTER TABLE `mst_prostep` ADD CONSTRAINT `prostep_name` UNIQUE IF NOT EXISTS  (`prostep_name`);







