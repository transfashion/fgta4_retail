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
			// $dt = date('Y-m-d');
			// $options->criteria->dt = $dt;
			$dtstart = $options->criteria->dtstart;
			$dtend = $options->criteria->dtend;

			$options->criteria->dtstart = (\DateTime::createFromFormat('d/m/Y', $dtstart))->format('Y-m-d');
			$options->criteria->dtend = (\DateTime::createFromFormat('d/m/Y', $dtend))->format('Y-m-d');

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"dtstart" => " A.BON_DATE >= :dtstart ",
					"dtend" => " A.BON_DATE <= :dtend "
				]
			);


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

					" . $where->sql . "

					AND (A.SALES_NETT <> 0 OR A.HEINVGRO_ISCONSUMABLE=0)
					GROUP BY A.SITE_ID
				)
				
				SELECT
				G.CITY_ID,
				SUM(F.TX) AS TX,
				SUM(F.QTY) AS QTY,
				SUM(F.GROSS) AS GROSS,
				SUM(F.NETT) AS NETT 
				FROM T_SALES F INNER JOIN MST_SITE G ON F.SITE_ID = G.SITE_ID
				GROUP BY
				G.CITY_ID
			


			");
			$stmt->execute($where->params);
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
				'dtend' => $dtend
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