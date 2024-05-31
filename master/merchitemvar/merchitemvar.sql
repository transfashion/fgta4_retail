-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchitemvar`;


CREATE TABLE IF NOT EXISTS `mst_merchitemvar` (
	`merchitemvar_id` varchar(14) NOT NULL , 
	`merchitem_art` varchar(30)  , 
	`merchitem_mat` varchar(30)  , 
	`merchitem_col` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitemvar_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Variance item merchandise';


ALTER TABLE `mst_merchitemvar` ADD COLUMN IF NOT EXISTS  `merchitem_art` varchar(30)   AFTER `merchitemvar_id`;
ALTER TABLE `mst_merchitemvar` ADD COLUMN IF NOT EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `mst_merchitemvar` ADD COLUMN IF NOT EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;


ALTER TABLE `mst_merchitemvar` MODIFY COLUMN IF EXISTS  `merchitem_art` varchar(30)   AFTER `merchitemvar_id`;
ALTER TABLE `mst_merchitemvar` MODIFY COLUMN IF EXISTS  `merchitem_mat` varchar(30)   AFTER `merchitem_art`;
ALTER TABLE `mst_merchitemvar` MODIFY COLUMN IF EXISTS  `merchitem_col` varchar(30)   AFTER `merchitem_mat`;









