-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchbillin`;
-- drop table if exists `trn_merchbillindet`;


CREATE TABLE IF NOT EXISTS `trn_merchbillin` (
	`merchbillin_id` varchar(30) NOT NULL , 
	`merchbilltype_id` varchar(10)  , 
	`merchbillin_isproforma` tinyint(1) NOT NULL DEFAULT 0, 
	`unit_id` varchar(30)  , 
	`merchship_id` varchar(30)  , 
	`merchbillin_ref` varchar(30)  , 
	`merchbillin_date` date NOT NULL , 
	`merchbillin_datedue` date NOT NULL , 
	`merchbillin_descr` varchar(255)  , 
	`periodemo_id` varchar(6) NOT NULL , 
	`merchbillin_version` int(4) NOT NULL DEFAULT 0, 
	`merchbillin_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchbillin_commitby` varchar(14)  , 
	`merchbillin_commitdate` datetime  , 
	`merchbillin_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`merchbillin_postby` varchar(14)  , 
	`merchbillin_postdate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchbillin_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Receiving Dokumen';


ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbilltype_id` varchar(10)   AFTER `merchbillin_id`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_isproforma` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchbilltype_id`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `merchbillin_isproforma`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchship_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_ref` varchar(30)   AFTER `merchship_id`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_date` date NOT NULL  AFTER `merchbillin_ref`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_datedue` date NOT NULL  AFTER `merchbillin_date`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_descr` varchar(255)   AFTER `merchbillin_datedue`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6) NOT NULL  AFTER `merchbillin_descr`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_version` int(4) NOT NULL DEFAULT 0 AFTER `periodemo_id`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchbillin_version`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_commitby` varchar(14)   AFTER `merchbillin_iscommit`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_commitdate` datetime   AFTER `merchbillin_commitby`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchbillin_commitdate`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_postby` varchar(14)   AFTER `merchbillin_ispost`;
ALTER TABLE `trn_merchbillin` ADD COLUMN IF NOT EXISTS  `merchbillin_postdate` datetime   AFTER `merchbillin_postby`;


ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbilltype_id` varchar(10)    AFTER `merchbillin_id`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_isproforma` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchbilltype_id`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `merchbillin_isproforma`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchship_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_ref` varchar(30)    AFTER `merchship_id`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_date` date NOT NULL   AFTER `merchbillin_ref`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_datedue` date NOT NULL   AFTER `merchbillin_date`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_descr` varchar(255)    AFTER `merchbillin_datedue`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6) NOT NULL   AFTER `merchbillin_descr`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_version` int(4) NOT NULL DEFAULT 0  AFTER `periodemo_id`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchbillin_version`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_commitby` varchar(14)    AFTER `merchbillin_iscommit`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_commitdate` datetime    AFTER `merchbillin_commitby`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_ispost` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchbillin_commitdate`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_postby` varchar(14)    AFTER `merchbillin_ispost`;
ALTER TABLE `trn_merchbillin` MODIFY COLUMN IF EXISTS  `merchbillin_postdate` datetime    AFTER `merchbillin_postby`;



ALTER TABLE `trn_merchbillin` ADD KEY IF NOT EXISTS `merchbilltype_id` (`merchbilltype_id`);
ALTER TABLE `trn_merchbillin` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchbillin` ADD KEY IF NOT EXISTS `merchship_id` (`merchship_id`);
ALTER TABLE `trn_merchbillin` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);

ALTER TABLE `trn_merchbillin` ADD CONSTRAINT `fk_trn_merchbillin_mst_merchbilltype` FOREIGN KEY IF NOT EXISTS  (`merchbilltype_id`) REFERENCES `mst_merchbilltype` (`merchbilltype_id`);
ALTER TABLE `trn_merchbillin` ADD CONSTRAINT `fk_trn_merchbillin_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchbillin` ADD CONSTRAINT `fk_trn_merchbillin_trn_merchship` FOREIGN KEY IF NOT EXISTS  (`merchship_id`) REFERENCES `trn_merchship` (`merchship_id`);
ALTER TABLE `trn_merchbillin` ADD CONSTRAINT `fk_trn_merchbillin_mst_periodemo` FOREIGN KEY IF NOT EXISTS  (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





CREATE TABLE IF NOT EXISTS `trn_merchbillindet` (
	`merchbillindet_id` varchar(14) NOT NULL , 
	`merchbillindet_descr` varchar(255)  , 
	`merchshipbudget_id` varchar(10) NOT NULL , 
	`merchbillindet_qty` int(5) NOT NULL DEFAULT 0, 
	`merchbillindet_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`curr_rate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`merchbillindet_idr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchbillin_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchbillindet_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Receiving Dokumen';


ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `merchbillindet_descr` varchar(255)   AFTER `merchbillindet_id`;
ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `merchshipbudget_id` varchar(10) NOT NULL  AFTER `merchbillindet_descr`;
ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `merchbillindet_qty` int(5) NOT NULL DEFAULT 0 AFTER `merchshipbudget_id`;
ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `merchbillindet_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchbillindet_qty`;
ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `merchbillindet_value`;
ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0 AFTER `curr_id`;
ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `merchbillindet_idr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `curr_rate`;
ALTER TABLE `trn_merchbillindet` ADD COLUMN IF NOT EXISTS  `merchbillin_id` varchar(30) NOT NULL  AFTER `merchbillindet_idr`;


ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `merchbillindet_descr` varchar(255)    AFTER `merchbillindet_id`;
ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `merchshipbudget_id` varchar(10) NOT NULL   AFTER `merchbillindet_descr`;
ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `merchbillindet_qty` int(5) NOT NULL DEFAULT 0  AFTER `merchshipbudget_id`;
ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `merchbillindet_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchbillindet_qty`;
ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `merchbillindet_value`;
ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `curr_rate` decimal(12, 0) NOT NULL DEFAULT 0  AFTER `curr_id`;
ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `merchbillindet_idr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `curr_rate`;
ALTER TABLE `trn_merchbillindet` MODIFY COLUMN IF EXISTS  `merchbillin_id` varchar(30) NOT NULL   AFTER `merchbillindet_idr`;



ALTER TABLE `trn_merchbillindet` ADD KEY IF NOT EXISTS `merchshipbudget_id` (`merchshipbudget_id`);
ALTER TABLE `trn_merchbillindet` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_merchbillindet` ADD KEY IF NOT EXISTS `merchbillin_id` (`merchbillin_id`);

ALTER TABLE `trn_merchbillindet` ADD CONSTRAINT `fk_trn_merchbillindet_mst_merchshipbudget` FOREIGN KEY IF NOT EXISTS  (`merchshipbudget_id`) REFERENCES `mst_merchshipbudget` (`merchshipbudget_id`);
ALTER TABLE `trn_merchbillindet` ADD CONSTRAINT `fk_trn_merchbillindet_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_merchbillindet` ADD CONSTRAINT `fk_trn_merchbillindet_trn_merchbillin` FOREIGN KEY IF NOT EXISTS (`merchbillin_id`) REFERENCES `trn_merchbillin` (`merchbillin_id`);





