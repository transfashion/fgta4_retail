-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_retailchannel`;


CREATE TABLE `mst_retailchannel` (
	`retailchannel_id` varchar(10) NOT NULL , 
	`retailchannel_name` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `retailchannel_name` (`retailchannel_name`),
	PRIMARY KEY (`retailchannel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Season';




INSERT INTO mst_retailchannel (`retailchannel_id`, `retailchannel_name`, `_createby`, `_createdate`) VALUES ('S1', 'BUTIK', 'root', NOW());
INSERT INTO mst_retailchannel (`retailchannel_id`, `retailchannel_name`, `_createby`, `_createdate`) VALUES ('S2', 'MULTI BRAND STORE', 'root', NOW());
INSERT INTO mst_retailchannel (`retailchannel_id`, `retailchannel_name`, `_createby`, `_createdate`) VALUES ('W1', 'WEB MAIN', 'root', NOW());
INSERT INTO mst_retailchannel (`retailchannel_id`, `retailchannel_name`, `_createby`, `_createdate`) VALUES ('W2', 'WEB MP', 'root', NOW());



