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


		
		$syncAJ = new \stdClass;
		$syncPricing = new SyncPrice($cfg);
		$syncRV = new \stdClass;
		$syncSales = new \stdClass;
		$syncTR = new \stdClass;

		$progs = [
			'AJ-POSTALL' => ['instance'=>$syncAJ, 'method'=>'PostAll'],
			'PRC' => ['instance'=>$syncPricing, 'method'=>'Sync'],
			'RV-POST' => ['instance'=>$syncRV, 'method'=>'Post'],
			'RV-RECV' => ['instance'=>$syncRV, 'method'=>'Recv'],
			'RV-SEND' => ['instance'=>$syncRV, 'method'=>'Send'],
			'RV-UNPOST' => ['instance'=>$syncRV, 'method'=>'UnPost'],
			'SL' => ['instance'=>$syncSales, 'method'=>'Sync'],
			'TR-PROP' => ['instance'=>$syncTR, 'method'=>'Prop'],
			'TR-RECV' => ['instance'=>$syncTR, 'method'=>'Recv'],
			'TR-SEND' => ['instance'=>$syncTR, 'method'=>'Send'],
			'TR-UNPROP' => ['instance'=>$syncTR, 'method'=>'UnProp'],
			'TR-UNSEND' => ['instance'=>$syncTR, 'method'=>'UnSend'],
		];


		
		try {		
			echo "Registering long process\r\n";
			$this->registerProcess($name, $pid, $username);


			




			$this->updateProcess(0, "Syncing start");
			$this->removeQueCompleted();
			$this->resetQueTimeout();


			

			$batch_id = uniqid();
			$txcount = $this->createSyncBatch($batch_id, 10);
			while ($txcount>0) {
				$rows = $this->getQueues($batch_id);

				foreach ($rows as $row) {
					$merchsync_id = $row['merchsync_id'];
					$merchsync_doc = $row['merchsync_doc'];
					$merchsync_type = $row['merchsync_type'];
					$this->updateProcess(0, "Syncing $merchsync_id $merchsync_type $merchsync_doc");
					$this->setProcessingFlag($merchsync_id, 1);
				
					if (!array_key_exists($merchsync_type, $progs)) {
						throw new \Exception("Sync untuk '$merchsync_type' belum didefinisikan");
					}
					
					
					$prog = $progs[$merchsync_type];
					$instance = $prog['instance'];
					$methodname = $prog['method'];
					if (!method_exists($instance, $methodname)) {
						$msg = "Method '$methodname' belum didefinisikan untuk '$merchsync_type'";
						$this->setResult($merchsync_id, 1, $msg);
						throw new \Exception($msg);
					}

					try {
						$instance->{$methodname}($merchsync_id, $merchsync_doc, $merchsync_type);
						$this->setCompleted($merchsync_id);
						$this->setResult($merchsync_id, 0, "");
					} catch (\Exception $ex) {
						$this->setResult($merchsync_id, 1, $ex->getMessage());
					}
					
				}

				// hapus queue yang telah selesai diproses
				$this->removeQueCompleted();
			
				// ambil lagi queue untuk diproses pada loop berikutnya
				$batch_id = uniqid();
				$txcount = $this->createSyncBatch($batch_id, 10);
				sleep(1);
			}


			// $id = "1723082609"
			
			//$tmp = new RegisterTmp($cfg);
			// $reg = new RegisterSync($cfg);

			//$reg_id = "1723082609";
			//$this->updateProcess(0, "syncing register $reg_id");
			// $tmp->copy($reg_id);
			//$reg->sync($reg_id);
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
			
			// for ($i=0; $i<=30; $i++) {
			// 	echo uniqid();
			// 	echo "\n";
			// 	sleep(1);
			// }

		} catch (\Exception $ex) {
			$this->haltProcess($ex->getMessage());
			echo "\r\n\x1b[31m"."ERROR"."\x1b[0m"."\r\n";
			echo "\x1b[1m".$ex->getMessage()."\x1b[0m"."\r\n";
			echo "\r\n";
			echo $ex->getTraceAsString();
		}
	}			


	function removeQueCompleted() : void {
		$this->updateProcess(0, "Remove Completed Queue");
		/*
		hapus queue yang sudah selesai (cek field merchsync_iscompleted=1)
		agar tidak perlu diexekusi lagi pada proses berikutnya 
		*/
		try {
			$sql = "delete from fsn_merchsync where merchsync_iscompleted=1";
			$this->db->exec($sql);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function resetQueTimeout() : void {
		$this->updateProcess(0, "Reset Timeout Queue");
		/*
		reset merchsync_batch dan isprocessing queue yang telah timeout
		*/

		try {
			$sql = "
				update fsn_merchsync
				set 
				merchsync_batch=null
				where
				merchsync_timeout > now()
			";
			$this->db->exec($sql);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function createSyncBatch(string $batch_id, int $maxtx) : int {
		$this->updateProcess(0, "Get UnProcessed Queue");

		/*
		ambil transaksi sejumlah $maxtx yang belum di synkronisasi, 
		kembalikan jumlah yang ditemukan 
		*/
		try {
			$sqlupd = "
				update fsn_merchsync
				set 
					merchsync_batch = :batch
				where
					merchsync_id = :merchsync_id
			";
			$stmtupd = $this->db->prepare($sqlupd);


			$sql = "
				select *
				from fsn_merchsync 
				where  
				merchsync_isfail=1 or merchsync_batch is null
				order by _createby asc limit $maxtx
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$rows = $stmt->fetchAll();
			$count = count($rows);

			foreach ($rows as $row) {
				$merchsync_id = $row['merchsync_id'];
				$stmtupd->execute([
					':batch' => $batch_id,
					':merchsync_id' => $merchsync_id
				]);
			}

			return $count;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function getQueues(string $batch_id) : array {
		try {
			$sql = "
				select * from fsn_merchsync where merchsync_batch = :batch
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':batch' => $batch_id]);
			return $stmt->fetchAll();
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function setProcessingFlag(string $merchsync_id, int $isprocessing) : void {
		try {
			$sql = "
				update fsn_merchsync
				set 
					merchsync_isprocessing = :isprocessing,
					merchsync_timeout = now() + INTERVAL 5 minute
				where
					merchsync_id = :merchsync_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':merchsync_id' => $merchsync_id,
				':isprocessing' => $isprocessing
			]);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function setResult(string $merchsync_id, int $isfail, string $msg) : void {
		try {
			$sql = "
				update fsn_merchsync
				set 
					merchsync_isfail = :isfail,
					merchsync_result = :msg
				where
					merchsync_id = :merchsync_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':merchsync_id' => $merchsync_id,
				':isfail' => $isfail,
				':msg' => $msg
			]);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function setCompleted(string $merchsync_id) : void {
		try {
			$sql = "
				update fsn_merchsync
				set 
					merchsync_isprocessing = 0,
					merchsync_iscompleted = 1
				where
					merchsync_id = :merchsync_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':merchsync_id' => $merchsync_id
			]);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

});	