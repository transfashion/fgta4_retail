<?php namespace FGTA4;




class TbDataMap {

	public static $db;
	public static array $REGION = [];
	public static array $SEASON = [];
	public static array $CURRENCY = [];
	public static array $REKANAN = [];
	public static array $BRANCH = [];


	public static function get_region_id_mapping($region_id) : array {
		// kalau data sudah di map sebelumnya, langsung balikin aja, gak perlu baca DB
		if (array_key_exists($region_id, self::$REGION)) {
			return self::$REGION[$region_id];
		}


		// data map belum ada di memory
		try {
			$db = self::$db;



			self::$REGION[$region_id] = [
				'unit_id' => '?',
				'dept_id' => '?'
			];

			return self::$REGION[$region_id];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public static function get_season_id_mapping($season_id) : array {
		// kalau data sudah di map sebelumnya, langsung balikin aja, gak perlu baca DB
		if (array_key_exists($season_id, self::$SEASON)) {
			return self::$SEASON[$season_id];
		}


		// data map belum ada di memory
		try {
			$db = self::$db;



			self::$SEASON[$season_id] = [
				'merchsea_id' => '?'
			];

			return self::$SEASON[$season_id];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public static function get_currency_id_mapping($currency_id) : array {
		// kalau data sudah di map sebelumnya, langsung balikin aja, gak perlu baca DB
		if (array_key_exists($currency_id, self::$CURRENCY)) {
			return self::$CURRENCY[$currency_id];
		}


		// data map belum ada di memory
		try {
			$db = self::$db;



			self::$CURRENCY[$currency_id] = [
				'curr_id' => '?'
			];

			return self::$CURRENCY[$currency_id];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public static function get_rekanan_id_mapping($rekanan_id) : array {
		// kalau data sudah di map sebelumnya, langsung balikin aja, gak perlu baca DB
		if (array_key_exists($rekanan_id, self::$REKANAN)) {
			return self::$REKANAN[$rekanan_id];
		}


		// data map belum ada di memory
		try {
			$db = self::$db;



			self::$REKANAN[$rekanan_id] = [
				'partner_id' => '?'
			];

			return self::$REKANAN[$rekanan_id];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public static function get_branch_id_mapping($region_id, $branch_id) : array {
		$regionbranch = "$region_id:$branch_id";
		
		// kalau data sudah di map sebelumnya, langsung balikin aja, gak perlu baca DB
		if (array_key_exists($regionbranch, self::$BRANCH)) {
			return self::$BRANCH[$regionbranch];
		}


		// data map belum ada di memory
		try {
			$db = self::$db;



			self::$BRANCH[$regionbranch] = [
				'site_id' => '?',
				'dept_id' => '?'
			];

			return self::$BRANCH[$regionbranch];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


}