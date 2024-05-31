-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchregtype`;


CREATE TABLE IF NOT EXISTS `mst_merchregtype` (
	`merchregtype_id` varchar(10)  , 
	`merchregtype_name` varchar(30)  , 
	`merchregtype_iscangenerate` tinyint(1) NOT NULL DEFAULT 0, 
	`merchregtype_descr` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchregtype_name` (`merchregtype_name`),
	PRIMARY KEY (`merchregtype_id`)
) 
ENGINE=InnoDB
COMMENT='Master Register Type';


ALTER TABLE `mst_merchregtype` ADD COLUMN IF NOT EXISTS  `merchregtype_name` varchar(30)   AFTER `merchregtype_id`;
ALTER TABLE `mst_merchregtype` ADD COLUMN IF NOT EXISTS  `merchregtype_iscangenerate` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchregtype_name`;
ALTER TABLE `mst_merchregtype` ADD COLUMN IF NOT EXISTS  `merchregtype_descr` varchar(255)   AFTER `merchregtype_iscangenerate`;


ALTER TABLE `mst_merchregtype` MODIFY COLUMN IF EXISTS  `merchregtype_name` varchar(30)    AFTER `merchregtype_id`;
ALTER TABLE `mst_merchregtype` MODIFY COLUMN IF EXISTS  `merchregtype_iscangenerate` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchregtype_name`;
ALTER TABLE `mst_merchregtype` MODIFY COLUMN IF EXISTS  `merchregtype_descr` varchar(255)    AFTER `merchregtype_iscangenerate`;


ALTER TABLE `mst_merchregtype` ADD CONSTRAINT `merchregtype_name` UNIQUE IF NOT EXISTS  (`merchregtype_name`);







