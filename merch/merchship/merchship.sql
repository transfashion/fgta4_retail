-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchship`;
-- drop table if exists `trn_merchshiporderout`;
-- drop table if exists `trn_merchshipbudget`;


CREATE TABLE IF NOT EXISTS `trn_merchship` (
	`merchship_id` varchar(30) NOT NULL , 
	`unit_id` varchar(30)  , 
	`principal_partner_id` varchar(14)  , 
	`fowarder_partner_id` varchar(14)  , 
	`merchship_descr` varchar(255)  , 
	`merchship_date` date NOT NULL , 
	`periodemo_id` varchar(6)  , 
	`merchship_qty` int(5) NOT NULL DEFAULT 0, 
	`merchship_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`merchship_rate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`dept_id` varchar(30)  , 
	`merchship_version` int(4) NOT NULL DEFAULT 0, 
	`merchship_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchship_commitby` varchar(14)  , 
	`merchship_commitdate` datetime  , 
	`merchship_isverify` tinyint(1) NOT NULL DEFAULT 0, 
	`merchship_verifyby` varchar(14)  , 
	`merchship_verifydate` datetime  , 
	`merchship_iscalculate` tinyint(1) NOT NULL DEFAULT 0, 
	`merchship_calculateby` varchar(14)  , 
	`merchship_calculatedate` datetime  , 
	`merchship_isexecute` tinyint(1) NOT NULL DEFAULT 0, 
	`merchship_executeby` varchar(14)  , 
	`merchship_executedate` datetime  , 
	`merchship_isbill` tinyint(1) NOT NULL DEFAULT 0, 
	`merchship_billby` varchar(14)  , 
	`merchship_billdate` datetime  , 
	`merchship_iscost` tinyint(1) NOT NULL DEFAULT 0, 
	`merchship_costby` varchar(14)  , 
	`merchship_costydate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchship_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Shipment';


ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `merchship_id`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `principal_partner_id` varchar(14)   AFTER `unit_id`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `fowarder_partner_id` varchar(14)   AFTER `principal_partner_id`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_descr` varchar(255)   AFTER `fowarder_partner_id`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_date` date NOT NULL  AFTER `merchship_descr`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6)   AFTER `merchship_date`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_qty` int(5) NOT NULL DEFAULT 0 AFTER `periodemo_id`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchship_qty`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `merchship_value`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_rate` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `merchship_rate`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_version` int(4) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchship_version`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_commitby` varchar(14)   AFTER `merchship_iscommit`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_commitdate` datetime   AFTER `merchship_commitby`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_isverify` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchship_commitdate`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_verifyby` varchar(14)   AFTER `merchship_isverify`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_verifydate` datetime   AFTER `merchship_verifyby`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_iscalculate` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchship_verifydate`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_calculateby` varchar(14)   AFTER `merchship_iscalculate`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_calculatedate` datetime   AFTER `merchship_calculateby`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_isexecute` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchship_calculatedate`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_executeby` varchar(14)   AFTER `merchship_isexecute`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_executedate` datetime   AFTER `merchship_executeby`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_isbill` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchship_executedate`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_billby` varchar(14)   AFTER `merchship_isbill`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_billdate` datetime   AFTER `merchship_billby`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_iscost` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchship_billdate`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_costby` varchar(14)   AFTER `merchship_iscost`;
ALTER TABLE `trn_merchship` ADD COLUMN IF NOT EXISTS  `merchship_costydate` datetime   AFTER `merchship_costby`;


ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `merchship_id`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `principal_partner_id` varchar(14)    AFTER `unit_id`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `fowarder_partner_id` varchar(14)    AFTER `principal_partner_id`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_descr` varchar(255)    AFTER `fowarder_partner_id`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_date` date NOT NULL   AFTER `merchship_descr`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6)    AFTER `merchship_date`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_qty` int(5) NOT NULL DEFAULT 0  AFTER `periodemo_id`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchship_qty`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `merchship_value`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_rate` decimal(12, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)    AFTER `merchship_rate`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_version` int(4) NOT NULL DEFAULT 0  AFTER `dept_id`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchship_version`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_commitby` varchar(14)    AFTER `merchship_iscommit`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_commitdate` datetime    AFTER `merchship_commitby`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_isverify` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchship_commitdate`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_verifyby` varchar(14)    AFTER `merchship_isverify`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_verifydate` datetime    AFTER `merchship_verifyby`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_iscalculate` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchship_verifydate`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_calculateby` varchar(14)    AFTER `merchship_iscalculate`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_calculatedate` datetime    AFTER `merchship_calculateby`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_isexecute` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchship_calculatedate`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_executeby` varchar(14)    AFTER `merchship_isexecute`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_executedate` datetime    AFTER `merchship_executeby`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_isbill` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchship_executedate`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_billby` varchar(14)    AFTER `merchship_isbill`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_billdate` datetime    AFTER `merchship_billby`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_iscost` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchship_billdate`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_costby` varchar(14)    AFTER `merchship_iscost`;
ALTER TABLE `trn_merchship` MODIFY COLUMN IF EXISTS  `merchship_costydate` datetime    AFTER `merchship_costby`;



