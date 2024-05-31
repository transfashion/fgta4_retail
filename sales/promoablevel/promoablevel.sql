-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_promoablevel`;


CREATE TABLE IF NOT EXISTS `mst_promoablevel` (
	`promoablevel_id` varchar(2) NOT NULL , 
	`promoablevel_name` varchar(90) NOT NULL , 
	`promoablevel_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promoablevel_name` (`promoablevel_name`),
	PRIMARY KEY (`promoablevel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Level Promo';


ALTER TABLE `mst_promoablevel` ADD COLUMN IF NOT EXISTS  `promoablevel_name` varchar(90) NOT NULL  AFTER `promoablevel_id`;
ALTER TABLE `mst_promoablevel` ADD COLUMN IF NOT EXISTS  `promoablevel_descr` varchar(255)   AFTER `promoablevel_name`;


ALTER TABLE `mst_promoablevel` MODIFY COLUMN IF EXISTS  `promoablevel_name` varchar(90) NOT NULL   AFTER `promoablevel_id`;
ALTER TABLE `mst_promoablevel` MODIFY COLUMN IF EXISTS  `promoablevel_descr` varchar(255)    AFTER `promoablevel_name`;


ALTER TABLE `mst_promoablevel` ADD CONSTRAINT `promoablevel_name` UNIQUE IF NOT EXISTS  (`promoablevel_name`);







