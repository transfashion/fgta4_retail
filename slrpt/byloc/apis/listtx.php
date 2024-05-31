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

			$dtstart = $options->criteria->dtstart;
			$dtend = $options->criteria->dtend;

			$options->criteria->dtstart = (\DateTime::createFromFormat('d/m/Y', $dtstart))->format('Y-m-d');
			$options->criteria->dtend = (\DateTime::createFromFormat('d/m/Y', $dtend))->format('Y-m-d');



			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					'site_id' => 'A.SITE_ID = :site_id',
					'dtstart' => 'A.BON_DATE >= :dtstart',
					'dtend' => 'A.BON_DATE <= :dtend'
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as N from TMP_BON_HEADER A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['N'];

			//$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				FIRST $maxrow SKIP $offset 
				A.BON_ID, A.BON_DATE,
				SUM(B.SALES_QTY) AS QTY,
				SUM(B.SALES_GROSS) AS GROSS,
				SUM(B.SALES_NETT) AS NETT
				from TMP_BON_HEADER A INNER JOIN TMP_BON_ITEM B 
				ON A.BON_ID=B.BON_ID AND (B.SALES_NETT <> 0 OR B.HEINVGRO_ISCONSUMABLE=0)
			" 
			. $where->sql . 
			"  GROUP BY A.BON_ID, A.BON_DATE ");
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);


			$TOTAL_QTY = 0;
			$TOTAL_GROSS = 0;
			$TOTAL_NETT = 0;
			$records = [];
			foreach ($rows as $row) {
				$qty = (float)$row['QTY'];
				$gross = (float)$row['GROSS'];
				$nett = (float)$row['NETT'];

				$TOTAL_QTY += $qty;
				$TOTAL_GROSS += $gross;
				$TOTAL_NETT += $nett;

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					 
				]));
			}

			// kembalikan hasilnya
			$result = new \stdClass;
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			$result->summary = [
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