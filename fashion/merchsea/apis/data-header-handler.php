<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class merchsea_headerHandler extends WebAPI  {

	public function sortListOrder(array &$sortData) : void {
		$sortData['merchsea_year'] = 'DESC';
	}




}		
		
		
		