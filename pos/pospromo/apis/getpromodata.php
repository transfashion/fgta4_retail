<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

$API = new class extends pospromoBase {
	public function execute(string $proprog_id) : object {
		try {

			$sql = "
				select * from mst_proprog where proprog_id = :proprog_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':proprog_id'=>$proprog_id]);
			$row = $stmt->fetch();

			$datarespond = [
				'proprog_id' => $row['proprog_id'],
				'prorule_id' => $row['prorule_id'],
				'promodel_id' => $row['promodel_id'],
				'timestart' => $row['proprog_timestart'],
				'timeend' => $row['proprog_dtend'],
				'valuethreshold' => (float)$row['proprog_valuethreshold'],
				'qtythreshold' => (int)$row['proprog_qtythreshold'],

				'itemA' => [
					"label" => $row['a_proprog_label'],
					"prospot_id" => $row['a_prospot_id'],
					'prostep_id' => $row['a_prostep_id'],
					'progrouping_id' => $row['a_progrouping_id'],
					'qtythreshold' => (int)$row['a_proprog_qtythreshold'],
					'valuethreshold' => (float)$row['a_proprog_valuethreshold'],
					'sellprice' => (float)$row['a_proprog_sellprice'],
					'disc' => (float)$row['a_proprog_disc'],
					'discval' => (float)$row['a_proprog_discval'],
					'qtyapplied' => (int)$row['a_proprog_qtyapplied'],
					"items" => []
				],
				'itemB' => [
					'label' => $row['b_proprog_label'],
					'prospot_id' => $row['b_prospot_id'],
					'qtythreshold' => $row['b_proprog_qtythreshold'],
					'valuethreshold' => $row['b_proprog_valuethreshold'],
					'sellprice' => $row['b_proprog_sellprice'],
					'blockonmeet' => $row['b_proprog_isblockonmeet'], 
					"items" => []
				],
				'payMethod' => [],
			];

			$sqlA = "select * from mst_proprogitemstocka where proprog_id = :proprog_id";
			$stmtA = $this->db->prepare($sqlA);
			$stmtA->execute([':proprog_id'=>$proprog_id]);
			$rows = $stmtA->fetchall();
			foreach ($rows as $row) {
				$itemstock_id = $row['itemstock_id'];
				$datarespond['itemA']['items'][$itemstock_id] = [
					'itemstock_id' => $itemstock_id,
					'itemstock_sellprice' => $row['itemstock_sellprice'],
					'itemstock_discval' => $row['itemstock_discval'],
					'itemstock_disc' => $row['itemstock_disc'],
					'itemstock_tag' => $row['itemstock_tag'],
				];
			}

			$sqlB = "select * from mst_proprogitemstockb where proprog_id = :proprog_id";
			$stmtB = $this->db->prepare($sqlB);
			$stmtB->execute([':proprog_id'=>$proprog_id]);
			$rows = $stmtB->fetchall();
			foreach ($rows as $row) {
				$itemstock_id = $row['itemstock_id'];
				$datarespond['itemB']['items'][$itemstock_id] = [
					'itemstock_id' => $itemstock_id,
					'itemstock_sellprice' => $row['itemstock_sellprice'],
					'itemstock_discval' => $row['itemstock_discval'],
					'itemstock_disc' => $row['itemstock_disc'],
				];
			}

			$sqlP = "select * from mst_propaymethod where proprog_id = :proprog_id";
			$stmtP = $this->db->prepare($sqlP);
			$stmtP->execute([':proprog_id'=>$proprog_id]);
			$rows = $stmtP->fetchall();
			foreach ($rows as $row) {
				$paymethod_id = $row['paymethod_id'];
				$datarespond['payMethod'][$paymethod_id] = [
					'paymethod_id' => $row['paymethod_id'],
					'paymethod_code' => explode(';', $row['paymethod_code'])
				];
			}


			$ret = new \stdClass;
			$ret->success = true;
			$ret->datarespond = $datarespond;

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};		