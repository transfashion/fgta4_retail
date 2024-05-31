-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchsizetag`;


CREATE TABLE IF NOT EXISTS `mst_merchsizetag` (
	`merchsizetag_id` varchar(20) NOT NULL , 
	`merchsizetag_name` varchar(90) NOT NULL , 
	`merchsizetag_c01` varchar(20)  , 
	`merchsizetag_c02` varchar(20)  , 
	`merchsizetag_c03` varchar(20)  , 
	`merchsizetag_c04` varchar(20)  , 
	`merchsizetag_c05` varchar(20)  , 
	`merchsizetag_c06` varchar(20)  , 
	`merchsizetag_c07` varchar(20)  , 
	`merchsizetag_c08` varchar(20)  , 
	`merchsizetag_c09` varchar(20)  , 
	`merchsizetag_c10` varchar(20)  , 
	`merchsizetag_c11` varchar(20)  , 
	`merchsizetag_c12` varchar(20)  , 
	`merchsizetag_c13` varchar(20)  , 
	`merchsizetag_c14` varchar(20)  , 
	`merchsizetag_c15` varchar(20)  , 
	`merchsizetag_c16` varchar(20)  , 
	`merchsizetag_c17` varchar(20)  , 
	`merchsizetag_c18` varchar(20)  , 
	`merchsizetag_c19` varchar(20)  , 
	`merchsizetag_c20` varchar(20)  , 
	`merchsizetag_c21` varchar(20)  , 
	`merchsizetag_c22` varchar(20)  , 
	`merchsizetag_c23` varchar(20)  , 
	`merchsizetag_c24` varchar(20)  , 
	`merchsizetag_c25` varchar(20)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `merchsizetag_name` (`merchsizetag_name`),
	PRIMARY KEY (`merchsizetag_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Size Tag';


ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_name` varchar(90) NOT NULL  AFTER `merchsizetag_id`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c01` varchar(20)   AFTER `merchsizetag_name`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c02` varchar(20)   AFTER `merchsizetag_c01`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c03` varchar(20)   AFTER `merchsizetag_c02`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c04` varchar(20)   AFTER `merchsizetag_c03`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c05` varchar(20)   AFTER `merchsizetag_c04`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c06` varchar(20)   AFTER `merchsizetag_c05`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c07` varchar(20)   AFTER `merchsizetag_c06`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c08` varchar(20)   AFTER `merchsizetag_c07`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c09` varchar(20)   AFTER `merchsizetag_c08`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c10` varchar(20)   AFTER `merchsizetag_c09`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c11` varchar(20)   AFTER `merchsizetag_c10`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c12` varchar(20)   AFTER `merchsizetag_c11`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c13` varchar(20)   AFTER `merchsizetag_c12`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c14` varchar(20)   AFTER `merchsizetag_c13`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c15` varchar(20)   AFTER `merchsizetag_c14`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c16` varchar(20)   AFTER `merchsizetag_c15`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c17` varchar(20)   AFTER `merchsizetag_c16`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c18` varchar(20)   AFTER `merchsizetag_c17`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c19` varchar(20)   AFTER `merchsizetag_c18`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c20` varchar(20)   AFTER `merchsizetag_c19`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c21` varchar(20)   AFTER `merchsizetag_c20`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c22` varchar(20)   AFTER `merchsizetag_c21`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c23` varchar(20)   AFTER `merchsizetag_c22`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c24` varchar(20)   AFTER `merchsizetag_c23`;
ALTER TABLE `mst_merchsizetag` ADD COLUMN IF NOT EXISTS  `merchsizetag_c25` varchar(20)   AFTER `merchsizetag_c24`;


ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_name` varchar(90) NOT NULL  AFTER `merchsizetag_id`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c01` varchar(20)   AFTER `merchsizetag_name`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c02` varchar(20)   AFTER `merchsizetag_c01`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c03` varchar(20)   AFTER `merchsizetag_c02`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c04` varchar(20)   AFTER `merchsizetag_c03`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c05` varchar(20)   AFTER `merchsizetag_c04`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c06` varchar(20)   AFTER `merchsizetag_c05`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c07` varchar(20)   AFTER `merchsizetag_c06`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c08` varchar(20)   AFTER `merchsizetag_c07`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c09` varchar(20)   AFTER `merchsizetag_c08`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c10` varchar(20)   AFTER `merchsizetag_c09`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c11` varchar(20)   AFTER `merchsizetag_c10`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c12` varchar(20)   AFTER `merchsizetag_c11`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c13` varchar(20)   AFTER `merchsizetag_c12`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c14` varchar(20)   AFTER `merchsizetag_c13`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c15` varchar(20)   AFTER `merchsizetag_c14`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c16` varchar(20)   AFTER `merchsizetag_c15`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c17` varchar(20)   AFTER `merchsizetag_c16`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c18` varchar(20)   AFTER `merchsizetag_c17`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c19` varchar(20)   AFTER `merchsizetag_c18`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c20` varchar(20)   AFTER `merchsizetag_c19`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c21` varchar(20)   AFTER `merchsizetag_c20`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c22` varchar(20)   AFTER `merchsizetag_c21`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c23` varchar(20)   AFTER `merchsizetag_c22`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c24` varchar(20)   AFTER `merchsizetag_c23`;
ALTER TABLE `mst_merchsizetag` MODIFY COLUMN IF EXISTS  `merchsizetag_c25` varchar(20)   AFTER `merchsizetag_c24`;


ALTER TABLE `mst_merchsizetag` ADD CONSTRAINT `merchsizetag_name` UNIQUE IF NOT EXISTS  (`merchsizetag_name`);







