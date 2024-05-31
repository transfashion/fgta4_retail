<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}

use \FGTA4\exceptions\WebException;

$API = new class extends merchshipBase {

	public function execute($id, $options) {
		$userdata = $this->auth->session_get_user();
		$handlerclassname = "\\FGTA4\\apis\\merchship_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchship_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$data = null;
				

				// hitung costing budget disini
				$data = $this->getCalculation($id);


				$this->db->commit();
				return (object)[
					'success' => true,
					'data' => $data 
				];
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function getCalculation(string $id) : object {
		$ret = new \stdClass;

		try {
			$sql = "
				select 
				A.merchrv_id,
				A.merchrv_ref, 
				F.itemmodel_name, 
				sum(B.merchrvitem_qtyinit) as qtyinit,
				sum(B.merchrvitem_qty) as qty,
				sum(B.merchrvitem_subtotalvaluefrg) as valuefrg,
				sum(B.merchrvitem_subtotalvalueidr) as valueidr,
				sum(B.merchrvitem_budgetaddcostidr) as addcostidr,
				sum(B.merchrvitem_budgetlandedcostidr) as landedcostidr,
				sum(B.merchrvitem_budgetmarkupidr) as markupidr,
				sum(B.merchrvitem_budgetbillidr) as billidr,
				sum(B.merchrvitem_budgetbillppn) as billppn,
				sum(B.merchrvitem_budgetbilldpp) as billdpp
				from trn_merchrv A inner join trn_merchrvitem B on B.merchrv_id = A.merchrv_id 
									left join mst_merchitem C on C.merchitem_id = B.merchitem_id
									left join mst_merchitemctg D on D.merchitemctg_id =C.merchitemctg_id 
									left join mst_itemclass E on E.itemclass_id =D.itemclass_id 
									left join mst_itemmodel F on F.itemmodel_id =E.itemmodel_id  
				where 
				A.merchship_id = :merchship_id
				group by A.merchrv_id, A.merchrv_ref, F.itemmodel_name			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchship_id' => $id]);
			$rows = $stmt->fetchall();
			$ret->receive = $rows;

			$sql = "
				select 
				B.merchshipbudgetacc_id,
				B.merchshipbudgetacc_name, 
				B.merchshipbudgetacc_isexclude,
				case when B.merchshipbudgetacc_isexclude=0 then sum(A.merchshipbudget_idr) else 0 end as shipcostidr,
				case when B.merchshipbudgetacc_isexclude=1 then sum(A.merchshipbudget_idr) else 0 end as excluded
				from 
				trn_merchshipbudget A inner join mst_merchshipbudgetacc B on B.merchshipbudgetacc_id = A.merchshipbudgetacc_id 
				where 
				A.merchship_id = :merchship_id
				group by 
				B.merchshipbudgetacc_id,
				B.merchshipbudgetacc_name, 
				B.merchshipbudgetacc_isexclude				
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchship_id' => $id]);
			$rows = $stmt->fetchall();
			$ret->shipcost = $rows;

			return $ret;
		} catch (err) {

		}
	}

};


