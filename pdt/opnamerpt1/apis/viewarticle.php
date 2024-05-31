<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


use \FGTA4\exceptions\WebException;



class ViewArticle extends WebAPI {
	function __construct() {
		// $this->debugoutput = true;
	}
	
	public function execute($art) {

	}

}

$API = new ViewArticle();