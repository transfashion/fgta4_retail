-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_problock`;


CREATE TABLE IF NOT EXISTS `mst_problock` (
	`problock_id` varchar(2) NOT NULL , 
	`problock_name` varchar(90) NOT NULL , 
	`problock_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `problock_name` (`problock_name`),
	PRIMARY KEY (`problock_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Level Promo';


ALTER TABLE `mst_problock` ADD COLUMN IF NOT EXISTS  `problock_name` varchar(90) NOT NULL  AFTER `problock_id`;
ALTER TABLE `mst_problock` ADD COLUMN IF NOT EXISTS  `problock_descr` varchar(255)   AFTER `problock_name`;


ALTER TABLE `mst_problock` MODIFY COLUMN IF EXISTS  `problock_name` varchar(90) NOT NULL   AFTER `problock_id`;
ALTER TABLE `mst_problock` MODIFY COLUMN IF EXISTS  `problock_descr` varchar(255)    AFTER `problock_name`;


ALTER TABLE `mst_problock` ADD CONSTRAINT `problock_name` UNIQUE IF NOT EXISTS  (`problock_name`);







