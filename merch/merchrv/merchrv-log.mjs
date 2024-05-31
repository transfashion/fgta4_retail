var this_page_id;

const content = document.getElementById('pnl_editlog-content');


export async function init(opt) {
	this_page_id = opt.id
	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data) {
}




export async function showLog(log) {
	console.log(log);
	// get log data

	var apiurl = `fgta/framework/fglongtask/getlog`;
	var args = {
		log: log
	};

	try {
		let result = await $ui.apicall(apiurl, args);
		console.log(result);

		var pre = document.createElement('pre');
		//pre.appendChild(document.createTextNode(result));
		pre.innerHTML = result;
		
		content.appendChild(pre);

	} catch (err) {
		console.error(err);
	}


}