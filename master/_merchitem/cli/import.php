<?php

require_once __ROOT_DIR.'/core/webapi.php';	
require_once __ROOT_DIR.'/core/webauth.php';	

class SCENARIO {
	public static $id;
	public static $username;
	public static $param;

	public static function Run() {
		//require __DIR__ . '/../apis/xtion-importbyinvcache.php';
		require __DIR__ . '/../apis/xtion-importbyinvclose.php';


		SCENARIO::$username = '5effbb0a0f7d1';  // MANAGER
		// SCENARIO::$username = '5facb8a36127f';  // GM
		// SCENARIO::$username = '5facb8bebf826';  // DIREKTUR

		/*
		03700
		03400
		02600
		00900
		01100
		01400
		*/

		
		SCENARIO::$param = (object)[
			'region_id' => '01110',
			'ym' => '202112'
		];


		$API->auth = new class {
			public function session_get_user() {
				return (object) [
					'username' => SCENARIO::$username
				];
			}			
		};
		$API->useotp = false;
		$API->reqinfo = (object)['modulefullname'=>'retail/master/merchitem'];
		$result = $API->execute(SCENARIO::$param);

	}
}


console::class(new class($args) extends clibase {
	function execute() {
		SCENARIO::Run();
	}
});		