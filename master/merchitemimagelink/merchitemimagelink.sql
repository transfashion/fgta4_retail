-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_merchitemimagelink`;


CREATE TABLE IF NOT EXISTS `mst_merchitemimagelink` (
	`merchitemimagelink_id` varchar(14) NOT NULL , 
	`merchitemimagelink_url` varchar(255)  , 
	`merchitemimagelink_tag` varchar(255)  , 
	`merchitemimage_width` int(4) NOT NULL DEFAULT 0, 
	`merchitemimage_height` int(4) NOT NULL DEFAULT 0, 
	`merchitemimage_mime` varchar(255)  , 
	`merchitem_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`merchitemimagelink_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Variance item merchandise';


ALTER TABLE `mst_merchitemimagelink` ADD COLUMN IF NOT EXISTS  `merchitemimagelink_url` varchar(255)   AFTER `merchitemimagelink_id`;
ALTER TABLE `mst_merchitemimagelink` ADD COLUMN IF NOT EXISTS  `merchitemimagelink_tag` varchar(255)   AFTER `merchitemimagelink_url`;
ALTER TABLE `mst_merchitemimagelink` ADD COLUMN IF NOT EXISTS  `merchitemimage_width` int(4) NOT NULL DEFAULT 0 AFTER `merchitemimagelink_tag`;
ALTER TABLE `mst_merchitemimagelink` ADD COLUMN IF NOT EXISTS  `merchitemimage_height` int(4) NOT NULL DEFAULT 0 AFTER `merchitemimage_width`;
ALTER TABLE `mst_merchitemimagelink` ADD COLUMN IF NOT EXISTS  `merchitemimage_mime` varchar(255)   AFTER `merchitemimage_height`;
ALTER TABLE `mst_merchitemimagelink` ADD COLUMN IF NOT EXISTS  `merchitem_id` varchar(14) NOT NULL  AFTER `merchitemimage_mime`;


ALTER TABLE `mst_merchitemimagelink` MODIFY COLUMN IF EXISTS  `merchitemimagelink_url` varchar(255)   AFTER `merchitemimagelink_id`;
ALTER TABLE `mst_merchitemimagelink` MODIFY COLUMN IF EXISTS  `merchitemimagelink_tag` varchar(255)   AFTER `merchitemimagelink_url`;
ALTER TABLE `mst_merchitemimagelink` MODIFY COLUMN IF EXISTS  `merchitemimage_width` int(4) NOT NULL DEFAULT 0 AFTER `merchitemimagelink_tag`;
ALTER TABLE `mst_merchitemimagelink` MODIFY COLUMN IF EXISTS  `merchitemimage_height` int(4) NOT NULL DEFAULT 0 AFTER `merchitemimage_width`;
ALTER TABLE `mst_merchitemimagelink` MODIFY COLUMN IF EXISTS  `merchitemimage_mime` varchar(255)   AFTER `merchitemimage_height`;
ALTER TABLE `mst_merchitemimagelink` MODIFY COLUMN IF EXISTS  `merchitem_id` varchar(14) NOT NULL  AFTER `merchitemimage_mime`;



ALTER TABLE `mst_merchitemimagelink` ADD KEY IF NOT EXISTS  `merchitem_id` (`merchitem_id`);

ALTER TABLE `mst_merchitemimagelink` ADD CONSTRAINT `fk_mst_merchitemimagelink_mst_merchitem` FOREIGN KEY IF NOT EXISTS (`merchitem_id`) REFERENCES `mst_merchitem` (`merchitem_id`);





