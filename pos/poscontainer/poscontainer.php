<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class PosContainer extends WebModule {
	
	public function LoadPage() {
		try {
			$userdata = $this->auth->session_get_user();
		} catch (\Exception $ex) {
		}
	}
}

$MODULE = new PosContainer();