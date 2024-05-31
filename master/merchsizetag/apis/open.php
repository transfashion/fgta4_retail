<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * retail/master/merchsizetag/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchsizetag (mst_merchsizetag)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 12/03/2022
 */
$API = new class extends merchsizetagBase {
	
	public function execute($options) {
		$tablename = 'mst_merchsizetag';
		$primarykey = 'merchsizetag_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchsizetag_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchsizetag_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"merchsizetag_id" => " merchsizetag_id = :merchsizetag_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_merchsizetag A', [
				'merchsizetag_id', 'merchsizetag_name', 'merchsizetag_c01', 'merchsizetag_c02', 'merchsizetag_c03', 'merchsizetag_c04', 'merchsizetag_c05', 'merchsizetag_c06', 'merchsizetag_c07', 'merchsizetag_c08', 'merchsizetag_c09', 'merchsizetag_c10', 'merchsizetag_c11', 'merchsizetag_c12', 'merchsizetag_c13', 'merchsizetag_c14', 'merchsizetag_c15', 'merchsizetag_c16', 'merchsizetag_c17', 'merchsizetag_c18', 'merchsizetag_c19', 'merchsizetag_c20', 'merchsizetag_c21', 'merchsizetag_c22', 'merchsizetag_c23', 'merchsizetag_c24', 'merchsizetag_c25', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}


			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};