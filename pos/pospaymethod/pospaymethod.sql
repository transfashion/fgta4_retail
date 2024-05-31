-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `pos_paymethod`;


CREATE TABLE IF NOT EXISTS `pos_paymethod` (
	`paymethod_id` varchar(14)  , 
	`site_id` varchar(30)  , 
	`paymethod_name` varchar(60)  , 
	`paymethod_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`paymethod_order` int(4)  DEFAULT 0, 
	`paytype_id` varchar(30)  , 
	`posterminal_id` varchar(14)  , 
	`paymethod_code` varchar(30)  , 
	`paymethod_isintegrated` tinyint(1) NOT NULL DEFAULT 0, 
	`paymethod_setting` varchar(3000)  , 
	`paymethod_shortcut` varchar(15)  , 
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
	UNIQUE KEY `paymethod_name` (`site_id`, `posterminal_id`, `paymethod_name`),
	PRIMARY KEY (`paymethod_id`)
) 
ENGINE=InnoDB
COMMENT='Metode Pembayaran POS';


ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30)   AFTER `paymethod_id`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paymethod_name` varchar(60)   AFTER `site_id`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paymethod_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `paymethod_name`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paymethod_order` int(4)  DEFAULT 0 AFTER `paymethod_isdisabled`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_id` varchar(30)   AFTER `paymethod_order`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `posterminal_id` varchar(14)   AFTER `paytype_id`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paymethod_code` varchar(30)   AFTER `posterminal_id`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paymethod_isintegrated` tinyint(1) NOT NULL DEFAULT 0 AFTER `paymethod_code`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paymethod_setting` varchar(3000)   AFTER `paymethod_isintegrated`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paymethod_shortcut` varchar(15)   AFTER `paymethod_setting`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_iscash` tinyint(1) NOT NULL DEFAULT 0 AFTER `paymethod_shortcut`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_isvoucher` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_iscash`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_isedc` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_isvoucher`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_istransfer` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_isedc`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_isonline` tinyint(1) NOT NULL DEFAULT 0 AFTER `paytype_istransfer`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_nameinputtype` varchar(60)   AFTER `paytype_isonline`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_cardinputtype` varchar(60)   AFTER `paytype_nameinputtype`;
ALTER TABLE `pos_paymethod` ADD COLUMN IF NOT EXISTS  `paytype_apprinputtype` varchar(60)   AFTER `paytype_cardinputtype`;


ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `site_id` varchar(30)    AFTER `paymethod_id`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paymethod_name` varchar(60)    AFTER `site_id`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paymethod_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `paymethod_name`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paymethod_order` int(4)  DEFAULT 0  AFTER `paymethod_isdisabled`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_id` varchar(30)    AFTER `paymethod_order`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `posterminal_id` varchar(14)    AFTER `paytype_id`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paymethod_code` varchar(30)    AFTER `posterminal_id`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paymethod_isintegrated` tinyint(1) NOT NULL DEFAULT 0  AFTER `paymethod_code`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paymethod_setting` varchar(3000)    AFTER `paymethod_isintegrated`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paymethod_shortcut` varchar(15)    AFTER `paymethod_setting`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_iscash` tinyint(1) NOT NULL DEFAULT 0  AFTER `paymethod_shortcut`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_isvoucher` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_iscash`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_isedc` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_isvoucher`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_istransfer` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_isedc`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_isonline` tinyint(1) NOT NULL DEFAULT 0  AFTER `paytype_istransfer`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_nameinputtype` varchar(60)    AFTER `paytype_isonline`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_cardinputtype` varchar(60)    AFTER `paytype_nameinputtype`;
ALTER TABLE `pos_paymethod` MODIFY COLUMN IF EXISTS  `paytype_apprinputtype` varchar(60)    AFTER `paytype_cardinputtype`;


ALTER TABLE `pos_paymethod` ADD CONSTRAINT `paymethod_name` UNIQUE IF NOT EXISTS  (`site_id`, `posterminal_id`, `paymethod_name`);

ALTER TABLE `pos_paymethod` ADD KEY IF NOT EXISTS `site_id` (`site_id`);
ALTER TABLE `pos_paymethod` ADD KEY IF NOT EXISTS `paytype_id` (`paytype_id`);
ALTER TABLE `pos_paymethod` ADD KEY IF NOT EXISTS `posterminal_id` (`posterminal_id`);

ALTER TABLE `pos_paymethod` ADD CONSTRAINT `fk_pos_paymethod_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `pos_paymethod` ADD CONSTRAINT `fk_pos_paymethod_pos_paytype` FOREIGN KEY IF NOT EXISTS  (`paytype_id`) REFERENCES `pos_paytype` (`paytype_id`);
ALTER TABLE `pos_paymethod` ADD CONSTRAINT `fk_pos_paymethod_mst_posterminal` FOREIGN KEY IF NOT EXISTS  (`posterminal_id`) REFERENCES `mst_posterminal` (`posterminal_id`);





