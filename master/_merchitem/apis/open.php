<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * retail/master/merchitem/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header merchitem (mst_merchitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 16/03/2022
 */
$API = new class extends merchitemBase {
	
	public function execute($options) {
		$tablename = 'mst_merchitem';
		$primarykey = 'merchitem_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\merchitem_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchitem_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"merchitem_id" => " merchitem_id = :merchitem_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_merchitem A', [
				'merchitem_id', 'merchitem_art', 'merchitem_mat', 'merchitem_col', 'merchitem_size', 'merchitem_name', 'merchitem_descr', 'merchitem_picture', 'merchitemctg_id', 'merchsea_id', 'brand_id', 'merchitem_width', 'merchitem_length', 'merchitem_height', 'merchitem_weight', 'merchitem_priceori', 'merchitem_price', 'merchitem_issp', 'merchitem_isdiscvalue', 'merchitem_disc', 'merchitem_discval', 'merchitem_pricenett', 'merchitem_lastcogs', 'merchitem_lastcogsdt', 'merchrpt_id', 'gender_id', 'merchitem_colorcode', 'merchitem_colorname', 'merchitem_hscodeship', 'merchitem_hscode', 'merchitemvar_id', 'merchsizetag_id', 'merchitem_isallchannel', 'merchitem_isnonactive', 'merchitem_isdisabled', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				'merchitem_lastcogsdt' => date("d/m/Y", strtotime($record['merchitem_lastcogsdt'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'merchitemctg_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitemctg_id'], $this->db, 'mst_merchitemctg', 'merchitemctg_id', 'merchitemctg_name'),
				'merchsea_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsea_id'], $this->db, 'mst_merchsea', 'merchsea_id', 'merchsea_name'),
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
				'merchrpt_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchrpt_id'], $this->db, 'mst_merchrpt', 'merchrpt_id', 'merchrpt_name'),
				'gender_name' => \FGTA4\utils\SqlUtility::Lookup($record['gender_id'], $this->db, 'mst_gender', 'gender_id', 'gender_name'),
				'merchsizetag_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsizetag_id'], $this->db, 'mst_merchsizetag', 'merchsizetag_id', 'merchsizetag_name'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}


			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

				try { $result->record['merchitem_picture_doc'] = $this->cdb->getAttachment($result->record[$primarykey], 'filedata'); } catch (\Exception $ex) {}
			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};