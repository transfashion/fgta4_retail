<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

$API = new class extends pospromoBase {
	public function execute(string $site_id) : object {
		try {

			$sql = "
				select 
				A.proprog_id, A.proprog_descr, A.proprog_display, A.problock_id,
				B.prorule_id, B.prorule_lib, B.prorule_fn
				from 
				mst_proprog A inner join mst_prorule B on B.prorule_id=A.prorule_id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			// $stmt->execute([':site_id'=>$site_id, ':posterminal_id'=>$posterminal_id]);
			$rows = $stmt->fetchall();

			$ret = new \stdClass;
			$ret->success = true;
			$ret->datarespond = $rows;

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};		