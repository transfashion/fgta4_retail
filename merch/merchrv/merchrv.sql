-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchrv`;
-- drop table if exists `trn_merchrvitem`;


CREATE TABLE IF NOT EXISTS `trn_merchrv` (
	`merchrv_id` varchar(30) NOT NULL , 
	`merchrv_ref` varchar(30)  , 
	`merchrv_date` date NOT NULL , 
	`unit_id` varchar(30)  , 
	`merchorderout_id` varchar(30)  , 
	`merchship_id` varchar(30)  , 
	`merchrv_descr` varchar(255)  , 
	`principal_partner_id` varchar(14)  , 
	`merchsea_id` varchar(10)  , 
	`curr_id` varchar(10) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`merchrv_version` int(4) NOT NULL DEFAULT 0, 
	`merchrv_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`merchrv_commitby` varchar(14)  , 
	`merchrv_commitdate` datetime  , 
	`merchrv_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`merchrv_postby` varchar(14)  , 
	`merchrv_postdate` datetime  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchrv_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Receiving Dokumen';


ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_ref` varchar(30)   AFTER `merchrv_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_date` date NOT NULL  AFTER `merchrv_ref`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(30)   AFTER `merchrv_date`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchorderout_id` varchar(30)   AFTER `unit_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchship_id` varchar(30)   AFTER `merchorderout_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_descr` varchar(255)   AFTER `merchship_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `principal_partner_id` varchar(14)   AFTER `merchrv_descr`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `principal_partner_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `curr_id` varchar(10) NOT NULL  AFTER `merchsea_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30) NOT NULL  AFTER `curr_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_version` int(4) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchrv_version`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_commitby` varchar(14)   AFTER `merchrv_iscommit`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_commitdate` datetime   AFTER `merchrv_commitby`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchrv_commitdate`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_postby` varchar(14)   AFTER `merchrv_ispost`;
ALTER TABLE `trn_merchrv` ADD COLUMN IF NOT EXISTS  `merchrv_postdate` datetime   AFTER `merchrv_postby`;


ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_ref` varchar(30)    AFTER `merchrv_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_date` date NOT NULL   AFTER `merchrv_ref`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `unit_id` varchar(30)    AFTER `merchrv_date`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchorderout_id` varchar(30)    AFTER `unit_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchship_id` varchar(30)    AFTER `merchorderout_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_descr` varchar(255)    AFTER `merchship_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `principal_partner_id` varchar(14)    AFTER `merchrv_descr`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)    AFTER `principal_partner_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `curr_id` varchar(10) NOT NULL   AFTER `merchsea_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30) NOT NULL   AFTER `curr_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_version` int(4) NOT NULL DEFAULT 0  AFTER `dept_id`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchrv_version`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_commitby` varchar(14)    AFTER `merchrv_iscommit`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_commitdate` datetime    AFTER `merchrv_commitby`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_ispost` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchrv_commitdate`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_postby` varchar(14)    AFTER `merchrv_ispost`;
ALTER TABLE `trn_merchrv` MODIFY COLUMN IF EXISTS  `merchrv_postdate` datetime    AFTER `merchrv_postby`;



ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `merchorderout_id` (`merchorderout_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `merchship_id` (`merchship_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `principal_partner_id` (`principal_partner_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `curr_id` (`curr_id`);
ALTER TABLE `trn_merchrv` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);

ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_trn_merchorderout` FOREIGN KEY IF NOT EXISTS  (`merchorderout_id`) REFERENCES `trn_merchorderout` (`merchorderout_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_trn_merchship` FOREIGN KEY IF NOT EXISTS  (`merchship_id`) REFERENCES `trn_merchship` (`merchship_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_mst_partner` FOREIGN KEY IF NOT EXISTS  (`principal_partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_mst_curr` FOREIGN KEY IF NOT EXISTS  (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_merchrv` ADD CONSTRAINT `fk_trn_merchrv_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE IF NOT EXISTS `trn_merchrvitem` (
	`merchrvitem_id` varchar(14) NOT NULL , 
	`merchitem_id` varchar(14)  , 
	`merchitem_combo` varchar(103)  , 
	`merchitem_name` varchar(255)  , 
	`merchrvitem_valuepo` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_qtyinit` int(4) NOT NULL DEFAULT 0, 
	`merchrvitem_qty` int(4) NOT NULL DEFAULT 0, 
	`merchrvitem_rate` decimal(12, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_subtotalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_subtotalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_budgetaddcostidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_budgetlandedcostidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_budgetmarkupidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_budgetbillidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_actualvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_actualrate` decimal(12, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_actualvalueidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_actualaddcostidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrvitem_actuallandedcostidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`merchrv_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchrvitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Received';


ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(14)   AFTER `merchrvitem_id`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchitem_combo` varchar(103)   AFTER `merchitem_id`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_combo`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_valuepo` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchitem_name`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_value` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_valuepo`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_qtyinit` int(4) NOT NULL DEFAULT 0 AFTER `merchrvitem_value`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_qty` int(4) NOT NULL DEFAULT 0 AFTER `merchrvitem_qtyinit`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_rate` decimal(12, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_qty`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_subtotalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_rate`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_subtotalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_subtotalvaluefrg`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_budgetaddcostidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_subtotalvalueidr`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_budgetlandedcostidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_budgetaddcostidr`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_budgetmarkupidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_budgetlandedcostidr`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_budgetbillidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_budgetmarkupidr`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_actualvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_budgetbillidr`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_actualrate` decimal(12, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_actualvaluefrg`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_actualvalueidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_actualrate`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_actualaddcostidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_actualvalueidr`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrvitem_actuallandedcostidr` decimal(14, 2) NOT NULL DEFAULT 0 AFTER `merchrvitem_actualaddcostidr`;
ALTER TABLE `trn_merchrvitem` ADD COLUMN IF NOT EXISTS  `merchrv_id` varchar(30) NOT NULL  AFTER `merchrvitem_actuallandedcostidr`;


ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(14)    AFTER `merchrvitem_id`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchitem_combo` varchar(103)    AFTER `merchitem_id`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)    AFTER `merchitem_combo`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_valuepo` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchitem_name`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_value` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_valuepo`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_qtyinit` int(4) NOT NULL DEFAULT 0  AFTER `merchrvitem_value`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_qty` int(4) NOT NULL DEFAULT 0  AFTER `merchrvitem_qtyinit`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_rate` decimal(12, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_qty`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_subtotalvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_rate`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_subtotalvalueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_subtotalvaluefrg`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_budgetaddcostidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_subtotalvalueidr`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_budgetlandedcostidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_budgetaddcostidr`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_budgetmarkupidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_budgetlandedcostidr`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_budgetbillidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_budgetmarkupidr`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_actualvaluefrg` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_budgetbillidr`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_actualrate` decimal(12, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_actualvaluefrg`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_actualvalueidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_actualrate`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_actualaddcostidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_actualvalueidr`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrvitem_actuallandedcostidr` decimal(14, 2) NOT NULL DEFAULT 0  AFTER `merchrvitem_actualaddcostidr`;
ALTER TABLE `trn_merchrvitem` MODIFY COLUMN IF EXISTS  `merchrv_id` varchar(30) NOT NULL   AFTER `merchrvitem_actuallandedcostidr`;



ALTER TABLE `trn_merchrvitem` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);
ALTER TABLE `trn_merchrvitem` ADD KEY IF NOT EXISTS `merchrv_id` (`merchrv_id`);

ALTER TABLE `trn_merchrvitem` ADD CONSTRAINT `fk_trn_merchrvitem_mst_merchitem` FOREIGN KEY IF NOT EXISTS  (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);
ALTER TABLE `trn_merchrvitem` ADD CONSTRAINT `fk_trn_merchrvitem_trn_merchrv` FOREIGN KEY IF NOT EXISTS (`merchrv_id`) REFERENCES `trn_merchrv` (`merchrv_id`);





