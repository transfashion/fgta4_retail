<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class mercharticle_headerHandler extends WebAPI  {

	public function sortOrder($sortdata) {
		return " ";
		// return "
		// 	ORDER BY merchsea_year DESC, merchseagroup_id
		// ";
	}

	public function buildCriteriaValues($options, &$criteriaValues) {
		// $criteriaValues['brand_id'] = " A.brand_id = :brand_id ";
	}	

	public function DataSavedSuccess($result) {
		// $this->caller->log('save success');
	}
	
	public function DataOpen(array &$record) : void {
		if (!empty($record['mercharticle_couchdbid'])) {
			$file_id = $record['mercharticle_couchdbid'];
			try { 
				$record['mercharticle_picture_doc'] = $this->caller->cdb->getAttachment($file_id, 'filedata'); 
			} catch (\Exception $ex) {}
		}		
	}
}		
		
		
		