-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_promoab`;
-- drop table if exists `mst_promoabsite`;
-- drop table if exists `mst_promoabpospaym`;


CREATE TABLE IF NOT EXISTS `mst_promoab` (
	`promoab_id` varchar(10) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`promoabmodel_id` varchar(14)  , 
	`promoabrule_name` varchar(10) NOT NULL , 
	`promoab_descr` varchar(255)  , 
	`promoabrule_dtstart` date NOT NULL , 
	`promoabrule_timestart` time NOT NULL , 
	`promoabrule_dtend` date NOT NULL , 
	`promoabrule_timeend` time NOT NULL , 
	`promoabrule_ispaymdiscallowed` tinyint(1) NOT NULL DEFAULT 0, 
	`promoabrule_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0, 
	`a_promoabrulesection_id` varchar(14)  , 
	`promoab_a_label` varchar(20)  , 
	`promoab_a_itemlist` varchar(30)  , 
	`promoab_a_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`promoab_a_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0, 
	`promoab_a_disc` decimal(4, 1) NOT NULL DEFAULT 0, 
	`promoab_a_qtymax` int(4) NOT NULL DEFAULT 0, 
	`promoab_a_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0, 
	`promoab_a_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0, 
	`b_promoabrulesection_id` varchar(14)  , 
	`promoab_b_label` varchar(20)  , 
	`promoab_b_itemlist` varchar(30)  , 
	`promoab_b_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`promoab_b_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0, 
	`promoab_b_disc` decimal(4, 1) NOT NULL DEFAULT 0, 
	`promoab_b_qtymax` int(4) NOT NULL DEFAULT 0, 
	`promoab_b_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0, 
	`promoab_b_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0, 
	`promoabrule_id` varchar(2)  , 
	`promoabrule_code` varchar(3)  , 
	`brand_nameshort` varchar(10) NOT NULL , 
	`promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0, 
	`promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0, 
	`promoab_version` int(4) NOT NULL DEFAULT 0, 
	`promoab_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`promoab_commitby` varchar(14)  , 
	`promoab_commitdate` datetime  , 
	`promoab_isdownload` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`promoab_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Promo';


ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14) NOT NULL  AFTER `promoab_id`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabmodel_id` varchar(14)   AFTER `brand_id`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_name` varchar(10) NOT NULL  AFTER `promoabmodel_id`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_descr` varchar(255)   AFTER `promoabrule_name`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_dtstart` date NOT NULL  AFTER `promoab_descr`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_timestart` time NOT NULL  AFTER `promoabrule_dtstart`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_dtend` date NOT NULL  AFTER `promoabrule_timestart`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_timeend` time NOT NULL  AFTER `promoabrule_dtend`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_ispaymdiscallowed` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoabrule_timeend`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `promoabrule_ispaymdiscallowed`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `a_promoabrulesection_id` varchar(14)   AFTER `promoabrule_valuethreshold`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_label` varchar(20)   AFTER `a_promoabrulesection_id`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_itemlist` varchar(30)   AFTER `promoab_a_label`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `promoab_a_itemlist`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `promoab_a_qtythreshold`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_disc` decimal(4, 1) NOT NULL DEFAULT 0 AFTER `promoab_a_valuethreshold`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_qtymax` int(4) NOT NULL DEFAULT 0 AFTER `promoab_a_disc`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_a_qtymax`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_a_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_a_isreplacedisc`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `b_promoabrulesection_id` varchar(14)   AFTER `promoab_a_isblockonmeet`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_label` varchar(20)   AFTER `b_promoabrulesection_id`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_itemlist` varchar(30)   AFTER `promoab_b_label`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `promoab_b_itemlist`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `promoab_b_qtythreshold`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_disc` decimal(4, 1) NOT NULL DEFAULT 0 AFTER `promoab_b_valuethreshold`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_qtymax` int(4) NOT NULL DEFAULT 0 AFTER `promoab_b_disc`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_b_qtymax`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_b_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_b_isreplacedisc`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_id` varchar(2)   AFTER `promoab_b_isblockonmeet`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_code` varchar(3)   AFTER `promoabrule_id`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `brand_nameshort` varchar(10) NOT NULL  AFTER `promoabrule_code`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0 AFTER `brand_nameshort`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoabrule_ishasgroupa`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_version` int(4) NOT NULL DEFAULT 0 AFTER `promoabrule_ishasgroupb`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_version`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_commitby` varchar(14)   AFTER `promoab_iscommit`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_commitdate` datetime   AFTER `promoab_commitby`;
ALTER TABLE `mst_promoab` ADD COLUMN IF NOT EXISTS  `promoab_isdownload` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_commitdate`;


ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14) NOT NULL   AFTER `promoab_id`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabmodel_id` varchar(14)    AFTER `brand_id`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_name` varchar(10) NOT NULL   AFTER `promoabmodel_id`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_descr` varchar(255)    AFTER `promoabrule_name`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_dtstart` date NOT NULL   AFTER `promoab_descr`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_timestart` time NOT NULL   AFTER `promoabrule_dtstart`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_dtend` date NOT NULL   AFTER `promoabrule_timestart`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_timeend` time NOT NULL   AFTER `promoabrule_dtend`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_ispaymdiscallowed` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoabrule_timeend`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `promoabrule_ispaymdiscallowed`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `a_promoabrulesection_id` varchar(14)    AFTER `promoabrule_valuethreshold`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_label` varchar(20)    AFTER `a_promoabrulesection_id`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_itemlist` varchar(30)    AFTER `promoab_a_label`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `promoab_a_itemlist`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `promoab_a_qtythreshold`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_disc` decimal(4, 1) NOT NULL DEFAULT 0  AFTER `promoab_a_valuethreshold`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_qtymax` int(4) NOT NULL DEFAULT 0  AFTER `promoab_a_disc`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_a_qtymax`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_a_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_a_isreplacedisc`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `b_promoabrulesection_id` varchar(14)    AFTER `promoab_a_isblockonmeet`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_label` varchar(20)    AFTER `b_promoabrulesection_id`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_itemlist` varchar(30)    AFTER `promoab_b_label`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `promoab_b_itemlist`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_valuethreshold` decimal(16, 0) NOT NULL DEFAULT 0  AFTER `promoab_b_qtythreshold`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_disc` decimal(4, 1) NOT NULL DEFAULT 0  AFTER `promoab_b_valuethreshold`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_qtymax` int(4) NOT NULL DEFAULT 0  AFTER `promoab_b_disc`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_b_qtymax`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_b_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_b_isreplacedisc`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_id` varchar(2)    AFTER `promoab_b_isblockonmeet`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_code` varchar(3)    AFTER `promoabrule_id`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `brand_nameshort` varchar(10) NOT NULL   AFTER `promoabrule_code`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0  AFTER `brand_nameshort`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoabrule_ishasgroupa`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_version` int(4) NOT NULL DEFAULT 0  AFTER `promoabrule_ishasgroupb`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_iscommit` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_version`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_commitby` varchar(14)    AFTER `promoab_iscommit`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_commitdate` datetime    AFTER `promoab_commitby`;
ALTER TABLE `mst_promoab` MODIFY COLUMN IF EXISTS  `promoab_isdownload` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_commitdate`;



