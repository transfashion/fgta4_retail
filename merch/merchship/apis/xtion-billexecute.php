<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR .'/core/sequencer.php';


require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;

$API = new class extends merchshipBase {

	public function execute($id, $options) {
		$userdata = $this->auth->session_get_user();
		$handlerclassname = "\\FGTA4\\apis\\merchship_headerHandler";
		$hnd = null;
		if (class_exists($handlerclassname)) {
			$hnd = new merchship_headerHandler($options);
			$hnd->caller = &$this;
			$hnd->db = &$this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $this->reqinfo;
			$hnd->event = $event;
		} else {
			$hnd = new \stdClass;
		}

		try {
			// ambil data shipment
			$sql = "select * from trn_merchship where merchship_id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':id'=>$id]);
			$row = $stmt->fetch();

			$param = new \stdClass;
			$param->header = $row;
			$param->userdata = $userdata; 
			$param->setting = (object) [
				'owner_dept_id' => 'ACT',
				'doc_id' => 'BILLOUT'
			];

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				if (!defined('__COMPANY_INITIAL')) {
					throw new \Exception('__COMPANY_INITIAL belum didefinisi di app.config');
				}

				$idset = $this->createIdSet($id, $param);
				$param->idset = $idset;

				$data = $this->getRVdata($id, $param);

				$this->updateTbData($data, $param);
				
				//$this->createOrderin($id);
				//$this->createDelivery($id);
				$this->createInvoice($id, $param);


				$this->BillExecuted_setflag($id, $userdata);				

				$this->db->commit();
				return (object)[
					'success' => true,
					'data' => $data 
				];
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


	public function createInvoice(string $id, object &$param ) : void {
		$idset = $param->idset; 
		$userdata = $param->userdata;
		
		try {
			$billout_id = $idset['BK'];

			$sqlcek = "
				select * from trn_billout where billout_id = :billout_id
			";
			$stmt = $this->db->prepare($sqlcek);
			$stmt->execute([':billout_id'=>$idset['BK']]);
			$row = $stmt->fetch();


			$obj = new \stdClass;
			$obj->billout_id = $billout_id;
			$obj->billtype_id = 'BIL';
			$obj->billout_ref = $id;
			$obj->billout_descr = $param->header['merchship_descr'];
			$obj->billout_date = date('Y-m-d');
			$obj->billout_datedue = date('Y-m-d');
			$obj->unit_id = $param->header['unit_id'];
			$obj->dept_id = $param->header['dept_id'];
			$obj->billout_isunreferenced = 1;
			$obj->orderin_id = null;
			$obj->orderinterm_id = null;
			$obj->billout_isdp = 0;
			$obj->partner_id = $param->header['principal_partner_id']; 
			$obj->billout_value = 0;
			$obj->curr_id = __LOCAL_CURR;
			$obj->billout_frgrate = 1;
			$obj->billout_valueidr = 0;
			$obj->billout_ppnidr = 0;
			$obj->billout_dppidr = 0;
			$obj->owner_dept_id = $param->setting->owner_dept_id;
			$obj->doc_id = $param->setting->doc_id;


			$tablename = "trn_billout";
			if ($row==null) {
				$action = 'NEW';
		
				// buat baru
				$obj->_createby = $userdata->username;
				$obj->_createdate = date('Y-m-d H:i:s');
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);

			} else {
				$action = 'MODIFY';

				$key = new \stdClass;
				$key->billout_id = $obj->billout_id;

				// update
				$obj->_modifyby = $userdata->username;
				$obj->_modifydate = date('Y-m-d H:i:s');
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
			}

			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			\FGTA4\utils\SqlUtility::WriteLog($this->db, 'finact/fin/billout', $tablename, $obj->billout_id, $action, $userdata->username, (object)[]);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function createIdSet(string $id, object &$param) : array {
		$userdata = $param->userdata;

		try {
			$sqlcek = "
				select * 
				from trn_merchshipidset 
				where merchship_id=:merchship_id and merchshipidset_doc=:merchshipidset_doc
			";
			$stmtcek = $this->db->prepare($sqlcek);


			$sqlinsert = "
				insert into trn_merchshipidset
				( merchshipidset_id, merchship_id, merchshipidset_doc, merchshipidset_value, _createby, _createdate)
				values 
				(:merchshipidset_id,:merchship_id,:merchshipidset_doc,:merchshipidset_value,:_createby,:_createdate)
			";
			$stmtinsert = $this->db->prepare($sqlinsert);

			$initial = __COMPANY_INITIAL;
			$idset = [];
			$docs = ['BK','SO', 'DO'];
			foreach ($docs as $doc) {
				// cek data dulu
				$stmtcek->execute([
					':merchship_id' => $id,
					':merchshipidset_doc' => $doc
				]);
				$row = $stmtcek->fetch();
				if ($row==null) {
					// buat dokumen baru
					$seqname = "$doc/$initial";
					$dt = new \DateTime();	
					$seqgroup = '';
					$ye = $dt->format("y");
					$mo = $dt->format("m");
					$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['seqgroup', 'ye', 'mo']);
					$raw = $seq->getraw(['seqgroup'=>$seqgroup, 'ye'=>$ye, 'mo'=> 0]);
					$doc_id = $seqname . '/' . $raw['ye'] . $mo . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		
					$stmtinsert->execute([
						':merchshipidset_id' => uniqid(),
						':merchship_id' => $id,
						':merchshipidset_doc' => $doc,
						':merchshipidset_value' => $doc_id,
						':_createby' => $userdata->username,
						':_createdate' => date('Y-m-d H:i:s')
					]);

					$idset[$doc] = $doc_id;
				} else {
					$doc_id = $row['merchshipidset_value'];
					$idset[$doc] = $doc_id; 
				}
			}
			return $idset;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function updateTbData(object $data, object &$param) : void {
		// connect ke database
		try {
			$DB_CONFIG = DB_CONFIG[$GLOBALS['TBDB']];
			$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
			$this->dbfrm = new \PDO(
						$DB_CONFIG['DSN'], 
						$DB_CONFIG['user'], 
						$DB_CONFIG['pass'], 
						$DB_CONFIG['param']
			);
		} catch (\Exception $ex) {
			throw new \Exception("Cannot connect to TBDB.\r\n " . $ex->getMessage());
		}


		// Update ke Trans Browser
		try {
			$this->dbfrm->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->dbfrm->beginTransaction();

			$sql = "
				update transaksi_hemovingdetil
				set 
				heinv_price = :heinv_price
				where 
				hemoving_id = :hemoving_id and heinv_id = :heinv_id
			";
			$stmt = $this->dbfrm->prepare($sql);

			try {
				$rows = $data->items;
				foreach ($rows as $row) {
					$hemoving_id = $row['hemoving_id'];
					$heinv_id = $row['heinv_id'];
					$heinv_price = (float)$row['costperitem'];
	
					$stmt->execute([
						':hemoving_id' => $hemoving_id,
						':heinv_id' => $heinv_id,
						':heinv_price' => $heinv_price
					]);
				} 
				$this->dbfrm->commit();
			} catch (\Exception $ex) {
				$this->dbfrm->rollBack();
				throw $ex;
			} finally {
			}

		} catch (\Exception $ex) {
			throw $ex;
		} 

	}

	public function getRVdata(string $id, object &$param) : object {
		$data = new \stdClass;
		try {
			// get data RV

			$sql = "
				select 
				A.merchrv_ref as hemoving_id
				from trn_merchrv A 
				where A.merchship_id = :merchship_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':merchship_id' => $id
			]);		
			$rows = $stmt->fetchall();
			$data->rv = $rows;

			$sql = "
				select 
				X.hemoving_id,
				X.heinv_id,
				sum(X.qty) as qty,
				sum(X.billdpp) as billdpp,
				sum(X.billidr) as billidr,
				round(sum(X.billidr)/sum(X.qty), 2) as costperitem_andtax,
				round(sum(X.billdpp)/sum(X.qty), 2) as costperitem
				from (
					select 
					A.merchrv_ref as hemoving_id,
					B.merchitem_id,
					concat(SUBSTRING(B.merchitem_id, 1, 11), '00') as heinv_id, 
					B.merchrvitem_qty as qty,
					B.merchrvitem_budgetbilldpp as billdpp,
					B.merchrvitem_budgetbillidr as billidr
					from trn_merchrv A inner join trn_merchrvitem B on B.merchrv_id = A.merchrv_id 
					where 
					A.merchship_id = :merchship_id
				) X
				group by X.hemoving_id, X.heinv_id
				HAVING sum(X.qty)<>0			
			";
			
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':merchship_id' => $id
			]);		

			$rows = $stmt->fetchall();
			$data->items = $rows;

			return $data;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function BillExecuted_setflag(string $id, $userdata) : object {
		$ret = new \stdClass;

		try {

			// update header as calculate
			$sql = "
				update  trn_merchship 
				set 
				merchship_isexecute = 1,
				merchship_executeby = :username,
				merchship_executedate = :date
				where 
				merchship_id = :merchship_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':username' => $userdata->username,
				':date' => date('Y-m-d'),
				':merchship_id' => $id
			]);


			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
	

};


