<?php namespace FGTA4;


class SyncRegister extends syncBase {
	protected $url;

	private $stmt_head_del;
	private $stmt_head_ins;
	private $stmt_items_del;
	private $stmt_items_ins;
	
	private $head_param_keys;
	private $items_param_keys;



	function __construct(array $cfg) {
		parent::__construct($cfg);

		$this->url = $cfg['url'];
		$this->stmt_head_del = $this->createStatementHeadDel();
		$this->stmt_items_del = $this->createStatementItemsDel();
	}


	public function Sync(string $merchsync_id, string $merchsync_doc, string $merchsync_type ) : void {
		try {
			// ambil data dari URL
			$id = $merchsync_doc;
			if ($merchsync_type!='REG') {
				throw new \Exception("Type Sync $merchsync_type tidak sesuai dengan REG"); 
			}

			$endpoint = $this->url . '/getregister.php?id='. $id;
			$data = $this->getDataFromUrl($endpoint);

			// struktur
			// array $data['header']
			// array $data['items']
			$heinvregister_id = $data['header']['heinvregister_id'];
			$this->deleteRegData($heinvregister_id);
			$this->copyToTempRegHeader($data['header']);
			$this->copyToTempRegItems($data['items']);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function createStatementHeadDel() : object {
		$sqldel = "delete from tmp_heinvregister where heinvregister_id = :heinvregister_id";
		$stmt = $this->rptdb->prepare($sqldel);
		return $stmt;
	}

	function createStatementItemsDel() : object {
		$sqldel = "delete from tmp_heinvregisteritem where heinvregister_id = :heinvregister_id";
		$stmt = $this->rptdb->prepare($sqldel);
		return $stmt;
	}

	function deleteRegData($heinvregister_id) : void {
		try {
			$this->stmt_head_del->execute([
				':heinvregister_id' => $heinvregister_id
			]);

			$this->stmt_items_del->execute([
				':heinvregister_id' => $heinvregister_id
			]);
		} catch (\Exception $ex) {
			throw new \Exception("DELETE: ".$ex->getMessage());
		}
	}

	function copyToTempRegHeader(array $row) : void {
		try {
			if ($this->stmt_head_ins==null) {
				$obj = new \stdClass;
				$obj->heinvregister_id = $row['heinvregister_id'];
				$obj->heinvregister_date = $row['heinvregister_date'];
				$obj->heinvregister_descr = $row['heinvregister_descr'];
				$obj->heinvregister_issizing = $row['heinvregister_issizing'];
				$obj->heinvregister_isposted = $row['heinvregister_isposted'];
				$obj->heinvregister_isgenerated = $row['heinvregister_isgenerated'];
				$obj->heinvregister_isseasonupdate = $row['heinvregister_isseasonupdate'];
				$obj->heinvregister_createby = $row['heinvregister_createby'];
				$obj->heinvregister_createdate = $row['heinvregister_createdate'];
				$obj->heinvregister_modifyby = $row['heinvregister_modifyby'];
				$obj->heinvregister_modifydate = $row['heinvregister_modifydate'] ?  $row['heinvregister_modifydate'] : null;
				$obj->heinvregister_postby = $row['heinvregister_postby'];
				$obj->heinvregister_postdate = $row['heinvregister_postdate'] ? $row['heinvregister_postdate'] : null;
				$obj->heinvregister_generateby = $row['heinvregister_generateby'];
				$obj->heinvregister_generatedate = $row['heinvregister_generatedate'] ? $row['heinvregister_generatedate'] : null;
				$obj->region_id = $row['region_id'];
				$obj->branch_id = $row['branch_id'];
				$obj->season_id = $row['season_id'];
				$obj->rekanan_id = $row['rekanan_id'];
				$obj->currency_id = $row['currency_id'];
				$obj->rowid = $row['rowid'];
				$obj->heinvregister_type = $row['heinvregister_type'];

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("tmp_heinvregister", $obj);
				$this->stmt_head_ins = $this->rptdb->prepare($cmd->sql);
				$this->stmt_head_ins->execute($cmd->params);

				$this->head_param_keys = [];
				foreach ($obj as $key => $value) {
					$this->head_param_keys[] = $key;
				}

			} else {
				$params = [];
				foreach ($this->head_param_keys as $key) {
					$params[":".$key] = $row[$key];
					if (in_array($key, ["heinvregister_modifydate", "heinvregister_postdate", "heinvregister_generatedate"])) {
						$params[":".$key] = $row[$key] ? $row[$key] : null;
					} 
				}
				$this->stmt_head_ins->execute($params);
			}
		} catch (\Exception $ex) {
			throw new \Exception("HEADER: ".$ex->getMessage());
		}
	}

	function copyToTempRegItems(array $rows) : void {
		try {
			foreach ($rows as $row) {
				if ($this->stmt_items_ins==null) {
					$obj = new \stdClass;
					$obj->heinvregister_id = $row['heinvregister_id'];
					$obj->heinvregisteritem_line = $row['heinvregisteritem_line'];
					$obj->heinv_id = $row['heinv_id'];
					$obj->heinv_art = $row['heinv_art'];
					$obj->heinv_mat = $row['heinv_mat'];
					$obj->heinv_col = $row['heinv_col'];
					$obj->heinv_size = $row['heinv_size'];
					$obj->heinv_barcode = $row['heinv_barcode'];
					$obj->heinv_name = $row['heinv_name'];
					$obj->heinv_descr = $row['heinv_descr'];
					$obj->heinv_box = $row['heinv_box'];
					$obj->heinv_gtype = $row['heinv_gtype'];
					$obj->heinv_produk = $row['heinv_produk'];
					$obj->heinv_bahan = $row['heinv_bahan'];
					$obj->heinv_pemeliharaan = $row['heinv_pemeliharaan'];
					$obj->heinv_logo = $row['heinv_logo'];
					$obj->heinv_dibuatdi = $row['heinv_dibuatdi'];
					$obj->heinv_other1 = $row['heinv_other1'];
					$obj->heinv_other2 = $row['heinv_other2'];
					$obj->heinv_other3 = $row['heinv_other3'];
					$obj->heinv_other4 = $row['heinv_other4'];
					$obj->heinv_other5 = $row['heinv_other5'];
					$obj->heinv_other6 = $row['heinv_other6'];
					$obj->heinv_other7 = $row['heinv_other7'];
					$obj->heinv_other8 = $row['heinv_other8'];
					$obj->heinv_other9 = $row['heinv_other9'];
					$obj->heinv_plbname = $row['heinv_plbname'];
					$obj->heinvitem_colnum = $row['heinvitem_colnum'];
					$obj->heinvgro_id = $row['heinvgro_id'];
					$obj->heinvctg_id = $row['heinvctg_id'];
					$obj->heinvctg_sizetag = $row['heinvctg_sizetag'];
					$obj->branch_id = $row['branch_id'];
					$obj->C00 = $row['C00'];
					$obj->heinv_isweb = $row['heinv_isweb'];
					$obj->heinv_webdescr = $row['heinv_webdescr'];
					$obj->invcls_id = $row['invcls_id'];
					$obj->heinv_hscode_ship = $row['heinv_hscode_ship'];
					$obj->heinv_hscode_ina = $row['heinv_hscode_ina'];
					$obj->heinv_weight = $row['heinv_weight'];
					$obj->heinv_length = $row['heinv_length'];
					$obj->heinv_width = $row['heinv_width'];
					$obj->heinv_height = $row['heinv_height'];
					$obj->heinv_price = $row['heinv_price'];

					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("tmp_heinvregisteritem", $obj);
					$this->stmt_items_ins = $this->rptdb->prepare($cmd->sql);
					$this->stmt_items_ins->execute($cmd->params);
	
					$this->items_param_keys = [];
					foreach ($obj as $key => $value) {
						$this->items_param_keys[] = $key;
					}
				} else {
					$params = [];
					foreach ($this->items_param_keys as $key) {
						$params[":".$key] = $row[$key];
						// if (in_array($key, ["heinvregister_modifydate", "heinvregister_postdate", "heinvregister_generatedate"])) {
						// 	$params[":".$key] = $row[$key] ? $row[$key] : null;
						// } 
					}
					$this->stmt_items_ins->execute($params);
				}
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}	

}