<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';


use \FGTA4\debug;
use \FGTA4\exceptions\WebException;

$API = new class extends merchregBase {

	public function execute(string $id, array $param) : object {
		$tablename = 'trn_merchreg';
		$primarykey = 'merchreg_id';
		$userdata = $this->auth->session_get_user();

		try {

			$sqlcat = "
				select 
				A.itemctg_id, B.itemclass_id  
				from mst_merchitemctg A inner join mst_itemclass B on B.itemclass_id = A.itemclass_id 
				where A.merchitemctg_id = :merchitemctg_id
			";			
			$stmtcat = $this->db->prepare($sqlcat);

			$merchreg_id = $id;
			$header = (array)$this->get_header_row($id);  print_r($header);
			$sql = "select * from trn_merchregitem where merchreg_id=:merchreg_id ";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':merchreg_id' => $merchreg_id,
			]);
			$rows = $stmt->fetchall();
			foreach ($rows as $item) {
				$merchitemctg_id = $item['merchitemctg_id'];

				$stmtcat->execute([':merchitemctg_id' => $merchitemctg_id]);
				$rowcat = $stmtcat->fetch();
				$item['itemctg_id'] = $rowcat['itemctg_id'];
				$item['itemclass_id'] = $rowcat['itemclass_id'];

				
				if ($header['interface_id']!=null) {

					$barcode = $item['merchitem_barcode'];
					$itemstock_id = $item['merchitem_refitem'];
					$brand_id = $header['brand_id'];
					
					$item['itemstock_id'] = $itemstock_id;
					$item['merchitem_id'] = $itemstock_id;
					$item['brand_id'] = $brand_id;


					// buat itemstock
					$sqlci = "select * from mst_itemstock where itemstock_id = :itemstock_id";
					$stmtci = $this->db->prepare($sqlci);
					$stmtci->execute([':itemstock_id'=>$itemstock_id]);
					$rowci = $stmtci->fetch();
					if ($rowci==null) {
						$this->createItemStock($item, $header);
					} 

					// buat itemstock barcode
					$sqlbar = "
						select * from mst_itemstockbarcode 
						where 
						brand_id=:brand_id and itemstockbarcode_text=:barcode
					";
					$stmtbar = $this->db->prepare($sqlbar);
					$stmtbar->execute([
						':brand_id'=>$brand_id,
						':barcode'=>$barcode
					]);
					$rowbar = $stmtbar->fetch();
					if ($rowbar==null) {
						$this->createItemStockbarcode($itemstock_id, $item, $header);	
					}	

					
					// buat mercharticle
					$sqlma = "
						select mercharticle_id from mst_mercharticle
						where
						brand_id=:brand_id and mercharticle_art=:art and mercharticle_mat=:mat
					";
					$stmtma = $this->db->prepare($sqlma);
					$stmtma->execute([
						':brand_id'=>$brand_id,
						':art'=>$item['merchitem_art'],
						':mat'=>$item['merchitem_mat']
					]);
					$rowma = $stmtma->fetch();
					if ($rowma==null) {
						// buat merchitem
						$item['mercharticle_id'] = $this->createMerchArticle($item, $header);
					} else {
						$item['mercharticle_id'] = $rowma['mercharticle_id'];
					}


					// buat merchitem
					$sqlmi = "
						select merchitem_id from mst_merchitem
						where
						merchitem_id = :merchitem_id
					";
					$stmtmi = $this->db->prepare($sqlmi);
					$stmtmi->execute([
						':merchitem_id' => $item['itemstock_id']
					]);
					$rowmi = $stmtmi->fetch();
					if ($rowmi==null) {
						$this->createMerchArticleItem($item, $header);
					}



					// update balik ke mst_merchregitem
					$this->updateMerchRegItem($item);					


				} else {
					
				}

			}

			return new \stdClass;
		} catch (\Exception $ex) {
			throw $ex;
		}

	}

	public function createItemStock(array &$item, array $header) : object {
		try {

			// $art = $item['merchitem_art'];
			// $mat = $item['merchitem_mat'];
			// $col = $item['merchitem_col'];
			// $size = $item['merchitem_size'];

			// $codes = [];
			// if (!empty($art)) { $codes[] = $art; }
			// if (!empty($mat)) { $codes[] = $mat; }
			// if (!empty($col)) { $codes[] = $col; }
			// if (!empty($size)) { $codes[] = $size; }
			

			$obj = new \stdClass;
			$obj->itemstock_id = $item['merchitem_refitem'];
			$obj->itemstock_code = $item['merchitem_combo'];
			$obj->itemstock_name = $item['merchitem_name'];
			$obj->itemstock_nameshort = $item['merchitem_labelname'];
			$obj->itemstock_descr = $item['merchitem_descr'];
			$obj->unitmeasurement_id = 'PCS';
			$obj->itemstock_isdisabled = 1;
			$obj->itemstock_ishascompound = 0;
			$obj->itemstock_issellable = 1;
			$obj->itemstock_weight = $item['merchitem_weight'];
			$obj->itemstock_length = $item['merchitem_length'];
			$obj->itemstock_width = $item['merchitem_width'];
			$obj->itemstock_height = $item['merchitem_height'];
			$obj->itemctg_id = $item['itemctg_id'];
			$obj->itemclass_id = $item['itemclass_id'];
			$obj->unit_id = $item['unit_id'];
			$obj->dept_id = $item['dept_id'];
			$obj->itemstock_uploadbatchcode = $item['merchregitem_id'];
			$obj->_createby = $item['_createby'];
			$obj->_createdate = $item['_createdate'];
			
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_itemstock", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			return $obj;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function createItemStockbarcode(string $itemstock_id, array &$item, array $header) : object {
		try {
			$obj = new \stdClass;
			$obj->itemstockbarcode_id = uniqid();
			$obj->itemstockbarcode_text = $item['merchitem_barcode'];
			$obj->brand_id = $item['brand_id'];
			$obj->itemstock_id = $item['merchitem_refitem'];
			$obj->_createby = $item['_createby'];
			$obj->_createdate = $item['_createdate'];

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_itemstockbarcode", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			return $obj;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function createMerchArticle(array &$item, array $header) : string {
		$mercharticle_id = uniqid();

		try {
			$obj = new \stdClass;
			$obj->mercharticle_id = $mercharticle_id;
			$obj->mercharticle_art = $item['merchitem_art'];
			$obj->mercharticle_mat = $item['merchitem_mat'];
			$obj->mercharticle_matname = $item['merchitem_mat'];
			$obj->mercharticle_isdisabled = 1;
			$obj->mercharticle_name = $item['merchitem_name'];
			$obj->mercharticle_descr = $item['merchitem_descr'];
			$obj->unit_id = $item['unit_id'];
			$obj->dept_id = $item['dept_id'];
			$obj->brand_id = $item['brand_id'];
			$obj->itemstock_id = $item['itemstock_id'];
			$obj->_createby = $item['_createby'];
			$obj->_createdate = $item['_createdate'];
						
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_mercharticle", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			return $mercharticle_id;
		} catch (\Exception $ex) {
			throw $ex;
		}

	}

	public function createMerchArticleItem(array &$item, array $header) : object {
		try {
			$obj = new \stdClass;
			$obj->merchitem_id = $item['itemstock_id'];
			$obj->itemstock_id = $item['itemstock_id'];
			$obj->merchitem_art = $item['merchitem_art'];
			$obj->merchitem_mat = $item['merchitem_mat'];
			$obj->merchitem_col = $item['merchitem_col'];
			$obj->merchitem_size = $item['merchitem_size'];
			$obj->merchitem_combo = $item['merchitem_combo'];
			$obj->merchitem_name = $item['merchitem_name'];
			$obj->merchitem_descr = $item['merchitem_descr'];
			$obj->merchitem_colnum = $item['merchitem_colnum'];
			$obj->merchitem_isdisabled = 1;
			$obj->merchitem_pcpline = $item['merchitem_pcpline'];
			$obj->merchitem_pcpgroup = $item['merchitem_pcpgroup'];
			$obj->merchitem_pcpcategory = $item['merchitem_pcpcategory'];
			$obj->merchitem_colorcode = $item['merchitem_colorcode'];
			$obj->merchitem_colordescr = $item['merchitem_colordescr'];
			$obj->merchitem_gender = $item['merchitem_gender'];
			$obj->merchitem_fit = $item['merchitem_fit'];
			$obj->merchitem_hscodeship = $item['merchitem_hscodeship'];
			$obj->merchitem_hscodeina = $item['merchitem_hscodeina'];
			$obj->merchitem_gtype = $item['merchitem_gtype'];
			$obj->merchitem_labelname = $item['merchitem_labelname'];
			$obj->merchitem_labelproduct = $item['merchitem_labelproduct'];
			$obj->merchitem_bahan = $item['merchitem_bahan'];
			$obj->merchitem_pemeliharaan = $item['merchitem_pemeliharaan'];
			$obj->merchitem_logo = $item['merchitem_logo'];
			$obj->merchitem_dibuatdi = $item['merchitem_dibuatdi'];
			$obj->merchitem_width = $item['merchitem_width'];
			$obj->merchitem_length = $item['merchitem_length'];
			$obj->merchitem_height = $item['merchitem_height'];
			$obj->merchitem_weight = $item['merchitem_weight'];
			$obj->merchitemctg_id = $item['merchitemctg_id'];
			$obj->merchsea_id = $header['merchsea_id'];
			$obj->unit_id = $item['unit_id'];
			$obj->dept_id = $item['dept_id'];
			$obj->brand_id = $item['brand_id'];
			$obj->mercharticle_id = $item['mercharticle_id'];
			$obj->merchregitem_id = $item['merchregitem_id'];
			$obj->_createby = $item['_createby'];
			$obj->_createdate = $item['_createdate'];

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_merchitem", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			return $obj;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function updateMerchRegItem(array &$item) {
		try {
			$obj = new \stdClass;
			$obj->merchregitem_id = $item['merchregitem_id'];
			$obj->merchitem_id = $item['itemstock_id'];


			$keys = new \stdClass;
			$keys->merchregitem_id = $obj->merchregitem_id;

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate("trn_merchregitem", $obj, $keys);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);



		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};