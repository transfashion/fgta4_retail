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

	public function execute($posterminal_id) {
		try {
			$sql = "update mst_posterminal set posterminal_setupcode=null where posterminal_id = :posterminal_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':posterminal_id' => $posterminal_id
			]);

			return [
				'success' => true
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};