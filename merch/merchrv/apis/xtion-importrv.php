<?php namespace FGTA4\apis;

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

$API = new class extends merchrvBase {
	public function execute(object $params) : object {
		$userdata = $this->auth->session_get_user();

		try {

			$taskname = $params->taskname;
			$synctype = $params->synctype;
			$data = addslashes($params->data);

			$res = $this->sync_rv($data, $userdata->username, $taskname);
			return $res;
		} catch (\Exception $ex) {
			return (object)[
				'error' => true,
				'errormessage' => $ex->getMessage()
			];
		}
	}

	private function sync_rv($data, $username, $taskname) {
		// jalankan perintah di background;
		$name = $taskname;
		$pid = uniqid();
		$dt = date("Ymd");
		$logfile = "/mnt/ramdisk/log-$dt-$pid.txt";
		$clipath = __LOCALCLIENT_DIR . '/cli';

		// $cmdscript = "/var/www/fgtacloud4u/server_apps/retail/merch/merchrv/cli/importrv.sh";
		$cmdscript = __LOCALCLIENT_DIR ."/../apps/retail/merch/merchrv/cli/importrv.sh";
		$command = "$cmdscript -c \"$clipath\" -n $name -p $pid -u $username -d \"$data\" -l \"$logfile\" 2>&1 | tee -a $logfile 2>/dev/null >/dev/null &";
		shell_exec($command);

		return (object)[
			'name' => $name,
			'pid' => $pid,
			'log' => base64_encode($logfile)
		];
	}	
};