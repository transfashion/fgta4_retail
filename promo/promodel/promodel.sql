-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_promodel`;


CREATE TABLE IF NOT EXISTS `mst_promodel` (
	`promodel_id` varchar(14) NOT NULL , 
	`promodel_name` varchar(255)  , 
	`promodel_descr` varchar(255)  , 
	`prorule_id` varchar(2)  , 
	`prorule_fn` varchar(90)  , 
	`prolevel_id` varchar(2)  , 
	`prorule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0, 
	`a_prorulesec_id` varchar(14)  , 
	`a_prorulesec_label` varchar(20)  , 
	`a_prospot_id` varchar(2)  , 
	`a_prostep_id` varchar(2)  , 
	`a_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0, 
	`a_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`a_proprog_qtymax` int(4) NOT NULL DEFAULT 0, 
	`a_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0, 
	`prorule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0, 
	`b_prorulesec_id` varchar(14)  , 
	`b_prorulesec_label` varchar(20)  , 
	`b_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0, 
	`b_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`b_proprog_qtymax` int(4) NOT NULL DEFAULT 0, 
	`b_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promodel_name` (`promodel_name`),
	PRIMARY KEY (`promodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Promo';


ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `promodel_name` varchar(255)   AFTER `promodel_id`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `promodel_descr` varchar(255)   AFTER `promodel_name`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `prorule_id` varchar(2)   AFTER `promodel_descr`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `prorule_fn` varchar(90)   AFTER `prorule_id`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `prolevel_id` varchar(2)   AFTER `prorule_fn`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `prorule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0 AFTER `prolevel_id`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_prorulesec_id` varchar(14)   AFTER `prorule_ishasgroupa`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_prorulesec_label` varchar(20)   AFTER `a_prorulesec_id`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_prospot_id` varchar(2)   AFTER `a_prorulesec_label`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_prostep_id` varchar(2)   AFTER `a_prospot_id`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0 AFTER `a_prostep_id`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `a_proprog_disc`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_proprog_qtymax` int(4) NOT NULL DEFAULT 0 AFTER `a_proprog_qtythreshold`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `a_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0 AFTER `a_proprog_qtymax`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `prorule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0 AFTER `a_proprog_isblockonmeet`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `b_prorulesec_id` varchar(14)   AFTER `prorule_ishasgroupb`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `b_prorulesec_label` varchar(20)   AFTER `b_prorulesec_id`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `b_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0 AFTER `b_prorulesec_label`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `b_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `b_proprog_disc`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `b_proprog_qtymax` int(4) NOT NULL DEFAULT 0 AFTER `b_proprog_qtythreshold`;
ALTER TABLE `mst_promodel` ADD COLUMN IF NOT EXISTS  `b_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0 AFTER `b_proprog_qtymax`;


ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `promodel_name` varchar(255)    AFTER `promodel_id`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `promodel_descr` varchar(255)    AFTER `promodel_name`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `prorule_id` varchar(2)    AFTER `promodel_descr`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `prorule_fn` varchar(90)    AFTER `prorule_id`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `prolevel_id` varchar(2)    AFTER `prorule_fn`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `prorule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0  AFTER `prolevel_id`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_prorulesec_id` varchar(14)    AFTER `prorule_ishasgroupa`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_prorulesec_label` varchar(20)    AFTER `a_prorulesec_id`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_prospot_id` varchar(2)    AFTER `a_prorulesec_label`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_prostep_id` varchar(2)    AFTER `a_prospot_id`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0  AFTER `a_prostep_id`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `a_proprog_disc`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_proprog_qtymax` int(4) NOT NULL DEFAULT 0  AFTER `a_proprog_qtythreshold`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `a_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0  AFTER `a_proprog_qtymax`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `prorule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0  AFTER `a_proprog_isblockonmeet`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `b_prorulesec_id` varchar(14)    AFTER `prorule_ishasgroupb`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `b_prorulesec_label` varchar(20)    AFTER `b_prorulesec_id`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `b_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0  AFTER `b_prorulesec_label`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `b_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `b_proprog_disc`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `b_proprog_qtymax` int(4) NOT NULL DEFAULT 0  AFTER `b_proprog_qtythreshold`;
ALTER TABLE `mst_promodel` MODIFY COLUMN IF EXISTS  `b_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0  AFTER `b_proprog_qtymax`;


ALTER TABLE `mst_promodel` ADD CONSTRAINT `promodel_name` UNIQUE IF NOT EXISTS  (`promodel_name`);

ALTER TABLE `mst_promodel` ADD KEY IF NOT EXISTS `prorule_id` (`prorule_id`);
ALTER TABLE `mst_promodel` ADD KEY IF NOT EXISTS `prolevel_id` (`prolevel_id`);
ALTER TABLE `mst_promodel` ADD KEY IF NOT EXISTS `a_prorulesec_id` (`a_prorulesec_id`);
ALTER TABLE `mst_promodel` ADD KEY IF NOT EXISTS `a_prospot_id` (`a_prospot_id`);
ALTER TABLE `mst_promodel` ADD KEY IF NOT EXISTS `a_prostep_id` (`a_prostep_id`);
ALTER TABLE `mst_promodel` ADD KEY IF NOT EXISTS `b_prorulesec_id` (`b_prorulesec_id`);

ALTER TABLE `mst_promodel` ADD CONSTRAINT `fk_mst_promodel_mst_prorule` FOREIGN KEY IF NOT EXISTS  (`prorule_id`) REFERENCES `mst_prorule` (`prorule_id`);
ALTER TABLE `mst_promodel` ADD CONSTRAINT `fk_mst_promodel_mst_prolevel` FOREIGN KEY IF NOT EXISTS  (`prolevel_id`) REFERENCES `mst_prolevel` (`prolevel_id`);
ALTER TABLE `mst_promodel` ADD CONSTRAINT `fk_mst_promodel_mst_prorulesec` FOREIGN KEY IF NOT EXISTS  (`a_prorulesec_id`) REFERENCES `mst_prorulesec` (`prorulesec_id`);
ALTER TABLE `mst_promodel` ADD CONSTRAINT `fk_mst_promodel_mst_prospot` FOREIGN KEY IF NOT EXISTS  (`a_prospot_id`) REFERENCES `mst_prospot` (`prospot_id`);
ALTER TABLE `mst_promodel` ADD CONSTRAINT `fk_mst_promodel_mst_prostep` FOREIGN KEY IF NOT EXISTS  (`a_prostep_id`) REFERENCES `mst_prostep` (`prostep_id`);
ALTER TABLE `mst_promodel` ADD CONSTRAINT `fk_mst_promodel_mst_prorulesec_2` FOREIGN KEY IF NOT EXISTS  (`b_prorulesec_id`) REFERENCES `mst_prorulesec` (`prorulesec_id`);





