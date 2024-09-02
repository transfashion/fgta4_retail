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

			if (!defined('__TAX_PPN')) {
				throw new \Exception('__TAX_PPN belum di define di app-config');
			}

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$data = $this->BillCalculate($id);

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
			return (object)[
				'success' => false,
				'message' => $ex->getMessage() 
			];
		}
	}


	public function BillCalculate(string $id) : object {
		$merchship_id = $id;
		$userdata = $this->auth->session_get_user();


		$ret = new \stdClass;
		try {

			// ambil rate budget shipment
			$sql = "
				select * from trn_merchship where merchship_id = :merchship_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchship_id' => $merchship_id]);
			$row = $stmt->fetch();

			$merchship_rate = (float)$row['merchship_rate'];
			

			// ambil costbudget shipment ini
			$sql = "
				select sum(A.merchshipbudget_idr) as shipmentcost
				from 
				trn_merchshipbudget A inner join mst_merchshipbudgetacc B on B.merchshipbudgetacc_id = A.merchshipbudgetacc_id 
				where 
				A.merchship_id = :merchship_id
				and B.merchshipbudgetacc_isexclude = 0			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchship_id' => $merchship_id]);
			$row = $stmt->fetch();
			$shipmentcost = (float)$row['shipmentcost'];

			// hitung rv yang ada di shipment ini
			$sql = "
				select 
				B.merchrvitem_id, 
				E.itemmodel_id, 
				B.merchrvitem_value,
				B.merchrvitem_qty 
				from trn_merchrv A inner join trn_merchrvitem B on B.merchrv_id = A.merchrv_id 
									 left join mst_merchitem C on C.merchitem_id = B.merchitem_id
									left join mst_merchitemctg D on D.merchitemctg_id =C.merchitemctg_id 
									 left join mst_itemclass E on E.itemclass_id =D.itemclass_id 
				where 
				A.merchship_id = :merchship_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchship_id' => $merchship_id]);
			$rows = $stmt->fetchall();

			$totalValue = (float)0;
			$items = [];
			foreach ($rows as $row) {
				$merchrvitem_id = $row['merchrvitem_id'];
				$itemmodel_id = $row['itemmodel_id'];
				$markup = $itemmodel_id=='FAMC' ? 0.15 : 0; 
				$merchrvitem_value = (float)$row['merchrvitem_value'];
				$merchrvitem_qty = (int)$row['merchrvitem_qty'];
				$subtotal = $merchrvitem_qty * $merchrvitem_value;
				$totalValue += $subtotal;

				// hitung 
				$items[] = [
					'model' => $itemmodel_id,
					'markup' => $markup,
					'id' => $merchrvitem_id,
					'value' => $merchrvitem_value,
					'qty' => $merchrvitem_qty,
					'subtotal' => $subtotal,
					'rate' => $merchship_rate
				];
			}


			$sqlRVUpdate = "
				update
				trn_merchrvitem
				set
					merchrvitem_rate = :rate,
					merchrvitem_subtotalvaluefrg = :subtotalfrg,
					merchrvitem_subtotalvalueidr = :subtotalidr,
					merchrvitem_budgetaddcostidr = :addcostidr,
					merchrvitem_budgetlandedcostidr = :landedcostidr,
					merchrvitem_budgetmarkupidr = :markupidr,
					merchrvitem_budgetbillidr = :billidr,
					merchrvitem_budgetbillppn = :billppn,
					merchrvitem_budgetbilldpp = :billdpp
				where
					merchrvitem_id = :id
			";
			$stmtupd = $this->db->prepare($sqlRVUpdate);


			$calculated_dpp = 0;
			$calculated_ppn = 0;
			$calculated_bill = 0;

			$ppn = (float)__TAX_PPN;
			foreach ($items as $item) {
				$id = $item['id'];
				$value = $item['value'];
				$qty = $item['qty'];
				$subtotal = $item['subtotal'];
				$rate = $item['rate'];
				$markup = $item['markup'];

				$subtotalFRG = $subtotal;
				$subtotalIDR = $subtotal * $rate;
				$addCostIDR = ($subtotal/$totalValue ) * $shipmentcost;
				$landedcostIDR = $subtotalIDR + $addCostIDR;
				$markupIDR = $landedcostIDR * $markup;
				$billIDR = $landedcostIDR + $markupIDR;
				$billDPP = $billIDR / (1+$ppn);
				$billPPN = $billIDR - $billDPP;


				$calculated_dpp += $billDPP;
				$calculated_ppn += $billPPN;
				$calculated_bill += $billIDR;

				try {
					$stmtupd->execute([
						':id' => $id,
						':rate' => $rate,
						':subtotalfrg' => $subtotalFRG,
						':subtotalidr' => $subtotalIDR,
						':addcostidr' => $addCostIDR,
						':landedcostidr' => $landedcostIDR,
						':markupidr' => $markupIDR,
						':billidr' => $billIDR,
						':billppn' => $billPPN,
						':billdpp' => $billDPP
					]);	
				} catch (\Exception $ex) {
					throw $x;
				}
		
				
			}


			// update header as calculate
			$sql = "
				update  trn_merchship 
				set 
				calculated_dpp = :calculated_dpp,
				calculated_ppn = :calculated_ppn,
				calculated_bill = :calculated_bill,
				merchship_iscalculate = 1,
				merchship_calculateby = :username,
				merchship_calculatedate = :date
				where 
				merchship_id = :merchship_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':username' => $userdata->username,
				':date' => date('Y-m-d'),
				':merchship_id' => $merchship_id,
				':calculated_dpp' => $calculated_dpp,
				':calculated_ppn' => $calculated_ppn,
				':calculated_bill' => $calculated_bill
			]);

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
	

};