ALTER TABLE `mst_promoab` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);
ALTER TABLE `mst_promoab` ADD KEY IF NOT EXISTS `promoabmodel_id` (`promoabmodel_id`);
ALTER TABLE `mst_promoab` ADD KEY IF NOT EXISTS `a_promoabrulesection_id` (`a_promoabrulesection_id`);
ALTER TABLE `mst_promoab` ADD KEY IF NOT EXISTS `b_promoabrulesection_id` (`b_promoabrulesection_id`);
ALTER TABLE `mst_promoab` ADD KEY IF NOT EXISTS `promoabrule_id` (`promoabrule_id`);

ALTER TABLE `mst_promoab` ADD CONSTRAINT `fk_mst_promoab_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_promoab` ADD CONSTRAINT `fk_mst_promoab_mst_promoabmodel` FOREIGN KEY IF NOT EXISTS  (`promoabmodel_id`) REFERENCES `mst_promoabmodel` (`promoabmodel_id`);
ALTER TABLE `mst_promoab` ADD CONSTRAINT `fk_mst_promoab_mst_promoabrulesection` FOREIGN KEY IF NOT EXISTS  (`a_promoabrulesection_id`) REFERENCES `mst_promoabrulesection` (`promoabrulesection_id`);
ALTER TABLE `mst_promoab` ADD CONSTRAINT `fk_mst_promoab_mst_promoabrulesection_2` FOREIGN KEY IF NOT EXISTS  (`b_promoabrulesection_id`) REFERENCES `mst_promoabrulesection` (`promoabrulesection_id`);
ALTER TABLE `mst_promoab` ADD CONSTRAINT `fk_mst_promoab_mst_promoabrule` FOREIGN KEY IF NOT EXISTS  (`promoabrule_id`) REFERENCES `mst_promoabrule` (`promoabrule_id`);





