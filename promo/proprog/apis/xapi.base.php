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
 * retail/promo/proprog/apis/xapi.base.php
 *
 * proprogBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul proprog
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 08/07/2023
 */
class proprogBase extends WebAPI {

	protected $main_tablename = "mst_proprog";
	protected $main_primarykey = "proprog_id";
	protected $main_field_version = "proprog_version";	
	
	protected $field_iscommit = "proprog_iscommit";
	protected $field_commitby = "proprog_commitby";
	protected $field_commitdate = "proprog_commitdate";		
			
	
	protected $fields_isapprovalprogress = "proprog_isapprovalprogress";			
	protected $field_isapprove = "proprog_isapproved";
	protected $field_approveby = "proprog_approveby";
	protected $field_approvedate = "proprog_approvedate";
	protected $field_isdecline = "proprog_isdeclined";
	protected $field_declineby = "proprog_declineby";
	protected $field_declinedate = "proprog_declinedate";

	protected $approval_tablename = "mst_proprogappr";
	protected $approval_primarykey = "proprogappr_id";
	protected $approval_field_approve = "proprogappr_isapproved";
	protected $approval_field_approveby = "proprogappr_by";
	protected $approval_field_approvedate = "proprogappr_date";
	protected $approval_field_decline = "proprogappr_isdeclined";
	protected $approval_field_declineby = "proprogappr_declinedby";
	protected $approval_field_declinedate = "proprogappr_declineddate";
	protected $approval_field_notes = "proprogappr_notes";
	protected $approval_field_version = "proprog_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*proprog*/.txt";
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