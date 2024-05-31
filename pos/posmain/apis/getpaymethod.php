<?php namespace FGTA4\apis;



if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

$API = new class extends posmainBase {
	public function execute(string $site_id, string $posterminal_id) : object {
		try {

			$sql = "
				select
				A.paymethod_id,
				A.paymethod_name,
				A.paytype_id,
				A.paytype_iscash,
				A.paytype_isvoucher,
				A.paytype_isedc,
				A.paytype_isonline,
				A.paytype_istransfer, 
				A.paymethod_code,
				A.paymethod_isintegrated,
				A.paymethod_setting,
				A.paymethod_shortcut,
				A.paytype_nameinputtype,
				A.paytype_cardinputtype,
				A.paytype_apprinputtype
				from pos_paymethod A
				where 
				A.paymethod_isdisabled = 0
				and ((A.site_id is null) or (site_id=:site_id and posterminal_id is null) or (site_id='HO' and posterminal_id=:posterminal_id))
				order by A.paymethod_order ASC
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([':site_id'=>$site_id, ':posterminal_id'=>$posterminal_id]);
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