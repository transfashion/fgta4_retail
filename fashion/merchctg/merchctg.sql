-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `fsn_merchctg`;
-- drop table if exists `fsn_merchctgref`;


CREATE TABLE IF NOT EXISTS `fsn_merchctg` (
	`merchctg_id` varchar(30) NOT NULL , 
	`merchctg_name` varchar(90) NOT NULL , 
	`merchctg_nameshort` varchar(90)  , 
	`merchctg_descr` varchar(255), 
	`gender_id` varchar(7)  , 
	`dept_id` varchar(10) NOT NULL , 
	`itemgroup_id` varchar(17)  , 
	`itemclass_id` varchar(14)  , 
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
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14)   AFTER `itemgroup_id`;
ALTER TABLE `fsn_merchctg` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `itemclass_id`;


ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `merchctg_name` varchar(90) NOT NULL   AFTER `merchctg_id`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `merchctg_nameshort` varchar(90)    AFTER `merchctg_name`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `merchctg_descr` varchar(255) NOT NULL   AFTER `merchctg_nameshort`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `gender_id` varchar(7)    AFTER `merchctg_descr`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `dept_id` varchar(10) NOT NULL   AFTER `gender_id`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `itemgroup_id` varchar(17)    AFTER `dept_id`;
ALTER TABLE `fsn_merchctg` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14)    AFTER `itemgroup_id`;
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





CREATE TABLE IF NOT EXISTS `fsn_merchctgref` (
	`merchctgref_id` varchar(14) NOT NULL , 
	`interface_id` varchar(7) NOT NULL , 
	`merchctgref_name` varchar(30) NOT NULL , 
	`merchctgref_code` varchar(30) NOT NULL , 
	`merchctgref_otherdata` varchar(1000)  , 
	`merchctgref_notes` varchar(255)  , 
	`merchctg_id` varchar(14) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchctgref_pair` (`interface_id`, `merchctgref_name`, `merchctgref_code`),
	PRIMARY KEY (`merchctgref_id`)
) 
ENGINE=InnoDB
COMMENT='Kode referensi kategori untuk keperluan interfacing dengan system lain';


ALTER TABLE `fsn_merchctgref` ADD COLUMN IF NOT EXISTS  `interface_id` varchar(7) NOT NULL  AFTER `merchctgref_id`;
ALTER TABLE `fsn_merchctgref` ADD COLUMN IF NOT EXISTS  `merchctgref_name` varchar(30) NOT NULL  AFTER `interface_id`;
ALTER TABLE `fsn_merchctgref` ADD COLUMN IF NOT EXISTS  `merchctgref_code` varchar(30) NOT NULL  AFTER `merchctgref_name`;
ALTER TABLE `fsn_merchctgref` ADD COLUMN IF NOT EXISTS  `merchctgref_otherdata` varchar(1000)   AFTER `merchctgref_code`;
ALTER TABLE `fsn_merchctgref` ADD COLUMN IF NOT EXISTS  `merchctgref_notes` varchar(255)   AFTER `merchctgref_otherdata`;
ALTER TABLE `fsn_merchctgref` ADD COLUMN IF NOT EXISTS  `merchctg_id` varchar(14) NOT NULL  AFTER `merchctgref_notes`;


ALTER TABLE `fsn_merchctgref` MODIFY COLUMN IF EXISTS  `interface_id` varchar(7) NOT NULL   AFTER `merchctgref_id`;
ALTER TABLE `fsn_merchctgref` MODIFY COLUMN IF EXISTS  `merchctgref_name` varchar(30) NOT NULL   AFTER `interface_id`;
ALTER TABLE `fsn_merchctgref` MODIFY COLUMN IF EXISTS  `merchctgref_code` varchar(30) NOT NULL   AFTER `merchctgref_name`;
ALTER TABLE `fsn_merchctgref` MODIFY COLUMN IF EXISTS  `merchctgref_otherdata` varchar(1000)    AFTER `merchctgref_code`;
ALTER TABLE `fsn_merchctgref` MODIFY COLUMN IF EXISTS  `merchctgref_notes` varchar(255)    AFTER `merchctgref_otherdata`;
ALTER TABLE `fsn_merchctgref` MODIFY COLUMN IF EXISTS  `merchctg_id` varchar(14) NOT NULL   AFTER `merchctgref_notes`;


ALTER TABLE `fsn_merchctgref` ADD CONSTRAINT `merchctgref_pair` UNIQUE IF NOT EXISTS  (`interface_id`, `merchctgref_name`, `merchctgref_code`);

ALTER TABLE `fsn_merchctgref` ADD KEY IF NOT EXISTS `interface_id` (`interface_id`);
ALTER TABLE `fsn_merchctgref` ADD KEY IF NOT EXISTS `merchctg_id` (`merchctg_id`);

ALTER TABLE `fsn_merchctgref` ADD CONSTRAINT `fk_fsn_merchctgref_mst_interface` FOREIGN KEY IF NOT EXISTS  (`interface_id`) REFERENCES `mst_interface` (`interface_id`);
ALTER TABLE `fsn_merchctgref` ADD CONSTRAINT `fk_fsn_merchctgref_fsn_merchctg` FOREIGN KEY IF NOT EXISTS (`merchctg_id`) REFERENCES `fsn_merchctg` (`merchctg_id`);





