<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;

$API = new class extends WebAPI {
	function __construct() {
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);
	}

	public function execute($site_id, $code) {
		try {

			$sql = "select * from mst_posterminal where site_id = :site_id and posterminal_setupcode =:code";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':site_id' => $site_id,
				':code' => $code
			]);
			$row = $stmt->fetch();
			if ($row==null) {
				return [
					'success' => false,
					'message' => 'Data site dan code setup salah', 
					'licensevalue' => null
				];
			}

			$site_name = \FGTA4\utils\SqlUtility::Lookup($site_id, $this->db, 'mst_site', 'site_id', 'site_name');
			$posterminal_id = $row['posterminal_id'];
			$store_code = $row['store_code'];
			$posterminal_code = $row['posterminal_code'];
			$posterminal_license = $row['posterminal_license'];
			$posterminal_licenseunlimited = $row['posterminal_licenseunlimited'];
			$posterminal_expireddate = $row['posterminal_expireddate'];

			$setting = [
				'site_id' => strtoupper($site_id),
				'site_name' =>  $site_name,
				'posterminal_id' => $posterminal_id,
				'license' => $posterminal_license,
				'appid' => 'fgtapos-tfi',
				'appsecret' => 'mnsoiu234@er',
				'license_to' => 'PT. Trans Fashion Indonesia',
				'license_date' => '2023-01-28',
				'license_valid_to' => $posterminal_licenseunlimited==1 ? 'unlimited' : $posterminal_expireddate,
				'license_timestamp' => time(),
			];

			$json = json_encode($setting);
			$licensevalue = chunk_split(base64_encode($json));

			return [
				'success' => true,
				'message' => '', 
				'licensevalue' => $licensevalue
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};


