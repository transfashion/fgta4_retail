-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_prospot`;


CREATE TABLE IF NOT EXISTS `mst_prospot` (
	`prospot_id` varchar(2) NOT NULL , 
	`prospot_name` varchar(90) NOT NULL , 
	`prospot_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `prospot_name` (`prospot_name`),
	PRIMARY KEY (`prospot_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Spot Disc Promo';


ALTER TABLE `mst_prospot` ADD COLUMN IF NOT EXISTS  `prospot_name` varchar(90) NOT NULL  AFTER `prospot_id`;
ALTER TABLE `mst_prospot` ADD COLUMN IF NOT EXISTS  `prospot_descr` varchar(255)   AFTER `prospot_name`;


ALTER TABLE `mst_prospot` MODIFY COLUMN IF EXISTS  `prospot_name` varchar(90) NOT NULL   AFTER `prospot_id`;
ALTER TABLE `mst_prospot` MODIFY COLUMN IF EXISTS  `prospot_descr` varchar(255)    AFTER `prospot_name`;


ALTER TABLE `mst_prospot` ADD CONSTRAINT `prospot_name` UNIQUE IF NOT EXISTS  (`prospot_name`);







