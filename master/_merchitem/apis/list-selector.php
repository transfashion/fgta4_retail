<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * retail/master/merchitem/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header merchitem (mst_merchitem)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 25/10/2021
 */
$API = new class extends merchitemBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.merchitem_id LIKE CONCAT('%', :search, '%') ",
					"unit_id" => " B.unit_id = :unit_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
				select count(*) as n from mst_merchitem A inner join mst_brand B on B.brand_id = A.brand_id
			" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.merchitem_id, A.merchitem_name, A.merchitem_art, A.merchitem_mat, A.merchitem_col, A.merchitem_size, A.merchitem_picture, A.merchitemctg_id, A.merchsea_id, A.brand_id, A.merchitem_width, A.merchitem_length, A.merchitem_height, A.merchitem_weight, A.merchitem_priceori, A.merchitem_price, A.merchitem_issp, A.merchitem_isdiscvalue, A.merchitem_disc, A.merchitem_discval, A.merchitem_pricenett, A.merchitem_lastcogs, A.merchitem_lastcogsdt, A.merchrpt_id, A.gender_id, A.merchitem_colorcode, A.merchitem_hscodeship, A.merchitem_hscode, A.merchitem_isallchannel, A.merchitem_isnonactive, A.merchitem_isdisabled
				, (select itemclass_id from mst_merchitemctg where merchitem_id = A.merchitem_id) as itemclass_id
				, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_merchitem A inner join mst_brand B on B.brand_id = A.brand_id
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}


				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'merchitemctg_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitemctg_id'], $this->db, 'mst_merchitemctg', 'merchitemctg_id', 'merchitemctg_name'),
					'merchsea_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsea_id'], $this->db, 'mst_merchsea', 'merchsea_id', 'merchsea_name'),
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'merchrpt_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchrpt_id'], $this->db, 'mst_merchrpt', 'merchrpt_id', 'merchrpt_name'),
					'gender_name' => \FGTA4\utils\SqlUtility::Lookup($record['gender_id'], $this->db, 'mst_gender', 'gender_id', 'gender_name'),
				]));
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};