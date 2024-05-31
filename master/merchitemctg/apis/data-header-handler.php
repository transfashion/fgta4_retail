<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class merchitemctg_headerHandler extends WebAPI  {

	public function sortOrder($sortdata) {
		// return " ";
		return "
			ORDER BY merchitemctg_name
		";
	}

	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['brand_id'] = " A.brand_id = :brand_id ";
		$criteriaValues['merchitemgro_id'] = " A.merchitemgro_id = :merchitemgro_id ";
	}

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');
	}	
}		
		
		
		