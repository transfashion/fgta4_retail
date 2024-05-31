<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

$MODULE = new class() extends WebModule {
	
	public function LoadPage() {
		try {
			$userdata = $this->auth->session_get_user();
			$this->preloadscripts = [
				'jslibs/qrious.js',
				'jslibs/html5-qrcode.min.v2.3.0.js'
			];
		} catch (\Exception $ex) {
		}
	}
};


