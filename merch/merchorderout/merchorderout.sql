-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchorderout`;
-- drop table if exists `trn_merchorderoutitem`;


CREATE TABLE IF NOT EXISTS `trn_merchorderout` (
	`merchorderout_id` varchar(30) NOT NULL , 
	`unit_id` varchar(30)  , 
	`merchorderout_ref` varchar(30)  , 
	`merchorderout_date` date NOT NULL , 
	`merchorderout_descr` varchar(1000)  , 
	`dept_id` varchar(30) NOT NULL , 
	`principal_partner_id` varchar(14)  , 
	`merchsea_id` varchar(10)  , 
	`curr_id` varchar(10) NOT NULL , 
	`curr_rate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`orderout_qty` int(5) NOT NULL DEFAULT 0, 
	`orderout_totalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`orderout_totalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`orderout_outstdqty` int(5) NOT NULL DEFAULT 0, 
	`orderout_outstdvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`orderout_outstdvalueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchorderout_version` int(4) NOT NULL DEFAULT 0, 
	`merchorderout_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchorderout_commitby` varchar(14)  , 
	`merchorderout_commitdate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchorderout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Shipment';


ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `merchorderout_id`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchorderout_ref` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchorderout_date` date NOT NULL  AFTER `merchorderout_ref`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchorderout_descr` varchar(1000)   AFTER `merchorderout_date`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `merchorderout_descr`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `principal_partner_id` varchar(14)   AFTER `dept_id`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `principal_partner_id`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `merchsea_id`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `orderout_qty` int(5) NOT NULL DEFAULT 0 AFTER `curr_rate`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `orderout_totalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderout_qty`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `orderout_totalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderout_totalvaluefrg`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `orderout_outstdqty` int(5) NOT NULL DEFAULT 0 AFTER `orderout_totalvalueidr`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `orderout_outstdvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderout_outstdqty`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `orderout_outstdvalueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderout_outstdvaluefrg`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchorderout_version` int(4) NOT NULL DEFAULT 0 AFTER `orderout_outstdvalueidr`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchorderout_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchorderout_version`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchorderout_commitby` varchar(14)   AFTER `merchorderout_iscommit`;
ALTER TABLE `trn_merchorderout` ADD COLUMN IF NOT EXISTS  `merchorderout_commitdate` datetime   AFTER `merchorderout_commitby`;


ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `merchorderout_id`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchorderout_ref` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchorderout_date` date NOT NULL   AFTER `merchorderout_ref`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchorderout_descr` varchar(1000)    AFTER `merchorderout_date`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL   AFTER `merchorderout_descr`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `principal_partner_id` varchar(14)    AFTER `dept_id`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)    AFTER `principal_partner_id`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `merchsea_id`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `orderout_qty` int(5) NOT NULL DEFAULT 0  AFTER `curr_rate`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `orderout_totalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderout_qty`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `orderout_totalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderout_totalvaluefrg`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `orderout_outstdqty` int(5) NOT NULL DEFAULT 0  AFTER `orderout_totalvalueidr`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `orderout_outstdvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderout_outstdqty`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `orderout_outstdvalueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderout_outstdvaluefrg`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchorderout_version` int(4) NOT NULL DEFAULT 0  AFTER `orderout_outstdvalueidr`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchorderout_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchorderout_version`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchorderout_commitby` varchar(14)    AFTER `merchorderout_iscommit`;
ALTER TABLE `trn_merchorderout` MODIFY COLUMN IF EXISTS  `merchorderout_commitdate` datetime    AFTER `merchorderout_commitby`;



ALTER TABLE `trn_merchorderout` ADD KEY IF NOT EXISTS  `merchorderout_id` (`merchorderout_id`);
ALTER TABLE `trn_merchorderout` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchorderout` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_merchorderout` ADD KEY IF NOT EXISTS `principal_partner_id` (`principal_partner_id`);
ALTER TABLE `trn_merchorderout` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `trn_merchorderout` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);

