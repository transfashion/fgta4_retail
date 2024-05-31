-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchrpt`;


CREATE TABLE `mst_merchrpt` (
	`merchrpt_id` varchar(10) NOT NULL , 
	`merchrpt_name` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchrpt_name` (`merchrpt_name`),
	PRIMARY KEY (`merchrpt_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Season';


INSERT INTO mst_merchrpt (`merchrpt_id`, `merchrpt_name`, `_createby`, `_createdate`) VALUES ('M', 'MERCHANDISE', 'root', NOW());
INSERT INTO mst_merchrpt (`merchrpt_id`, `merchrpt_name`, `_createby`, `_createdate`) VALUES ('P', 'PART', 'root', NOW());
INSERT INTO mst_merchrpt (`merchrpt_id`, `merchrpt_name`, `_createby`, `_createdate`) VALUES ('C', 'CONSUMABLE GOODS', 'root', NOW());



