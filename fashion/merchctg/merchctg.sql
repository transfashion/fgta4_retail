-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `fsn_merchctg`;


CREATE TABLE IF NOT EXISTS `fsn_merchctg` (
	`merchctg_id` varchar(30) NOT NULL , 
	`merchctg_name` varchar(90) NOT NULL , 
	`merchctg_nameshort` varchar(90)  , 
	`merchctg_descr` varchar(255) NOT NULL , 
	`gender_id` varchar(7)  , 
	`dept_id` varchar(10) NOT NULL , 
	`itemgroup_id` varchar(17)  , 
	`itemclass_id` varchar(7)  , 
	`unit_id` varchar(10) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchctg_name` (`unit_id`, `merchctg_name`),
	PRIMARY KEY (`merchctg_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Category Item Fashion Merchandise';


ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `merchctg_name` varchar(90) NOT NULL  AFTER `merchctg_id`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `merchctg_nameshort` varchar(90)   AFTER `merchctg_name`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `merchctg_descr` varchar(255) NOT NULL  AFTER `merchctg_nameshort`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `gender_id` varchar(7)   AFTER `merchctg_descr`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(10) NOT NULL  AFTER `gender_id`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `itemgroup_id` varchar(17)   AFTER `dept_id`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(7)   AFTER `itemgroup_id`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `itemclass_id`;


ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `merchctg_name` varchar(90) NOT NULL   AFTER `merchctg_id`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `merchctg_nameshort` varchar(90)    AFTER `merchctg_name`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `merchctg_descr` varchar(255) NOT NULL   AFTER `merchctg_nameshort`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `gender_id` varchar(7)    AFTER `merchctg_descr`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `dept_id` varchar(10) NOT NULL   AFTER `gender_id`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `itemgroup_id` varchar(17)    AFTER `dept_id`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(7)    AFTER `itemgroup_id`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10) NOT NULL   AFTER `itemclass_id`;


ALTER TABLE `fsn_merchctg` ADD CONSTRAINT `merchctg_name` UNIQUE IF NOT EXISTS  (`unit_id`, `merchctg_name`);

ALTER TABLE `fsn_merchctg` ADD KEY IF NOT EXISTS `gender_id` (`gender_id`);
ALTER TABLE `fsn_merchctg` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `fsn_merchctg` ADD KEY IF NOT EXISTS `itemgroup_id` (`itemgroup_id`);
ALTER TABLE `fsn_merchctg` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `fsn_merchctg` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);

ALTER TABLE `fsn_merchctg` ADD CONSTRAINT `fk_fsn_merchctg_mst_gender` FOREIGN KEY IF NOT EXISTS  (`gender_id`) REFERENCES `mst_gender` (`gender_id`);
ALTER TABLE `fsn_merchctg` ADD CONSTRAINT `fk_fsn_merchctg_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `fsn_merchctg` ADD CONSTRAINT `fk_fsn_merchctg_mst_itemgroup` FOREIGN KEY IF NOT EXISTS  (`itemgroup_id`) REFERENCES `mst_itemgroup` (`itemgroup_id`);
ALTER TABLE `fsn_merchctg` ADD CONSTRAINT `fk_fsn_merchctg_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `fsn_merchctg` ADD CONSTRAINT `fk_fsn_merchctg_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);





