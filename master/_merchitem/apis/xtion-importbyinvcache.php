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

				$region_id = $param->region_id;

				$region_maps = [
					'03700' => 'FKP',
					'01100' => 'HBS',
					'02600' => 'FLA',
					'03400' => 'GEX',
					'00900' => 'EAG',
					'01400' => 'CAN'
				];


				$dept_maps = [
					'03700' => 'FKP',
					'01100' => 'HBS',
					'02600' => 'FLA',
					'03400' => 'GEX',
					'00900' => 'EAG',
					'01400' => 'CAN'
				];

				$itemclass_maps = [
					'03700' => '6221db2b9bf88',
					'01100' => '6221da2c85daa',
					'02600' => '6221daf95d10d',
					'03400' => '6221db9ac9fd7',
					'00900' => '6221daafad5ef',
					'01400' => '6221da66c1af6'
				];

				$gender_maps = [
					'M' => 'M',
					'W' => 'F'
				];


				// dept mapping	
				$dept_id = $dept_maps[$region_id]; 
				$itemclass_id = $itemclass_maps[$region_id];


				// prepare untuk cek region
				$brand_id = $region_maps[$region_id]; 
				$sql = "
					select merchitemctg_id from mst_merchitemctgref 
					where 
					interface_id='TB' and brand_id=:brand_id and merchitemctgref_code=:code
				";
				$stmt_ctgmap = $this->db->prepare($sql);

				// prepare untuk cek season
				$sql = "
					select merchsea_id from mst_merchsearef
					where
					interface_id='TB' and merchsearef_code=:code
				";
				$stmt_seamap = $this->db->prepare($sql);

				// prepre untuk cek merchvariance
				$sql = "
					select merchitemvar_id from mst_merchitemvar
					where
					merchitemvar_id = :merchitemvar_id
				";
				$stmt_merchitemvar = $this->db->prepare($sql);


				// prepare untuk cek item
				$sql = "
					select item_id from mst_item
					where
					item_id = :item_id
				";
				$stmt_item = $this->db->prepare($sql);



				$sql = "
					select 

						C.heinv_id,
						substring(C.heinv_id, 1, 11) + D.heinvitem_colnum as heinvitem_id,
						C.heinv_name,
						C.heinv_art,
						C.heinv_mat,
						C.heinv_col,
						D.heinvitem_size,
						C.heinvctg_id,
						(select heinvctg_class from master_heinvctg where heinvctg_id=C.heinvctg_id) as heinvctg_class,
						
						C.heinv_priceori,
						C.heinv_price01,
						C.heinv_pricedisc01,
						
						isnull((select heinv_issp from transaksi_heinvpricedetil where price_id=C.heinv_lastpriceid and heinv_id=A.heinv_id), 0) as heinv_issp,
						
						C.heinv_lastcost,
						C.season_id,

						C.heinv_hscode_ship,
						C.heinv_hscode_ina,

						C.heinv_gender
						
					from cache_invsum A inner join master_heinv C on C.heinv_id = A.heinv_id
										inner join master_heinvitem D on D.heinv_id = C.heinv_id
					where 
						A.region_id = :region_id 
					and A.BLOCK='BRAND';				
				";



				$stmt = $this->db_frm->prepare($sql);
				$stmt->execute([':region_id' => $region_id]);
				$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);		
				foreach ($rows as $row) {
					// $this->log($row);

					$heinv_id = $row['heinv_id'];
					$heinv_gender = $row['heinv_gender'];

					$heinvctg_class = $row['heinvctg_class'];
					$stmt_ctgmap->execute([':brand_id' => $brand_id, ':code'=>$heinvctg_class]);
					$row_ctgmap = $stmt_ctgmap->fetch(\PDO::FETCH_ASSOC);
					if ($row_ctgmap==null) {
						throw new \Exception("Map kategori belum didefinisikan untuk $heinvctg_class, $heinv_id");
					}

					$merchitemctg_id = $row_ctgmap['merchitemctg_id'];



					$season_id = $row['season_id'];
					$stmt_seamap->execute([':code'=>$season_id]);
					$row_seamap = $stmt_seamap->fetch(\PDO::FETCH_ASSOC);		
					$merchsea_id = $row_seamap['merchsea_id'];
					if ($row_ctgmap==null) {
						throw new \Exception("Map Season belum didefinisikan untuk $season_id");
					}


					$merchitemvar_id = $this->insert_merchitemvar($stmt_merchitemvar, $row, $userdata);
					$merchitem_id = $this->insert_item($row, $dept_id, $itemclass_id, $stmt_item, $userdata);



					$key = new \stdClass;
					$key->merchitem_id = $row['heinvitem_id'];

					$obj = new \stdClass;
					$obj->merchitem_id = $row['heinvitem_id'];
					$obj->merchitem_name = $row['heinv_name'];
					$obj->merchitem_art = $row['heinv_art'];
					$obj->merchitem_mat = $row['heinv_mat'];
					$obj->merchitem_col = $row['heinv_col'];
					$obj->merchitem_size = $row['heinvitem_size'];
					$obj->merchitemctg_id = $merchitemctg_id;
					$obj->merchsea_id = $merchsea_id;

					$obj->merchitem_priceori = $row['heinv_priceori'];
					$obj->merchitem_price = $row['heinv_price01'];
					$obj->merchitem_issp = $row['heinv_issp'];
					$obj->merchitem_disc = (int)$row['heinv_pricedisc01'];

					$obj->merchitem_discval = ($obj->merchitem_disc/100) * $obj->merchitem_price;
					$obj->merchitem_pricenett =  $obj->merchitem_price - $obj->merchitem_discval;

					$obj->merchitem_lastcogs = $row['heinv_lastcost'];
					$obj->merchitem_lastcogsdt = '2021-12-31';

					$obj->brand_id = $brand_id;

					$obj->merchitemvar_id = $merchitemvar_id;
					$obj->merchitem_hscodeship = $row['heinv_hscode_ship'];	
					$obj->merchitem_hscode = $row['heinv_hscode_ina'];
					$obj->gender_id = array_key_exists($heinv_gender, $gender_maps) ? $gender_maps[$heinv_gender] : 'U'; 


					$tablename = "mst_merchitem";
					$stmt_check_exist->execute([
						':merchitem_id' => $obj->merchitem_id
					]);
					$rows_check = $stmt_check_exist->fetchall(\PDO::FETCH_ASSOC);
					if (count($rows_check)>0) {
						// exist
						$this->log('update ');
						$obj->_modifyby = $userdata->username;
						$obj->_modifydate = date("Y-m-d H:i:s");				
						$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
					} else {
						// not 
						$this->log('insert ');
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


	public function insert_merchitemvar($stmt_merchitemvar, $row, $userdata) {
		try {
			$merchitemvar_id = $row['heinv_id'];


			$key = new \stdClass;
			$key->merchitemvar_id = $merchitemvar_id;

			$obj = new \stdClass;
			$obj->merchitemvar_id = $merchitemvar_id;
			$obj->merchitem_art = $row['heinv_art'];
			$obj->merchitem_mat = $row['heinv_mat'];
			$obj->merchitem_col = $row['heinv_col'];

			$tablename = "mst_merchitemvar";
			$stmt_merchitemvar->execute([':merchitemvar_id'=>$merchitemvar_id]);
			$rows_merchitemvar = $stmt_merchitemvar->fetchall(\PDO::FETCH_ASSOC);		
			if (count($rows_merchitemvar)>0) {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");				
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
			} else {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
			}
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			return $merchitemvar_id;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function insert_item($row, $dept_id, $itemclass_id, $stmt_item, $userdata) {
		try {
			$item_id = $row['heinvitem_id'];

			$key = new \stdClass;
			$key->item_id = $item_id;

			$name = $row['heinv_art'] . '|' . $row['heinv_mat'] . '|' . $row['heinv_col'] . '|' . $row['heinvitem_size']; 

			$obj = new \stdClass;
			$obj->item_id = $item_id;
			$obj->item_name = $name;
			$obj->item_nameshort = $name;
			$obj->item_stdcost = $row['heinv_lastcost'];
			$obj->itemclass_id = $itemclass_id;
			$obj->dept_id = $dept_id;
			

			$tablename = "mst_item";
			$stmt_item->execute([':item_id'=>$item_id]);
			$rows_item = $stmt_item->fetchall(\PDO::FETCH_ASSOC);		
			if (count($rows_item)>0) {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");				
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
			} else {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
			}
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


		} catch (\Exception $ex) {
			throw $ex;
		}
	}


};