ALTER TABLE `trn_merchship` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchship` ADD KEY IF NOT EXISTS `principal_partner_id` (`principal_partner_id`);
ALTER TABLE `trn_merchship` ADD KEY IF NOT EXISTS `fowarder_partner_id` (`fowarder_partner_id`);
ALTER TABLE `trn_merchship` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_merchship` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_merchship` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);

ALTER TABLE `trn_merchship` ADD CONSTRAINT `fk_trn_merchship_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchship` ADD CONSTRAINT `fk_trn_merchship_mst_partner` FOREIGN KEY IF NOT EXISTS  (`principal_partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_merchship` ADD CONSTRAINT `fk_trn_merchship_mst_partner_2` FOREIGN KEY IF NOT EXISTS  (`fowarder_partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_merchship` ADD CONSTRAINT `fk_trn_merchship_mst_periodemo` FOREIGN KEY IF NOT EXISTS  (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_merchship` ADD CONSTRAINT `fk_trn_merchship_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_merchship` ADD CONSTRAINT `fk_trn_merchship_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE IF NOT EXISTS `trn_merchshiporderout` (
	`merchshiporderout_id` varchar(14)  , 
	`merchorderout_id` varchar(30)  , 
	`merchsea_id` varchar(10)  , 
	`curr_id` varchar(10) NOT NULL , 
	`orderout_qty` int(5) NOT NULL DEFAULT 0, 
	`orderout_valuefrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`orderout_valueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchship_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchshiporderout_id`)
) 
ENGINE=InnoDB
COMMENT='Budget dari Shipment';


ALTER TABLE `trn_merchshiporderout` ADD COLUMN IF NOT EXISTS  `merchorderout_id` varchar(30)   AFTER `merchshiporderout_id`;
ALTER TABLE `trn_merchshiporderout` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `merchorderout_id`;
ALTER TABLE `trn_merchshiporderout` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `merchsea_id`;
ALTER TABLE `trn_merchshiporderout` ADD COLUMN IF NOT EXISTS  `orderout_qty` int(5) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_merchshiporderout` ADD COLUMN IF NOT EXISTS  `orderout_valuefrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderout_qty`;
ALTER TABLE `trn_merchshiporderout` ADD COLUMN IF NOT EXISTS  `orderout_valueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `orderout_valuefrg`;
ALTER TABLE `trn_merchshiporderout` ADD COLUMN IF NOT EXISTS  `merchship_id` varchar(30) NOT NULL  AFTER `orderout_valueidr`;


ALTER TABLE `trn_merchshiporderout` MODIFY COLUMN IF EXISTS  `merchorderout_id` varchar(30)    AFTER `merchshiporderout_id`;
ALTER TABLE `trn_merchshiporderout` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)    AFTER `merchorderout_id`;
ALTER TABLE `trn_merchshiporderout` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `merchsea_id`;
ALTER TABLE `trn_merchshiporderout` MODIFY COLUMN IF EXISTS  `orderout_qty` int(5) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_merchshiporderout` MODIFY COLUMN IF EXISTS  `orderout_valuefrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderout_qty`;
ALTER TABLE `trn_merchshiporderout` MODIFY COLUMN IF EXISTS  `orderout_valueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `orderout_valuefrg`;
ALTER TABLE `trn_merchshiporderout` MODIFY COLUMN IF EXISTS  `merchship_id` varchar(30) NOT NULL   AFTER `orderout_valueidr`;



