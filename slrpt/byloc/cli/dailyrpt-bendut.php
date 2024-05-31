<?php


/*
Cara pakai

   daily:   $ php cli.php retail/slrpt/byloc/dailyrpt-bendut
   weekly:  $ php cli.php retail/slrpt/byloc/dailyrpt-bendut --weekly

   bydate:  $ php cli.php retail/slrpt/byloc/dailyrpt-bendut --date 2020-07-23  [--weekly]

*/

require_once __ROOT_DIR . "/rootdir/phpmailer/class.phpmailer.php";
require_once __ROOT_DIR . "/rootdir/phpmailer/class.smtp.php";
require_once __ROOT_DIR . "/rootdir/phpexcel/Classes/PHPExcel.php";


console::class(new class($args) extends cli {
	const NAMANAMAHARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

	function __construct($args) {
		$this->args = $args;

		
		$DB_CONFIG = DB_CONFIG['DSR'];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM['mariadb'];

		// print_r($DB_CONFIG);
		echo "connecting to db ...";
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);		
		echo "Connected.\r\n";
	}

	function getRecepient() {
		$mailtarget = __LOCALDB_DIR . "/mailtarget/dailyrpt-bendut.json";
		$fp = fopen($mailtarget, "r");
		$content = fread($fp, filesize($mailtarget));
		fclose($fp);

		try {
			$jsonrecp = json_decode($content);
			if (json_last_error()!=JSON_ERROR_NONE) {
				throw new Exception('error decode json in ' + mailtarget);
			}
			return $jsonrecp;
		} catch (Exception $ex) {
			throw $ex;
		}

	}

	function execute() {
		try {
			
			$currentdate = new DateTime();
			$reportdate = new DateTime(date("Y-m-d", strtotime($currentdate->format('Y-m-d')." -1 day")));
			//$reportdate = new DateTime(date("Y-m-d", strtotime($currentdate->format('Y-m-d'))));

			if (property_exists($this->args->params, '--date')) {
				$reportdate = new DateTime($this->args->params->{"--date"});
			}

			if (property_exists($this->args->params, '--weekly')) {
				$type = "Weekly";
				$this->dparam = $this->getDateParamWeekly($currentdate, $reportdate);
			} else {
				$type = "Daily";
				$this->dparam = $this->getDateParamDaily ($currentdate, $reportdate);
			}

			echo "Sending email ...";
			$recipients = $this->getRecepient();
			$subject = "Sales Summary Report F ($type) per " . $this->dparam->PERTANGGAL;
			$message = $this->getMessageContent();
			$attachment = [];
			$this->SendMail($recipients, $subject, $message, $attachment);
			echo "done.\r\n";
		} catch (Exception $ex) {
			throw $ex;
		}
	}


	// function getServer() {
	// 	return (object) [
	// 		'host' => 'mail.transfashionindonesia.com',
	// 		'port' => 587,
	// 		'username' => 'agung',
	// 		'password' => '0necupofm1lk',
	// 		'fromname' => 'agung nugroho',
	// 		'from' => 'agung@transfashionindonesia.com'
	// 	];
	// }


	function getMessageContent() {
		ob_start();
		require_once dirname(__FILE__)."/dailyrpt-bendut.phtml";
		$content = ob_get_contents();
		ob_end_clean();

		$output_path = __LOCALDB_DIR . "/output/dailyrpt-output.html";
		$fp = fopen($output_path, "w");
		fwrite($fp, $content);
		fclose($fp);

		return $content;
	}




	function getDateParamDaily($currentdate, $date) {
		try {
			$dparam = new stdClass;
			$dparam->GENDT = $currentdate->format('Y-m-d');
			
			$days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
			$dparam->PERTANGGAL =  $days[$date->format('w')] . ', ' . $date->format('d/m/Y');

			$dparam->A_DTSTART = $date->format('Y-m-d');
			$dparam->A_DTEND = $date->format('Y-m-d');
			$dparam->B_DTSTART = date("Y-m-d", strtotime($date->format('Y-m-d')." -1 day"));
			$dparam->B_DTEND = date("Y-m-d", strtotime($date->format('Y-m-d')." -1 day"));


			$dparam->A_DTSTART_MTD_CURRENT = date('Y-m-01', strtotime($dparam->A_DTEND));
			$dparam->A_DTSTART_MTD_LY = date("Y-m-d", strtotime($dparam->A_DTSTART_MTD_CURRENT." -1 year"));
			$dparam->A_DTEND_LY =  date("Y-m-d", strtotime($dparam->A_DTEND." -1 year"));

			$dparam->B_DTSTART_MTD_CURRENT = date('Y-m-01', strtotime($dparam->B_DTEND));
			$dparam->B_DTSTART_MTD_LY = date("Y-m-d", strtotime($dparam->B_DTSTART_MTD_CURRENT." -1 year"));
			$dparam->B_DTEND_LY =  date("Y-m-d", strtotime($dparam->B_DTEND." -1 year"));


			$lastmonth = $this->getLastMonthMTD(clone $date);
			$dparam->C_DTEND = $lastmonth->end->format('Y-m-t');
			$dparam->C_DTSTART_MTD_CURRENT = date("Y-m-01", strtotime($dparam->C_DTEND));
			$dparam->C_DTSTART_MTD_LY = date("Y-m-d", strtotime($dparam->C_DTSTART_MTD_CURRENT." -1 year"));
			$dparam->C_DTEND_LY = date("Y-m-d", strtotime($dparam->C_DTEND." -1 year"));


			
			return $dparam;
		} catch (Exception $ex) {
			throw $ex;
		}
	
	}

	function getWeekByDate($isodate) {
		try {
			$rows = array();
			foreach ($this->db->query("SELECT * FROM CON_DT WHERE DT_ID='$isodate'") as $row) { 
				$rows[] = $row; 
			}

			if (count($rows)==0) {  throw new Exception("data week untuk tanggal '$isodate' tidak ditemukan");  }
			return (object) [
				'DTSTART' => $rows[0]->WEEK_DTSTART,
				'DTEND' => $rows[0]->WEEK_DTEND
			];
		} catch (Exception $ex) {
			throw $ex;
		}
	}


	function getDateParamWeekly($currentdate, $date) {
		try {
			$dparam = new stdClass;
			$dparam->GENDT = $currentdate->format('Y-m-d');
			$dparam->PERTANGGAL =  self::NAMANAMAHARI[$date->format('w')] . ', ' . $date->format('d/m/Y');

			$RUNNING_WEEK = $this->getWeekByDate($date->format('Y-m-d'));
			//$LAST_WEEK =  $this->getWeekByDate(date('Y-m-d', strtotime($RUNNING_WEEK->DTSTART. " -1 day")));
			$LAST_WEEK =  $this->getWeekByDate(date('Y-m-d', strtotime($RUNNING_WEEK->DTSTART)));

			$dparam->A_DTSTART = $LAST_WEEK->DTSTART;
			$dparam->A_DTEND = $LAST_WEEK->DTEND;
			
			$LAST_2_WEEK =  $this->getWeekByDate(date('Y-m-d', strtotime($LAST_WEEK->DTSTART. " -1 day")));
			$dparam->B_DTSTART = $LAST_2_WEEK->DTSTART;
			$dparam->B_DTEND = $LAST_2_WEEK->DTEND;		


			$dparam->A_DTSTART_MTD_CURRENT = date('Y-m-01', strtotime($dparam->A_DTEND));
			$dparam->A_DTSTART_MTD_LY = date("Y-m-d", strtotime($dparam->A_DTSTART_MTD_CURRENT." -1 year"));
			$dparam->A_DTEND_LY =  date("Y-m-d", strtotime($dparam->A_DTEND." -1 year"));

			$dparam->B_DTSTART_MTD_CURRENT = date('Y-m-01', strtotime($dparam->B_DTEND));
			$dparam->B_DTSTART_MTD_LY = date("Y-m-d", strtotime($dparam->B_DTSTART_MTD_CURRENT." -1 year"));
			$dparam->B_DTEND_LY =  date("Y-m-d", strtotime($dparam->B_DTEND." -1 year"));


			$lastmonth = $this->getLastMonthMTD(clone $date);
			$dparam->C_DTEND = $lastmonth->end->format('Y-m-t');
			$dparam->C_DTSTART_MTD_CURRENT = date("Y-m-01", strtotime($dparam->C_DTEND));
			$dparam->C_DTSTART_MTD_LY = date("Y-m-d", strtotime($dparam->C_DTSTART_MTD_CURRENT." -1 year"));
			$dparam->C_DTEND_LY = date("Y-m-d", strtotime($dparam->C_DTEND." -1 year"));


			return $dparam;
		} catch (Exception $ex) {
			throw $ex;
		}
	} 


	function vsly($current, $lastyear) {
		if ($lastyear==0) {
			if ($current>0) {
				return 100;
			} else {
				return 0;
			}
		} else {
			return 100*((($current-$lastyear)/$lastyear));
		}
	}

	function calculaterow($row) {

		$row->A_CURRENT_MTD_SALES_NETT_vsLY = $this->vsly($row->A_CURRENT_MTD_SALES_NETT, $row->A_LASTYEAR_MTD_SALES_NETT);
		$row->B_CURRENT_MTD_SALES_NETT_vsLY = $this->vsly($row->B_CURRENT_MTD_SALES_NETT, $row->B_LASTYEAR_MTD_SALES_NETT);
		

		$row->A_CURRENT_MTD_GPVAL = ($row->A_CURRENT_MTD_SALES_NETT/1.1) - $row->A_CURRENT_MTD_COGS;
		$row->B_CURRENT_MTD_GPVAL = ($row->B_CURRENT_MTD_SALES_NETT/1.1) - $row->B_CURRENT_MTD_COGS;

		$row->A_LASTYEAR_MTD_GPVAL = ($row->A_LASTYEAR_MTD_SALES_NETT/1.1) - $row->A_LASTYEAR_MTD_COGS;
		$row->B_LASTYEAR_MTD_GPVAL = ($row->B_LASTYEAR_MTD_SALES_NETT/1.1) - $row->B_LASTYEAR_MTD_COGS;

		$row->A_CURRENT_MTD_GP_vsLY = $this->vsly($row->A_CURRENT_MTD_GPVAL, $row->A_LASTYEAR_MTD_GPVAL);
		$row->B_CURRENT_MTD_GP_vsLY = $this->vsly($row->B_CURRENT_MTD_GPVAL, $row->B_LASTYEAR_MTD_GPVAL);



		$row->C_CURRENT_MTD_SALES_NETT_vsLY = $this->vsly($row->C_CURRENT_MTD_SALES_NETT, $row->C_LASTYEAR_MTD_SALES_NETT);

	}

	function mio($value) {
		$number = 0;
		$vv = $value/1000000;
		if ($vv<1 && $vv>-1) {
			$number = round($vv, 3);
		} else {
			$number = number_format(round($vv, 0));
		}
		
		return "<span style=\"margin-right: 10px\">$number</span>";
	}

	function percent($value) {
		$number = round($value, 0) . "%";
		return "<span style=\"margin-right: 10px\">$number</span>";
	}


	function sum($row, $rowtotal) {
		foreach ($row as $key => $value) {
			if (is_numeric($value)) {
				if (!property_exists($rowtotal, $key)) {
					$rowtotal->{$key} = 0;
				}
				$rowtotal->{$key} += $row->{$key};
			}

		}
	}


	function createDtRangeParam($dparam) {
		return "
			'$dparam->GENDT',
			'$dparam->A_DTSTART',
			'$dparam->A_DTEND',
			'$dparam->B_DTSTART',
			'$dparam->B_DTEND',
			'$dparam->A_DTSTART_MTD_CURRENT',
			'$dparam->A_DTSTART_MTD_LY',
			'$dparam->A_DTEND_LY',
			'$dparam->B_DTSTART_MTD_CURRENT',
			'$dparam->B_DTSTART_MTD_LY',
			'$dparam->B_DTEND_LY',
			'$dparam->C_DTEND',
			'$dparam->C_DTSTART_MTD_CURRENT',
			'$dparam->C_DTSTART_MTD_LY',
			'$dparam->C_DTEND_LY'		
		";
	}	

	function createFieldSum() {
		return "
			SUM(p.B_SALES_NETT) AS B_SALES_NETT, SUM(p.A_SALES_NETT) AS A_SALES_NETT,
			SUM(p.B_CURRENT_MTD_SALES_NETT) AS B_CURRENT_MTD_SALES_NETT, SUM(p.B_LASTYEAR_MTD_SALES_NETT) AS B_LASTYEAR_MTD_SALES_NETT,
			SUM(p.B_CURRENT_MTD_COGS) AS B_CURRENT_MTD_COGS, SUM(p.B_LASTYEAR_MTD_COGS) AS B_LASTYEAR_MTD_COGS, 
			SUM(p.A_CURRENT_MTD_SALES_NETT) AS A_CURRENT_MTD_SALES_NETT, SUM(p.A_LASTYEAR_MTD_SALES_NETT) AS A_LASTYEAR_MTD_SALES_NETT,
			SUM(p.A_CURRENT_MTD_COGS) AS A_CURRENT_MTD_COGS, SUM(p.A_LASTYEAR_MTD_COGS) AS A_LASTYEAR_MTD_COGS, 
			SUM(p.C_CURRENT_MTD_SALES_NETT) AS C_CURRENT_MTD_SALES_NETT,
			SUM(p.C_LASTYEAR_MTD_SALES_NETT) AS C_LASTYEAR_MTD_SALES_NETT		
		";
	}




	function getBrandDaily() {
		$dparam = $this->dparam;

		$sql_date_params = $this->createDtRangeParam($dparam);
		$sql_fields = $this->createFieldSum();

		$sql = "
			SELECT
				p.UNITGROUP_ID, p.UNIT_ID as SUMOF, 
				$sql_fields
			FROM
			SALESSTAT_DTRANGE_3 (
				$sql_date_params		
			) p
			GROUP BY
			p.UNITGROUP_ID, p.UNIT_ID
		";

		$rows = [];
		$rowtotal = (object)[];
		foreach ($this->db->query($sql) as $row) {
			$this->calculaterow($row);
			$rows[] = $row;
			$this->sum($row, $rowtotal);
		}
		$this->calculaterow($rowtotal);
		require dirname(__FILE__)."/dailyrpt-bendut-day.phtml";
	}

	function getLocationDaily() {
		$dparam = $this->dparam;

		$sql_date_params = $this->createDtRangeParam($dparam);
		$sql_fields = $this->createFieldSum();

		$sql = "
			SELECT
				p.CITY_ID || ' - ' || p.LOCATION_ID as SUMOF, 
				$sql_fields
			FROM
			SALESSTAT_DTRANGE_3 (
				$sql_date_params		
			) p
			GROUP BY
			p.CITY_ID, p.LOCATION_ID
		";

		$rows = [];
		$rowtotal = (object)[];
		foreach ($this->db->query($sql) as $row) {
			$this->calculaterow($row);
			$rows[] = $row;
			$this->sum($row, $rowtotal);
		}
		$this->calculaterow($rowtotal);
		require dirname(__FILE__)."/dailyrpt-bendut-day.phtml";
	}



	function getBrandWeekly() {
		$dparam = $this->dparam;

		$sql_date_params = $this->createDtRangeParam($dparam);
		$sql_fields = $this->createFieldSum();

		$sql = "
			SELECT
				p.UNITGROUP_ID, p.UNIT_ID as SUMOF, 
				$sql_fields
			FROM
			SALESSTAT_DTRANGE_3 (
				$sql_date_params		
			) p
			GROUP BY
			p.UNITGROUP_ID, p.UNIT_ID
		";

		
		$rows = [];
		$rowtotal = (object)[];
		foreach ($this->db->query($sql) as $row) {
			$this->calculaterow($row);
			$rows[] = $row;
			$this->sum($row, $rowtotal);
		}
		$this->calculaterow($rowtotal);

		require dirname(__FILE__)."/dailyrpt-bendut-week.phtml";
		
	}

	
	function getLocationWeekly() {
		$dparam = $this->dparam;

		$sql_date_params = $this->createDtRangeParam($dparam);
		$sql_fields = $this->createFieldSum();

		$sql = "
			SELECT
				p.CITY_ID || ' - ' || p.LOCATION_ID as SUMOF, 
				$sql_fields
			FROM
			SALESSTAT_DTRANGE_3 (
				$sql_date_params		
			) p
			GROUP BY
			p.CITY_ID, p.LOCATION_ID
		";

		
		$rows = [];
		$rowtotal = (object)[];
		foreach ($this->db->query($sql) as $row) {
			$this->calculaterow($row);
			$rows[] = $row;
			$this->sum($row, $rowtotal);
		}
		$this->calculaterow($rowtotal);

		require dirname(__FILE__)."/dailyrpt-bendut-week.phtml";
	}

	

});


