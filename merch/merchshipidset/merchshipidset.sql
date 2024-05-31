-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_merchshipidset`;


CREATE TABLE IF NOT EXISTS `trn_merchshipidset` (
	`merchshipidset_id` varchar(30) NOT NULL , 
	`merchship_id` varchar(30) NOT NULL , 
	`merchshipidset_doc` varchar(10) NOT NULL , 
	`merchshipidset_value` varchar(60) NOT NULL , 
	`_createby` varchar(14) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(14)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchshipidset_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Shipment';


ALTER TABLE `trn_merchshipidset` ADD COLUMN IF NOT EXISTS  `merchship_id` varchar(30) NOT NULL  AFTER `merchshipidset_id`;
ALTER TABLE `trn_merchshipidset` ADD COLUMN IF NOT EXISTS  `merchshipidset_doc` varchar(10) NOT NULL  AFTER `merchship_id`;
ALTER TABLE `trn_merchshipidset` ADD COLUMN IF NOT EXISTS  `merchshipidset_value` varchar(60) NOT NULL  AFTER `merchshipidset_doc`;


ALTER TABLE `trn_merchshipidset` MODIFY COLUMN IF EXISTS  `merchship_id` varchar(30) NOT NULL   AFTER `merchshipidset_id`;
ALTER TABLE `trn_merchshipidset` MODIFY COLUMN IF EXISTS  `merchshipidset_doc` varchar(10) NOT NULL   AFTER `merchship_id`;
ALTER TABLE `trn_merchshipidset` MODIFY COLUMN IF EXISTS  `merchshipidset_value` varchar(60) NOT NULL   AFTER `merchshipidset_doc`;



ALTER TABLE `trn_merchshipidset` ADD KEY IF NOT EXISTS  `merchship_id` (`merchship_id`);

ALTER TABLE `trn_merchshipidset` ADD CONSTRAINT `fk_trn_merchshipidset_trn_merchship` FOREIGN KEY IF NOT EXISTS (`merchship_id`) REFERENCES `trn_merchship` (`merchship_id`);





