<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class PosLogin extends WebModule {
	
	public function LoadPage() {
		try {

			

			// $this->preloadstyles = [
			// 	'index.php/asset/retail/pos/assets/poslayout.css'
			// ];

		} catch (\Exception $ex) {
		}
	}
}

$MODULE = new PosLogin();