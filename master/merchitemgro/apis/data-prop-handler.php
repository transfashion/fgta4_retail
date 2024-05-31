<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class merchitemgro_propHandler extends WebAPI  {

	public function sortOrder($sortdata) {
		return " ";
		// return "
		// 	ORDER BY merchsea_year DESC, merchseagroup_id
		// ";
	}

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');
	}	
}		
		
		
		