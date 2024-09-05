<?php namespace FGTA4;


require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __ROOT_DIR . '/core/webapi.php';	
require_once __ROOT_DIR . '/core/cliworker.php';	


require_once dirname(__FILE__) . '/sync-base.php';	
require_once dirname(__FILE__) . '/syncregister.php';	



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


			$cfg = [
				'db' => $this->db,
				'url' => 'http://ws.transfashion.id/crossroads/frontend',
			];

			// $id = "1723082609"
			
			$reg = new SyncRegister($cfg);


			
			
			$this->updateProcess(0, "syncing register 1723082609");
			$reg->sync("1723082609");


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


});	