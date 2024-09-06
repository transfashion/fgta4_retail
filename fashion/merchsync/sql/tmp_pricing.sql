drop table if exists `tmp_pricing`;
drop table if exists `tmp_pricingitem`;


CREATE TABLE IF NOT EXISTS `tmp_pricing` (

	PRIMARY KEY(pricing_id)
) ENGINE=MyISAM COMMENT='Temporary Table untuk pricing dari TransBrowser';



CREATE TABLE IF NOT EXISTS `tmp_pricingitem` (

	PRIMARY KEY(pricing_id, pricingdetil_line)
) ENGINE=MyISAM COMMENT='Temporary Table untuk pricing dari TransBrowser';
