-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchitemctg`;
-- drop table if exists `mst_merchitemctgpic`;
-- drop table if exists `mst_merchitemctgprop`;
-- drop table if exists `mst_merchitemctgref`;


CREATE TABLE IF NOT EXISTS `mst_merchitemctg` (
	`merchitemctg_id` varchar(30) NOT NULL , 
	`merchitemctg_name` varchar(255) NOT NULL , 
	`merchitemctg_nameshort` varchar(255)  , 
	`merchitemctg_descr` varchar(255) NOT NULL , 
	`merchitemgro_id` varchar(30) NOT NULL , 
	`itemctg_id` varchar(30)  , 
	`merchrpt_id` varchar(10)  , 
	`gender_id` varchar(7)  , 
	`brand_id` varchar(10)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemctg_name` (`brand_id`, `merchitemctg_name`),
	PRIMARY KEY (`merchitemctg_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Category';


ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `merchitemctg_name` varchar(255) NOT NULL  AFTER `merchitemctg_id`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `merchitemctg_nameshort` varchar(255)   AFTER `merchitemctg_name`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `merchitemctg_descr` varchar(255) NOT NULL  AFTER `merchitemctg_nameshort`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `merchitemgro_id` varchar(30) NOT NULL  AFTER `merchitemctg_descr`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `itemctg_id` varchar(30)   AFTER `merchitemgro_id`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `merchrpt_id` varchar(10)   AFTER `itemctg_id`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `gender_id` varchar(7)   AFTER `merchrpt_id`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(10)   AFTER `gender_id`;
ALTER TABLE `mst_merchitemctg` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14) NOT NULL  AFTER `brand_id`;


ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `merchitemctg_name` varchar(255) NOT NULL   AFTER `merchitemctg_id`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `merchitemctg_nameshort` varchar(255)    AFTER `merchitemctg_name`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `merchitemctg_descr` varchar(255) NOT NULL   AFTER `merchitemctg_nameshort`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `merchitemgro_id` varchar(30) NOT NULL   AFTER `merchitemctg_descr`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `itemctg_id` varchar(30)    AFTER `merchitemgro_id`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `merchrpt_id` varchar(10)    AFTER `itemctg_id`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `gender_id` varchar(7)    AFTER `merchrpt_id`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `brand_id` varchar(10)    AFTER `gender_id`;
ALTER TABLE `mst_merchitemctg` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14) NOT NULL   AFTER `brand_id`;


ALTER TABLE `mst_merchitemctg` ADD CONSTRAINT `merchitemctg_name` UNIQUE IF NOT EXISTS  (`brand_id`, `merchitemctg_name`);

ALTER TABLE `mst_merchitemctg` ADD KEY IF NOT EXISTS `merchitemgro_id` (`merchitemgro_id`);
ALTER TABLE `mst_merchitemctg` ADD KEY IF NOT EXISTS `itemctg_id` (`itemctg_id`);
ALTER TABLE `mst_merchitemctg` ADD KEY IF NOT EXISTS `merchrpt_id` (`merchrpt_id`);
ALTER TABLE `mst_merchitemctg` ADD KEY IF NOT EXISTS `gender_id` (`gender_id`);
ALTER TABLE `mst_merchitemctg` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);
ALTER TABLE `mst_merchitemctg` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);

ALTER TABLE `mst_merchitemctg` ADD CONSTRAINT `fk_mst_merchitemctg_mst_merchitemgro` FOREIGN KEY IF NOT EXISTS  (`merchitemgro_id`) REFERENCES `mst_merchitemgro` (`merchitemgro_id`);
ALTER TABLE `mst_merchitemctg` ADD CONSTRAINT `fk_mst_merchitemctg_mst_itemctg` FOREIGN KEY IF NOT EXISTS  (`itemctg_id`) REFERENCES `mst_itemctg` (`itemctg_id`);
ALTER TABLE `mst_merchitemctg` ADD CONSTRAINT `fk_mst_merchitemctg_mst_merchrpt` FOREIGN KEY IF NOT EXISTS  (`merchrpt_id`) REFERENCES `mst_merchrpt` (`merchrpt_id`);
ALTER TABLE `mst_merchitemctg` ADD CONSTRAINT `fk_mst_merchitemctg_mst_gender` FOREIGN KEY IF NOT EXISTS  (`gender_id`) REFERENCES `mst_gender` (`gender_id`);
ALTER TABLE `mst_merchitemctg` ADD CONSTRAINT `fk_mst_merchitemctg_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_merchitemctg` ADD CONSTRAINT `fk_mst_merchitemctg_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemctgpic` (
	`merchitemctgpic_id` varchar(14) NOT NULL , 
	`merchitemctgpic_name` varchar(30) NOT NULL , 
	`merchitemctgpic_descr` varchar(90) NOT NULL , 
	`merchitemctgpic_order` int(4) NOT NULL DEFAULT 0, 
	`merchitemctgpic_file` varchar(90)  , 
	`merchsea_id` varchar(10)  , 
	`merchitemctg_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemctgpic_name` (`merchitemctg_id`, `merchitemctgpic_name`),
	PRIMARY KEY (`merchitemctgpic_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Picture Category Merch Item';


ALTER TABLE `mst_merchitemctgpic` ADD COLUMN IF NOT EXISTS  `merchitemctgpic_name` varchar(30) NOT NULL  AFTER `merchitemctgpic_id`;
ALTER TABLE `mst_merchitemctgpic` ADD COLUMN IF NOT EXISTS  `merchitemctgpic_descr` varchar(90) NOT NULL  AFTER `merchitemctgpic_name`;
ALTER TABLE `mst_merchitemctgpic` ADD COLUMN IF NOT EXISTS  `merchitemctgpic_order` int(4) NOT NULL DEFAULT 0 AFTER `merchitemctgpic_descr`;
ALTER TABLE `mst_merchitemctgpic` ADD COLUMN IF NOT EXISTS  `merchitemctgpic_file` varchar(90)   AFTER `merchitemctgpic_order`;
ALTER TABLE `mst_merchitemctgpic` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemctgpic_file`;
ALTER TABLE `mst_merchitemctgpic` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30) NOT NULL  AFTER `merchsea_id`;


ALTER TABLE `mst_merchitemctgpic` MODIFY COLUMN IF EXISTS  `merchitemctgpic_name` varchar(30) NOT NULL   AFTER `merchitemctgpic_id`;
ALTER TABLE `mst_merchitemctgpic` MODIFY COLUMN IF EXISTS  `merchitemctgpic_descr` varchar(90) NOT NULL   AFTER `merchitemctgpic_name`;
ALTER TABLE `mst_merchitemctgpic` MODIFY COLUMN IF EXISTS  `merchitemctgpic_order` int(4) NOT NULL DEFAULT 0  AFTER `merchitemctgpic_descr`;
ALTER TABLE `mst_merchitemctgpic` MODIFY COLUMN IF EXISTS  `merchitemctgpic_file` varchar(90)    AFTER `merchitemctgpic_order`;
ALTER TABLE `mst_merchitemctgpic` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)    AFTER `merchitemctgpic_file`;
ALTER TABLE `mst_merchitemctgpic` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30) NOT NULL   AFTER `merchsea_id`;


ALTER TABLE `mst_merchitemctgpic` ADD CONSTRAINT `merchitemctgpic_name` UNIQUE IF NOT EXISTS  (`merchitemctg_id`, `merchitemctgpic_name`);

ALTER TABLE `mst_merchitemctgpic` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `mst_merchitemctgpic` ADD KEY IF NOT EXISTS `merchitemctg_id` (`merchitemctg_id`);

ALTER TABLE `mst_merchitemctgpic` ADD CONSTRAINT `fk_mst_merchitemctgpic_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `mst_merchitemctgpic` ADD CONSTRAINT `fk_mst_merchitemctgpic_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemctgprop` (
	`merchitemctgprop_id` varchar(14) NOT NULL , 
	`merchproptype_id` varchar(20) NOT NULL , 
	`merchitemctgprop_value` varchar(90) NOT NULL , 
	`merchitemctg_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitemctgprop_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Properties Category Merch Item';


ALTER TABLE `mst_merchitemctgprop` ADD COLUMN IF NOT EXISTS  `merchproptype_id` varchar(20) NOT NULL  AFTER `merchitemctgprop_id`;
ALTER TABLE `mst_merchitemctgprop` ADD COLUMN IF NOT EXISTS  `merchitemctgprop_value` varchar(90) NOT NULL  AFTER `merchproptype_id`;
ALTER TABLE `mst_merchitemctgprop` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30) NOT NULL  AFTER `merchitemctgprop_value`;


ALTER TABLE `mst_merchitemctgprop` MODIFY COLUMN IF EXISTS  `merchproptype_id` varchar(20) NOT NULL   AFTER `merchitemctgprop_id`;
ALTER TABLE `mst_merchitemctgprop` MODIFY COLUMN IF EXISTS  `merchitemctgprop_value` varchar(90) NOT NULL   AFTER `merchproptype_id`;
ALTER TABLE `mst_merchitemctgprop` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30) NOT NULL   AFTER `merchitemctgprop_value`;



ALTER TABLE `mst_merchitemctgprop` ADD KEY IF NOT EXISTS `merchproptype_id` (`merchproptype_id`);
ALTER TABLE `mst_merchitemctgprop` ADD KEY IF NOT EXISTS `merchitemctg_id` (`merchitemctg_id`);

ALTER TABLE `mst_merchitemctgprop` ADD CONSTRAINT `fk_mst_merchitemctgprop_mst_merchproptype` FOREIGN KEY IF NOT EXISTS  (`merchproptype_id`) REFERENCES `mst_merchproptype` (`merchproptype_id`);
ALTER TABLE `mst_merchitemctgprop` ADD CONSTRAINT `fk_mst_merchitemctgprop_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemctgref` (
	`merchitemctgref_id` varchar(14) NOT NULL , 
	`brand_id` varchar(10)  , 
	`interface_id` varchar(7) NOT NULL , 
	`merchitemctgref_code` varchar(90) NOT NULL , 
	`merchitemctgref_value` varchar(255)  , 
	`merchitemctg_id` varchar(30) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemctgref_pair` (`brand_id`, `interface_id`, `merchitemctgref_code`, `merchitemctgref_value`),
	PRIMARY KEY (`merchitemctgref_id`)
) 
ENGINE=InnoDB
COMMENT='Kode referensi merchandise item kategori untuk keperluan interfacing dengan system lain';


ALTER TABLE `mst_merchitemctgref` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(10)   AFTER `merchitemctgref_id`;
ALTER TABLE `mst_merchitemctgref` ADD COLUMN IF NOT EXISTS  `interface_id` varchar(7) NOT NULL  AFTER `brand_id`;
ALTER TABLE `mst_merchitemctgref` ADD COLUMN IF NOT EXISTS  `merchitemctgref_code` varchar(90) NOT NULL  AFTER `interface_id`;
ALTER TABLE `mst_merchitemctgref` ADD COLUMN IF NOT EXISTS  `merchitemctgref_value` varchar(255)   AFTER `merchitemctgref_code`;
ALTER TABLE `mst_merchitemctgref` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30) NOT NULL  AFTER `merchitemctgref_value`;


