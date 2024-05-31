<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
	function __construct() {
		// $this->debugoutput = true;
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

			$location_id = $options->criteria->location_id;
			$city_id = $options->criteria->city_id;
			$dtstart = (\DateTime::createFromFormat('d/m/Y', $options->criteria->dtstart))->format('Y-m-d');
			$dtend = (\DateTime::createFromFormat('d/m/Y', $options->criteria->dtend))->format('Y-m-d');

			$stmt = $this->db->prepare("
				with T_SALES AS (
					select 
					A.SITE_ID,
					COUNT(DISTINCT A.BON_ID) AS TX,
					SUM(A.SALES_QTY) AS QTY,
					SUM(A.SALES_GROSS) AS GROSS,
					SUM(A.SALES_NETT) AS NETT
					from 
					TMP_BON_ITEM A
					WHERE
					A.BON_DATE BETWEEN :DTSTART AND :DTEND				
					AND (A.SALES_NETT <> 0 OR A.HEINVGRO_ISCONSUMABLE=0)
					GROUP BY A.SITE_ID
				)
				
				SELECT
				G.CITY_ID,
				G.LOCATION_ID,
				G.SITE_ID,
				SUM(F.TX) AS TX,
				SUM(F.QTY) AS QTY,
				SUM(F.GROSS) AS GROSS,
				SUM(F.NETT) AS NETT 
				FROM T_SALES F INNER JOIN MST_SITE G ON F.SITE_ID = G.SITE_ID
				WHERE
				G.CITY_ID = :CITY_ID AND G.LOCATION_ID = :LOCATION_ID
				GROUP BY
				G.CITY_ID, G.LOCATION_ID, G.SITE_ID


			");

			$stmt->execute(array(
				':DTSTART' => $dtstart,
				':DTEND' => $dtend,
				':CITY_ID' => $city_id,
				':LOCATION_ID' => $location_id
			));
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);



			$TOTAL_TX = 0;
			$TOTAL_QTY = 0;
			$TOTAL_GROSS = 0;
			$TOTAL_NETT = 0;
			$records = array();
			foreach ($rows as $row) {
				$tx = (float)$row['TX'];
				$qty = (float)$row['QTY'];
				$gross = (float)$row['GROSS'];
				$nett = (float)$row['NETT'];

				$TOTAL_TX += $tx;
				$TOTAL_QTY += $qty;
				$TOTAL_GROSS += $gross;
				$TOTAL_NETT += $nett;
				
				
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
			$result->params = [
				'dtstart' => $dtstart,
				'dtend' => $dtend,
				'city_id' => $city_id,
				'location_id' => $location_id
			];
			$result->summary = [
				'TX' => $TOTAL_TX,
				'QTY' => $TOTAL_QTY,
				'GROSS' => $TOTAL_GROSS,
				'NETT' => $TOTAL_NETT
			];
						
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataList();