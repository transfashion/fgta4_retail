<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


use \FGTA4\exceptions\WebException;



class GetStockSite extends WebAPI {
	function __construct() {
		$this->debugoutput = true;

		$DB_CONFIG_DSR = DB_CONFIG['DSR'];
		$DB_CONFIG_DSR['param'] = DB_CONFIG_PARAM['firebird'];

		$this->db = new \PDO(
					$DB_CONFIG_DSR['DSN'], 
					$DB_CONFIG_DSR['user'], 
					$DB_CONFIG_DSR['pass'], 
					$DB_CONFIG_DSR['param']
				);
	}
	
	public function execute($site_id, $stockdate) {
		try {
			// TODO: ambil stok di toko $site_id pada tanggal $stockdate, detil per item (sizing)
			// proses ini hanya dapat dilakukan apabila sudah tidak ada transaksi pending (TR, AJ, DO, dll)

			// jika kode toko dan tanggal sama, gunakan no opname_id yang sama

			$data = new \stdClass;
			$data->opnameinfo = (object)[
				'site_id' => $site_id,
				'stockdate' => $stockdate,
				'opname_id' => '12345'
			];

			$data->items = array();

			// if (!$fp=fopen(dirname(__FILE__).'/sampledata.json.txt', 'r'))
			// 	throw new WebException('Cannot open file!', 500);

			$sql = "
				SELECT 
					r.HEINVITEM_ID, 
					r.HEINV_ID, 
					r.HEINV_ART, 
					r.HEINV_MAT,
					r.HEINV_COL, 
					r.HEINV_SIZE, 
					r.BARCODE,
					r.SEASON_ID,
					r.HEINVGRO_ID,
					r.HEINVGRO_NAME,
					r.HEINVCTG_ID,
					r.HEINVCTG_NAME,
					r.QTY
				FROM MST_INVDAILY r 
				WHERE
				r.SITE_ID = :SITE_ID
				AND r.DT = :DT			
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':SITE_ID' => $site_id,
				':DT' =>  $stockdate
			]);

			$rows  = $stmt->fetchAll();	

			foreach ($rows as $row) {
				$data->items[] = (object)[
					'item_id' => $row->HEINVITEM_ID,
					'heinv_id' => $row->HEINV_ID,
					'art' => $row->HEINV_ART,
					'mat' => $row->HEINV_MAT,
					'col' => $row->HEINV_COL,
					'size' => $row->HEINV_SIZE,
					"barcode" => $row->BARCODE, 
					"season_id" => $row->SEASON_ID, 
					'gro_id' => $row->HEINVGRO_ID,
					'gro_name' => $row->HEINVGRO_NAME,
					'ctg_id' => $row->HEINVCTG_ID,
					'ctg_name' => $row->HEINVCTG_NAME,
					"unit_id" => 'HBS', 
					"qty" => $row->QTY
				];
			}


			return $data;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new GetStockSite();