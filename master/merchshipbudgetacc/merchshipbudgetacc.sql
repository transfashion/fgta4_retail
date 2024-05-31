-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchshipbudgetacc`;


CREATE TABLE IF NOT EXISTS `mst_merchshipbudgetacc` (
	`merchshipbudgetacc_id` varchar(10) NOT NULL , 
	`merchshipbudgetacc_name` varchar(90) NOT NULL , 
	`merchshipbudgetacc_group` varchar(90) NOT NULL , 
	`merchshipbudgetacc_isexclude` tinyint(1) NOT NULL DEFAULT 0, 
	`coa_id` varchar(20)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchshipbudgetacc_name` (`merchshipbudgetacc_name`),
	PRIMARY KEY (`merchshipbudgetacc_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Shipment Budget';


ALTER TABLE `mst_merchshipbudgetacc` ADD COLUMN IF NOT EXISTS  `merchshipbudgetacc_name` varchar(90) NOT NULL  AFTER `merchshipbudgetacc_id`;
ALTER TABLE `mst_merchshipbudgetacc` ADD COLUMN IF NOT EXISTS  `merchshipbudgetacc_group` varchar(90) NOT NULL  AFTER `merchshipbudgetacc_name`;
ALTER TABLE `mst_merchshipbudgetacc` ADD COLUMN IF NOT EXISTS  `merchshipbudgetacc_isexclude` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchshipbudgetacc_group`;
ALTER TABLE `mst_merchshipbudgetacc` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(20)   AFTER `merchshipbudgetacc_isexclude`;


ALTER TABLE `mst_merchshipbudgetacc` MODIFY COLUMN IF EXISTS  `merchshipbudgetacc_name` varchar(90) NOT NULL   AFTER `merchshipbudgetacc_id`;
ALTER TABLE `mst_merchshipbudgetacc` MODIFY COLUMN IF EXISTS  `merchshipbudgetacc_group` varchar(90) NOT NULL   AFTER `merchshipbudgetacc_name`;
ALTER TABLE `mst_merchshipbudgetacc` MODIFY COLUMN IF EXISTS  `merchshipbudgetacc_isexclude` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchshipbudgetacc_group`;
ALTER TABLE `mst_merchshipbudgetacc` MODIFY COLUMN IF EXISTS  `coa_id` varchar(20)    AFTER `merchshipbudgetacc_isexclude`;


ALTER TABLE `mst_merchshipbudgetacc` ADD CONSTRAINT `merchshipbudgetacc_name` UNIQUE IF NOT EXISTS  (`merchshipbudgetacc_name`);

ALTER TABLE `mst_merchshipbudgetacc` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);

ALTER TABLE `mst_merchshipbudgetacc` ADD CONSTRAINT `fk_mst_merchshipbudgetacc_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);





