<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class mercharticle_pictureHandler extends WebAPI  {

	public function DataOpen(array &$record) : void {
		if (!empty($record['merchpic_couchdbid'])) {
			$file_id = $record['merchpic_couchdbid'];
			try { $record['merchpic_file_doc'] = $this->caller->cdb->getAttachment($file_id, 'filedata'); } catch (\Exception $ex) {}
		}		
	}
}		
		
		
		