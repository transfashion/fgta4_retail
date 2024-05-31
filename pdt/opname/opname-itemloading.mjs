const pbr_itemprogress = $('#pnl_itemloading-pbr_itemprogress')
const obj = {
	txt_itemprogressload : $('#pnl_itemloading-txt_itemprogressload'),
	txt_itemtobeload : $('#pnl_itemloading-txt_itemtobeload')
}




export async function init(opt) {

}


export function loaderprogresscheck(totallength, fn_completed) {
	obj.txt_itemtobeload.html(totallength)
	var loadcheck = setInterval(()=>{


		var itemprogress = $ui.getPages().ITEMS['pnl_form'].handler.itemprogress
		
		
		if (itemprogress >= totallength) {
			$ui.getPages()
				.show('pnl_scan')
				.handler.init_info()

			clearInterval(loadcheck)	

			if (typeof fn_completed == 'function') {
				$ui.getPages().ITEMS['pnl_form'].handler.itemprogress = 0
				fn_completed()
			}
		} else {
			obj.txt_itemprogressload.html(itemprogress)

			var progress = Math.round(100*(itemprogress/totallength))
			pbr_itemprogress.progressbar('setValue', progress);

			console.log(progress)
		}
	}, 1000)
}