<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

class PosMain extends WebModule {

	public function LoadPage() {
		// $this->preloadscripts = [
		// 	'jslibs/qrious.js'
		// ];

		
	}

	public function ShortcutButton($text, $icon, $shorcutkey) {
		return "
		<div class=\"shortcutbutton-content\">
			<div style=\"height: 14px; margin-top: 0px; padding-top: 0px;\">$shorcutkey</div>
			<div style=\"height: 32px\"><img src=\"index.php/asset/retail/pos/main/icons/$icon\" height=\"32px\" width=\"32px\"></div>
			<div style=\"height: 20px; line-height: 14px; margin-top: 4px\">$text</div>
		</div>		
		";
	}
}


$MODULE = new PosMain();