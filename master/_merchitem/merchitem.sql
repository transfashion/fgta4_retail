-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchitem`;
-- drop table if exists `mst_merchitembarcode`;
-- drop table if exists `mst_merchitemprop`;
-- drop table if exists `mst_merchitemretailchannel`;
-- drop table if exists `mst_merchitemrelated`;
-- drop table if exists `mst_merchitempic`;
-- drop table if exists `mst_merchitemref`;


CREATE TABLE IF NOT EXISTS `mst_merchitem` (
	`merchitem_id` varchar(14) NOT NULL , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`merchitem_size` varchar(20)  , 
	`merchitem_name` varchar(255)  , 
	`merchitem_descr` varchar(20000)  , 
	`merchitem_picture` varchar(90)  , 
	`merchitemctg_id` varchar(30)  , 
	`merchsea_id` varchar(10)  , 
	`brand_id` varchar(14)  , 
	`merchitem_width` decimal(6, 1)  , 
	`merchitem_length` decimal(6, 1)  , 
	`merchitem_height` decimal(6, 1)  , 
	`merchitem_weight` decimal(6, 1)  , 
	`merchitem_priceori` decimal(10, 0) NOT NULL DEFAULT 0, 
	`merchitem_price` decimal(10, 0) NOT NULL DEFAULT 0, 
	`merchitem_issp` tinyint(1) NOT NULL DEFAULT 0, 
	`merchitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`merchitem_disc` decimal(5, 2) NOT NULL DEFAULT 0, 
	`merchitem_discval` decimal(10, 0) NOT NULL DEFAULT 0, 
	`merchitem_pricenett` decimal(10, 0) NOT NULL DEFAULT 0, 
	`merchitem_lastcogs` decimal(10, 0) NOT NULL DEFAULT 0, 
	`merchitem_lastcogsdt` date NOT NULL , 
	`merchrpt_id` varchar(10)  , 
	`gender_id` varchar(7)  , 
	`merchitem_colorcode` varchar(30)  , 
	`merchitem_colorname` varchar(30)  , 
	`merchitem_hscodeship` varchar(30)  , 
	`merchitem_hscode` varchar(30)  , 
	`merchitemvar_id` varchar(14)  , 
	`merchsizetag_id` varchar(20)  , 
	`merchitem_isallchannel` tinyint(1) NOT NULL DEFAULT 1, 
	`merchitem_isnonactive` tinyint(1) NOT NULL DEFAULT 0, 
	`merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitem_artmatcolsize` (`brand_id`, `merchitem_art`, `merchitem_mat`, `merchitem_col`, `merchitem_size`),
	PRIMARY KEY (`merchitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Season';


ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(20)   AFTER `merchitem_col`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_size`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_descr` varchar(20000)   AFTER `merchitem_name`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_picture` varchar(90)   AFTER `merchitem_descr`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitemctg_id` varchar(30)   AFTER `merchitem_picture`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemctg_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14)   AFTER `merchsea_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_width` decimal(6, 1)   AFTER `brand_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_length` decimal(6, 1)   AFTER `merchitem_width`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_height` decimal(6, 1)   AFTER `merchitem_length`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_weight` decimal(6, 1)   AFTER `merchitem_height`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_priceori` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_weight`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_price` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_priceori`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_issp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_issp`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_disc` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchitem_isdiscvalue`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_discval` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_disc`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_pricenett` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_discval`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_lastcogs` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricenett`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_lastcogsdt` date NOT NULL  AFTER `merchitem_lastcogs`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchrpt_id` varchar(10)   AFTER `merchitem_lastcogsdt`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `gender_id` varchar(7)   AFTER `merchrpt_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colorcode` varchar(30)   AFTER `gender_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_colorname` varchar(30)   AFTER `merchitem_colorcode`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscodeship` varchar(30)   AFTER `merchitem_colorname`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_hscode` varchar(30)   AFTER `merchitem_hscodeship`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitemvar_id` varchar(14)   AFTER `merchitem_hscode`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchsizetag_id` varchar(20)   AFTER `merchitemvar_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_isallchannel` tinyint(1) NOT NULL DEFAULT 1 AFTER `merchsizetag_id`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_isnonactive` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_isallchannel`;
ALTER TABLE `mst_merchitem` ADD COLUMN IF NOT EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_isnonactive`;


ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(20)   AFTER `merchitem_col`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_name` varchar(255)   AFTER `merchitem_size`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_descr` varchar(20000)   AFTER `merchitem_name`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_picture` varchar(90)   AFTER `merchitem_descr`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitemctg_id` varchar(30)   AFTER `merchitem_picture`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchsea_id` varchar(10)   AFTER `merchitemctg_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14)   AFTER `merchsea_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_width` decimal(6, 1)   AFTER `brand_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_length` decimal(6, 1)   AFTER `merchitem_width`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_height` decimal(6, 1)   AFTER `merchitem_length`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_weight` decimal(6, 1)   AFTER `merchitem_height`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_priceori` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_weight`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_price` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_priceori`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_issp` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_issp`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_disc` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchitem_isdiscvalue`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_discval` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_disc`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_pricenett` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_discval`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_lastcogs` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_pricenett`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_lastcogsdt` date NOT NULL  AFTER `merchitem_lastcogs`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchrpt_id` varchar(10)   AFTER `merchitem_lastcogsdt`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `gender_id` varchar(7)   AFTER `merchrpt_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colorcode` varchar(30)   AFTER `gender_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_colorname` varchar(30)   AFTER `merchitem_colorcode`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_hscodeship` varchar(30)   AFTER `merchitem_colorname`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_hscode` varchar(30)   AFTER `merchitem_hscodeship`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitemvar_id` varchar(14)   AFTER `merchitem_hscode`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchsizetag_id` varchar(20)   AFTER `merchitemvar_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_isallchannel` tinyint(1) NOT NULL DEFAULT 1 AFTER `merchsizetag_id`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_isnonactive` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_isallchannel`;
ALTER TABLE `mst_merchitem` MODIFY COLUMN IF EXISTS  `merchitem_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_isnonactive`;


ALTER TABLE `mst_merchitem` ADD CONSTRAINT `merchitem_artmatcolsize` UNIQUE IF NOT EXISTS  (`merchitem_art`, `merchitem_mat`, `merchitem_col`, `merchitem_size`);

ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS `merchitemctg_id` (`merchitemctg_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS `merchsea_id` (`merchsea_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS `merchrpt_id` (`merchrpt_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS `gender_id` (`gender_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS  `merchitemvar_id` (`merchitemvar_id`);
ALTER TABLE `mst_merchitem` ADD KEY IF NOT EXISTS `merchsizetag_id` (`merchsizetag_id`);

ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchitemctg` FOREIGN KEY IF NOT EXISTS  (`merchitemctg_id`) REFERENCES `mst_merchitemctg` (`merchitemctg_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchsea` FOREIGN KEY IF NOT EXISTS  (`merchsea_id`) REFERENCES `mst_merchsea` (`merchsea_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchrpt` FOREIGN KEY IF NOT EXISTS  (`merchrpt_id`) REFERENCES `mst_merchrpt` (`merchrpt_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_gender` FOREIGN KEY IF NOT EXISTS  (`gender_id`) REFERENCES `mst_gender` (`gender_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchitemvar` FOREIGN KEY IF NOT EXISTS (`merchitemvar_id`) REFERENCES `mst_merchitemvar` (`merchitemvar_id`);
ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_merchsizetag` FOREIGN KEY IF NOT EXISTS  (`merchsizetag_id`) REFERENCES `mst_merchsizetag` (`merchsizetag_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitembarcode` (
	`merchitembarcode_id` varchar(14) NOT NULL , 
	`merchitembarcode_text` varchar(14)  , 
	`brand_id` varchar(10)  , 
	`merchitem_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitembarcode_brand` (`brand_id`, `merchitembarcode_text`),
	PRIMARY KEY (`merchitembarcode_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Properties Category Merch Item';


ALTER TABLE `mst_merchitembarcode` ADD COLUMN IF NOT EXISTS  `merchitembarcode_text` varchar(14)   AFTER `merchitembarcode_id`;
ALTER TABLE `mst_merchitembarcode` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(10)   AFTER `merchitembarcode_text`;
ALTER TABLE `mst_merchitembarcode` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `brand_id`;


ALTER TABLE `mst_merchitembarcode` MODIFY COLUMN IF EXISTS  `merchitembarcode_text` varchar(14)   AFTER `merchitembarcode_id`;
ALTER TABLE `mst_merchitembarcode` MODIFY COLUMN IF EXISTS  `brand_id` varchar(10)   AFTER `merchitembarcode_text`;
ALTER TABLE `mst_merchitembarcode` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `brand_id`;


ALTER TABLE `mst_merchitembarcode` ADD CONSTRAINT `merchitembarcode_brand` UNIQUE IF NOT EXISTS  (`brand_id`, `merchitembarcode_text`);

ALTER TABLE `mst_merchitembarcode` ADD KEY IF NOT EXISTS  `brand_id` (`brand_id`);
ALTER TABLE `mst_merchitembarcode` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);

ALTER TABLE `mst_merchitembarcode` ADD CONSTRAINT `fk_mst_merchitembarcode_mst_brand` FOREIGN KEY IF NOT EXISTS (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `mst_merchitembarcode` ADD CONSTRAINT `fk_mst_merchitembarcode_mst_merchitem` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemprop` (
	`merchitemprop_id` varchar(14) NOT NULL , 
	`merchproptype_id` varchar(20) NOT NULL , 
	`merchitemprop_value` varchar(90) NOT NULL , 
	`merchitem_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitemprop_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Properties Category Merch Item';


ALTER TABLE `mst_merchitemprop` ADD COLUMN IF NOT EXISTS  `merchproptype_id` varchar(20) NOT NULL  AFTER `merchitemprop_id`;
ALTER TABLE `mst_merchitemprop` ADD COLUMN IF NOT EXISTS  `merchitemprop_value` varchar(90) NOT NULL  AFTER `merchproptype_id`;
ALTER TABLE `mst_merchitemprop` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitemprop_value`;


ALTER TABLE `mst_merchitemprop` MODIFY COLUMN IF EXISTS  `merchproptype_id` varchar(20) NOT NULL  AFTER `merchitemprop_id`;
ALTER TABLE `mst_merchitemprop` MODIFY COLUMN IF EXISTS  `merchitemprop_value` varchar(90) NOT NULL  AFTER `merchproptype_id`;
ALTER TABLE `mst_merchitemprop` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitemprop_value`;



ALTER TABLE `mst_merchitemprop` ADD KEY IF NOT EXISTS `merchproptype_id` (`merchproptype_id`);
ALTER TABLE `mst_merchitemprop` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);

ALTER TABLE `mst_merchitemprop` ADD CONSTRAINT `fk_mst_merchitemprop_mst_merchproptype` FOREIGN KEY IF NOT EXISTS  (`merchproptype_id`) REFERENCES `mst_merchproptype` (`merchproptype_id`);
ALTER TABLE `mst_merchitemprop` ADD CONSTRAINT `fk_mst_merchitemprop_mst_merchitem` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemretailchannel` (
	`merchitemretailchannel_id` varchar(14) NOT NULL , 
	`retailchannel_id` varchar(10) NOT NULL , 
	`merchitem_isnonactive` tinyint(1) NOT NULL DEFAULT 0, 
	`merchitem_price` decimal(10, 0) NOT NULL DEFAULT 0, 
	`merchitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`merchitem_disc` decimal(5, 2) NOT NULL DEFAULT 0, 
	`merchitem_discval` decimal(5, 2) NOT NULL DEFAULT 0, 
	`merchitem_pricenett` decimal(10, 0) NOT NULL DEFAULT 0, 
	`merchitem_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitemretailchannel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Properties Category Merch Item';


ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `retailchannel_id` varchar(10) NOT NULL  AFTER `merchitemretailchannel_id`;
ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `merchitem_isnonactive` tinyint(1) NOT NULL DEFAULT 0 AFTER `retailchannel_id`;
ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `merchitem_price` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_isnonactive`;
ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `merchitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `merchitem_disc` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchitem_isdiscvalue`;
ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `merchitem_discval` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchitem_disc`;
ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `merchitem_pricenett` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_discval`;
ALTER TABLE `mst_merchitemretailchannel` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitem_pricenett`;


ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `retailchannel_id` varchar(10) NOT NULL  AFTER `merchitemretailchannel_id`;
ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `merchitem_isnonactive` tinyint(1) NOT NULL DEFAULT 0 AFTER `retailchannel_id`;
ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `merchitem_price` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_isnonactive`;
ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `merchitem_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchitem_price`;
ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `merchitem_disc` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchitem_isdiscvalue`;
ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `merchitem_discval` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `merchitem_disc`;
ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `merchitem_pricenett` decimal(10, 0) NOT NULL DEFAULT 0 AFTER `merchitem_discval`;
ALTER TABLE `mst_merchitemretailchannel` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitem_pricenett`;



ALTER TABLE `mst_merchitemretailchannel` ADD KEY IF NOT EXISTS `retailchannel_id` (`retailchannel_id`);
ALTER TABLE `mst_merchitemretailchannel` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);

ALTER TABLE `mst_merchitemretailchannel` ADD CONSTRAINT `fk_mst_merchitemretailchannel_mst_retailchannel` FOREIGN KEY IF NOT EXISTS  (`retailchannel_id`) REFERENCES `mst_retailchannel` (`retailchannel_id`);
ALTER TABLE `mst_merchitemretailchannel` ADD CONSTRAINT `fk_mst_merchitemretailchannel_mst_merchitem` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemrelated` (
	`merchitemrelated_id` varchar(14) NOT NULL , 
	`merchitem_id` varchar(30) NOT NULL , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`merchitem_size` varchar(30)  , 
	`brand_id` varchar(10)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitemrelated_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Related Item';


ALTER TABLE `mst_merchitemrelated` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitemrelated_id`;
ALTER TABLE `mst_merchitemrelated` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `mst_merchitemrelated` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `mst_merchitemrelated` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `mst_merchitemrelated` ADD COLUMN IF NOT EXISTS  `merchitem_size` varchar(30)   AFTER `merchitem_col`;
ALTER TABLE `mst_merchitemrelated` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(10)   AFTER `merchitem_size`;


ALTER TABLE `mst_merchitemrelated` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitemrelated_id`;
ALTER TABLE `mst_merchitemrelated` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)   AFTER `merchitem_id`;
ALTER TABLE `mst_merchitemrelated` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `mst_merchitemrelated` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;
ALTER TABLE `mst_merchitemrelated` MODIFY COLUMN IF EXISTS  `merchitem_size` varchar(30)   AFTER `merchitem_col`;
ALTER TABLE `mst_merchitemrelated` MODIFY COLUMN IF EXISTS  `brand_id` varchar(10)   AFTER `merchitem_size`;



ALTER TABLE `mst_merchitemrelated` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);
ALTER TABLE `mst_merchitemrelated` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);

ALTER TABLE `mst_merchitemrelated` ADD CONSTRAINT `fk_mst_merchitemrelated_mst_merchitem` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);
ALTER TABLE `mst_merchitemrelated` ADD CONSTRAINT `fk_mst_merchitemrelated_mst_brand` FOREIGN KEY IF NOT EXISTS  (`brand_id`) REFERENCES `mst_brand` (`brand_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitempic` (
	`merchitempic_id` varchar(14) NOT NULL , 
	`merchitempic_name` varchar(30) NOT NULL , 
	`merchitempic_descr` varchar(90) NOT NULL , 
	`merchitempic_order` int(4) NOT NULL DEFAULT 0, 
	`merchitempic_file` varchar(90)  , 
	`merchitem_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitempic_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Picture Category Merch Item';


ALTER TABLE `mst_merchitempic` ADD COLUMN IF NOT EXISTS  `merchitempic_name` varchar(30) NOT NULL  AFTER `merchitempic_id`;
ALTER TABLE `mst_merchitempic` ADD COLUMN IF NOT EXISTS  `merchitempic_descr` varchar(90) NOT NULL  AFTER `merchitempic_name`;
ALTER TABLE `mst_merchitempic` ADD COLUMN IF NOT EXISTS  `merchitempic_order` int(4) NOT NULL DEFAULT 0 AFTER `merchitempic_descr`;
ALTER TABLE `mst_merchitempic` ADD COLUMN IF NOT EXISTS  `merchitempic_file` varchar(90)   AFTER `merchitempic_order`;
ALTER TABLE `mst_merchitempic` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitempic_file`;


ALTER TABLE `mst_merchitempic` MODIFY COLUMN IF EXISTS  `merchitempic_name` varchar(30) NOT NULL  AFTER `merchitempic_id`;
ALTER TABLE `mst_merchitempic` MODIFY COLUMN IF EXISTS  `merchitempic_descr` varchar(90) NOT NULL  AFTER `merchitempic_name`;
ALTER TABLE `mst_merchitempic` MODIFY COLUMN IF EXISTS  `merchitempic_order` int(4) NOT NULL DEFAULT 0 AFTER `merchitempic_descr`;
ALTER TABLE `mst_merchitempic` MODIFY COLUMN IF EXISTS  `merchitempic_file` varchar(90)   AFTER `merchitempic_order`;
ALTER TABLE `mst_merchitempic` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitempic_file`;



ALTER TABLE `mst_merchitempic` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);

ALTER TABLE `mst_merchitempic` ADD CONSTRAINT `fk_mst_merchitempic_mst_merchitem` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);





CREATE TABLE IF NOT EXISTS `mst_merchitemref` (
	`merchitemref_id` varchar(14) NOT NULL , 
	`interface_id` varchar(7) NOT NULL , 
	`merchitemref_code` varchar(30) NOT NULL , 
	`merchitem_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchitemref_pair` (`merchitem_id`, `interface_id`),
	PRIMARY KEY (`merchitemref_id`)
) 
ENGINE=InnoDB
COMMENT='Kode referensi merchandise item untuk keperluan interfacing dengan system lain';


ALTER TABLE `mst_merchitemref` ADD COLUMN IF NOT EXISTS  `interface_id` varchar(7) NOT NULL  AFTER `merchitemref_id`;
ALTER TABLE `mst_merchitemref` ADD COLUMN IF NOT EXISTS  `merchitemref_code` varchar(30) NOT NULL  AFTER `interface_id`;
ALTER TABLE `mst_merchitemref` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitemref_code`;


ALTER TABLE `mst_merchitemref` MODIFY COLUMN IF EXISTS  `interface_id` varchar(7) NOT NULL  AFTER `merchitemref_id`;
ALTER TABLE `mst_merchitemref` MODIFY COLUMN IF EXISTS  `merchitemref_code` varchar(30) NOT NULL  AFTER `interface_id`;
ALTER TABLE `mst_merchitemref` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(30) NOT NULL  AFTER `merchitemref_code`;


ALTER TABLE `mst_merchitemref` ADD CONSTRAINT `merchitemref_pair` UNIQUE IF NOT EXISTS  (`merchitem_id`, `interface_id`);

ALTER TABLE `mst_merchitemref` ADD KEY IF NOT EXISTS `interface_id` (`interface_id`);
ALTER TABLE `mst_merchitemref` ADD KEY IF NOT EXISTS `merchitem_id` (`merchitem_id`);

ALTER TABLE `mst_merchitemref` ADD CONSTRAINT `fk_mst_merchitemref_mst_interface` FOREIGN KEY IF NOT EXISTS  (`interface_id`) REFERENCES `mst_interface` (`interface_id`);
ALTER TABLE `mst_merchitemref` ADD CONSTRAINT `fk_mst_merchitemref_mst_merchitem` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);





