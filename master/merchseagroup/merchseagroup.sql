-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchseagroup`;


CREATE TABLE IF NOT EXISTS `mst_merchseagroup` (
	`merchseagroup_id` varchar(10) NOT NULL , 
	`merchseagroup_name` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchseagroup_name` (`merchseagroup_name`),
	PRIMARY KEY (`merchseagroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Season';


ALTER TABLE `mst_merchseagroup` ADD COLUMN IF NOT EXISTS  `merchseagroup_name` varchar(90) NOT NULL  AFTER `merchseagroup_id`;


ALTER TABLE `mst_merchseagroup` MODIFY COLUMN IF EXISTS  `merchseagroup_name` varchar(90) NOT NULL  AFTER `merchseagroup_id`;


ALTER TABLE `mst_merchseagroup` ADD CONSTRAINT `merchseagroup_name` UNIQUE IF NOT EXISTS  (`merchseagroup_name`);




INSERT INTO mst_merchseagroup (`merchseagroup_id`, `merchseagroup_name`, `_createby`, `_createdate`) VALUES ('FW', 'FW', 'root', NOW());
INSERT INTO mst_merchseagroup (`merchseagroup_id`, `merchseagroup_name`, `_createby`, `_createdate`) VALUES ('SS', 'SS', 'root', NOW());



