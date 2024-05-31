var this_page_id;


const pnl_board = $('#pnl_stores-board')

export async function init(opt) {
	this_page_id = opt.id


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_form')
		}
	})	


}


export async function loadsite() {
	// $ui.mask('wait...')
	var sites = getSite();
	for (var site of sites) {
		console.log(site)

		let id = site.id
		var obj = document.createElement("div")


		var lnk = document.createElement("a")
		lnk.onclick = () => { selectsite(id)  } 

		$(lnk).html(site.name)
		$(lnk).css({"cursor":"pointer"})

		$(obj).append(lnk)
		$(obj).css({"margin-bottom": "20px"})

		$(pnl_board).append(obj)

	}

}


function selectsite(id) {
	$ui.getPages().show('pnl_form')
	$ui.getPages().ITEMS['pnl_form'].handler.selectsite(id)
}

function getSite() {
	return [
		{id:'HBS-BSM', name:'HBS-BSM'},
		{id:'FRG-BSM', name:'FRG-BSM'},
		{id:'FLA-BSM', name:'FLA-BSM'},
		{id:'EAG-BSM', name:'EAG-BSM'},
		{id:'GEX-BSM', name:'GEX-BSM'},

		{id:'BZR-CWS', name:'BZR-CWS'},
		{id:'BZR-GI', name:'BZR-GI'},
		{id:'BZR-PANIN', name:'BZR-PANIN'},
		{id:'CAN-PI', name:'CAN-PI'},
		{id:'CAN-PP', name:'CAN-PP'},
		{id:'CENTRAL-GI', name:'CENTRAL-GI'},
		{id:'CENTRAL-NSH', name:'CENTRAL-NSH'},
		{id:'DC-JKT', name:'DC-JKT'},
		{id:'DEALER', name:'DEALER'},
		{id:'EAG-BSM', name:'EAG-BSM'},
		{id:'EAG-CP', name:'EAG-CP'},
		{id:'EAG-CWS', name:'EAG-CWS'},
		{id:'EAG-PI', name:'EAG-PI'},
		{id:'EAG-PIM', name:'EAG-PIM'},
		{id:'EAG-TP4', name:'EAG-TP4'},
		{id:'EAG-TSM', name:'EAG-TSM'},
		{id:'FLA-BSM', name:'FLA-BSM'},
		{id:'FLA-CP', name:'FLA-CP'},
		{id:'FLA-CWS', name:'FLA-CWS'},
		{id:'FLA-GC', name:'FLA-GC'},
		{id:'FLA-PI', name:'FLA-PI'},
		{id:'FLA-SC', name:'FLA-SC'},
		{id:'FLA-TP3', name:'FLA-TP3'},
		{id:'FLA-TSM', name:'FLA-TSM'},
		{id:'FRG-BSM', name:'FRG-BSM'},
		{id:'FRG-CWS', name:'FRG-CWS'},
		{id:'FRG-PI', name:'FRG-PI'},
		{id:'FRG-SC', name:'FRG-SC'},
		{id:'GEX-BSM', name:'GEX-BSM'},
		{id:'GEX-CPO', name:'GEX-CPO'},
		{id:'GEX-GC', name:'GEX-GC'},
		{id:'GEX-KOCAS', name:'GEX-KOCAS'},
		{id:'GEX-PIM', name:'GEX-PIM'},
		{id:'GEX-TP5', name:'GEX-TP5'},
		{id:'GEX-TSM', name:'GEX-TSM'},
		{id:'HBO-CWS', name:'HBO-CWS'},
		{id:'HBS-BSM', name:'HBS-BSM'},
		{id:'HBS-CP', name:'HBS-CP'},
		{id:'HBS-CWS', name:'HBS-CWS'},
		{id:'HBS-PI', name:'HBS-PI'},
		{id:'HBS-PIM', name:'HBS-PIM'},
		{id:'HBS-PP', name:'HBS-PP'},
		{id:'HBS-TP4', name:'HBS-TP4'},
		{id:'HBS-TSM', name:'HBS-TSM'},
		{id:'HO', name:'HO'},
		{id:'LOTTE-CWK', name:'LOTTE-CWK'},
		{id:'METRO-PIM', name:'METRO-PIM'},
		{id:'METRO-PS', name:'METRO-PS'},
		{id:'METRO-PURI', name:'METRO-PURI'},
		{id:'SEIBU-GI', name:'SEIBU-GI'},
		{id:'TEMP-CWS', name:'TEMP-CWS'},
		{id:'TEMP-GC', name:'TEMP-GC'},
		{id:'TEMP-KC', name:'TEMP-KC'},
		{id:'TEMP-KOCAS', name:'TEMP-KOCAS'},
		{id:'TEMP-PIM', name:'TEMP-PIM'},
		{id:'TEMP-SC', name:'TEMP-SC'},
		{id:'TOD-CWS', name:'TOD-CWS'},
		{id:'TOD-PI', name:'TOD-PI'},
		{id:'TOD-PP', name:'TOD-PP'},
		{id:'TEMP-KV', name:'TEMP-KV'},
		{id:'TMBJM', name:'TMBJM'},
		{id:'FLA-PIM', name:'FLA-PIM'},
		{id:'FLA-TPC', name:'FLA-TPC'},
		{id:'GEX-TPC', name:'GEX-TPC'},
		{id:'EAG-TPC', name:'EAG-TPC'},
		{id:'STFSALE-DC', name:'STFSALE-DC'},
		{id:'JDID', name:'JDID'},
		{id:'BZR-FSG', name:'BZR-FSG'},
		{id:'EAG-SC', name:'EAG-SC'},
		{id:'GEX-PKW', name:'GEX-PKW'},
		{id:'GEX-GI', name:'GEX-GI'},
		{id:'HBS-SC', name:'HBS-SC'},
		{id:'TFI-TPC', name:'TFI-TPC'},
		{id:'TEMP-PIK', name:'TEMP-PIK'},
		{id:'FACTORY', name:'FACTORY'},
		{id:'BZR-PORSCHE', name:'BZR-PORSCHE'},
		{id:'BZR-TGK', name:'BZR-TGK'}
				

	]
}