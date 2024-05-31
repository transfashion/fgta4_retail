<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

$MODULE = new class extends WebModule {

	public function LoadPage() {
		$userdata = $this->auth->session_get_user();
		$this->preloadscripts = [
			'jslibs/jsbarcode.min.js'
		];

		$this->userdata = $userdata;
	}


};