ALTER TABLE `mst_merchitemctgref` MODIFY COLUMN IF EXISTS  `brand_id` varchar(10)    AFTER `merchitemctgref_id`;
ALTER TABLE `mst_merchitemctgref` MODIFY COLUMN IF EXISTS  `interface_id` varchar(7) NOT NULL   AFTER `brand_id`;
ALTER TABLE `mst_merchitemctgref` MODIFY COLUMN IF EXISTS  `merchitemctgref_code` varchar(90) NOT NULL   AFTER `interface_id`;
ALTER TABLE `mst_merchitemctgref` MODIFY COLUMN IF EXISTS  `merchitemctgref_value` varchar(255)    AFTER `merchitemctgref_code`;
ALTER TABLE `mst_merchitemctgref` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30) NOT NULL   AFTER `merchitemctgref_value`;


ALTER TABLE `mst_merchitemctgref` ADD CONSTRAINT `merchitemctgref_pair` UNIQUE IF NOT EXISTS  (`brand_id`, `interface_id`, `merchitemctgref_code`, `merchitemctgref_value`);

ALTER TABLE `mst_merchitemctgref` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);
ALTER TABLE `mst_merchitemctgref` ADD KEY IF NOT EXISTS `interface_id` (`interface_id`);
ALTER TABLE `mst_merchitemctgref` ADD KEY IF NOT EXISTS `merchitemctg_id` (`merchitemctg_id`);

ALTER TABLE `mst_merchitemctgref` ADD CONSTRAINT `fk_mst_merchitemctgref_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_merchitemctgref` ADD CONSTRAINT `fk_mst_merchitemctgref_mst_interface` FOREIGN KEY IF NOT EXISTS  (`interface_id`) REFERENCES `mst_interface` (`interface_id`);
ALTER TABLE `mst_merchitemctgref` ADD CONSTRAINT `fk_mst_merchitemctgref_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);





