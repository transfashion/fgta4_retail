<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * retail/master/merchitem/apis/save.php
 *
 * ====
 * Save
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
	
	public function execute($data, $options, $files) {
		$tablename = 'mst_merchitem';
		$primarykey = 'merchitem_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

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
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->merchitem_lastcogsdt = (\DateTime::createFromFormat('d/m/Y',$obj->merchitem_lastcogsdt))->format('Y-m-d');



			if ($obj->merchitem_art=='') { $obj->merchitem_art = '--NULL--'; }
			if ($obj->merchitem_mat=='') { $obj->merchitem_mat = '--NULL--'; }
			if ($obj->merchitem_col=='') { $obj->merchitem_col = '--NULL--'; }
			if ($obj->merchitem_size=='') { $obj->merchitem_size = '--NULL--'; }
			if ($obj->merchitem_name=='') { $obj->merchitem_name = '--NULL--'; }
			if ($obj->merchitem_descr=='') { $obj->merchitem_descr = '--NULL--'; }
			if ($obj->merchitem_width=='') { $obj->merchitem_width = '--NULL--'; }
			if ($obj->merchitem_length=='') { $obj->merchitem_length = '--NULL--'; }
			if ($obj->merchitem_height=='') { $obj->merchitem_height = '--NULL--'; }
			if ($obj->merchitem_weight=='') { $obj->merchitem_weight = '--NULL--'; }
			if ($obj->merchitem_colorcode=='') { $obj->merchitem_colorcode = '--NULL--'; }
			if ($obj->merchitem_colorname=='') { $obj->merchitem_colorname = '--NULL--'; }
			if ($obj->merchitem_hscodeship=='') { $obj->merchitem_hscodeship = '--NULL--'; }
			if ($obj->merchitem_hscode=='') { $obj->merchitem_hscode = '--NULL--'; }
			if ($obj->merchitemvar_id=='') { $obj->merchitemvar_id = '--NULL--'; }


			unset($obj->merchitemvar_id);



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);


				$fieldname = 'merchitem_picture';	
				if (property_exists($files, $fieldname)) {

					$file_id = $obj->{$primarykey};
					$doc = $files->{$fieldname};
					$file_base64data = $doc->data;
					unset($doc->data);

					$overwrite = true;
					$res = $this->cdb->addAttachment($file_id, $doc, 'filedata', $file_base64data, $overwrite);	
					$rev = $res->asObject()->rev;

					$key->{$primarykey} = $obj->{$primarykey};
					
					$obj = new \stdClass;
					$obj->{$primarykey} = $key->{$primarykey};
					$obj->merchitem_picture = $rev;
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}				
				
				


				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					  $primarykey
					, 'merchitem_id', 'merchitem_art', 'merchitem_mat', 'merchitem_col', 'merchitem_size', 'merchitem_name', 'merchitem_descr', 'merchitem_picture', 'merchitemctg_id', 'merchsea_id', 'brand_id', 'merchitem_width', 'merchitem_length', 'merchitem_height', 'merchitem_weight', 'merchitem_priceori', 'merchitem_price', 'merchitem_issp', 'merchitem_isdiscvalue', 'merchitem_disc', 'merchitem_discval', 'merchitem_pricenett', 'merchitem_lastcogs', 'merchitem_lastcogsdt', 'merchrpt_id', 'gender_id', 'merchitem_colorcode', 'merchitem_colorname', 'merchitem_hscodeship', 'merchitem_hscode', 'merchitemvar_id', 'merchsizetag_id', 'merchitem_isallchannel', 'merchitem_isnonactive', 'merchitem_isdisabled', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'merchitemctg_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchitemctg_id'], $this->db, 'mst_merchitemctg', 'merchitemctg_id', 'merchitemctg_name'),
					'merchsea_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsea_id'], $this->db, 'mst_merchsea', 'merchsea_id', 'merchsea_name'),
					'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
					'merchitem_lastcogsdt' => date("d/m/Y", strtotime($row['merchitem_lastcogsdt'])),
					'merchrpt_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchrpt_id'], $this->db, 'mst_merchrpt', 'merchrpt_id', 'merchrpt_name'),
					'gender_name' => \FGTA4\utils\SqlUtility::Lookup($record['gender_id'], $this->db, 'mst_gender', 'gender_id', 'gender_name'),
					'merchsizetag_name' => \FGTA4\utils\SqlUtility::Lookup($record['merchsizetag_id'], $this->db, 'mst_merchsizetag', 'merchsizetag_id', 'merchsizetag_name'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
						$hnd->DataSavedSuccess($result);
					}
				}

				$this->db->commit();
				return $result;

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

	public function NewId($param) {
					return uniqid();
	}

};