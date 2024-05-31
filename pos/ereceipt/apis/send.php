<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;


$API = new class() extends WebAPI {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/ereceipt.txt";
		debug::disable();
		debug::start($logfilepath, "w");

	}

	public function execute($data) {
		
		debug::log($data);


	}
};