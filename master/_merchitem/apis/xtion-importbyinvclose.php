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


			// $this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			// $this->db->beginTransaction();

			try {

				$region_id = $param->region_id;
				$ym = $param->ym;

				$unit_maps = [
					'03700' => 'FKP',
					'01100' => 'HBS',
					'01110' => 'HBS',
					'02600' => 'FLA',
					'03400' => 'GEX',
					'00900' => 'EAG',
					'01400' => 'CAN'
				];



				$brand_maps = [
					'03700' => 'FKP',
					'01100' => 'HBS',
					'01110' => 'HBS',
					'02600' => 'FLA',
					'03400' => 'GEX',
					'00900' => 'EAG',
					'01400' => 'CAN'
				];


				$dept_maps = [
					'03700' => 'FKP',
					'01100' => 'HBS',
					'01110' => 'HBS',
					'02600' => 'FLA',
					'03400' => 'GEX',
					'00900' => 'EAG',
					'01400' => 'CAN'
				];

				$itemclass_maps = [
					'03700' => '6221db2b9bf88',
					'01100' => '6221da2c85daa',
					'01110' => '6221da2c85daa',
					'02600' => '6221daf95d10d',
					'03400' => '6221db9ac9fd7',
					'00900' => '6221daafad5ef',
					'01400' => '6221da66c1af6'
				];

				$gender_maps = [
					'M' => 'M',
					'W' => 'F'
				];


				// entity mapping	
				$unit_id = $unit_maps[$region_id]; 
				$brand_id = $brand_maps[$region_id]; 
				$dept_id = $dept_maps[$region_id]; 
				$itemclass_id = $itemclass_maps[$region_id];


				// prepare untuk cek region
				$sql = "
					select 
					A.merchitemctg_id, A.itemctg_id 
					from mst_merchitemctg A inner join mst_merchitemctgref B on B.merchitemctg_id=A.merchitemctg_id
					where 
					A.brand_id=:brand_id and B.interface_id='TB' and B.merchitemctgref_code=:code
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
					select itemstock_id from mst_itemstock
					where
					itemstock_id = :itemstock_id
				";
				$stmt_itemstock = $this->db->prepare($sql);


				// prepare untuk ambil size
				$sql = "
					select heinvitem_size, heinvitem_colnum, heinvitem_barcode
					from
					master_heinvitem
					where
					heinv_id = :heinv_id
				";
				$stmt_size = $this->db_frm->prepare($sql);


				// prepare cek barcode
				$sql = "
					select merchitem_id
					from mst_merchitembarcode
					where
					brand_id = :brand_id and merchitembarcode_text = :barcode
				";
				$stmt_barcode = $this->db->prepare($sql);


				// premare map to site dept
				$sql = "
					select 
					A.site_id, B.dept_id 
					from
					mst_sitemapping A inner join mst_siteunit B on B.unit_id = A.unit_id and B.site_id = A.site_id 
					WHERE 
						A.sitemapping_mapfrom  = :sitemapping_mapfrom
					and B.unit_id = :unit_id
				";
				$stmt_site = $this->db->prepare($sql);



				$saldoparam = new \stdClass;
				$saldoparam->periodemo_id = $ym;
				$saldoparam->unit_id = $unit_id;

				$this->resetsaldo($saldoparam, $userdata);


				return;

				$SITE_ERROR = [];
				$CTG_ERROR = [];
				$i = 0;
				$sql = $this->getSqlItemInventory();
				$stmt = $this->db_frm->prepare($sql);
				$stmt->execute([':region_id' => $region_id, ':ym'=>$ym]);
				$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);		
				$total = count($rows);
				foreach ($rows as $row) {
					$i++;
					$p = round(($i/$total)*100, 2);

					$heinv_id = $row['heinv_id'];
					$branch_id = $row['branch_id'];
					$branch_name = $row['branch_name'];
					$stmt_size->execute([':heinv_id'=>$heinv_id]);
					$rows_size = $stmt_size->fetchall(\PDO::FETCH_ASSOC);


					$mapfrom =  $region_id . ':' . $branch_id;
					$stmt_site->execute([
						':sitemapping_mapfrom' => $mapfrom,
						':unit_id' => $unit_id
					]);
					$row_site = $stmt_site->fetch(\PDO::FETCH_ASSOC);
					if ($row_site==null) {
						if (!array_key_exists($mapfrom, $SITE_ERROR)) {
							$SITE_ERROR[$mapfrom] = "$unit_id $branch_name";
						}
						$this->log("Map Site NotFound: $mapfrom - $unit_id $branch_name", false);
						continue;
					}
					$site_id = $row_site['site_id'];
					$dept_id = $row_site['dept_id'];


					foreach ($rows_size as $row_size) {
						// $this->log($row_size, false);

						$heinv_gender = $row['heinv_gender'];

						$heinvitem_size = $row_size['heinvitem_size'];
						$heinvitem_colnum = $row_size['heinvitem_colnum'];
						$heinvitem_barcode = $row_size['heinvitem_barcode'];
						$heinvitem_id = substr($heinv_id, 0, 11) . $heinvitem_colnum;
						$row['heinvitem_id'] = $heinvitem_id;
						$row['heinvitem_size'] = $heinvitem_size;
						$row['heinvitem_barcode'] = $heinvitem_barcode;

						$qty = 0;
						$colname = "C" . $heinvitem_colnum;
						if (array_key_exists($colname, $row)) {
							$qty = $row[$colname];
						}

						$heinv_group1 = $row['heinv_group1'];
						$heinv_group2 = $row['heinv_group2'];
						$heinvctg_class = $row['heinvctg_class'];
						$invcls_name = $row['invcls_name'];

						// $this->log("--> " . $heinvctg_class, false);

						$stmt_ctgmap->execute([
							':brand_id' => $brand_id, ':code'=>$heinvctg_class
						]);
						$row_ctgmap = $stmt_ctgmap->fetch(\PDO::FETCH_ASSOC);
						if ($row_ctgmap==null) {
							// throw new \Exception("Map kategori belum didefinisikan untuk $heinvctg_class, $heinv_id");

							$alt_heinvctg_class = $heinv_group1 . ' - ' . $heinv_group2;
							$stmt_ctgmap->execute([
								':brand_id' => $brand_id, ':code'=>$alt_heinvctg_class
							]);
							$row_ctgmap = $stmt_ctgmap->fetch(\PDO::FETCH_ASSOC);
							if ($row_ctgmap==null) {
							
								$stmt_ctgmap->execute([
									':brand_id' => $brand_id, ':code'=>$invcls_name
								]);
								$row_ctgmap = $stmt_ctgmap->fetch(\PDO::FETCH_ASSOC);
								if ($row_ctgmap==null) {

									$this->log("Map Ctg NotFound: $heinvctg_class ($alt_heinvctg_class), $heinv_id", false);

									$CTG_ERROR[$heinvctg_class] = 1;
									if (!array_key_exists($alt_heinvctg_class, $CTG_ERROR)) {
										$CTG_ERROR[$alt_heinvctg_class] = [];
									}
									$CTG_ERROR[$alt_heinvctg_class][$heinv_id] = 1;
									
									continue;

								}
							
							

							}
						}
						$merchitemctg_id = $row_ctgmap['merchitemctg_id'];
						$itemctg_id = $row_ctgmap['itemctg_id'];
						

						$season_id = $row['season_id'];
						$stmt_seamap->execute([':code'=>$season_id]);
						$row_seamap = $stmt_seamap->fetch(\PDO::FETCH_ASSOC);		
						$merchsea_id = $row_seamap['merchsea_id'];
						if ($row_ctgmap==null) {
							$this->log("Map Season belum didefinisikan untuk $season_id");
							throw new \Exception("Map Season belum didefinisikan untuk $season_id");
						}

						$merchitemvar_id = $this->insert_merchitemvar($stmt_merchitemvar, $row, $userdata);
						$merchitem_id = $this->insert_itemstock($row, $dept_id, $itemclass_id, $itemctg_id, $stmt_itemstock, $userdata);
	

						$key = new \stdClass;
						$key->merchitem_id = $merchitem_id;
	
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
							$obj->_modifyby = $userdata->username;
							$obj->_modifydate = date("Y-m-d H:i:s");				
							$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
						} else {
							// not 
							$obj->_createby = $userdata->username;
							$obj->_createdate = date("Y-m-d H:i:s");
							$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
						}
	

						
						$this->log("$brand_id $dept_id $heinvitem_id # $merchitemctg_id # $itemctg_id -> " . $qty , false);
						echo "\r Progress: $p%\r";


						$stmtupdate = $this->db->prepare($cmd->sql);
						$stmtupdate->execute($cmd->params);



						 // insert barcode kalau belum ada
						$stmt_barcode->execute([':brand_id'=>$brand_id, ':barcode'=>$heinvitem_barcode]);
						$rows_barcode = $stmt_barcode->fetchall(\PDO::FETCH_ASSOC);
						if (count($rows_barcode)>0) {
							$merchitem_id_barcode = $rows_barcode[0]['merchitem_id'];
							if ($merchitem_id_barcode!=$merchitem_id) {
								$this->log("Barcode Duplikat. Code '$heinvitem_barcode' telah terdaftar di '$merchitem_id'.");
								throw new \Exception("Barcode Duplikat. Code '$heinvitem_barcode' telah terdaftar di '$merchitem_id'.");
							}
						} else {
							$obj = new \stdClass;
							$obj->merchitembarcode_id = \uniqid();
							$obj->merchitembarcode_text = $heinvitem_barcode;
							$obj->brand_id = $brand_id;
							$obj->merchitem_id = $merchitem_id;
							$obj->_createby = $userdata->username;
							$obj->_createdate = date("Y-m-d H:i:s");
							$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_merchitembarcode", $obj);

							$stmtupdate = $this->db->prepare($cmd->sql);
							$stmtupdate->execute($cmd->params);
						}



						// insert saldo
						



					}	

				}


				// Insert Saldo Akhir Periode
				// $sql = "select * from mst_itemstockunitsaldo where unit_id=:unit_id and periode_id=:periode_id";
				// $stmt = $this->db->prepare($cmd->sql);
				// $stmt->execute($cmd->params);


				$obj = new \stdClass;



				if (count($CTG_ERROR)>0) {
					$this->log("\r\n\r\n\r\nKATEGORI TIDAK KETEMU\r\n==================\r\n", false);
					// $this->log($CTG_ERROR);
					
					$HEINV = array();
					foreach ($CTG_ERROR as $ctg=>$data) {
						$this->log(\strtoupper($ctg), false);
						if (is_array($data)) {
							foreach ($data as $hid=>$val) {
								$HEINV[$hid] = 1;
							}
						}
					}

					$this->log("\r\n\r\n", false);
					foreach ($HEINV as $hid=>$val) {
						$this->log($hid, false);
					}



				} else if (count($SITE_ERROR)>0) {
					$this->log("\r\n\r\n\r\nSITE TIDAK KETEMU\r\n==================\r\n", false);
					foreach ($SITE_ERROR as $mapid=>$mapinfo) {
						$this->log("$mapid - $mapinfo", false);
					}

				} else {
					$this->log("\r\n\r\n\r\nDONE.", false);

				}	


				// $this->db->commit();
				return (object)[
					'success' => true,
				];

				
			} catch (\Exception $ex) {
				// $this->db->rollBack();
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

	function insert_itemstock($row, $dept_id, $itemclass_id, $itemctg_id, $stmt_itemstock, $userdata) {
		try {
			$itemstock_id = $row['heinvitem_id'];

			$key = new \stdClass;
			$key->itemstock_id = $itemstock_id;

			$name = $row['heinv_art'] . '|' . $row['heinv_mat'] . '|' . $row['heinv_col'] . '|' . $row['heinvitem_size']; 

			$obj = new \stdClass;
			$obj->itemstock_id = $itemstock_id;
			$obj->itemstock_name = $name;

			$obj->itemctg_id = $itemctg_id;
			$obj->itemclass_id = $itemclass_id;
			$obj->dept_id = $dept_id;

			$tablename = "mst_itemstock";
			$stmt_itemstock->execute([':itemstock_id'=>$itemstock_id]);
			$rows_itemstock = $stmt_itemstock->fetchall(\PDO::FETCH_ASSOC);		
			if (count($rows_itemstock)>0) {
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date("Y-m-d H:i:s");				
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
			} else {
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
			}

			// $this->log($cmd->params, false);

			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			return $itemstock_id;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function resetsaldo($saldoparam, $userdata) {
		try {
		
			$periodemo_id = $saldoparam->periodemo_id;
			$unit_id = $saldoparam->unit_id;


			// ambil informasi master saldo saat ini
			$sql = "
				select * from mst_periodemo 
				where periodemo_id=:periodemo_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':periodemo_id'=>$periodemo_id]);
			$row_periode_curr = $stmt->fetch(\PDO::FETCH_ASSOC);
		

			// ambil informasi periode berikutnya
			$sql = "
				select * from mst_periodemo 
				where periodemo_prev=:periodemo_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':periodemo_id'=>$periodemo_id]);
			$row_periode_next = $stmt->fetch(\PDO::FETCH_ASSOC);




			// hapus saldo dari trn_itemstockmoving yang itemmvmodel_id='SALDO' dan periodemo_id = :periode_id_next dan unit_id = :unit_id;
			$periode_id_next = $row_periode_next['periodemo_id'];
			$sql = "
				delete from trn_itemstockmoving 
				where 
				itemmvmodel_id='SALDO' and periodemo_id=:periodemo_id and unit_id=:unit_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':periodemo_id'=>$periode_id_next, ':unit_id'=>$unit_id]);



			// hapus saldo dari trn mst_itemstocksaldo periodemo_id = :periode_id dan unit_id = :unit_id
			$sql = "
				delete from mst_itemstocksaldo
				where
				periodemo_id=:periodemo_id and unit_id=:unit_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':periodemo_id'=>$periodemo_id, ':unit_id'=>$unit_id]);


			// hapus saldo mst_itemstockunitclose  periodemo_id = :periode_id dan unit_id = :unit_id
			$sql = "
				delete from mst_itemstockunitclose
				where
				periodemo_id=:periodemo_id and unit_id=:unit_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':periodemo_id'=>$periodemo_id, ':unit_id'=>$unit_id]);



			$itemstockunitclose_id = \uniqid();

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function getSqlItemInventory() {
		return "
			
			select
			A.region_id,
			A.branch_id,
			(select branch_name from master_branch where branch_id=A.branch_id) as branch_name,
			B.heinv_id,
			C.heinv_name,
			C.heinv_art,
			C.heinv_mat,
			C.heinv_col,
			C.heinvctg_id,
			(select heinvctg_class from master_heinvctg where heinvctg_id=C.heinvctg_id) as heinvctg_class,
			(select invcls_name from master_invcls where invcls_id = C.invcls_id) as invcls_name,
			C.heinv_group1,
			C.heinv_group2,

			C.heinv_priceori,
			C.heinv_price01,
			C.heinv_pricedisc01,
			isnull((
				select top 1 heinv_issp from transaksi_heinvpricedetil 
				where 
				price_id=C.heinv_lastpriceid and heinv_id=B.heinv_id 
				order by pricedetil_line desc), 0
				) as heinv_issp,
			C.heinv_lastcost,
			C.season_id,
			
			C.heinv_hscode_ship,
			C.heinv_hscode_ina,
			
			C.heinv_gender,
			
			B.C01, B.C02, B.C03, B.C04, B.C05,
			B.C06, B.C07, B.C08, B.C09, B.C10,
			B.C11, B.C12, B.C13, B.C14, B.C15,
			B.C16, B.C17, B.C18, B.C19, B.C20,
			B.C21, B.C22, B.C23, B.C24, B.C25
			
			from transaksi_hesaldo A inner join transaksi_hesaldodetil B on B.saldo_id=A.saldo_id
									inner join master_heinv C on C.heinv_id=B.heinv_id
			
			where
				A.region_id = :region_id
			and left(A.saldo_id, 6) = :ym

		
		";
	}


};


