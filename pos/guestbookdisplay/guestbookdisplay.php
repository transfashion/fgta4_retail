<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


$MODULE = new class() extends WebModule {
	
	public function LoadPage() {
		//$this->variable = 'ini variable yang diset dari PHP';


		$this->preloadscripts = [
			// 'jslibs/moment.min.js',
			// 'jslibs/chart.min.js',
			// 'jslibs/chartjs-gauge.js',
			'jslibs/echarts.min.js'
		];

		$crmevent_id = $this->reqinfo->params->scriptparam;
		$this->crmevent_id = $crmevent_id;

	}
};