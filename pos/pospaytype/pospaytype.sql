-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `pos_paytype`;


CREATE TABLE IF NOT EXISTS `pos_paytype` (
	`paytype_id` varchar(14)  , 
	`paytype_name` varchar(60)  , 
	`paytype_iscash` tinyint(1) NOT NULL DEFAULT 0, 
	`paytype_isvoucher` tinyint(1) NOT NULL DEFAULT 0, 
	`paytype_isedc` tinyint(1) NOT NULL DEFAULT 0, 
	`paytype_istransfer` tinyint(1) NOT NULL DEFAULT 0, 
	`paytype_isonline` tinyint(1) NOT NULL DEFAULT 0, 
	`paytype_nameinputtype` varchar(60)  , 
	`paytype_cardinputtype` varchar(60)  , 
	`paytype_apprinputtype` varchar(60)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `paytype_name` (`paytype_name`),
	PRIMARY KEY (`paytype_id`)
) 
ENGINE=InnoDB
COMMENT='Metode Pembayaran POS';


ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_name` varchar(60)   AFTER `paytype_id`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_iscash` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_name`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_isvoucher` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_iscash`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_isedc` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_isvoucher`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_istransfer` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_isedc`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_isonline` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_istransfer`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_nameinputtype` varchar(60)   AFTER `paytype_isonline`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_cardinputtype` varchar(60)   AFTER `paytype_nameinputtype`;
ALTER TABLE `pos_paytype` ADD COLUMN IF NOT EXISTS  `paytype_apprinputtype` varchar(60)   AFTER `paytype_cardinputtype`;


ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_name` varchar(60)    AFTER `paytype_id`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_iscash` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_name`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_isvoucher` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_iscash`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_isedc` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_isvoucher`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_istransfer` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_isedc`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_isonline` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_istransfer`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_nameinputtype` varchar(60)    AFTER `paytype_isonline`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_cardinputtype` varchar(60)    AFTER `paytype_nameinputtype`;
ALTER TABLE `pos_paytype` MODIFY COLUMN IF EXISTS  `paytype_apprinputtype` varchar(60)    AFTER `paytype_cardinputtype`;


ALTER TABLE `pos_paytype` ADD CONSTRAINT `paytype_name` UNIQUE IF NOT EXISTS  (`paytype_name`);







