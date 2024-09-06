<?php namespace FGTA4;


require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __ROOT_DIR . '/core/webapi.php';	
require_once __ROOT_DIR . '/core/cliworker.php';	


require_once dirname(__FILE__) . '/tbdatamap.php';	

require_once dirname(__FILE__) . '/sync-base.php';	
require_once dirname(__FILE__) . '/registertmp.php';	
require_once dirname(__FILE__) . '/registersync.php';	



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
		
		
		
		try {		
			echo "Registering long process\r\n";
			$this->registerProcess($name, $pid, $username);


			TbDataMap::$db = $this->db;

			$cfg = [
				'db' => $this->db,
				'url' => 'http://ws.transfashion.id/crossroads/frontend',
			];

			// $id = "1723082609"
			
			$tmp = new RegisterTmp($cfg);
			$reg = new RegisterSync($cfg);


			
			
			$reg_id = "1723082609";
			$this->updateProcess(0, "syncing register $reg_id");
			// $tmp->copy($reg_id);
			$reg->sync($reg_id);
			// $tmp->clear($reg_id);


			$this->updateProcess(100, "done.");
			$this->commitProcess();





			
			// Untuk kode referensi
			/*
			$string = "dept_id:EAG@HO; nama:AIGNER-HO;";
			$result = [];
			preg_match_all('/([\w_]+):([^;]+)/', $string, $matches);
			for ($i = 0; $i < count($matches[1]); $i++) {
				$result[$matches[1][$i]] = $matches[2][$i];
			}
			print_r($result);
			*/
			
			for ($i=0; $i<=30; $i++) {
				echo uniqid();
				echo "\n";
				sleep(1);
			}

		} catch (\Exception $ex) {
			$this->haltProcess($ex->getMessage());
			echo "\r\n\x1b[31m"."ERROR"."\x1b[0m"."\r\n";
			echo "\x1b[1m".$ex->getMessage()."\x1b[0m"."\r\n";
			echo "\r\n";
			echo $ex->getTraceAsString();
		}
	}			


});	