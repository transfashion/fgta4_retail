<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use FGTA4StandartApproval;
use \FGTA4\StandartApproval;




/**
 * finact/procurement/inquiry/apis/xtion-commit.php
 *
 * =======
 * Commit
 * =======
 * Commit dokumen, menandakan dokumen yang selesai dsunting
 * dan telah siap untuk diproses lebih lanjut
 * Pada status tercommit, dokumen akan menjadi readonly. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 04/07/2021
 */
$API = new class extends merchitemBase {

	public function execute($param) {


		$DB_CONFIG = DB_CONFIG['FRM2'];
		// $DB_CONFIG['param'] = DB_CONFIG_PARAM['FRM2'];		
		$this->db_frm = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass']
		);


		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'user' => $userdata
			];


			$stmt_check_exist = $this->db->prepare("
				select merchitem_id from mst_merchitem where merchitem_id = :merchitem_id
			");


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$price_id = $param->price_id;
				$this->log($price_id);


				$sql = "
					select
					C.heinv_id,
					substring(C.heinv_id, 1, 11) + D.heinvitem_colnum as heinvitem_id,
					C.heinv_name,
					C.heinv_art,
					C.heinv_mat,
					C.heinv_col,
					D.heinvitem_size,
					
					
					C.heinv_priceori,
					C.heinv_price01,
					B.heinv_issp,
					C.heinv_pricedisc01,
					
					C.heinv_lastcost
					from transaksi_heinvprice A inner join transaksi_heinvpricedetil B on B.price_id=A.price_id
												inner join master_heinv C on C.heinv_id = B.heinv_id
												inner join master_heinvitem D on D.heinv_id = C.heinv_id
					where
					A.price_id = :price_id;				
				
				";


				$tablename = "mst_merchitem";
				$stmt = $this->db_frm->prepare($sql);
				$stmt->execute([':price_id' => $price_id]);
				$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);			
				foreach ($rows as $row) {
					$this->log($row);

					$key = new \stdClass;
					$key->merchitem_id = $row['heinvitem_id'];

					$obj = new \stdClass;
					$obj->merchitem_id = $row['heinvitem_id'];
					$obj->merchitem_name = $row['heinv_name'];
					$obj->merchitem_art = $row['heinv_art'];
					$obj->merchitem_mat = $row['heinv_mat'];
					$obj->merchitem_col = $row['heinv_col'];
					$obj->merchitem_size = $row['heinvitem_size'];

					$obj->merchitem_priceori = $row['heinv_priceori'];
					$obj->merchitem_price = $row['heinv_price01'];
					$obj->merchitem_issp = $row['heinv_issp'];
					$obj->merchitem_disc = (int)$row['heinv_pricedisc01'];

					$obj->merchitem_discval = ($obj->merchitem_disc/100) * $obj->merchitem_price;
					$obj->merchitem_pricenett =  $obj->merchitem_price - $obj->merchitem_discval;

					$obj->merchitem_lastcogs = $row['heinv_lastcost'];
					$obj->merchitem_lastcogsdt = '2021-12-31';
					
					// $obj->merchitem_varcode = $row['heinv_id'];


					$stmt_check_exist->execute([
						':merchitem_id' => $obj->merchitem_id
					]);
					$rows_check = $stmt_check_exist->fetchall(\PDO::FETCH_ASSOC);
					if (count($rows_check)>0) {
						// exist
						$obj->_modifyby = $userdata->username;
						$obj->_modifydate = date("Y-m-d H:i:s");				
						$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
					} else {
						// not exists
						$obj->_createby = $userdata->username;
						$obj->_createdate = date("Y-m-d H:i:s");
						$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
					}


					$stmtupdate = $this->db->prepare($cmd->sql);
					$stmtupdate->execute($cmd->params);
					



				}



				$this->db->commit();
				return (object)[
					'success' => true,
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


};


