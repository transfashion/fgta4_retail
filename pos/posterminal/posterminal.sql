-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_posterminal`;


CREATE TABLE IF NOT EXISTS `mst_posterminal` (
	`posterminal_id` varchar(14)  , 
	`site_id` varchar(30)  , 
	`store_code` varchar(3)  , 
	`posterminal_code` varchar(2)  , 
	`posterminal_license` varchar(64)  , 
	`posterminal_licenseunlimited` tinyint(1) NOT NULL DEFAULT 0, 
	`posterminal_expireddate` date NOT NULL , 
	`posterminal_setupcode` varchar(6)  , 
	`posterminal_islock` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `posterminal_code` (`store_code`, `posterminal_code`),
	UNIQUE KEY `posterminal_setupcode` (`site_id`, `posterminal_setupcode`),
	PRIMARY KEY (`posterminal_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Topup Allo';


ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30)   AFTER `posterminal_id`;
ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `store_code` varchar(3)   AFTER `site_id`;
ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `posterminal_code` varchar(2)   AFTER `store_code`;
ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `posterminal_license` varchar(64)   AFTER `posterminal_code`;
ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `posterminal_licenseunlimited` tinyint(1) NOT NULL DEFAULT 0 AFTER `posterminal_license`;
ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `posterminal_expireddate` date NOT NULL  AFTER `posterminal_licenseunlimited`;
ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `posterminal_setupcode` varchar(6)   AFTER `posterminal_expireddate`;
ALTER TABLE `mst_posterminal` ADD COLUMN IF NOT EXISTS  `posterminal_islock` tinyint(1) NOT NULL DEFAULT 0 AFTER `posterminal_setupcode`;


ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `site_id` varchar(30)   AFTER `posterminal_id`;
ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `store_code` varchar(3)   AFTER `site_id`;
ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `posterminal_code` varchar(2)   AFTER `store_code`;
ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `posterminal_license` varchar(64)   AFTER `posterminal_code`;
ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `posterminal_licenseunlimited` tinyint(1) NOT NULL DEFAULT 0 AFTER `posterminal_license`;
ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `posterminal_expireddate` date NOT NULL  AFTER `posterminal_licenseunlimited`;
ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `posterminal_setupcode` varchar(6)   AFTER `posterminal_expireddate`;
ALTER TABLE `mst_posterminal` MODIFY COLUMN IF EXISTS  `posterminal_islock` tinyint(1) NOT NULL DEFAULT 0 AFTER `posterminal_setupcode`;


ALTER TABLE `mst_posterminal` ADD CONSTRAINT `posterminal_code` UNIQUE IF NOT EXISTS  (`store_code`, `posterminal_code`);
ALTER TABLE `mst_posterminal` ADD CONSTRAINT `posterminal_setupcode` UNIQUE IF NOT EXISTS  (`site_id`, `posterminal_setupcode`);

ALTER TABLE `mst_posterminal` ADD KEY IF NOT EXISTS `site_id` (`site_id`);

ALTER TABLE `mst_posterminal` ADD CONSTRAINT `fk_mst_posterminal_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);





