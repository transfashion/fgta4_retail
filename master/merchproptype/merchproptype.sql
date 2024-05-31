-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchproptype`;


CREATE TABLE `mst_merchproptype` (
	`merchproptype_id` varchar(20) NOT NULL , 
	`merchproptype_name` varchar(30) NOT NULL , 
	`merchproptype_group` varchar(20) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchproptype_name` (`merchproptype_name`),
	PRIMARY KEY (`merchproptype_id`)
) 
ENGINE=InnoDB
COMMENT='Master Data Properties Type';







