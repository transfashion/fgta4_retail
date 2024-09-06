<?php namespace FGTA4;




class RegisterSync extends syncBase {

	private array $cfg;
	private $db;

	function __construct(array $cfg) {
		$this->db = $cfg['db'];
	}


	function sync(string $id) : void {
		try {

			// sync header
			$sql = "select * from tmp_heinvreg where heinvreg_id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id' => $id]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new WebException("Data register $id not found in tmp_heinvreg ");
			}
			$header = $this->createRegisterDoc($row);



			// sync items
			$sql = "select * from tmp_heinvregitem where heinvreg_id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id' => $id]);
			$rows = $stmt->fetchall();
			foreach ($rows as $row) {
				$item = $this->createRegisterItem($row);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function createRegisterDoc(array $row) : array {
		try {
			$regionmap = TbDataMap::get_region_id_mapping($row['region_id']); 
			$unit_id = $regionmap['unit_id'];
			$dept_id = $regionmap['dept_id'];
			



			return [];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function createRegisterItem(array $row) : array {

		return [];
	}




}