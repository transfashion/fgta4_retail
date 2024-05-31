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
 * retail/master/merchsizetag/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header merchsizetag (mst_merchsizetag)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 12/03/2022
 */
$API = new class extends merchsizetagBase {

	public function execute($options) {

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
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.merchsizetag_id LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_merchsizetag A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.merchsizetag_id, A.merchsizetag_name, A.merchsizetag_c01, A.merchsizetag_c02, A.merchsizetag_c03, A.merchsizetag_c04, A.merchsizetag_c05, A.merchsizetag_c06, A.merchsizetag_c07, A.merchsizetag_c08, A.merchsizetag_c09, A.merchsizetag_c10, A.merchsizetag_c11, A.merchsizetag_c12, A.merchsizetag_c13, A.merchsizetag_c14, A.merchsizetag_c15, A.merchsizetag_c16, A.merchsizetag_c17, A.merchsizetag_c18, A.merchsizetag_c19, A.merchsizetag_c20, A.merchsizetag_c21, A.merchsizetag_c22, A.merchsizetag_c23, A.merchsizetag_c24, A.merchsizetag_c25, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_merchsizetag A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$beforeloopdata = new \stdClass;
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListBeforeLoop')) {
					$beforeloopdata = $hnd->DataListBeforeLoop((object[]));
				}
			}

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						$hnd->DataListLooping($record, $beforeloopdata);
					}
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					 
				]));




			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};