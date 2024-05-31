<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


$API = new class extends guestbookdisplayBase {
	public function execute(object $args) : object {
		
		$crmevent_id = $args->crmevent_id;
		try {

			$data = $this->createDummyData();
			$data_tfb = $this->getUnattend($crmevent_id, 'TFB');
			$data_metro = $this->getUnattend($crmevent_id, 'METRO');
			$data_tfi = $this->getUnattend($crmevent_id, 'TFI');




			$list1 = $this->createRandomList($data_tfb, 10);
			$list2 = $this->createRandomList($data_metro, 10);
			$list3 = $this->createRandomList($data_tfi, 10);

			// $pie1 = $this->createDummyPieData();
			// $pie2 = $this->createDummyPieData();
			// $pie3 = $this->createDummyPieData();

			$pie1 = $this->getPieData($crmevent_id, 'TFB');
			$pie2 = $this->getPieData($crmevent_id, 'METRO');
			$pie3 = $this->getPieData($crmevent_id, 'TFI');
			

			$ret = new \stdClass;
			$ret->success = true;
			$ret->args = $args;
			$ret->crmevent_id = $crmevent_id;
			$ret->datarespond = [
				'c1' => [
					'pie' => $pie1,
					'list' => $list1
				],
				'c2' => [
					'pie' => $pie2,
					'list' => $list2
				],
				'c3' => [
					'pie' => $pie3,
					'list' => $list3
				],
			];

			return $ret; 
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	function createDummyPieData() {
		$hadir = random_int (3 ,90 );
		$belumhadir = 100 - $hadir;
		return [$hadir, $belumhadir];
	}

	function getPieData(string $crmevent_id, string $address) : array {
		try {
			$sql = "
				SELECT 
				A.crmevent_id,
				(select count(crmeventinvited_id) from trn_crmeventinvited where crmevent_id = A.crmevent_id and crmeventinvited_address= :address) as invited,
				(select count(crmeventattendant_id) from trn_crmeventattendant where crmevent_id = A.crmevent_id  and crmeventattendant_address = :address) as attendant
				FROM trn_crmevent A
				WHERE
				A.crmevent_id = :crmevent_id		
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':crmevent_id'=>$crmevent_id, ':address'=>$address]);
			$row = $stmt->fetch();
			if ($row==null) {
				return [100, 0];
			} else {
				return [$row['attendant'], $row['invited']];
			}

		} catch (\Exception $ex) {
			throw $ex;
		}

	}


	function createRandomList(array $array, int $numRandoms) : array {
		$final = array();
		$count = count($array);
		if ($count >= $numRandoms) {
			while (count($final) < $numRandoms) {
				$random = $array[rand(0, $count - 1)];
				if (!in_array($random, $final)) {
					array_push($final, $random);
				}
			}
		}
		sort($final);
		return $final;
	}

	function getUnattend(string $crmevent_id, string $address) : array {
		try {
			$sql = "
				select 
				A.crmeventinvited_name, A.crmeventinvited_phone 
				from 
				trn_crmeventinvited A  
				where 
				A.crmevent_id = :crmevent_id
				and A.crmeventinvited_address = :address
				and A.crmeventinvited_phone NOT IN (
					select 
					crmeventattendant_phone
					from 
					trn_crmeventattendant
					where
					A.crmevent_id = :crmevent_id
				)
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([':crmevent_id'=>$crmevent_id, ':address'=>$address]);
			$rows = $stmt->fetchall();
			$records = [];
			foreach ($rows as $row) {
				$records[] = $row['crmeventinvited_name'];
			}		

			return $records;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function createDummyData() : array {
		return [
			'DOMINO (GOVINDA)',
			'3 DIVA',
			'DRAKHMA',
			'5 WANITA',
			'DRIVE',
			'7 ICONS',
			'DUO KRIBO',
			'AB THREE',
			'DUO MAIA',
			'ADA BAND',
			'DYGTA',
			'ADARAPTA',
			'ECOUTEZ!',
			'ADRIAN MARTADINATA',
			'EDANE',
			'AKA (UCOK HRHP)',
			'EFEK RUMAH KACA',
			'ALEXA',
			'EKA SAPTA',
			'ANDRA & THE BACKBONE',
			'ELEMENT',
			'ANGKASA',
			'ELPAMAS',
			'ANIMA',
			'ENDANK SOEKAMTI',
			'ARES',
			'FEATHER BAND',
			'ARMADA',
			'FIVE MINUTES',
			'ASBAK BAND',
			'FLANELLA',
			'UNDERGROUND INDONESIA (PAS)',
			'FUNERAL INCEPTION',
			'BARON SOULMATE',
			'FUNK DE JAVA',
			'BASE JAM',
			'G 2',
			'BATIK TRIBE',
			'GADIZ',
			'BESIDE',
			'GARASI',
			'BHASKARA',
			'GEISHA',
			'BIG BOSS',
			'GETAH',
			'BIMA',
			'GIGI',
			'BIMBO',
			'GOD BLESS',
			'BIP',
			'GOLIATH',
			'BLACKOUT',
			'GONG 2000',
			'BOOMERANG',
			'GOODBOY BADMINTON',
			'BRAGI',
			'GOODNIGHT ELECTRIC',
			'BUKAN BINTANG BIASA',
			'GRADASI',
			'BUNGLON',
			'GRUVI',
			'BURGERKILL',
			'HARMONY CHINESE MUSIC GROUP',
			'CAFFEINE',
			'HELL O',
			'CANDY',
			'HIJAU DAUN',
			'CHARLY’S ANGELS',
			'INDONESIA ALL STARS',
			'CHASEIRO',
			'JAGOSTU',
			'CHIRCLE BAND',
			'JAMAICA CAFÉ',
			'CLUBEIGHTIES',
			'JAVA JIVE',
			'COKELAT',
			'JIKUSTIK',
			'DARA PUSPITA',
			'J-ROCKS',
			'D’BAGINDAS',
			'JULIETTE',
			'D’CINNAMONS',
			'JUMBO JET',
			'DEADSQUAD',
			'KAHITNA',
			'DEATH VOMIT',
			'KANGEN BAND',
			'DEBU',
			'KARIMATA',
			'DEWA 19',
			'KEN',
			'DEWI DEWI',
			'KERISPATIH',
			'DIEZTRO PUNK',
			'KEYLA',
			'DISCUS',
			'KILLING ME INSIDE'			
		];
	}
};
