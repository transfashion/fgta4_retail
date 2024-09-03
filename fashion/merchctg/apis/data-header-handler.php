<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class merchctg_headerHandler extends WebAPI  {

	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['unit_id'] = " A.unit_id = :unit_id "; 
	}

	public function DataListLooping(array &$record) : void {
		$record['_id'] = $record['merchctg_id'];
	}
}		
		
		
		