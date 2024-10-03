<?php namespace FGTA4;


require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __ROOT_DIR . '/core/webapi.php';	
require_once __ROOT_DIR . '/core/cliworker.php';	


class SyncBase extends cliworker {

	protected $db;
	protected $rptdb;


	function __construct($args) {
		parent::__construct($args);


		// connect to report server
		$RPTDB_CONFIG = DB_CONFIG[$GLOBALS['MAINRPTDB']];
		$RPTDB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->rptdb = new \PDO(
					$RPTDB_CONFIG['DSN'], 
					$RPTDB_CONFIG['user'], 
					$RPTDB_CONFIG['pass'], 
					$RPTDB_CONFIG['param']
		);

	}

	protected function getDataFromUrl(string $endpoint) : array {
		try {
			$ch = curl_init($endpoint);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10); 
			curl_setopt($ch, CURLOPT_TIMEOUT, 60); //timeout in seconds
			// curl_setopt($ch, CURLINFO_HEADER_OUT, true);
			$respond = curl_exec($ch);
			curl_close($ch);	

			$res = json_decode($respond, true);
			if ($res['code']!=0) {
				throw new \Exception($res['message'], $res['code']);
			}

			$json_data = gzuncompress(base64_decode($res['data']));
			$data = json_decode($json_data, true);

			return $data;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
}