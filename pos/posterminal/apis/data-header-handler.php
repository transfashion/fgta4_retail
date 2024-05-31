<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class posterminal_headerHandler extends WebAPI  {

	public function sortListOrder(array &$sortData) : void {
		$sortData['store_code'] = 'ASC';
		$sortData['posterminal_code'] = 'ASC';
	}

	public function SqlQueryListBuilder(array &$sqlFieldList, string &$sqlFromTable, string &$sqlWhere, array &$params) : void {
		$sqlFieldList['site_name'] = "B.`site_name`";
		$sqlFromTable = " mst_posterminal A inner join mst_site B on B.site_id=A.site_id ";
	}

	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues["search"] = " 
			   A.posterminal_id LIKE CONCAT('%', :search, '%') 
			OR A.site_id LIKE CONCAT('%', :search, '%') 
			OR B.site_name LIKE CONCAT('%', :search, '%') 
		";

		$criteriaValues["site_id"] = " A.site_id = :site_id";
	}
}		
		
		
		