ALTER TABLE `trn_merchorderout` ADD CONSTRAINT `fk_trn_merchorderout_trn_orderout` FOREIGN KEY IF NOT EXISTS (`merchorderout_id`) REFERENCES `trn_orderout` (`orderout_id`);
ALTER TABLE `trn_merchorderout` ADD CONSTRAINT `fk_trn_merchorderout_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchorderout` ADD CONSTRAINT `fk_trn_merchorderout_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_merchorderout` ADD CONSTRAINT `fk_trn_merchorderout_mst_partner` FOREIGN KEY IF NOT EXISTS  (`principal_partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_merchorderout` ADD CONSTRAINT `fk_trn_merchorderout_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `trn_merchorderout` ADD CONSTRAINT `fk_trn_merchorderout_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);





CREATE TABLE IF NOT EXISTS `trn_merchorderoutitem` (
	`merchorderoutitem_id` varchar(14) NOT NULL , 
	`merchitem_id` varchar(14)  , 
	`merchitem_combo` varchar(103)  , 
	`orderoutitem_descr` varchar(255)  , 
	`orderoutitem_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`orderoutitem_qty` int(4) NOT NULL DEFAULT 0, 
	`orderoutitem_subtotalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`curr_rate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`orderoutitem_subtotalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`orderoutitem_outstdqty` int(5) NOT NULL DEFAULT 0, 
	`orderoutitem_outstdvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`orderoutitem_outstdvalueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchorderout_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchorderoutitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Ordered';


ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(14)   AFTER `merchorderoutitem_id`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `merchitem_combo` varchar(103)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_descr` varchar(255)   AFTER `merchitem_combo`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderoutitem_descr`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `orderoutitem_value`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_subtotalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderoutitem_qty`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `orderoutitem_subtotalvaluefrg`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_subtotalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `curr_rate`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_outstdqty` int(5) NOT NULL DEFAULT 0 AFTER `orderoutitem_subtotalvalueidr`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_outstdvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderoutitem_outstdqty`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `orderoutitem_outstdvalueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderoutitem_outstdvaluefrg`;
ALTER TABLE `trn_merchorderoutitem` ADD COLUMN IF NOT EXISTS  `merchorderout_id` varchar(30) NOT NULL  AFTER `orderoutitem_outstdvalueidr`;


ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(14)    AFTER `merchorderoutitem_id`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `merchitem_combo` varchar(103)    AFTER `merchitem_id`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_descr` varchar(255)    AFTER `merchitem_combo`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderoutitem_descr`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_qty` int(4) NOT NULL DEFAULT 0  AFTER `orderoutitem_value`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_subtotalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderoutitem_qty`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `orderoutitem_subtotalvaluefrg`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_subtotalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `curr_rate`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_outstdqty` int(5) NOT NULL DEFAULT 0  AFTER `orderoutitem_subtotalvalueidr`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_outstdvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderoutitem_outstdqty`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `orderoutitem_outstdvalueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderoutitem_outstdvaluefrg`;
ALTER TABLE `trn_merchorderoutitem` MODIFY COLUMN IF EXISTS  `merchorderout_id` varchar(30) NOT NULL   AFTER `orderoutitem_outstdvalueidr`;



ALTER TABLE `trn_merchorderoutitem` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);
ALTER TABLE `trn_merchorderoutitem` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_merchorderoutitem` ADD KEY IF NOT EXISTS `merchorderout_id` (`merchorderout_id`);

ALTER TABLE `trn_merchorderoutitem` ADD CONSTRAINT `fk_trn_merchorderoutitem_mst_merchitem` FOREIGN KEY IF NOT EXISTS  (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);
ALTER TABLE `trn_merchorderoutitem` ADD CONSTRAINT `fk_trn_merchorderoutitem_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_merchorderoutitem` ADD CONSTRAINT `fk_trn_merchorderoutitem_trn_merchorderout` FOREIGN KEY IF NOT EXISTS (`merchorderout_id`) REFERENCES `trn_merchorderout` (`merchorderout_id`);





