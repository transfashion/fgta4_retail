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
 * retail/merch/merchship/apis/xapi.base.php
 *
 * merchshipBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul merchship
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 10/11/2023
 */
class merchshipBase extends WebAPI {

	protected $main_tablename = "trn_merchship";
	protected $main_primarykey = "merchship_id";
	protected $main_field_version = "merchship_version";	
	
	protected $field_iscommit = "merchship_iscommit";
	protected $field_commitby = "merchship_commitby";
	protected $field_commitdate = "merchship_commitdate";		
			
	



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*merchship*/.txt";
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