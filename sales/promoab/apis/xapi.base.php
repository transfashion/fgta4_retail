<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
// use \FGTA4\debug;




/**
 * retail/sales/promoab/apis/xapi.base.php
 *
 * promoabBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul promoab
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 21/03/2023
 */
class promoabBase extends WebAPI {

	protected $main_tablename = "mst_promoab";
	protected $main_primarykey = "promoab_id";
	protected $main_field_version = "promoab_version";	
	
	protected $field_iscommit = "promoab_iscommit";
	protected $field_commitby = "promoab_commitby";
	protected $field_commitdate = "promoab_commitdate";		
			
	



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*promoab*/.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

		
	}

	function pre_action_check($data, $action) {
		try {
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				$this->main_tablename A 
				where 
				A.$this->main_primarykey = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}