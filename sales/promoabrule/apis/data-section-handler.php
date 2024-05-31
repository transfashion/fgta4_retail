<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class promoabrule_sectionHandler extends WebAPI  {
	
	
	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['promoabrule_id'] = " A.promoabrule_id = :promoabrule_id ";
	}
}		
		
		
		