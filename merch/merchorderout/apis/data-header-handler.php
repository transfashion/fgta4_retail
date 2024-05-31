<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . "/core/sequencer.php";
use \FGTA4\utils\Sequencer;


class merchorderout_headerHandler extends WebAPI  {

	public function buildListCriteriaValues(object &$options, array &$criteriaValues) : void {
		$criteriaValues['unit_id'] = " A.unit_id = :unit_id";
		$criteriaValues['merchorderout_iscommit'] = " A.merchorderout_iscommit = :merchorderout_iscommit";
	}


	// Incremental tahunan based on unit_id
	public function CreateNewId(object $obj) : string {
		try {
			$seqname = 'PO';
			$dt = new \DateTime();	
			$seqgroup = $obj->unit_id;
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['seqgroup', 'ye', 'mo']);
			$raw = $seq->getraw(['seqgroup'=>$seqgroup, 'ye'=>$ye, 'mo'=> 0]);
			$id = $seqname . '/' . $raw['seqgroup'] . '/' . $raw['ye'] . $mo . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;	
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function RowInserting(object &$obj) {

		$userdata = $this->auth->session_get_user();

		/* save dulu ke trn_orderout */
		try {
			$primarykey_value = $obj->merchorderout_id;

			$item = new \stdClass;
			$item->orderout_id = $primarykey_value;
			$item->orderout_dtstart = $obj->merchorderout_date;
			$item->orderout_dtend = $obj->merchorderout_date;
			$item->orderout_descr = $obj->merchorderout_descr;
			$item->curr_id = $obj->curr_id;
			$item->curr_rate = $obj->curr_rate;
			$item->unit_id = $obj->unit_id;
			$item->ordermodel_id = 'O01';

			$item->_createby = $obj->_createby;
			$item->_createdate = $obj->_createdate;

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_orderout", $item);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/procurement/orderout", "trn_orderout", $primarykey_value, "NEW", $userdata->username, (object)[]);

		} catch (\Exception $ex) {
			throw $ex;
		}

	}

	public function DocumentDeleting(string $id, array &$tabletodelete) {
		$tabletodelete[] = 'trn_orderoutitem';
		$tabletodelete[] = 'trn_orderoutappr';
	}

	public function RowDeleting(string &$reftablename, object &$key, string $primarykey, string $primarykeyvalue) {
		if (in_array($reftablename, ['trn_orderoutfiles', 'trn_orderoutitem', 'trn_orderoutappr']))	{
		$key = new \stdClass;
			$key->orderout_id = $primarykeyvalue;
		}
	}

	public function DocumentDeleted(string $id) {
		try {
			$sql = "delete from trn_orderout where orderout_id = :orderout_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':orderout_id'=>$id]);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function XtionCommitted(string $id) : void {
		try {
			$sql = "
				select 
				sum(orderoutitem_qty) as qty,
				sum(orderoutitem_subtotalvaluefrg) as valuefrg,
				sum(orderoutitem_subtotalvalueidr) as valueidr
				from trn_merchorderoutitem where merchorderout_id = :merchorderout_id		
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchorderout_id'=>$id]);
			$row = $stmt->fetch();

			if ($row!=null) {
				$obj = new \stdClass;
				$obj->merchorderout_id = $id;
			
				$obj->orderout_qty = (int)$row['qty'];
				$obj->orderout_totalvaluefrg = (float)$row['valuefrg'];
				$obj->orderout_totalvalueidr = (float)$row['valueidr'];

				$obj->orderout_outstdqty = $obj->orderout_qty;
				$obj->orderout_outstdvaluefrg = $obj->orderout_totalvaluefrg;
				$obj->orderout_outstdvalueidr = $obj->orderout_totalvalueidr;

				$key = new \stdClass;
				$key->merchorderout_id = $obj->merchorderout_id;

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_merchorderout", $obj, $key);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}
}		
		
		
		