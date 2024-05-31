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


		$FRMCONNAME = $GLOBALS['TBDB'];

		$DB_CONFIG_FRM = DB_CONFIG[$FRMCONNAME];
		$DB_CONFIG_FRM['param'] = DB_CONFIG_PARAM['mssql'];
		$this->db_frm2 = new \PDO(
			$DB_CONFIG_FRM['DSN'], 
			$DB_CONFIG_FRM['user'], 
			$DB_CONFIG_FRM['pass'],
			$DB_CONFIG_FRM['param']
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
					"heinv_id" => " A.HEINV_ID = :heinv_id ",
					"dt" => " A.DT = :dt "
				]
			);
			
			$stmt = $this->db->prepare("
				SELECT 
				A.HEINV_ID,
				A.HEINVITEM_ID, A.HEINV_SIZE,
				SUM(A.QTY) AS QTY
				FROM 
				MST_INVDAILY A	
			" . $where->sql . "
				GROUP BY A.HEINV_ID, A.HEINVITEM_ID, A.HEINV_SIZE
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

			$price = [
				'heinv_pricegross' => 0,
				'heinv_pricedisc' => 0,
				'heinv_pricenett' => 0,
				'invcls_name' => ''
			];

			if (count($rows)>0) {
				$heinv_id = $rows[0]['HEINV_ID'];

				$sql = "
					select 
					heinv_price01,
					heinv_pricedisc01,
					heinv_name,
					(heinv_price01*((100-heinv_pricedisc01)/100)) as heinv_pricenett,
					(select invcls_name from master_invcls where invcls_id=A.invcls_id) as invcls_name
					from master_heinv A
					where
					heinv_id = '$heinv_id'
				";

				$stmt = $this->db_frm2->prepare($sql);
				$stmt->execute();
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
				$price['heinv_pricegross'] = round($row['heinv_price01'], 0);
				$price['heinv_pricedisc'] = $row['heinv_pricedisc01'];
				$price['heinv_pricenett'] = round($row['heinv_pricenett'], 0);
				$price['heinv_name'] = $row['heinv_name'];
				$price['invcls_name'] = $row['invcls_name'];
				
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
			$result->price = $price;

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataList();