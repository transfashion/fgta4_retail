<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

if (is_file(__DIR__ .'/promoab.php-handler.php')) {
	require_once __DIR__ .'/promoab.php-handler.php';
}

/**
 * retail/sales/promoab/promoab.php
 *
 * ===================================================================
 * Entry point Program Module promoab
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 * 
 * digenerate dengan FGTA4 generator versi 2 
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net (Tangerang, 26 Maret 2021)
 * awal dibuat tanggal 22/08/2024
 * terakhir di generate tanggal 23/08/2024
 */
$MODULE = new class extends WebModule {

	public function LoadPage() {
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\module\\promoab_pageHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new promoab_pageHandler();
			$hnd->caller = &$this;
			$hnd->auth = $this->auth;
			$hnd->userdata = $userdata;
		} else {
			$hnd = new \stdClass;
		}


		try {
			
			// ambil data variance
			$variancename = '';
			$variancedata = new \stdClass;
			if (array_key_exists('variancename', $_GET)) {
				$variancename = $_GET['variancename'];
				if (property_exists($this->configuration, "variance")) {
					if (property_exists($this->configuration->variance, $variancename)) {
						if (property_exists($this->configuration->variance->{$variancename}, "data")) {
							$variancedata = $this->configuration->variance->{$variancename}->data;
						}
					}
				}
			}


			// parameter=parameter yang bisa diakses langsung dari javascript module
			// dengan memanggil variable global.setup.<namavariable>
			$this->setup = (object)array(
				'local_curr_id' => __LOCAL_CURR,
				'variancename' => $variancename,
				'variancedata' => $variancedata,
				'print_to_new_window' => false,
				'username' => $userdata->username,
			);

			if (is_object($hnd)) {
				$hnd->setup = &$this->setup;
				if (method_exists(get_class($hnd), 'LoadPage')) {
					// variasi behaviour program berdasar variancename bisa dilakukan di handler LoadPage
					// variancename : $this->setup->variancename (php), global.setup.variancename / opt.variancename (js) 
					// variancedata : $this->setup->variancedata (php), global.setup.variancedata / opt.variancedata (js)
					$hnd->LoadPage();
				}
			}

		} catch (\Exception $ex) {
			$this->error($ex->getMessage());
		}			
	
	}


};
