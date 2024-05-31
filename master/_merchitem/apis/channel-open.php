<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-channel-handler.php')) {
	require_once __DIR__ .'/data-channel-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * retail/master/merchitem/apis/channel-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel channel} merchitem (mst_merchitem)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 16/03/2022
 */
$API = new class extends merchitemBase {

	public function execute($options) {
		$tablename = 'mst_merchitemretailchannel';
		$primarykey = 'merchitemretailchannel_id';
		$userdata = $this->auth->session_get_user();
		

		$handlerclassname = "\\FGTA4\\apis\\merchitem_channelHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new merchitem_channelHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"merchitemretailchannel_id" => " merchitemretailchannel_id = :merchitemretailchannel_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_merchitemretailchannel A', [
				'merchitemretailchannel_id', 'retailchannel_id', 'merchitem_isnonactive', 'merchitem_price', 'merchitem_isdiscvalue', 'merchitem_disc', 'merchitem_discval', 'merchitem_pricenett', 'merchitem_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'retailchannel_name' => \FGTA4\utils\SqlUtility::Lookup($record['retailchannel_id'], $this->db, 'mst_retailchannel', 'retailchannel_id', 'retailchannel_name'),
				
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

	

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};