CREATE TABLE IF NOT EXISTS `mst_promoabsite` (
	`promoabsite_id` varchar(14) NOT NULL , 
	`site_id` varchar(30) NOT NULL , 
	`site_code` varchar(30)  , 
	`promoab_id` varchar(10) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promoabsite_pair` (`promoab_id`, `site_code`),
	PRIMARY KEY (`promoabsite_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar limitiasi site';


ALTER TABLE `mst_promoabsite` ADD COLUMN IF NOT EXISTS  `site_id` varchar(30) NOT NULL  AFTER `promoabsite_id`;
ALTER TABLE `mst_promoabsite` ADD COLUMN IF NOT EXISTS  `site_code` varchar(30)   AFTER `site_id`;
ALTER TABLE `mst_promoabsite` ADD COLUMN IF NOT EXISTS  `promoab_id` varchar(10) NOT NULL  AFTER `site_code`;


ALTER TABLE `mst_promoabsite` MODIFY COLUMN IF EXISTS  `site_id` varchar(30) NOT NULL   AFTER `promoabsite_id`;
ALTER TABLE `mst_promoabsite` MODIFY COLUMN IF EXISTS  `site_code` varchar(30)    AFTER `site_id`;
ALTER TABLE `mst_promoabsite` MODIFY COLUMN IF EXISTS  `promoab_id` varchar(10) NOT NULL   AFTER `site_code`;


ALTER TABLE `mst_promoabsite` ADD CONSTRAINT `promoabsite_pair` UNIQUE IF NOT EXISTS  (`promoab_id`, `site_code`);

ALTER TABLE `mst_promoabsite` ADD KEY IF NOT EXISTS `site_id` (`site_id`);
ALTER TABLE `mst_promoabsite` ADD KEY IF NOT EXISTS `promoab_id` (`promoab_id`);

ALTER TABLE `mst_promoabsite` ADD CONSTRAINT `fk_mst_promoabsite_mst_site` FOREIGN KEY IF NOT EXISTS  (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_promoabsite` ADD CONSTRAINT `fk_mst_promoabsite_mst_promoab` FOREIGN KEY IF NOT EXISTS (`promoab_id`) REFERENCES `mst_promoab` (`promoab_id`);





CREATE TABLE IF NOT EXISTS `mst_promoabpospaym` (
	`promoabpospaym_id` varchar(14) NOT NULL , 
	`pospaym_code` varchar(30)  , 
	`promoab_id` varchar(10) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `promoabpospaym_pair` (`promoab_id`, `pospaym_code`),
	PRIMARY KEY (`promoabpospaym_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar limitiasi site';


ALTER TABLE `mst_promoabpospaym` ADD COLUMN IF NOT EXISTS  `pospaym_code` varchar(30)   AFTER `promoabpospaym_id`;
ALTER TABLE `mst_promoabpospaym` ADD COLUMN IF NOT EXISTS  `promoab_id` varchar(10) NOT NULL  AFTER `pospaym_code`;


ALTER TABLE `mst_promoabpospaym` MODIFY COLUMN IF EXISTS  `pospaym_code` varchar(30)    AFTER `promoabpospaym_id`;
ALTER TABLE `mst_promoabpospaym` MODIFY COLUMN IF EXISTS  `promoab_id` varchar(10) NOT NULL   AFTER `pospaym_code`;


ALTER TABLE `mst_promoabpospaym` ADD CONSTRAINT `promoabpospaym_pair` UNIQUE IF NOT EXISTS  (`promoab_id`, `pospaym_code`);

ALTER TABLE `mst_promoabpospaym` ADD KEY IF NOT EXISTS `promoab_id` (`promoab_id`);

ALTER TABLE `mst_promoabpospaym` ADD CONSTRAINT `fk_mst_promoabpospaym_mst_promoab` FOREIGN KEY IF NOT EXISTS (`promoab_id`) REFERENCES `mst_promoab` (`promoab_id`);





