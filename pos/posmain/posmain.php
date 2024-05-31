<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


$MODULE = new class extends WebModule {
	
	public function LoadPage() {
		try {

			$this->preloadstyles = [
				'index.php/asset/retail/pos/posmain/posmain-entry.css',
				'index.php/asset/retail/pos/posmain/posmain-payment.css',
				'index.php/asset/retail/pos/posmain/posmain-member.css',
				'index.php/asset/retail/pos/posmain/posmain-promo.css'
			];

			$this->preloadscripts = [
				'jslibs/html5-qrcode.min.v2.3.0.js',
			];



		} catch (\Exception $ex) {
		}
	}
};