ALTER TABLE `trn_merchshiporderout` ADD KEY IF NOT EXISTS `merchorderout_id` (`merchorderout_id`);
ALTER TABLE `trn_merchshiporderout` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `trn_merchshiporderout` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_merchshiporderout` ADD KEY IF NOT EXISTS `merchship_id` (`merchship_id`);

ALTER TABLE `trn_merchshiporderout` ADD CONSTRAINT `fk_trn_merchshiporderout_trn_merchorderout` FOREIGN KEY IF NOT EXISTS  (`merchorderout_id`) REFERENCES `trn_merchorderout` (`merchorderout_id`);
ALTER TABLE `trn_merchshiporderout` ADD CONSTRAINT `fk_trn_merchshiporderout_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `trn_merchshiporderout` ADD CONSTRAINT `fk_trn_merchshiporderout_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_merchshiporderout` ADD CONSTRAINT `fk_trn_merchshiporderout_trn_merchship` FOREIGN KEY IF NOT EXISTS (`merchship_id`) REFERENCES `trn_merchship` (`merchship_id`);





CREATE TABLE IF NOT EXISTS `trn_merchshipbudget` (
	`merchshipbudget_id` varchar(14)  , 
	`merchshipbudgetacc_id` varchar(10) NOT NULL , 
	`merchshipbudget_descr` varchar(255)  , 
	`merchshipbudget_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`curr_rate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchshipbudget_idr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchshipbudget_alcvalue` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchshipbudget_alcidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchshipbudget_relvalue` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchshipbudget_relidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchship_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchshipbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Budget dari Shipment';


ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudgetacc_id` varchar(10) NOT NULL  AFTER `merchshipbudget_id`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudget_descr` varchar(255)   AFTER `merchshipbudgetacc_id`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudget_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchshipbudget_descr`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `merchshipbudget_value`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudget_idr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `curr_rate`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudget_alcvalue` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchshipbudget_idr`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudget_alcidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchshipbudget_alcvalue`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudget_relvalue` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchshipbudget_alcidr`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchshipbudget_relidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchshipbudget_relvalue`;
ALTER TABLE `trn_merchshipbudget` ADD COLUMN IF NOT EXISTS  `merchship_id` varchar(30) NOT NULL  AFTER `merchshipbudget_relidr`;


ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudgetacc_id` varchar(10) NOT NULL   AFTER `merchshipbudget_id`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudget_descr` varchar(255)    AFTER `merchshipbudgetacc_id`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudget_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchshipbudget_descr`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `merchshipbudget_value`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudget_idr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `curr_rate`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudget_alcvalue` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchshipbudget_idr`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudget_alcidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchshipbudget_alcvalue`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudget_relvalue` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchshipbudget_alcidr`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchshipbudget_relidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchshipbudget_relvalue`;
ALTER TABLE `trn_merchshipbudget` MODIFY COLUMN IF EXISTS  `merchship_id` varchar(30) NOT NULL   AFTER `merchshipbudget_relidr`;



ALTER TABLE `trn_merchshipbudget` ADD KEY IF NOT EXISTS `merchshipbudgetacc_id` (`merchshipbudgetacc_id`);
ALTER TABLE `trn_merchshipbudget` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_merchshipbudget` ADD KEY IF NOT EXISTS `merchship_id` (`merchship_id`);

ALTER TABLE `trn_merchshipbudget` ADD CONSTRAINT `fk_trn_merchshipbudget_mst_merchshipbudgetacc` FOREIGN KEY IF NOT EXISTS  (`merchshipbudgetacc_id`) REFERENCES `mst_merchshipbudgetacc` (`merchshipbudgetacc_id`);
ALTER TABLE `trn_merchshipbudget` ADD CONSTRAINT `fk_trn_merchshipbudget_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_merchshipbudget` ADD CONSTRAINT `fk_trn_merchshipbudget_trn_merchship` FOREIGN KEY IF NOT EXISTS (`merchship_id`) REFERENCES `trn_merchship` (`merchship_id`);





