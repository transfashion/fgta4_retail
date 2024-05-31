<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class SlDash extends WebModule {
	
	public function LoadPage() {
		//$this->variable = 'ini variable yang diset dari PHP';

		$this->preloadscripts = [
			'jslibs/moment.min.js',
			'jslibs/chart.min.js'
		];

	}
}

$MODULE = new SlDash();