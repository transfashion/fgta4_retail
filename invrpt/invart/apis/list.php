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
					"search" => " A.HEINV_ART = :search ",
					"dt" => " A.DT = :dt "
				]
			);
			
			$stmt = $this->db->prepare("
				SELECT 
				A.HEINV_ID, A.HEINV_ART, A.HEINV_MAT, A.HEINV_COL,
				A.HEINV_PRICE, A.HEINV_PRICEDISC, A.HEINV_PRICENETT,
				SUM(A.QTY) AS QTY
				FROM 
				MST_INVDAILY A	
			" . $where->sql . "
				GROUP BY 
				A.HEINV_ID, A.HEINV_ART, A.HEINV_MAT, A.HEINV_COL,
				A.HEINV_PRICE, A.HEINV_PRICEDISC, A.HEINV_PRICENETT
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



			// $result = new \stdClass; 
			// $maxrow = 30;
			// $offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			// $stmt = $this->db->prepare("select count(*) as n from mst_sea A" . $where->sql);
			// $stmt->execute($where->params);
			// $row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			// $total = (float) $row['n'];

			// $limit = " LIMIT $maxrow OFFSET $offset ";
			// $stmt = $this->db->prepare("
			// 	select 
			// 	sea_id, sea_name, sea_year, sea_isdisabled, sea_datestart, sea_dateend, seagroup_id, _createby, _createdate, _modifyby, _modifydate 
			// 	from mst_sea A
			// " . $where->sql . $limit);
			// $stmt->execute($where->params);
			// $rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			// $records = [];
			// foreach ($rows as $row) {
			// 	$record = [];
			// 	foreach ($row as $key => $value) {
			// 		$record[$key] = $value;
			// 	}

			// 	array_push($records, array_merge($record, [
			// 		// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
			// 		//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
			// 	 	//'tambahan' => 'dta'
			// 		'seagroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['seagroup_id'], $this->db, 'mst_seagroup', 'seagroup_id', 'seagroup_name'),
					 
			// 	]));
			// }




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