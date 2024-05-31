-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_promoabmodel`;


CREATE TABLE IF NOT EXISTS `mst_promoabmodel` (
	`promoabmodel_id` varchar(14) NOT NULL , 
	`promoabmodel_descr` varchar(255)  , 
	`promoabrule_id` varchar(2)  , 
	`promoabrule_code` varchar(3)  , 
	`promoablevel_id` varchar(2)  , 
	`promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0, 
	`a_promoabrulesection_id` varchar(14)  , 
	`promoab_a_label` varchar(20)  , 
	`promoab_a_disc` decimal(4, 1) NOT NULL DEFAULT 0, 
	`promoab_a_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`promoab_a_qtymax` int(4) NOT NULL DEFAULT 0, 
	`promoab_a_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0, 
	`promoab_a_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0, 
	`promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0, 
	`b_promoabrulesection_id` varchar(14)  , 
	`promoab_b_label` varchar(20)  , 
	`promoab_b_disc` decimal(4, 1) NOT NULL DEFAULT 0, 
	`promoab_b_qtythreshold` int(4) NOT NULL DEFAULT 0, 
	`promoab_b_qtymax` int(4) NOT NULL DEFAULT 0, 
	`promoab_b_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0, 
	`promoab_b_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`promoabmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Promo';


ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoabmodel_descr` varchar(255)   AFTER `promoabmodel_id`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoabrule_id` varchar(2)   AFTER `promoabmodel_descr`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoabrule_code` varchar(3)   AFTER `promoabrule_id`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoablevel_id` varchar(2)   AFTER `promoabrule_code`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoablevel_id`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `a_promoabrulesection_id` varchar(14)   AFTER `promoabrule_ishasgroupa`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_a_label` varchar(20)   AFTER `a_promoabrulesection_id`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_a_disc` decimal(4, 1) NOT NULL DEFAULT 0 AFTER `promoab_a_label`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_a_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `promoab_a_disc`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_a_qtymax` int(4) NOT NULL DEFAULT 0 AFTER `promoab_a_qtythreshold`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_a_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_a_qtymax`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_a_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_a_isreplacedisc`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_a_isblockonmeet`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `b_promoabrulesection_id` varchar(14)   AFTER `promoabrule_ishasgroupb`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_b_label` varchar(20)   AFTER `b_promoabrulesection_id`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_b_disc` decimal(4, 1) NOT NULL DEFAULT 0 AFTER `promoab_b_label`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_b_qtythreshold` int(4) NOT NULL DEFAULT 0 AFTER `promoab_b_disc`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_b_qtymax` int(4) NOT NULL DEFAULT 0 AFTER `promoab_b_qtythreshold`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_b_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_b_qtymax`;
ALTER TABLE `mst_promoabmodel` ADD COLUMN IF NOT EXISTS  `promoab_b_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0 AFTER `promoab_b_isreplacedisc`;


ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoabmodel_descr` varchar(255)    AFTER `promoabmodel_id`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoabrule_id` varchar(2)    AFTER `promoabmodel_descr`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoabrule_code` varchar(3)    AFTER `promoabrule_id`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoablevel_id` varchar(2)    AFTER `promoabrule_code`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoabrule_ishasgroupa` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoablevel_id`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `a_promoabrulesection_id` varchar(14)    AFTER `promoabrule_ishasgroupa`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_a_label` varchar(20)    AFTER `a_promoabrulesection_id`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_a_disc` decimal(4, 1) NOT NULL DEFAULT 0  AFTER `promoab_a_label`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_a_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `promoab_a_disc`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_a_qtymax` int(4) NOT NULL DEFAULT 0  AFTER `promoab_a_qtythreshold`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_a_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_a_qtymax`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_a_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_a_isreplacedisc`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoabrule_ishasgroupb` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_a_isblockonmeet`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `b_promoabrulesection_id` varchar(14)    AFTER `promoabrule_ishasgroupb`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_b_label` varchar(20)    AFTER `b_promoabrulesection_id`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_b_disc` decimal(4, 1) NOT NULL DEFAULT 0  AFTER `promoab_b_label`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_b_qtythreshold` int(4) NOT NULL DEFAULT 0  AFTER `promoab_b_disc`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_b_qtymax` int(4) NOT NULL DEFAULT 0  AFTER `promoab_b_qtythreshold`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_b_isreplacedisc` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_b_qtymax`;
ALTER TABLE `mst_promoabmodel` MODIFY COLUMN IF EXISTS  `promoab_b_isblockonmeet` tinyint(1) NOT NULL DEFAULT 0  AFTER `promoab_b_isreplacedisc`;



ALTER TABLE `mst_promoabmodel` ADD KEY IF NOT EXISTS `promoabrule_id` (`promoabrule_id`);
ALTER TABLE `mst_promoabmodel` ADD KEY IF NOT EXISTS `promoablevel_id` (`promoablevel_id`);
ALTER TABLE `mst_promoabmodel` ADD KEY IF NOT EXISTS `a_promoabrulesection_id` (`a_promoabrulesection_id`);
ALTER TABLE `mst_promoabmodel` ADD KEY IF NOT EXISTS `b_promoabrulesection_id` (`b_promoabrulesection_id`);

ALTER TABLE `mst_promoabmodel` ADD CONSTRAINT `fk_mst_promoabmodel_mst_promoabrule` FOREIGN KEY IF NOT EXISTS  (`promoabrule_id`) REFERENCES `mst_promoabrule` (`promoabrule_id`);
ALTER TABLE `mst_promoabmodel` ADD CONSTRAINT `fk_mst_promoabmodel_mst_promoablevel` FOREIGN KEY IF NOT EXISTS  (`promoablevel_id`) REFERENCES `mst_promoablevel` (`promoablevel_id`);
ALTER TABLE `mst_promoabmodel` ADD CONSTRAINT `fk_mst_promoabmodel_mst_promoabrulesection` FOREIGN KEY IF NOT EXISTS  (`a_promoabrulesection_id`) REFERENCES `mst_promoabrulesection` (`promoabrulesection_id`);
ALTER TABLE `mst_promoabmodel` ADD CONSTRAINT `fk_mst_promoabmodel_mst_promoabrulesection_2` FOREIGN KEY IF NOT EXISTS  (`b_promoabrulesection_id`) REFERENCES `mst_promoabrulesection` (`promoabrulesection_id`);





