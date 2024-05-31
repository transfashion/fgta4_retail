-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_progrouping`;


CREATE TABLE IF NOT EXISTS `mst_progrouping` (
	`progrouping_id` varchar(2) NOT NULL , 
	`progrouping_name` varchar(90) NOT NULL , 
	`progrouping_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `progrouping_name` (`progrouping_name`),
	PRIMARY KEY (`progrouping_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Level Promo';


ALTER TABLE `mst_progrouping` ADD COLUMN IF NOT EXISTS  `progrouping_name` varchar(90) NOT NULL  AFTER `progrouping_id`;
ALTER TABLE `mst_progrouping` ADD COLUMN IF NOT EXISTS  `progrouping_descr` varchar(255)   AFTER `progrouping_name`;


ALTER TABLE `mst_progrouping` MODIFY COLUMN IF EXISTS  `progrouping_name` varchar(90) NOT NULL   AFTER `progrouping_id`;
ALTER TABLE `mst_progrouping` MODIFY COLUMN IF EXISTS  `progrouping_descr` varchar(255)    AFTER `progrouping_name`;


ALTER TABLE `mst_progrouping` ADD CONSTRAINT `progrouping_name` UNIQUE IF NOT EXISTS  (`progrouping_name`);







