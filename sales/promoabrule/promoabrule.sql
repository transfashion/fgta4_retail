-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_promoabrule`;
-- drop table if exists `mst_promoabrulesection`;


CREATE TABLE IF NOT EXISTS `mst_promoabrule` (
	`promoabrule_id` varchar(2) NOT NULL , 
	`promoablevel_id` varchar(2)  , 
	`promoabrule_code` varchar(3)  , 
	`promoabrule_name` varchar(10) NOT NULL , 
	`promoabrule_descr` varchar(255)  , 
	`promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0, 
	`promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promoabrule_code` (`promoabrule_code`),
	UNIQUE KEY `promoabrule_name` (`promoabrule_name`),
	PRIMARY KEY (`promoabrule_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Rule Promo';


ALTER TABLE `mst_promoabrule` ADD COLUMN IF NOT EXISTS  `promoablevel_id` varchar(2)   AFTER `promoabrule_id`;
ALTER TABLE `mst_promoabrule` ADD COLUMN IF NOT EXISTS  `promoabrule_code` varchar(3)   AFTER `promoablevel_id`;
ALTER TABLE `mst_promoabrule` ADD COLUMN IF NOT EXISTS  `promoabrule_name` varchar(10) NOT NULL  AFTER `promoabrule_code`;
ALTER TABLE `mst_promoabrule` ADD COLUMN IF NOT EXISTS  `promoabrule_descr` varchar(255)   AFTER `promoabrule_name`;
ALTER TABLE `mst_promoabrule` ADD COLUMN IF NOT EXISTS  `promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoabrule_descr`;
ALTER TABLE `mst_promoabrule` ADD COLUMN IF NOT EXISTS  `promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoabrule_ishasgroupa`;


ALTER TABLE `mst_promoabrule` MODIFY COLUMN IF EXISTS  `promoablevel_id` varchar(2)    AFTER `promoabrule_id`;
ALTER TABLE `mst_promoabrule` MODIFY COLUMN IF EXISTS  `promoabrule_code` varchar(3)    AFTER `promoablevel_id`;
ALTER TABLE `mst_promoabrule` MODIFY COLUMN IF EXISTS  `promoabrule_name` varchar(10) NOT NULL   AFTER `promoabrule_code`;
ALTER TABLE `mst_promoabrule` MODIFY COLUMN IF EXISTS  `promoabrule_descr` varchar(255)    AFTER `promoabrule_name`;
ALTER TABLE `mst_promoabrule` MODIFY COLUMN IF EXISTS  `promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoabrule_descr`;
ALTER TABLE `mst_promoabrule` MODIFY COLUMN IF EXISTS  `promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoabrule_ishasgroupa`;


ALTER TABLE `mst_promoabrule` ADD CONSTRAINT `promoabrule_code` UNIQUE IF NOT EXISTS  (`promoabrule_code`);
ALTER TABLE `mst_promoabrule` ADD CONSTRAINT `promoabrule_name` UNIQUE IF NOT EXISTS  (`promoabrule_name`);

ALTER TABLE `mst_promoabrule` ADD KEY IF NOT EXISTS `promoablevel_id` (`promoablevel_id`);

ALTER TABLE `mst_promoabrule` ADD CONSTRAINT `fk_mst_promoabrule_mst_promoablevel` FOREIGN KEY IF NOT EXISTS  (`promoablevel_id`) REFERENCES `mst_promoablevel` (`promoablevel_id`);





CREATE TABLE IF NOT EXISTS `mst_promoabrulesection` (
	`promoabrulesection_id` varchar(14) NOT NULL , 
	`promoabrulesection_name` varchar(20) NOT NULL , 
	`promoabrulesection_descr` varchar(255)  , 
	`promoabrule_id` varchar(2) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promoabrulesection_name` (`promoabrule_id`, `promoabrulesection_name`),
	PRIMARY KEY (`promoabrulesection_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Rule Promo';


ALTER TABLE `mst_promoabrulesection` ADD COLUMN IF NOT EXISTS  `promoabrulesection_name` varchar(20) NOT NULL  AFTER `promoabrulesection_id`;
ALTER TABLE `mst_promoabrulesection` ADD COLUMN IF NOT EXISTS  `promoabrulesection_descr` varchar(255)   AFTER `promoabrulesection_name`;
ALTER TABLE `mst_promoabrulesection` ADD COLUMN IF NOT EXISTS  `promoabrule_id` varchar(2) NOT NULL  AFTER `promoabrulesection_descr`;


ALTER TABLE `mst_promoabrulesection` MODIFY COLUMN IF EXISTS  `promoabrulesection_name` varchar(20) NOT NULL   AFTER `promoabrulesection_id`;
ALTER TABLE `mst_promoabrulesection` MODIFY COLUMN IF EXISTS  `promoabrulesection_descr` varchar(255)    AFTER `promoabrulesection_name`;
ALTER TABLE `mst_promoabrulesection` MODIFY COLUMN IF EXISTS  `promoabrule_id` varchar(2) NOT NULL   AFTER `promoabrulesection_descr`;


ALTER TABLE `mst_promoabrulesection` ADD CONSTRAINT `promoabrulesection_name` UNIQUE IF NOT EXISTS  (`promoabrule_id`, `promoabrulesection_name`);

ALTER TABLE `mst_promoabrulesection` ADD KEY IF NOT EXISTS `promoabrule_id` (`promoabrule_id`);

ALTER TABLE `mst_promoabrulesection` ADD CONSTRAINT `fk_mst_promoabrulesection_mst_promoabrule` FOREIGN KEY IF NOT EXISTS (`promoabrule_id`) REFERENCES `mst_promoabrule` (`promoabrule_id`);





