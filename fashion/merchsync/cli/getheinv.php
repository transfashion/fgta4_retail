<?php namespace FGTA4;


require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __ROOT_DIR . '/core/webapi.php';	
require_once __ROOT_DIR . '/core/cliworker.php';	


require_once dirname(__FILE__) . '/tbdatamap.php';	

require_once dirname(__FILE__) . '/sync-base.php';	
require_once dirname(__FILE__) . '/sync-price.php';	


// require_once dirname(__FILE__) . '/registertmp.php';	
// require_once dirname(__FILE__) . '/registersync.php';	



use  \FGTA4\utils\SqlUtility;

class SCENARIO {
	public static $username;
	public static $id;
	public static $param;
};


console::class(new class($args) extends cliworker {
	private array $params;
	private bool $isDevMode = true;


	function __construct($args) {
		// get executing parameter
		$this->params = $args->params;

		parent::__construct($args);
	}

	function execute() {

		$name = $this->params['--name'];
		$pid = $this->params['--pid'];
		$username = $this->params['--username'];
		$data = $this->params['--data'];
		$this->logfile = array_key_exists('--log', $this->params) ? $this->params['--log'] : null;

		SCENARIO::$username = $username;
		

		// set mapping
		TbDataMap::$db = $this->db;


		$cfg = [
			'db' => $this->db,
			'url' => 'http://ws.transfashion.id/crossroads/frontend',
		];

		
		try {		
			echo "Registering long process\r\n";
			$this->registerProcess($name, $pid, $username);


			$this->updateProcess(1, "Starting.");
			
			$region_id = '04210';
			$data =  $this->getDataFromUrl($cfg['url'] . '/getheinv.php?region_id='. $region_id);

			$this->CopyToTemp($data);


			//sleep(2);



			$this->updateProcess(100, "done.");
			$this->commitProcess();


		} catch (\Exception $ex) {
			$this->haltProcess($ex->getMessage());
			echo "\r\n\x1b[31m"."ERROR"."\x1b[0m"."\r\n";
			echo "\x1b[1m".$ex->getMessage()."\x1b[0m"."\r\n";
			echo "\r\n";
			echo $ex->getTraceAsString();
		}
	}	
	
	
	function getDataFromUrl(string $endpoint) : array {
		try {
			$ch = curl_init($endpoint);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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

	function CopyToTemp(array $data) : void {
		// print_r($data);
		try {
			$obj = new \stdClass;
			$obj->heinv_id = '';
			$obj->heinv_barcode = '';

			$tablename = 'tmp_heinv';
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$params = $cmd->params;



			print_r($params);



		} catch (\Exception $ex) {
			throw $ex;
		}
	
	}


});	