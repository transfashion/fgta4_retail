<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __ROOT_DIR . '/core/webauth.php';
require_once __ROOT_DIR . '/core/webuser.php';
require_once __ROOT_DIR . '/core/loginexception.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\WebUser;
use \FGTA4\WebAuth;
use \FGTA4\exceptions\LoginException;


$API = new class extends posloginBase {
	
	public function execute($username, $password, $licensedata) {
		$loginsuccess = false;
		$loginmessage = "Login anda salah";
		$userdata = null;

		try {

			WebUser::setDb($this->db);

			$userdata = WebUser::login($username, $password);				

			// employee login
			$sql = "
				select 
				  A.empl_id
				, A.empl_nik
				, A.empl_name
				, A.site_id, A.dept_id
				, (select site_name from mst_site where site_id = A.site_id) as site_name 
				, (select dept_name from mst_dept where dept_id = A.dept_id) as dept_name
				, A.empl_isdisabled
				from 
				mst_empl A inner join mst_empluser B on B.empl_id = A.empl_id 
				where 
				B.user_id = :user_id
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':user_id' => $userdata->username
			]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			
			if ($row==null) {
				throw new LoginException("data karyawan untuk '$username' belum di set.");
			}

			if ($row['empl_isdisabled']==1) {
				throw new LoginException("karyawan '$username' non aktif.");
			}

			$userdata->employee_id = $row['empl_id'];
			$userdata->empl_id = $row['empl_id'];
			$userdata->empl_nik = $row['empl_nik'];	
			$userdata->empl_name = $row['empl_name'];
			$userdata->dept_id = $row['dept_id'];
			$userdata->dept_name = $row['dept_name'];
			$userdata->site_id = $row['site_id'];
			$userdata->site_name = $row['site_name'];


			if ($userdata->site_id !== $licensedata->site_id) {
				return (object)[
					"loginsuccess" => false,
					"loginmessage" => "Lokasi anda tidak sesuai.<br>
										Saat ini anda akan login di $licensedata->site_name,<br>
										namun Anda terdaftar di <b>$userdata->site_name</b><br>",
					"userdata" => $userdata,
					"redirect" => $redirect,
				];
			}


			$auth = new WebAuth();
			$tokenid = $auth->session_user_start($userdata);
			$userdata->tokenid = $tokenid; 


			// redirect halaman kalau login sukses
			$redirect = implode('/', ['index.php/module', __STARTMODULE]);

			return (object)[
				"loginsuccess" => true,
				"loginmessage" => "",
				"userdata" => $userdata,
				"redirect" => $redirect,
			];


		} catch (\Exception $ex) {
			if ($ex instanceof LoginException) {
				return (object)[
					"loginsuccess" => false,
					"loginmessage" => $ex->getMessage(),
				];
			} else {
				throw $ex;
			}

		}

	}

};