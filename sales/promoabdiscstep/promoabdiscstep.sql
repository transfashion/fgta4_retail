-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_promoabdiscstep`;


CREATE TABLE IF NOT EXISTS `mst_promoabdiscstep` (
	`promoabdiscstep_id` varchar(2) NOT NULL , 
	`promoabdiscstep_name` varchar(90) NOT NULL , 
	`promoabdiscstep_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promoabdiscstep_name` (`promoabdiscstep_name`),
	PRIMARY KEY (`promoabdiscstep_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Step Disc Promo';


ALTER TABLE `mst_promoabdiscstep` ADD COLUMN IF NOT EXISTS  `promoabdiscstep_name` varchar(90) NOT NULL  AFTER `promoabdiscstep_id`;
ALTER TABLE `mst_promoabdiscstep` ADD COLUMN IF NOT EXISTS  `promoabdiscstep_descr` varchar(255)   AFTER `promoabdiscstep_name`;


ALTER TABLE `mst_promoabdiscstep` MODIFY COLUMN IF EXISTS  `promoabdiscstep_name` varchar(90) NOT NULL   AFTER `promoabdiscstep_id`;
ALTER TABLE `mst_promoabdiscstep` MODIFY COLUMN IF EXISTS  `promoabdiscstep_descr` varchar(255)    AFTER `promoabdiscstep_name`;


ALTER TABLE `mst_promoabdiscstep` ADD CONSTRAINT `promoabdiscstep_name` UNIQUE IF NOT EXISTS  (`promoabdiscstep_name`);







