<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}



class merchship_budgetHandler extends WebAPI  {

	protected float $recordtotalvalue = 0;


	public function DataListLooping(array &$record) : void {
		$record['curr_rate'] = (float)$record['curr_rate'];
		$this->$recordtotalvalue += (float)$record['merchshipbudget_idr'];
	}

	public function DataListFinal(array &$records, object &$result) : void {
		$result->recordtotalvalue = $this->$recordtotalvalue;
	}

	public function DataSavedSuccess(object &$result) : void {
		$merchship_id = $result->dataresponse->merchship_id;

		// hitung total
		try {
			$sql = "
				select 
				sum(merchshipbudget_idr) as merchshipbudget_idr
				from trn_merchshipbudget 
				where 
				merchship_id = :merchship_id			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':merchship_id'=>$merchship_id]);
			$row = $stmt->fetch();
			if ($row==null) {
				$result->recordtotalvalue = 0;
			} else {
				$result->recordtotalvalue = (float)$row['merchshipbudget_idr'];
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}
	
}		
		
		
		