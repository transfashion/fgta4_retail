-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `fsn_merchsync`;


CREATE TABLE IF NOT EXISTS `fsn_merchsync` (
	`merchsync_id` varchar(30) NOT NULL , 
	`merchsync_doc` varchar(90) NOT NULL , 
	`merchsync_type` varchar(30) NOT NULL , 
	`merchsync_isprocessing` tinyint(1) NOT NULL DEFAULT 0, 
	`merchsync_batch` varchar(30)  , 
	`merchsync_isfail` tinyint(1) NOT NULL DEFAULT 0, 
	`merchsync_result` varchar(255)  , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchsync_id`)
) 
ENGINE=MyISAM
COMMENT='Daftar Season';


ALTER TABLE `fsn_merchsync` ADD COLUMN IF NOT EXISTS  `merchsync_doc` varchar(90) NOT NULL  AFTER `merchsync_id`;
ALTER TABLE `fsn_merchsync` ADD COLUMN IF NOT EXISTS  `merchsync_type` varchar(30) NOT NULL  AFTER `merchsync_doc`;
ALTER TABLE `fsn_merchsync` ADD COLUMN IF NOT EXISTS  `merchsync_isprocessing` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchsync_type`;
ALTER TABLE `fsn_merchsync` ADD COLUMN IF NOT EXISTS  `merchsync_batch` varchar(30)   AFTER `merchsync_isprocessing`;
ALTER TABLE `fsn_merchsync` ADD COLUMN IF NOT EXISTS  `merchsync_isfail` tinyint(1) NOT NULL DEFAULT 0 AFTER `merchsync_batch`;
ALTER TABLE `fsn_merchsync` ADD COLUMN IF NOT EXISTS  `merchsync_result` varchar(255)   AFTER `merchsync_isfail`;


ALTER TABLE `fsn_merchsync` MODIFY COLUMN IF EXISTS  `merchsync_doc` varchar(90) NOT NULL   AFTER `merchsync_id`;
ALTER TABLE `fsn_merchsync` MODIFY COLUMN IF EXISTS  `merchsync_type` varchar(30) NOT NULL   AFTER `merchsync_doc`;
ALTER TABLE `fsn_merchsync` MODIFY COLUMN IF EXISTS  `merchsync_isprocessing` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchsync_type`;
ALTER TABLE `fsn_merchsync` MODIFY COLUMN IF EXISTS  `merchsync_batch` varchar(30)    AFTER `merchsync_isprocessing`;
ALTER TABLE `fsn_merchsync` MODIFY COLUMN IF EXISTS  `merchsync_isfail` tinyint(1) NOT NULL DEFAULT 0  AFTER `merchsync_batch`;
ALTER TABLE `fsn_merchsync` MODIFY COLUMN IF EXISTS  `merchsync_result` varchar(255)    AFTER `merchsync_isfail`;









