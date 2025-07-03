<?php namespace FGTA4\apis;

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

$API = new class extends merchorderoutBase {
	public function execute(object $params) : object {
		$userdata = $this->auth->session_get_user();

		try {

			$taskname = $params->taskname;
			$synctype = $params->synctype;
			$data = addslashes($params->data);

			$res = $this->sync_reg($data, $userdata->username, $taskname);
			return $res;
		} catch (\Exception $ex) {
			return (object)[
				'error' => true,
				'errormessage' => $ex->getMessage()
			];
		}
	}

	private function sync_reg($data, $username, $taskname) {
		// jalankan perintah di background;
		$name = $taskname;
		$pid = uniqid();
		$dt = date("Ymd");
		$logfile = "/mnt/ramdisk/log-$dt-$pid.txt";
		$clipath = __LOCALCLIENT_DIR . '/cli';

		// $cmdscript = "/home/ubuntu/fgtamodules/fgta4_retail/merch/merchorderout/cli/importregtopo.sh";
		$cmdscript = "$clipath/importregtopo.sh";
		$command = "$cmdscript -c \"$clipath\" -n $name -p $pid -u $username -d \"$data\" -l \"$logfile\" 2>&1 | tee -a $logfile 2>/dev/null >/dev/null &";
		shell_exec($command);

		return (object)[
			'name' => $name,
			'pid' => $pid,
			'log' => base64_encode($logfile)
		];
	}	
};