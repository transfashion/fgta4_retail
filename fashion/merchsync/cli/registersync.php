<?php namespace FGTA4;




class RegisterSync extends syncBase {

	private array $cfg;
	private $db;

	function __construct(array $cfg) {
		$this->db = $cfg['db'];
	}


	function sync(string $id) : void {
		try {
			$sql = "select * from tmp_heinvreg where heinvreg_id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id' => $id]);
			$row = $stmt->fetch();
			if ($row==null) {
				throw new WebException("Data register $id not found in tmp_heinvreg ");
			}

			print_r($row);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}