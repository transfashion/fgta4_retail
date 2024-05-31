-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchitemgro`;
-- drop table if exists `mst_merchitemgropic`;
-- drop table if exists `mst_merchitemgroprop`;


CREATE TABLE IF NOT EXISTS `mst_merchitemgro` (
	`merchitemgro_id` varchar(30) NOT NULL , 
	`merchitemgro_name` varchar(90) NOT NULL , 
	`merchitemgro_nameshort` varchar(90)  , 
	`merchitemgro_descr` varchar(255)  , 
	`gender_id` varchar(7)  , 
	`brand_id` varchar(10)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemgro_name` (`brand_id`, `merchitemgro_name`, `merchitemgro_nameshort`),
	PRIMARY KEY (`merchitemgro_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Merchandise';


ALTER TABLE `mst_merchitemgro` ADD COLUMN IF NOT EXISTS  `merchitemgro_name` varchar(90) NOT NULL  AFTER `merchitemgro_id`;
ALTER TABLE `mst_merchitemgro` ADD COLUMN IF NOT EXISTS  `merchitemgro_nameshort` varchar(90)   AFTER `merchitemgro_name`;
ALTER TABLE `mst_merchitemgro` ADD COLUMN IF NOT EXISTS  `merchitemgro_descr` varchar(255)   AFTER `merchitemgro_nameshort`;
ALTER TABLE `mst_merchitemgro` ADD COLUMN IF NOT EXISTS  `gender_id` varchar(7)   AFTER `merchitemgro_descr`;
ALTER TABLE `mst_merchitemgro` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(10)   AFTER `gender_id`;


ALTER TABLE `mst_merchitemgro` MODIFY COLUMN IF EXISTS  `merchitemgro_name` varchar(90) NOT NULL  AFTER `merchitemgro_id`;
ALTER TABLE `mst_merchitemgro` MODIFY COLUMN IF EXISTS  `merchitemgro_nameshort` varchar(90)   AFTER `merchitemgro_name`;
ALTER TABLE `mst_merchitemgro` MODIFY COLUMN IF EXISTS  `merchitemgro_descr` varchar(255)   AFTER `merchitemgro_nameshort`;
ALTER TABLE `mst_merchitemgro` MODIFY COLUMN IF EXISTS  `gender_id` varchar(7)   AFTER `merchitemgro_descr`;
ALTER TABLE `mst_merchitemgro` MODIFY COLUMN IF EXISTS  `brand_id` varchar(10)   AFTER `gender_id`;


ALTER TABLE `mst_merchitemgro` ADD CONSTRAINT `merchitemgro_name` UNIQUE IF NOT EXISTS  (`brand_id`, `merchitemgro_name`, `merchitemgro_nameshort`);

ALTER TABLE `mst_merchitemgro` ADD KEY IF NOT EXISTS `gender_id` (`gender_id`);
ALTER TABLE `mst_merchitemgro` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);

ALTER TABLE `mst_merchitemgro` ADD CONSTRAINT `fk_mst_merchitemgro_mst_gender` FOREIGN KEY IF NOT EXISTS  (`gender_id`) REFERENCES `mst_gender` (`gender_id`);
ALTER TABLE `mst_merchitemgro` ADD CONSTRAINT `fk_mst_merchitemgro_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemgropic` (
	`merchitemgropic_id` varchar(14) NOT NULL , 
	`merchitemgropic_name` varchar(30) NOT NULL , 
	`merchitemgropic_descr` varchar(90) NOT NULL , 
	`merchitemgropic_order` int(4) NOT NULL DEFAULT 0, 
	`merchitemgropic_file` varchar(90)  , 
	`merchsea_id` varchar(10)  , 
	`merchitemgro_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemgropic_name` (`merchitemgro_id`, `merchitemgropic_name`),
	PRIMARY KEY (`merchitemgropic_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Picture Category Merch Item';


ALTER TABLE `mst_merchitemgropic` ADD COLUMN IF NOT EXISTS  `merchitemgropic_name` varchar(30) NOT NULL  AFTER `merchitemgropic_id`;
ALTER TABLE `mst_merchitemgropic` ADD COLUMN IF NOT EXISTS  `merchitemgropic_descr` varchar(90) NOT NULL  AFTER `merchitemgropic_name`;
ALTER TABLE `mst_merchitemgropic` ADD COLUMN IF NOT EXISTS  `merchitemgropic_order` int(4) NOT NULL DEFAULT 0 AFTER `merchitemgropic_descr`;
ALTER TABLE `mst_merchitemgropic` ADD COLUMN IF NOT EXISTS  `merchitemgropic_file` varchar(90)   AFTER `merchitemgropic_order`;
ALTER TABLE `mst_merchitemgropic` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemgropic_file`;
ALTER TABLE `mst_merchitemgropic` ADD COLUMN IF NOT EXISTS  `merchitemgro_id` varchar(30) NOT NULL  AFTER `merchsea_id`;


ALTER TABLE `mst_merchitemgropic` MODIFY COLUMN IF EXISTS  `merchitemgropic_name` varchar(30) NOT NULL  AFTER `merchitemgropic_id`;
ALTER TABLE `mst_merchitemgropic` MODIFY COLUMN IF EXISTS  `merchitemgropic_descr` varchar(90) NOT NULL  AFTER `merchitemgropic_name`;
ALTER TABLE `mst_merchitemgropic` MODIFY COLUMN IF EXISTS  `merchitemgropic_order` int(4) NOT NULL DEFAULT 0 AFTER `merchitemgropic_descr`;
ALTER TABLE `mst_merchitemgropic` MODIFY COLUMN IF EXISTS  `merchitemgropic_file` varchar(90)   AFTER `merchitemgropic_order`;
ALTER TABLE `mst_merchitemgropic` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemgropic_file`;
ALTER TABLE `mst_merchitemgropic` MODIFY COLUMN IF EXISTS  `merchitemgro_id` varchar(30) NOT NULL  AFTER `merchsea_id`;


ALTER TABLE `mst_merchitemgropic` ADD CONSTRAINT `merchitemgropic_name` UNIQUE IF NOT EXISTS  (`merchitemgro_id`, `merchitemgropic_name`);

ALTER TABLE `mst_merchitemgropic` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `mst_merchitemgropic` ADD KEY IF NOT EXISTS `merchitemgro_id` (`merchitemgro_id`);

ALTER TABLE `mst_merchitemgropic` ADD CONSTRAINT `fk_mst_merchitemgropic_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `mst_merchitemgropic` ADD CONSTRAINT `fk_mst_merchitemgropic_mst_merchitemgro` FOREIGN KEY IF NOT EXISTS (`merchitemgro_id`) REFERENCES `mst_merchitemgro` (`merchitemgro_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemgroprop` (
	`merchitemgroprop_id` varchar(14) NOT NULL , 
	`merchproptype_id` varchar(20) NOT NULL , 
	`merchitemcatprop_value` varchar(255) NOT NULL , 
	`merchitemgro_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemgropic_name` (`merchitemgro_id`, `merchproptype_id`),
	PRIMARY KEY (`merchitemgroprop_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Properties Category Merch Item';


ALTER TABLE `mst_merchitemgroprop` ADD COLUMN IF NOT EXISTS  `merchproptype_id` varchar(20) NOT NULL  AFTER `merchitemgroprop_id`;
ALTER TABLE `mst_merchitemgroprop` ADD COLUMN IF NOT EXISTS  `merchitemcatprop_value` varchar(255) NOT NULL  AFTER `merchproptype_id`;
ALTER TABLE `mst_merchitemgroprop` ADD COLUMN IF NOT EXISTS  `merchitemgro_id` varchar(30) NOT NULL  AFTER `merchitemcatprop_value`;


ALTER TABLE `mst_merchitemgroprop` MODIFY COLUMN IF EXISTS  `merchproptype_id` varchar(20) NOT NULL  AFTER `merchitemgroprop_id`;
ALTER TABLE `mst_merchitemgroprop` MODIFY COLUMN IF EXISTS  `merchitemcatprop_value` varchar(255) NOT NULL  AFTER `merchproptype_id`;
ALTER TABLE `mst_merchitemgroprop` MODIFY COLUMN IF EXISTS  `merchitemgro_id` varchar(30) NOT NULL  AFTER `merchitemcatprop_value`;


ALTER TABLE `mst_merchitemgroprop` ADD CONSTRAINT `merchitemgropic_name` UNIQUE IF NOT EXISTS  (`merchitemgro_id`, `merchproptype_id`);

ALTER TABLE `mst_merchitemgroprop` ADD KEY IF NOT EXISTS `merchproptype_id` (`merchproptype_id`);
ALTER TABLE `mst_merchitemgroprop` ADD KEY IF NOT EXISTS `merchitemgro_id` (`merchitemgro_id`);

ALTER TABLE `mst_merchitemgroprop` ADD CONSTRAINT `fk_mst_merchitemgroprop_web_webproptype` FOREIGN KEY IF NOT EXISTS  (`merchproptype_id`) REFERENCES `web_webproptype` (`webproptype_id`);
ALTER TABLE `mst_merchitemgroprop` ADD CONSTRAINT `fk_mst_merchitemgroprop_mst_merchitemgro` FOREIGN KEY IF NOT EXISTS (`merchitemgro_id`) REFERENCES `mst_merchitemgro` (`merchitemgro_id`);





