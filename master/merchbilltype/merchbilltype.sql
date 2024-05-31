-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchbilltype`;


CREATE TABLE IF NOT EXISTS `mst_merchbilltype` (
	`merchbilltype_id` varchar(10) NOT NULL , 
	`merchbilltype_name` varchar(90) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchbilltype_name` (`merchbilltype_name`),
	PRIMARY KEY (`merchbilltype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Type Bill';


ALTER TABLE `mst_merchbilltype` ADD COLUMN IF NOT EXISTS  `merchbilltype_name` varchar(90) NOT NULL  AFTER `merchbilltype_id`;


ALTER TABLE `mst_merchbilltype` MODIFY COLUMN IF EXISTS  `merchbilltype_name` varchar(90) NOT NULL   AFTER `merchbilltype_id`;


ALTER TABLE `mst_merchbilltype` ADD CONSTRAINT `merchbilltype_name` UNIQUE IF NOT EXISTS  (`merchbilltype_name`);




INSERT INTO mst_merchbilltype (`merchbilltype_id`, `merchbilltype_name`, `_createby`, `_createdate`) VALUES ('B001', 'ITEMS INVOICE', 'root', NOW());
INSERT INTO mst_merchbilltype (`merchbilltype_id`, `merchbilltype_name`, `_createby`, `_createdate`) VALUES ('B002', 'IMPORT DUTY', 'root', NOW());
INSERT INTO mst_merchbilltype (`merchbilltype_id`, `merchbilltype_name`, `_createby`, `_createdate`) VALUES ('B003', 'FREIGHT', 'root', NOW());
INSERT INTO mst_merchbilltype (`merchbilltype_id`, `merchbilltype_name`, `_createby`, `_createdate`) VALUES ('B004', 'CLEARANCE', 'root', NOW());
INSERT INTO mst_merchbilltype (`merchbilltype_id`, `merchbilltype_name`, `_createby`, `_createdate`) VALUES ('B005', 'PORT CHARGE', 'root', NOW());
INSERT INTO mst_merchbilltype (`merchbilltype_id`, `merchbilltype_name`, `_createby`, `_createdate`) VALUES ('B006', 'INSURANCE', 'root', NOW());
INSERT INTO mst_merchbilltype (`merchbilltype_id`, `merchbilltype_name`, `_createby`, `_createdate`) VALUES ('B007', 'INSPECTIONS', 'root', NOW());



