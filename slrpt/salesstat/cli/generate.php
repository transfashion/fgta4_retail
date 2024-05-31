<?php


/*
Cara pakai

   perkemarin:   $ php cli.php retail/slrpt/salesstat/generate
   bydate:       $ php cli.php retail/slrpt/salesstat/generate --date 2020-07-23 

*/

require_once __ROOT_DIR . "/rootdir/phpmailer/class.phpmailer.php";
require_once __ROOT_DIR . "/rootdir/phpmailer/class.smtp.php";
require_once __ROOT_DIR . "/rootdir/phpoffice_phpspreadsheet_1.13.0.0/vendor/autoload.php";

require_once __DIR__ . '/generate-data.php';
require_once __DIR__ . '/generate-sheet.php';
require_once __DIR__ . '/generate-sheet-byunit.php';
require_once __DIR__ . '/generate-sheet-bysite.php';
require_once __DIR__ . '/generate-sheet-byclassgro.php';


use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


define('GTT_DAILYSALES', 'GTT_DAILYSALES2');

console::class(new class($args) extends cli {
	const NAMANAMAHARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

	function __construct($args) {
		$this->args = $args;

	
		$logfilepath = __LOCALDB_DIR . "/output/log-salesstat.txt";
		echo "using log: $logfilepath\r\n";
		debug::start($logfilepath, "w");

		// Connect to DSR
		$DB_CONFIG = DB_CONFIG['DSR'];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM['mariadb'];
		debug::log("connecting to DSR ...", ['nonewline'=>true]);
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	
		debug::log(color::green . "Connected" . color::reset);



		// Connect to DSR
		$DB_CONFIG = DB_CONFIG['FGTA2'];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM['mariadb'];
		debug::log("connecting to FGTA2 ...", ['nonewline'=>true]);
		$this->db_fgta2 = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	
		debug::log(color::green . "Connected" . color::reset);



		// Connect to SQL Server
		$FRMCONNAME = 'FRM2';
		// if(strcasecmp(substr(PHP_OS, 0, 3), 'WIN') == 0){
		// 	$FRMCONNAME = 'FRM2_WIN';
		// }
		
		$DB_CONFIG_FRM = DB_CONFIG[$FRMCONNAME];
		$DB_CONFIG_FRM['param'] = DB_CONFIG_PARAM['mssql'];
		debug::log("connecting to FRM ...", ['nonewline'=>true]);
		$this->db_frm2 = new \PDO(
			$DB_CONFIG_FRM['DSN'], 
			$DB_CONFIG_FRM['user'], 
			$DB_CONFIG_FRM['pass'],
			$DB_CONFIG_FRM['param']
		);		
		debug::log(color::green . "Connected" . color::reset);
	}

	function execute() {
		try {
			$ret = salesstat_generate($this);
			debug::log(color::green . "DONE." . color::reset);
			return $ret;
		} catch (Exception $ex) {
			debug::log(color::red . "ERROR" . color::reset);
			debug::log($ex->getMessage());
			throw $ex;
		} finally {
			debug::close();
		}
	}


});


function getRecepient($self) {
	$mailtarget = __LOCALDB_DIR . "/mailtarget/salesstat.json";
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


function salesstat_generate($self) {
	$currentdate = new DateTime();
	$reportdate = new DateTime(date("Y-m-d", strtotime($currentdate->format('Y-m-d')." -1 day")));


	try {

		$result = salesstat_generatedata($self, $reportdate->format('Y-m-d'));
		$dateparam = $result->dateparam;

		$dt = new DateTime(date("Y-m-d", strtotime($dateparam->current_date_end)));
		$filename = 'salesstat-' .  $dt->format('Ymd') .'.xlsx';
		$filepath = __LOCALDB_DIR . "/output/$filename";

		debug::log('Create SpreadSheet...');
		$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
		$doc = $reader->load(__DIR__ . '/template.xlsx');
		$doc->getProperties()->setCreator("Agung Nugroho DW")
							->setLastModifiedBy("Agung Nugroho DW")
							->setTitle("Judul Dokumen yang dibuat pakai PHP")
							->setSubject("Judul Dokumen yang dibuat pakai PHP");
	
		$doc->sheets = [];
		$doc->setActiveSheetIndex(0);
		$doc->sheets['byunit'] = $doc->getActiveSheet();
		$doc->setActiveSheetIndex(1);
		$doc->sheets['bysite'] = $doc->getActiveSheet();
		$doc->setActiveSheetIndex(2);
		$doc->sheets['byclassgro'] = $doc->getActiveSheet();
		
		salesstat_generatesheet_byunit($self, $dt, $doc->sheets['byunit'], $result->data_byunit);
		salesstat_generatesheet_bysite($self, $dt, $doc->sheets['bysite'], $result->data_bysite);
		salesstat_generatesheet_byclassgro($self, $dt, $doc->sheets['byclassgro'], $result->data_byclassgro);


		$doc->setActiveSheetIndex(0);
		$writer = new Xlsx($doc);
		$writer->save($filepath);

		$recipients = getRecepient($self);
		$subject = "Sales statistic v2 per " . $dt->format('Ymd');
		$message = "Dear All,<br>\r\n<br>\r\nAttached bellow is Sales Statistic Report per ". $dt->format('Ymd') .".<br>\r\n<br>\r\nRegards,<br>\r\nAgung Nugroho";
		$attachments = [$filepath];


		kirimMail($self, $recipients, $subject, $message, $attachments);	

		unlink($filepath);
		
	} catch (Exception $ex) {
		throw $ex;
	}
}

function CreateSheet($doc, $sheetsinfo) {
	$sheets = [];
	$i=0;
	foreach ($sheetsinfo as $name => $title) {
		if ($i==0) {
			$doc->setActiveSheetIndex(0);
			$sheet = $doc->getActiveSheet();
		} else {
			$sheet = $doc->createSheet();
		}
		$sheet->setTitle($title);
		$sheets[$name] = $sheet;
		$i++;
	}	
}



function kirimMail($self, $recipients, $subject, $message, $attachments) {
	try {
		$self->SendMail($recipients, $subject, $message, $attachments);
	} catch (Exception $ex) {
		throw $ex;
	}
}
