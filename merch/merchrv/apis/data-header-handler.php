<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . "/core/sequencer.php";
use \FGTA4\utils\Sequencer;


class merchrv_headerHandler extends WebAPI  {

		// Incremental tahunan based on unit_id
		public function CreateNewId(object $obj) : string {
			try {
				$seqname = 'RV';
				$dt = new \DateTime();	
				$seqgroup = $obj->unit_id;
				$ye = $dt->format("y");
				$mo = $dt->format("m");
				$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['seqgroup', 'ye', 'mo']);
				$raw = $seq->getraw(['seqgroup'=>$seqgroup, 'ye'=>$ye, 'mo'=> 0]);
				$id = $seqname . '/' . $raw['seqgroup'] . '/' . $raw['ye'] . $mo . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
				return $id;	
			} catch (\Exception $ex) {
				throw $ex;
			}
		}

}		
		
		
		