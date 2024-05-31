<?php

try {
			$dparam = new stdClass;
			
			$days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
			$weekday =  date('w', strtotime($date->format('d/m/Y')));

			$dparam->tanggal = $days[$date->format('w')] . ", " . $date->format('d/m/Y');


			$dparam->current_today = clone $date;
			$dparam->lastyear_today = new DateTime(date("Y-m-d", strtotime($dparam->current_today->format('Y-m-d')." -1 year")));

			$dparam->current_yesterday =  new DateTime(date("Y-m-d", strtotime($dparam->current_today->format('Y-m-d')." -1 day")));
			$dparam->lastyear_yesterday = new DateTime(date("Y-m-d", strtotime($dparam->current_yesterday->format('Y-m-d')." -1 year")));

			$dparam->current_2daysago = new DateTime(date("Y-m-d", strtotime($dparam->current_today->format('Y-m-d')." -2 day")));
			$dparam->lastyear_2daysago = new DateTime(date("Y-m-d", strtotime($dparam->current_2daysago->format('Y-m-d')." -1 year")));



			$first_month_date =new DateTime($dparam->current_yesterday->format('Y-m-01'));
			$dparam->current_mtd_start = $first_month_date;
			$dparam->current_mtd_end = clone $date;

			$lastmonthmtd = $this->getLastMonthMTD(clone $date);
			$dparam->lastmonth_mtd_start = $lastmonthmtd->start;
			$dparam->lastmonth_mtd_end = $lastmonthmtd->end;

			$dparam->lastyear_mtd_start = new DateTime(date("Y-m-d", strtotime($dparam->current_mtd_start->format('Y-m-d')." -1 year")));
			$dparam->lastyear_mtd_end = new DateTime(date("Y-m-d", strtotime($dparam->current_mtd_end->format('Y-m-d')." -1 year")));



			$dtiso = $date->format('Y-m-d');
			$rows = array();
			foreach ($this->db->query("SELECT * FROM CON_DT WHERE DT_ID='$dtiso'") as $row) { 
				$rows[] = $row; 
			}

			if (count($rows)==0) { 
				throw new Exception("data week untuk tanggal '$dtiso' tidak ditemukan");  
			}

			$week_start = new DateTime($rows[0]->WEEK_DTSTART);
			$week_end = new DateTime($rows[0]->WEEK_DTEND);
			$dparam->current_week_start = $week_start;
			$dparam->current_week_end = $week_end;
			$dparam->lastyear_week_start = new DateTime(date("Y-m-d", strtotime($week_start->format('Y-m-d')." -1 year")));
			$dparam->lastyear_week_end = new DateTime(date("Y-m-d", strtotime($week_end->format('Y-m-d')." -1 year")));
	
			

			// week sebelumnya
			$rows = array();
			$lastweek_datestart = clone $week_start;
			date_add($lastweek_datestart, date_interval_create_from_date_string('-1 day'));
			$dtiso = $lastweek_datestart->format('Y-m-d');
			foreach ($this->db->query("SELECT * FROM CON_DT WHERE DT_ID='$dtiso'") as $row) { 
				$rows[] = $row; 
			}

			if (count($rows)==0) { 
				throw new Exception("data week untuk tanggal '$dtiso' tidak ditemukan");  
			}
			
			$lastweek_start = new DateTime($rows[0]->WEEK_DTSTART);
			$lastweek_end = new DateTime($rows[0]->WEEK_DTEND);
			$dparam->current_lastweek_start = $lastweek_start;
			$dparam->current_lastweek_end = $lastweek_end;
			$dparam->lastyear_lastweek_start = new DateTime(date("Y-m-d", strtotime($lastweek_start->format('Y-m-d')." -1 year")));
			$dparam->lastyear_lastweek_end = new DateTime(date("Y-m-d", strtotime($lastweek_end->format('Y-m-d')." -1 year")));
	

			// 2 week sebelumnya
			$rows = array();
			$last2week_datestart = clone $lastweek_start;
			date_add($last2week_datestart, date_interval_create_from_date_string('-1 day'));
			$dtiso = $last2week_datestart->format('Y-m-d');
			foreach ($this->db->query("SELECT * FROM CON_DT WHERE DT_ID='$dtiso'") as $row) { 
				$rows[] = $row; 
			}

			if (count($rows)==0) { 
				throw new Exception("data week untuk tanggal '$dtiso' tidak ditemukan");  
			}

			$last2week_start = new DateTime($rows[0]->WEEK_DTSTART);
			$last2week_end = new DateTime($rows[0]->WEEK_DTEND);
			$dparam->current_last2week_start = $last2week_start;
			$dparam->current_last2week_end = $last2week_end;
			$dparam->lastyear_last2week_start = new DateTime(date("Y-m-d", strtotime($last2week_start->format('Y-m-d')." -1 year")));
			$dparam->lastyear_last2week_end = new DateTime(date("Y-m-d", strtotime($last2week_end->format('Y-m-d')." -1 year")));
				

			return $dparam;
		} catch (Exception $ex) {
			throw $ex;
		}