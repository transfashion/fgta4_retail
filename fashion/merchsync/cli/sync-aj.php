<?php namespace FGTA4;
// <!-- http://ws.transfashion.id/crossroads/frontend/gethemoving.php?id=AJ/05/EAG/PI/240000005 -->


class SyncAJ extends syncBase {
	protected $url;

	private $stmt_head_del;
	private $stmt_head_ins;
	private $stmt_detil_del;
	private $stmt_detil_ins;
	
	private $head_param_keys;
	private $detil_param_keys;


	function __construct(array $cfg) {
		parent::__construct($cfg);

		$this->url = $cfg['url'];
		$this->stmt_head_del = $this->createStatementHeadDel();
		$this->stmt_detil_del = $this->createStatementDetilDel();
	}



	public function PostAll(string $merchsync_id, string $merchsync_doc, string $merchsync_type ) : void {
		try {
			// ambil data dari URL
			$id = $merchsync_doc;
			if ($merchsync_type!='AJ-POSTALL') {
				throw new \Exception("Type Sync $merchsync_type tidak sesuai dengan AJ-POSTALL"); 
			}

			$endpoint = $this->url . '/gethemoving.php?id='. $id;
			$data = $this->getDataFromUrl($endpoint);

			// struktur
			// array $data['header']
			// array $data['items']
			$hemoving_id = $data['header']['hemoving_id'];
			$this->deleteHemovingData($hemoving_id);
			$this->copyToTempHemovingHeader($data['header']);
			$this->copyToTempHemovingDetil($data['items']);

			// throw new \Exception("PostAll: not all unimplemented");
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function createStatementHeadDel() : object {
		$sqldel = "delete from tmp_hemoving where hemoving_id = :hemoving_id";
		$stmt = $this->rptdb->prepare($sqldel);
		return $stmt;
	}

	function createStatementDetilDel() : object {
		$sqldel = "delete from tmp_hemovingdetil where hemoving_id = :hemoving_id";
		$stmt = $this->rptdb->prepare($sqldel);
		return $stmt;
	}


	function deleteHemovingData($hemoving_id) : void {
		try {
			$this->stmt_head_del->execute([
				':hemoving_id' => $hemoving_id
			]);

			$this->stmt_detil_del->execute([
				':hemoving_id' => $hemoving_id
			]);
		} catch (\Exception $ex) {
			throw new \Exception("DELETE: ".$ex->getMessage());
		}
	}

	function copyToTempHemovingHeader(array $row) : void {
		try {
			if ($this->stmt_head_ins==null) {
				$obj = new \stdClass;
				$obj->hemoving_id = $row['hemoving_id'];
				$obj->hemoving_source = $row['hemoving_source'];
				$obj->hemoving_date = $row['hemoving_date'];
				$obj->hemoving_date_fr = $row['hemoving_date_fr'];
				$obj->hemoving_date_to = $row['hemoving_date_to'];
				$obj->hemoving_sn = $row['hemoving_sn'];
				$obj->hemoving_pol = $row['hemoving_pol'];
				$obj->hemoving_etd = $row['hemoving_etd'];
				$obj->hemoving_eta = $row['hemoving_eta'];
				$obj->hemoving_logisticcosttmp = $row['hemoving_logisticcosttmp'];
				$obj->hemoving_islogisticpost = $row['hemoving_islogisticpost'];
				$obj->hemoving_isprop = $row['hemoving_isprop'];
				$obj->hemoving_isproplock = $row['hemoving_isproplock'];
				$obj->hemoving_issend = $row['hemoving_issend'];
				$obj->hemoving_isrecv = $row['hemoving_isrecv'];
				$obj->hemoving_ispost = $row['hemoving_ispost'];
				$obj->hemoving_isdisabled = $row['hemoving_isdisabled'];
				$obj->hemoving_descr = $row['hemoving_descr'];
				$obj->hemoving_createby = $row['hemoving_createby'];
				$obj->hemoving_createdate = $row['hemoving_createdate'];
				$obj->hemoving_modifyby = $row['hemoving_modifyby'];
				$obj->hemoving_modifydate = $row['hemoving_modifydate'];
				$obj->hemoving_propby = $row['hemoving_propby'];
				$obj->hemoving_propdate = $row['hemoving_propdate'];
				$obj->hemoving_proplockby = $row['hemoving_proplockby'];
				$obj->hemoving_sendby = $row['hemoving_sendby'];
				$obj->hemoving_senddate = $row['hemoving_senddate'];
				$obj->hemoving_recvby = $row['hemoving_recvby'];
				$obj->hemoving_recvdate = $row['hemoving_recvdate'];
				$obj->hemoving_logisticpostby = $row['hemoving_logisticpostby'];
				$obj->hemoving_logisticpostdate = $row['hemoving_logisticpostdate'];
				$obj->hemoving_postby = $row['hemoving_postby'];
				$obj->hemoving_postdate = $row['hemoving_postdate'];
				$obj->hemovingtype_id = $row['hemovingtype_id'];
				$obj->region_id = $row['region_id'];
				$obj->region_id_out = $row['region_id_out'];
				$obj->branch_id_fr = $row['branch_id_fr'];
				$obj->branch_id_to = $row['branch_id_to'];
				$obj->convert_fr = $row['convert_fr'];
				$obj->convert_to = $row['convert_to'];
				$obj->rekanan_id = $row['rekanan_id'];
				$obj->currency_id = $row['currency_id'];
				$obj->currency_rate = $row['currency_rate'];
				$obj->invoice_id = $row['invoice_id'];
				$obj->disc_rate = $row['disc_rate'];
				$obj->season_id = $row['season_id'];
				$obj->ref_id = $row['ref_id'];
				$obj->channel_id = $row['channel_id'];
				$obj->rowid = $row['rowid'];


				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("tmp_hemoving", $obj);
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
				}
				$this->stmt_head_ins->execute($params);
			}
		} catch (\Exception $ex) {
			throw new \Exception("HEADER: ".$ex->getMessage());
		}
	}	


	function copyToTempHemovingDetil(array $rows) : void {
		try {
			foreach ($rows as $row) {
				if ($this->stmt_detil_ins==null) {
					$obj = new \stdClass;
					$obj->hemoving_id = $row['hemoving_id'];
					$obj->hemovingdetil_line = $row['hemovingdetil_line'];
					$obj->heinv_id = $row['heinv_id'];
					$obj->heinv_art = $row['heinv_art'];
					$obj->heinv_mat = $row['heinv_mat'];
					$obj->heinv_col = $row['heinv_col'];
					$obj->heinv_name = $row['heinv_name'];
					$obj->heinv_price = $row['heinv_price'];
					$obj->heinv_disc = $row['heinv_disc'];
					$obj->heinv_box = $row['heinv_box'];
					$obj->heinv_invoiceqty = $row['heinv_invoiceqty'];
					$obj->heinv_invoiceid = $row['heinv_invoiceid'];
					$obj->ref_id = $row['ref_id'];
					$obj->ref_line = $row['ref_line'];
					$obj->A01 = $row['A01'];
					$obj->A02 = $row['A02'];
					$obj->A03 = $row['A03'];
					$obj->A04 = $row['A04'];
					$obj->A05 = $row['A05'];
					$obj->A06 = $row['A06'];
					$obj->A07 = $row['A07'];
					$obj->A08 = $row['A08'];
					$obj->A09 = $row['A09'];
					$obj->A10 = $row['A10'];
					$obj->A11 = $row['A11'];
					$obj->A12 = $row['A12'];
					$obj->A13 = $row['A13'];
					$obj->A14 = $row['A14'];
					$obj->A15 = $row['A15'];
					$obj->A16 = $row['A16'];
					$obj->A17 = $row['A17'];
					$obj->A18 = $row['A18'];
					$obj->A19 = $row['A19'];
					$obj->A20 = $row['A20'];
					$obj->A21 = $row['A21'];
					$obj->A22 = $row['A22'];
					$obj->A23 = $row['A23'];
					$obj->A24 = $row['A24'];
					$obj->A25 = $row['A25'];
					$obj->B01 = $row['B01'];
					$obj->B02 = $row['B02'];
					$obj->B03 = $row['B03'];
					$obj->B04 = $row['B04'];
					$obj->B05 = $row['B05'];
					$obj->B06 = $row['B06'];
					$obj->B07 = $row['B07'];
					$obj->B08 = $row['B08'];
					$obj->B09 = $row['B09'];
					$obj->B10 = $row['B10'];
					$obj->B11 = $row['B11'];
					$obj->B12 = $row['B12'];
					$obj->B13 = $row['B13'];
					$obj->B14 = $row['B14'];
					$obj->B15 = $row['B15'];
					$obj->B16 = $row['B16'];
					$obj->B17 = $row['B17'];
					$obj->B18 = $row['B18'];
					$obj->B19 = $row['B19'];
					$obj->B20 = $row['B20'];
					$obj->B21 = $row['B21'];
					$obj->B22 = $row['B22'];
					$obj->B23 = $row['B23'];
					$obj->B24 = $row['B24'];
					$obj->B25 = $row['B25'];
					$obj->C01 = $row['C01'];
					$obj->C02 = $row['C02'];
					$obj->C03 = $row['C03'];
					$obj->C04 = $row['C04'];
					$obj->C05 = $row['C05'];
					$obj->C06 = $row['C06'];
					$obj->C07 = $row['C07'];
					$obj->C08 = $row['C08'];
					$obj->C09 = $row['C09'];
					$obj->C10 = $row['C10'];
					$obj->C11 = $row['C11'];
					$obj->C12 = $row['C12'];
					$obj->C13 = $row['C13'];
					$obj->C14 = $row['C14'];
					$obj->C15 = $row['C15'];
					$obj->C16 = $row['C16'];
					$obj->C17 = $row['C17'];
					$obj->C18 = $row['C18'];
					$obj->C19 = $row['C19'];
					$obj->C20 = $row['C20'];
					$obj->C21 = $row['C21'];
					$obj->C22 = $row['C22'];
					$obj->C23 = $row['C23'];
					$obj->C24 = $row['C24'];
					$obj->C25 = $row['C25'];
					$obj->rowid = $row['rowid'];

					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("tmp_hemovingdetil", $obj);
					$this->stmt_detil_ins = $this->rptdb->prepare($cmd->sql);
					$this->stmt_detil_ins->execute($cmd->params);
	
					$this->detil_param_keys = [];
					foreach ($obj as $key => $value) {
						$this->detil_param_keys[] = $key;
					}
				} else {
					$params = [];
					foreach ($this->detil_param_keys as $key) {
						$params[":".$key] = $row[$key];
					}
					$this->stmt_detil_ins->execute($params);
				}
			}
			
		} catch (\Exception $ex) {
			throw new \Exception("DETIL: ".$ex->getMessage());
		}
	}	
}


