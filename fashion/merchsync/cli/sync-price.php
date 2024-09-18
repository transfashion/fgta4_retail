<?php namespace FGTA4;




class SyncPrice extends syncBase {

	private array $cfg;
	private $db;

	function __construct(array $cfg) {
		$this->db = $cfg['db'];
	}


	public function Sync(string $merchsync_id, string $merchsync_doc, string $merchsync_type ) : void {
		try {

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}