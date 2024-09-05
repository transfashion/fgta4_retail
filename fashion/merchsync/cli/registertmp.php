<?php namespace FGTA4;




class RegisterTmp extends syncBase {

	private array $cfg;
	private $db;

	function __construct(array $cfg) {
		$this->url = $cfg['url'];
		$this->db = $cfg['db'];

		$this->stmtHead = $this->createStmtHead();
		$this->stmtItem = $this->createStmtItem();

	}


	function clear(string $id) : void {
		try {
			$stmt_delitems = $this->db->prepare("delete from tmp_heinvregitem where heinvreg_id = :heinvreg_id");
			$stmt_delheads = $this->db->prepare("delete from tmp_heinvreg where heinvreg_id = :heinvreg_id");
			$stmt_delitems->execute([':heinvreg_id' => $id]);
			$stmt_delheads->execute([':heinvreg_id' => $id]);
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function copy(string $id) : void {
		try {
			$data =  $this->getDataFromUrl($this->url . '/getregister.php?id='. $id);

			$merchreg_id = $data['header']['heinvregister_id'];

			// cek apakah data sudah ada
			$sql = "select * from tmp_heinvreg where heinvreg_id = :heinvreg_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':heinvreg_id' => $merchreg_id]);
			$row = $stmt->fetch();

			if ($row!=null) {
				echo "\n\nhapus data dulu\n";
			}

			if ($row!=null) {
				// data sudah ada, dihapus dulu dari temp
				$this->clear($id);
			}


			// insert header 
			$header = $data['header'];
			$this->InsertHeader($header);

			// insert items
			$items = $data['items'];
			foreach ($items as $item) {
				$this->InsertItem($item);
			}


		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function InsertHeader(array $data) {
		$this->stmtHead->execute([
			':heinvreg_id' => $data['heinvregister_id'],
			':heinvreg_date' => $data['heinvregister_date'],
			':heinvreg_descr' => $data['heinvregister_descr'],
			':heinvreg_issizing' => $data['heinvregister_issizing'],
			':heinvreg_isposted' => $data['heinvregister_isposted'],
			':heinvreg_isgenerated' => $data['heinvregister_isgenerated'],
			':heinvreg_isseasonupdate' => $data['heinvregister_isseasonupdate'],
			':heinvreg_createby' => $data['heinvregister_createby'],
			':heinvreg_createdate' => $data['heinvregister_createdate'],
			':heinvreg_modifyby' => $data['heinvregister_modifyby'],
			':heinvreg_modifydate' => $data['heinvregister_modifydate']=='' ? null : $data['heinvregister_modifydate'],
			':heinvreg_postby' => $data['heinvregister_postby'],
			':heinvreg_postdate' => $data['heinvregister_postdate'],
			':heinvreg_generateby' => $data['heinvregister_generateby'],
			':heinvreg_generatedate' => $data['heinvregister_generatedate']=='' ? null : $data['heinvregister_generatedate'],
			':heinvreg_type' => $data['heinvregister_type'],
			':region_id' => $data['region_id'],
			':branch_id' => $data['branch_id'],
			':season_id' => $data['season_id'],
			':rekanan_id' => $data['rekanan_id'],
			':currency_id' => $data['currency_id']	
		]);
		
	}

	function InsertItem(array $data) {
		$this->stmtItem->execute([
			':heinvreg_id' => $data['heinvregister_id'],
			':heinvregitem_line' => $data['heinvregisteritem_line'],
			':heinv_id' => $data['heinv_id'],
			':heinv_art' => $data['heinv_art'],
			':heinv_mat' => $data['heinv_mat'],
			':heinv_col' => $data['heinv_col'],
			':heinv_size' => $data['heinv_size'],
			':heinv_barcode' => $data['heinv_barcode'],
			':heinv_name' => $data['heinv_name'],
			':heinv_descr' => $data['heinv_descr'],
			':heinv_box' => $data['heinv_box'],
			':heinv_gtype' => $data['heinv_gtype'],
			':heinv_produk' => $data['heinv_produk'],
			':heinv_bahan' => $data['heinv_bahan'],
			':heinv_pemeliharaan' => $data['heinv_pemeliharaan'],
			':heinv_logo' => $data['heinv_logo'],
			':heinv_dibuatdi' => $data['heinv_dibuatdi'],
			':heinv_other1' => $data['heinv_other1'],
			':heinv_other2' => $data['heinv_other2'],
			':heinv_other3' => $data['heinv_other3'],
			':heinv_other4' => $data['heinv_other4'],
			':heinv_other5' => $data['heinv_other5'],
			':heinv_other6' => $data['heinv_other6'],
			':heinv_other7' => $data['heinv_other7'],
			':heinv_other8' => $data['heinv_other8'],
			':heinv_other9' => $data['heinv_other9'],
			':heinv_hscode_ship' => $data['heinv_hscode_ship'],
			':heinv_hscode_ina' => $data['heinv_hscode_ina'],
			':heinv_plbname' => $data['heinv_plbname'],
			':heinv_price' => $data['heinv_price'],
			':heinvitem_colnum' => $data['heinvitem_colnum'],
			':heinvgro_id' => $data['heinvgro_id'],
			':heinvctg_id' => $data['heinvctg_id'],
			':heinvctg_sizetag' => $data['heinvctg_sizetag'],
			':branch_id' => $data['branch_id'],
			':heinv_isweb' => $data['heinv_isweb'],
			':heinv_weight' => $data['heinv_weight'],
			':heinv_length' => $data['heinv_length'],
			':heinv_width' => $data['heinv_width'],
			':heinv_height' => $data['heinv_height'],
			':heinv_webdescr' => $data['heinv_webdescr'],
			':invcls_id' => $data['invcls_id'],
			':qty' => $data['C00']

		]);
	}


	function createStmtHead() {
		$sql = "
			insert into tmp_heinvreg
			(
				heinvreg_id,
				heinvreg_date,
				heinvreg_descr,
				heinvreg_issizing,
				heinvreg_isposted,
				heinvreg_isgenerated,
				heinvreg_isseasonupdate,
				heinvreg_createby,
				heinvreg_createdate,
				heinvreg_modifyby,
				heinvreg_modifydate,
				heinvreg_postby,
				heinvreg_postdate,
				heinvreg_generateby,
				heinvreg_generatedate,
				heinvreg_type,
				region_id,
				branch_id,
				season_id,
				rekanan_id,
				currency_id			
			)
			values
			(
				:heinvreg_id,
				:heinvreg_date,
				:heinvreg_descr,
				:heinvreg_issizing,
				:heinvreg_isposted,
				:heinvreg_isgenerated,
				:heinvreg_isseasonupdate,
				:heinvreg_createby,
				:heinvreg_createdate,
				:heinvreg_modifyby,
				:heinvreg_modifydate,
				:heinvreg_postby,
				:heinvreg_postdate,
				:heinvreg_generateby,
				:heinvreg_generatedate,
				:heinvreg_type,
				:region_id,
				:branch_id,
				:season_id,
				:rekanan_id,
				:currency_id				
			)
		";
		$stmt = $this->db->prepare($sql);
		return $stmt;
	}

	function createStmtItem() {
		$sql = "
			insert into tmp_heinvregitem
			(
				heinvreg_id,
				heinvregitem_line,
				heinv_id,
				heinv_art,
				heinv_mat,
				heinv_col,
				heinv_size,
				heinv_barcode,
				heinv_name,
				heinv_descr,
				heinv_box,
				heinv_gtype,
				heinv_produk,
				heinv_bahan,
				heinv_pemeliharaan,
				heinv_logo,
				heinv_dibuatdi,
				heinv_other1,
				heinv_other2,
				heinv_other3,
				heinv_other4,
				heinv_other5,
				heinv_other6,
				heinv_other7,
				heinv_other8,
				heinv_other9,
				heinv_hscode_ship,
				heinv_hscode_ina,
				heinv_plbname,
				heinv_price,
				heinvitem_colnum,
				heinvgro_id,
				heinvctg_id,
				heinvctg_sizetag,
				branch_id,
				heinv_isweb,
				heinv_weight,
				heinv_length,
				heinv_width,
				heinv_height,
				heinv_webdescr,
				invcls_id,
				qty	
			)
			values
			(
				:heinvreg_id,
				:heinvregitem_line,
				:heinv_id,
				:heinv_art,
				:heinv_mat,
				:heinv_col,
				:heinv_size,
				:heinv_barcode,
				:heinv_name,
				:heinv_descr,
				:heinv_box,
				:heinv_gtype,
				:heinv_produk,
				:heinv_bahan,
				:heinv_pemeliharaan,
				:heinv_logo,
				:heinv_dibuatdi,
				:heinv_other1,
				:heinv_other2,
				:heinv_other3,
				:heinv_other4,
				:heinv_other5,
				:heinv_other6,
				:heinv_other7,
				:heinv_other8,
				:heinv_other9,
				:heinv_hscode_ship,
				:heinv_hscode_ina,
				:heinv_plbname,
				:heinv_price,
				:heinvitem_colnum,
				:heinvgro_id,
				:heinvctg_id,
				:heinvctg_sizetag,
				:branch_id,
				:heinv_isweb,
				:heinv_weight,
				:heinv_length,
				:heinv_width,
				:heinv_height,
				:heinv_webdescr,
				:invcls_id,
				:qty			
			)		
		";
		$stmt = $this->db->prepare($sql);
		return $stmt;
	}

}