-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_promoabdiscspot`;


CREATE TABLE IF NOT EXISTS `mst_promoabdiscspot` (
	`promoabdiscspot_id` varchar(2) NOT NULL , 
	`promoabdiscspot_name` varchar(90) NOT NULL , 
	`promoabdiscspot_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promoabdiscspot_name` (`promoabdiscspot_name`),
	PRIMARY KEY (`promoabdiscspot_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Spot Disc Promo';


ALTER TABLE `mst_promoabdiscspot` ADD COLUMN IF NOT EXISTS  `promoabdiscspot_name` varchar(90) NOT NULL  AFTER `promoabdiscspot_id`;
ALTER TABLE `mst_promoabdiscspot` ADD COLUMN IF NOT EXISTS  `promoabdiscspot_descr` varchar(255)   AFTER `promoabdiscspot_name`;


ALTER TABLE `mst_promoabdiscspot` MODIFY COLUMN IF EXISTS  `promoabdiscspot_name` varchar(90) NOT NULL   AFTER `promoabdiscspot_id`;
ALTER TABLE `mst_promoabdiscspot` MODIFY COLUMN IF EXISTS  `promoabdiscspot_descr` varchar(255)    AFTER `promoabdiscspot_name`;


ALTER TABLE `mst_promoabdiscspot` ADD CONSTRAINT `promoabdiscspot_name` UNIQUE IF NOT EXISTS  (`promoabdiscspot_name`);







