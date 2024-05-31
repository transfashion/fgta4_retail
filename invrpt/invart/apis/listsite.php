<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
	function __construct() {
		// $this->debugoutput = true;
		// $DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		// $DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		// $this->db = new \PDO(
		// 			$DB_CONFIG['DSN'], 
		// 			$DB_CONFIG['user'], 
		// 			$DB_CONFIG['pass'], 
		// 			$DB_CONFIG['param']
		// );


		
		$DB_CONFIG = DB_CONFIG['DSR'];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM['firebird'];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
			$dt = date('Y-m-d');
			$options->criteria->dt = $dt;

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"heinvitem_id" => " A.HEINVITEM_ID = :heinvitem_id ",
					"dt" => " A.DT = :dt "
				]
			);
			
			$stmt = $this->db->prepare("
				SELECT 
				A.SITE_ID,
				SUM(A.QTY) AS QTY
				FROM 
				MST_INVDAILY A	
			" . $where->sql . "
				GROUP BY A.SITE_ID
			");
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = array();
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				
				array_push($records, array_merge($record, [

				]));
			}



			$total = count($records);
			$offset = $total;
			$maxrow = $total;

			// kembalikan hasilnya
			$result = new \stdClass;
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataList();