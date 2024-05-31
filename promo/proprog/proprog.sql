-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_proprog`;
-- drop table if exists `mst_proprogitemstocka`;
-- drop table if exists `mst_proprogitemstockb`;
-- drop table if exists `mst_prosite`;
-- drop table if exists `mst_propaymethod`;
-- drop table if exists `mst_proprogappr`;


CREATE TABLE IF NOT EXISTS `mst_proprog` (
	`proprog_id` varchar(14) NOT NULL , 
	`proprog_descr` varchar(255)  , 
	`proprog_display` varchar(30)  , 
	`prorule_id` varchar(14)  , 
	`dept_id` varchar(14) NOT NULL , 
	`promodel_id` varchar(14)  , 
	`problock_id` varchar(2)  , 
	`proprog_ispermanent` tinyint(1) NOT NULL DEFAULT 0, 
	`proprog_dtstart` date NOT NULL , 
	`proprog_timestart` time NOT NULL , 
	`proprog_dtend` date NOT NULL , 
	`proprog_timeend` time NOT NULL , 
	`proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0, 
	`proprog_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`proprog_priority` int(4) NOT NULL DEFAULT 100, 
	`proprog_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0, 
	`a_proprog_label` varchar(20)  , 
	`a_prospot_id` varchar(2)  , 
	`a_prostep_id` varchar(2)  , 
	`a_progrouping_id` varchar(2)  , 
	`a_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`a_proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0, 
	`a_proprog_sellprice` decimal(16, 0)  , 
	`a_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0, 
	`a_proprog_discval` decimal(16, 0) NOT NULL DEFAULT 0, 
	`proprog_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0, 
	`b_proprog_label` varchar(20)  , 
	`b_prospot_id` varchar(2)  , 
	`b_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`b_proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0, 
	`b_proprog_sellprice` decimal(16, 0)  , 
	`a_proprog_qtyapplied` int(4) NOT NULL DEFAULT 0, 
	`b_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0, 
	`proprog_version` int(4) NOT NULL DEFAULT 0, 
	`proprog_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`proprog_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`proprog_commitby` varchar(14)  , 
	`proprog_commitdate` datetime  , 
	`proprog_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`proprog_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`proprog_approveby` varchar(14)  , 
	`proprog_approvedate` datetime  , 
	`proprog_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`proprog_declineby` varchar(14)  , 
	`proprog_declinedate` datetime  , 
	`doc_id` varchar(30) NOT NULL , 
	`proprog_isdownload` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`proprog_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Promo';


ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_descr` varchar(255)   AFTER `proprog_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_display` varchar(30)   AFTER `proprog_descr`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `prorule_id` varchar(14)   AFTER `proprog_display`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(14) NOT NULL  AFTER `prorule_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `promodel_id` varchar(14)   AFTER `dept_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `problock_id` varchar(2)   AFTER `promodel_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_ispermanent` tinyint(1) NOT NULL DEFAULT 0 AFTER `problock_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_dtstart` date NOT NULL  AFTER `proprog_ispermanent`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_timestart` time NOT NULL  AFTER `proprog_dtstart`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_dtend` date NOT NULL  AFTER `proprog_timestart`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_timeend` time NOT NULL  AFTER `proprog_dtend`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `proprog_timeend`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `proprog_valuethreshold`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_priority` int(4) NOT NULL DEFAULT 100 AFTER `proprog_qtythreshold`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprog_priority`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_proprog_label` varchar(20)   AFTER `proprog_ishasgroupa`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_prospot_id` varchar(2)   AFTER `a_proprog_label`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_prostep_id` varchar(2)   AFTER `a_prospot_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_progrouping_id` varchar(2)   AFTER `a_prostep_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `a_progrouping_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `a_proprog_qtythreshold`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_proprog_sellprice` decimal(16, 0)   AFTER `a_proprog_valuethreshold`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0 AFTER `a_proprog_sellprice`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_proprog_discval` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `a_proprog_disc`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0 AFTER `a_proprog_discval`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `b_proprog_label` varchar(20)   AFTER `proprog_ishasgroupb`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `b_prospot_id` varchar(2)   AFTER `b_proprog_label`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `b_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `b_prospot_id`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `b_proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `b_proprog_qtythreshold`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `b_proprog_sellprice` decimal(16, 0)   AFTER `b_proprog_valuethreshold`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `a_proprog_qtyapplied` int(4) NOT NULL DEFAULT 0 AFTER `b_proprog_sellprice`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `b_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0 AFTER `a_proprog_qtyapplied`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_version` int(4) NOT NULL DEFAULT 0 AFTER `b_proprog_isblockonmeet`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprog_version`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprog_isdisabled`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_commitby` varchar(14)   AFTER `proprog_iscommit`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_commitdate` datetime   AFTER `proprog_commitby`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprog_commitdate`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprog_isapprovalprogress`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_approveby` varchar(14)   AFTER `proprog_isapproved`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_approvedate` datetime   AFTER `proprog_approveby`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprog_approvedate`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_declineby` varchar(14)   AFTER `proprog_isdeclined`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_declinedate` datetime   AFTER `proprog_declineby`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `proprog_declinedate`;
ALTER TABLE `mst_proprog` ADD COLUMN IF NOT EXISTS  `proprog_isdownload` tinyint(1) NOT NULL DEFAULT 0 AFTER `doc_id`;


ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_descr` varchar(255)    AFTER `proprog_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_display` varchar(30)    AFTER `proprog_descr`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `prorule_id` varchar(14)    AFTER `proprog_display`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `dept_id` varchar(14) NOT NULL   AFTER `prorule_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `promodel_id` varchar(14)    AFTER `dept_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `problock_id` varchar(2)    AFTER `promodel_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_ispermanent` tinyint(1) NOT NULL DEFAULT 0  AFTER `problock_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_dtstart` date NOT NULL   AFTER `proprog_ispermanent`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_timestart` time NOT NULL   AFTER `proprog_dtstart`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_dtend` date NOT NULL   AFTER `proprog_timestart`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_timeend` time NOT NULL   AFTER `proprog_dtend`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `proprog_timeend`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `proprog_valuethreshold`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_priority` int(4) NOT NULL DEFAULT 100  AFTER `proprog_qtythreshold`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprog_priority`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_proprog_label` varchar(20)    AFTER `proprog_ishasgroupa`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_prospot_id` varchar(2)    AFTER `a_proprog_label`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_prostep_id` varchar(2)    AFTER `a_prospot_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_progrouping_id` varchar(2)    AFTER `a_prostep_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `a_progrouping_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `a_proprog_qtythreshold`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_proprog_sellprice` decimal(16, 0)    AFTER `a_proprog_valuethreshold`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_proprog_disc` decimal(4, 1) NOT NULL DEFAULT 0  AFTER `a_proprog_sellprice`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_proprog_discval` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `a_proprog_disc`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0  AFTER `a_proprog_discval`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `b_proprog_label` varchar(20)    AFTER `proprog_ishasgroupb`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `b_prospot_id` varchar(2)    AFTER `b_proprog_label`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `b_proprog_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `b_prospot_id`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `b_proprog_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `b_proprog_qtythreshold`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `b_proprog_sellprice` decimal(16, 0)    AFTER `b_proprog_valuethreshold`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `a_proprog_qtyapplied` int(4) NOT NULL DEFAULT 0  AFTER `b_proprog_sellprice`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `b_proprog_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0  AFTER `a_proprog_qtyapplied`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_version` int(4) NOT NULL DEFAULT 0  AFTER `b_proprog_isblockonmeet`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_isdisabled` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprog_version`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprog_isdisabled`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_commitby` varchar(14)    AFTER `proprog_iscommit`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_commitdate` datetime    AFTER `proprog_commitby`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprog_commitdate`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_isapproved` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprog_isapprovalprogress`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_approveby` varchar(14)    AFTER `proprog_isapproved`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_approvedate` datetime    AFTER `proprog_approveby`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_isdeclined` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprog_approvedate`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_declineby` varchar(14)    AFTER `proprog_isdeclined`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_declinedate` datetime    AFTER `proprog_declineby`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL   AFTER `proprog_declinedate`;
ALTER TABLE `mst_proprog` MODIFY COLUMN IF EXISTS  `proprog_isdownload` tinyint(1) NOT NULL DEFAULT 0  AFTER `doc_id`;



ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `prorule_id` (`prorule_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `promodel_id` (`promodel_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `problock_id` (`problock_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `a_prospot_id` (`a_prospot_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `a_prostep_id` (`a_prostep_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `a_progrouping_id` (`a_progrouping_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `b_prospot_id` (`b_prospot_id`);
ALTER TABLE `mst_proprog` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_prorule` FOREIGN KEY IF NOT EXISTS  (`prorule_id`) REFERENCES `mst_prorule` (`prorule_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_promodel` FOREIGN KEY IF NOT EXISTS  (`promodel_id`) REFERENCES `mst_promodel` (`promodel_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_problock` FOREIGN KEY IF NOT EXISTS  (`problock_id`) REFERENCES `mst_problock` (`problock_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_prospot` FOREIGN KEY IF NOT EXISTS  (`a_prospot_id`) REFERENCES `mst_prospot` (`prospot_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_prostep` FOREIGN KEY IF NOT EXISTS  (`a_prostep_id`) REFERENCES `mst_prostep` (`prostep_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_progrouping` FOREIGN KEY IF NOT EXISTS  (`a_progrouping_id`) REFERENCES `mst_progrouping` (`progrouping_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_prospot_2` FOREIGN KEY IF NOT EXISTS  (`b_prospot_id`) REFERENCES `mst_prospot` (`prospot_id`);
ALTER TABLE `mst_proprog` ADD CONSTRAINT `fk_mst_proprog_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `mst_proprogitemstocka` (
	`proprogitemstocka_id` varchar(14) NOT NULL , 
	`itemstock_id` varchar(14)  , 
	`itemstock_tag` varchar(90)  , 
	`itemstock_sellprice` decimal(16, 0)  , 
	`itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0, 
	`itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0, 
	`proprog_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `proprogitemstocka_pair` (`proprog_id`, `itemstock_id`),
	PRIMARY KEY (`proprogitemstocka_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Promo Group A';


ALTER TABLE `mst_proprogitemstocka` ADD COLUMN IF NOT EXISTS  `itemstock_id` varchar(14)   AFTER `proprogitemstocka_id`;
ALTER TABLE `mst_proprogitemstocka` ADD COLUMN IF NOT EXISTS  `itemstock_tag` varchar(90)   AFTER `itemstock_id`;
ALTER TABLE `mst_proprogitemstocka` ADD COLUMN IF NOT EXISTS  `itemstock_sellprice` decimal(16, 0)   AFTER `itemstock_tag`;
ALTER TABLE `mst_proprogitemstocka` ADD COLUMN IF NOT EXISTS  `itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `itemstock_sellprice`;
ALTER TABLE `mst_proprogitemstocka` ADD COLUMN IF NOT EXISTS  `itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `itemstock_discval`;
ALTER TABLE `mst_proprogitemstocka` ADD COLUMN IF NOT EXISTS  `proprog_id` varchar(14) NOT NULL  AFTER `itemstock_disc`;


ALTER TABLE `mst_proprogitemstocka` MODIFY COLUMN IF EXISTS  `itemstock_id` varchar(14)    AFTER `proprogitemstocka_id`;
ALTER TABLE `mst_proprogitemstocka` MODIFY COLUMN IF EXISTS  `itemstock_tag` varchar(90)    AFTER `itemstock_id`;
ALTER TABLE `mst_proprogitemstocka` MODIFY COLUMN IF EXISTS  `itemstock_sellprice` decimal(16, 0)    AFTER `itemstock_tag`;
ALTER TABLE `mst_proprogitemstocka` MODIFY COLUMN IF EXISTS  `itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `itemstock_sellprice`;
ALTER TABLE `mst_proprogitemstocka` MODIFY COLUMN IF EXISTS  `itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0  AFTER `itemstock_discval`;
ALTER TABLE `mst_proprogitemstocka` MODIFY COLUMN IF EXISTS  `proprog_id` varchar(14) NOT NULL   AFTER `itemstock_disc`;


ALTER TABLE `mst_proprogitemstocka` ADD CONSTRAINT `proprogitemstocka_pair` UNIQUE IF NOT EXISTS  (`proprog_id`, `itemstock_id`);

ALTER TABLE `mst_proprogitemstocka` ADD KEY IF NOT EXISTS `itemstock_id` (`itemstock_id`);
ALTER TABLE `mst_proprogitemstocka` ADD KEY IF NOT EXISTS `proprog_id` (`proprog_id`);

ALTER TABLE `mst_proprogitemstocka` ADD CONSTRAINT `fk_mst_proprogitemstocka_mst_itemstock` FOREIGN KEY IF NOT EXISTS  (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `mst_proprogitemstocka` ADD CONSTRAINT `fk_mst_proprogitemstocka_mst_proprog` FOREIGN KEY IF NOT EXISTS (`proprog_id`) REFERENCES `mst_proprog` (`proprog_id`);





CREATE TABLE IF NOT EXISTS `mst_proprogitemstockb` (
	`proprogitemstockb_id` varchar(14) NOT NULL , 
	`itemstock_id` varchar(14)  , 
	`itemstock_sellprice` decimal(16, 0)  , 
	`itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0, 
	`itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0, 
	`proprog_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `proprogitemstockb_pair` (`proprog_id`, `itemstock_id`),
	PRIMARY KEY (`proprogitemstockb_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Promo Group B';


ALTER TABLE `mst_proprogitemstockb` ADD COLUMN IF NOT EXISTS  `itemstock_id` varchar(14)   AFTER `proprogitemstockb_id`;
ALTER TABLE `mst_proprogitemstockb` ADD COLUMN IF NOT EXISTS  `itemstock_sellprice` decimal(16, 0)   AFTER `itemstock_id`;
ALTER TABLE `mst_proprogitemstockb` ADD COLUMN IF NOT EXISTS  `itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `itemstock_sellprice`;
ALTER TABLE `mst_proprogitemstockb` ADD COLUMN IF NOT EXISTS  `itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `itemstock_discval`;
ALTER TABLE `mst_proprogitemstockb` ADD COLUMN IF NOT EXISTS  `proprog_id` varchar(14) NOT NULL  AFTER `itemstock_disc`;


ALTER TABLE `mst_proprogitemstockb` MODIFY COLUMN IF EXISTS  `itemstock_id` varchar(14)    AFTER `proprogitemstockb_id`;
ALTER TABLE `mst_proprogitemstockb` MODIFY COLUMN IF EXISTS  `itemstock_sellprice` decimal(16, 0)    AFTER `itemstock_id`;
ALTER TABLE `mst_proprogitemstockb` MODIFY COLUMN IF EXISTS  `itemstock_discval` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `itemstock_sellprice`;
ALTER TABLE `mst_proprogitemstockb` MODIFY COLUMN IF EXISTS  `itemstock_disc` decimal(5, 2) NOT NULL DEFAULT 0  AFTER `itemstock_discval`;
ALTER TABLE `mst_proprogitemstockb` MODIFY COLUMN IF EXISTS  `proprog_id` varchar(14) NOT NULL   AFTER `itemstock_disc`;


ALTER TABLE `mst_proprogitemstockb` ADD CONSTRAINT `proprogitemstockb_pair` UNIQUE IF NOT EXISTS  (`proprog_id`, `itemstock_id`);

ALTER TABLE `mst_proprogitemstockb` ADD KEY IF NOT EXISTS `itemstock_id` (`itemstock_id`);
ALTER TABLE `mst_proprogitemstockb` ADD KEY IF NOT EXISTS `proprog_id` (`proprog_id`);

ALTER TABLE `mst_proprogitemstockb` ADD CONSTRAINT `fk_mst_proprogitemstockb_mst_itemstock` FOREIGN KEY IF NOT EXISTS  (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `mst_proprogitemstockb` ADD CONSTRAINT `fk_mst_proprogitemstockb_mst_proprog` FOREIGN KEY IF NOT EXISTS (`proprog_id`) REFERENCES `mst_proprog` (`proprog_id`);





CREATE TABLE IF NOT EXISTS `mst_prosite` (
	`prosite_id` varchar(14) NOT NULL , 
	`site_id` varchar(30) NOT NULL , 
	`proprog_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `prosite_pair` (`proprog_id`, `site_id`),
	PRIMARY KEY (`prosite_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar limitiasi site';


ALTER TABLE `mst_prosite` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30) NOT NULL  AFTER `prosite_id`;
ALTER TABLE `mst_prosite` ADD COLUMN IF NOT EXISTS  `proprog_id` varchar(14) NOT NULL  AFTER `site_id`;


ALTER TABLE `mst_prosite` MODIFY COLUMN IF EXISTS  `site_id` varchar(30) NOT NULL   AFTER `prosite_id`;
ALTER TABLE `mst_prosite` MODIFY COLUMN IF EXISTS  `proprog_id` varchar(14) NOT NULL   AFTER `site_id`;


ALTER TABLE `mst_prosite` ADD CONSTRAINT `prosite_pair` UNIQUE IF NOT EXISTS  (`proprog_id`, `site_id`);

ALTER TABLE `mst_prosite` ADD KEY IF NOT EXISTS `site_id` (`site_id`);
ALTER TABLE `mst_prosite` ADD KEY IF NOT EXISTS `proprog_id` (`proprog_id`);

ALTER TABLE `mst_prosite` ADD CONSTRAINT `fk_mst_prosite_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_prosite` ADD CONSTRAINT `fk_mst_prosite_mst_proprog` FOREIGN KEY IF NOT EXISTS (`proprog_id`) REFERENCES `mst_proprog` (`proprog_id`);





CREATE TABLE IF NOT EXISTS `mst_propaymethod` (
	`propaymethod_id` varchar(14) NOT NULL , 
	`paymethod_id` varchar(14) NOT NULL , 
	`paymethod_code` varchar(1000)  , 
	`proprog_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `propaymethod_pair` (`proprog_id`, `paymethod_id`),
	PRIMARY KEY (`propaymethod_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar limitiasi Payment method';


ALTER TABLE `mst_propaymethod` ADD COLUMN IF NOT EXISTS  `paymethod_id` varchar(14) NOT NULL  AFTER `propaymethod_id`;
ALTER TABLE `mst_propaymethod` ADD COLUMN IF NOT EXISTS  `paymethod_code` varchar(1000)   AFTER `paymethod_id`;
ALTER TABLE `mst_propaymethod` ADD COLUMN IF NOT EXISTS  `proprog_id` varchar(14) NOT NULL  AFTER `paymethod_code`;


ALTER TABLE `mst_propaymethod` MODIFY COLUMN IF EXISTS  `paymethod_id` varchar(14) NOT NULL   AFTER `propaymethod_id`;
ALTER TABLE `mst_propaymethod` MODIFY COLUMN IF EXISTS  `paymethod_code` varchar(1000)    AFTER `paymethod_id`;
ALTER TABLE `mst_propaymethod` MODIFY COLUMN IF EXISTS  `proprog_id` varchar(14) NOT NULL   AFTER `paymethod_code`;


ALTER TABLE `mst_propaymethod` ADD CONSTRAINT `propaymethod_pair` UNIQUE IF NOT EXISTS  (`proprog_id`, `paymethod_id`);

ALTER TABLE `mst_propaymethod` ADD KEY IF NOT EXISTS `paymethod_id` (`paymethod_id`);
ALTER TABLE `mst_propaymethod` ADD KEY IF NOT EXISTS `proprog_id` (`proprog_id`);

ALTER TABLE `mst_propaymethod` ADD CONSTRAINT `fk_mst_propaymethod_pos_paymethod` FOREIGN KEY IF NOT EXISTS  (`paymethod_id`) REFERENCES `pos_paymethod` (`paymethod_id`);
ALTER TABLE `mst_propaymethod` ADD CONSTRAINT `fk_mst_propaymethod_mst_proprog` FOREIGN KEY IF NOT EXISTS (`proprog_id`) REFERENCES `mst_proprog` (`proprog_id`);





CREATE TABLE IF NOT EXISTS `mst_proprogappr` (
	`proprogappr_id` varchar(14) NOT NULL , 
	`proprogappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`proprogappr_by` varchar(14)  , 
	`proprogappr_date` datetime  , 
	`proprog_version` int(4) NOT NULL DEFAULT 0, 
	`proprogappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`proprogappr_declinedby` varchar(14)  , 
	`proprogappr_declineddate` datetime  , 
	`proprogappr_notes` varchar(255)  , 
	`proprog_id` varchar(30) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`auth_id` varchar(10)  , 
	`auth_name` varchar(60) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `proprog_auth_id` (`proprog_id`, `auth_id`),
	PRIMARY KEY (`proprogappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Promo';


ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprogappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprogappr_id`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprogappr_by` varchar(14)   AFTER `proprogappr_isapproved`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprogappr_date` datetime   AFTER `proprogappr_by`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprog_version` int(4) NOT NULL DEFAULT 0 AFTER `proprogappr_date`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprogappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `proprog_version`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprogappr_declinedby` varchar(14)   AFTER `proprogappr_isdeclined`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprogappr_declineddate` datetime   AFTER `proprogappr_declinedby`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprogappr_notes` varchar(255)   AFTER `proprogappr_declineddate`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `proprog_id` varchar(30) NOT NULL  AFTER `proprogappr_notes`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `docauth_descr` varchar(90)   AFTER `proprog_id`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `mst_proprogappr` ADD COLUMN IF NOT EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprogappr_isapproved` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprogappr_id`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprogappr_by` varchar(14)    AFTER `proprogappr_isapproved`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprogappr_date` datetime    AFTER `proprogappr_by`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprog_version` int(4) NOT NULL DEFAULT 0  AFTER `proprogappr_date`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprogappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0  AFTER `proprog_version`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprogappr_declinedby` varchar(14)    AFTER `proprogappr_isdeclined`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprogappr_declineddate` datetime    AFTER `proprogappr_declinedby`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprogappr_notes` varchar(255)    AFTER `proprogappr_declineddate`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `proprog_id` varchar(30) NOT NULL   AFTER `proprogappr_notes`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `docauth_descr` varchar(90)    AFTER `proprog_id`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0  AFTER `docauth_descr`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100  AFTER `docauth_order`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0  AFTER `docauth_value`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `authlevel_id` varchar(10) NOT NULL   AFTER `docauth_min`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `authlevel_name` varchar(60) NOT NULL   AFTER `authlevel_id`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `auth_id` varchar(10)    AFTER `authlevel_name`;
ALTER TABLE `mst_proprogappr` MODIFY COLUMN IF EXISTS  `auth_name` varchar(60) NOT NULL   AFTER `auth_id`;


ALTER TABLE `mst_proprogappr` ADD CONSTRAINT `proprog_auth_id` UNIQUE IF NOT EXISTS  (`proprog_id`, `auth_id`);

ALTER TABLE `mst_proprogappr` ADD KEY IF NOT EXISTS `proprog_id` (`proprog_id`);

ALTER TABLE `mst_proprogappr` ADD CONSTRAINT `fk_mst_proprogappr_mst_proprog` FOREIGN KEY IF NOT EXISTS (`proprog_id`) REFERENCES `mst_proprog` (`proprog_id`);





