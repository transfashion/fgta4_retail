

const btn_createnew = $('#pnl_list-btn_createnew')
const btn_testapi = $('#pnl_list-btn_testapi')

var this_page_id;
var this_page_num;

export async function init(opt) {
	this_page_id = opt.id
	this_page_num = opt.pagenum
	
	btn_createnew.linkbutton({
		onClick: () => { btn_createnew_click() }
	})

	btn_testapi.linkbutton({
		onClick: () => { btn_testapi_click(); }
	})

} 

function btn_createnew_click() {
	$ui.getPages().show('pnl_form')
}



function btn_testapi_click() {
	let ajax_args = {
		site_id: 'HBS-PI',
		stockdate: '2019-09-04'
	}

	let ajax_call = async (args, fn_callback) => {
		let apiurl = $ui.apis.getstocksite
		try {
			let result = await $ui.apicall(apiurl, args)
			fn_callback(null, result)
		} catch (err) {
			fn_callback(err)
		}
	}

	$ui.mask('wait ...')
	ajax_call(ajax_args,  (err, result) => {
		$ui.unmask();
		if (err) {
			console.error(err)
		} else {
			console.log('done')
		}	
	})


}


// function btn_testapi_click() {
	
// 	$ui.mask(`
// 		<div class="fgdialog-vf" style="width: 300px; height: 150px;">
// 			<div style="flex: 1; text-align: left">
// 				<div style="font-weight: bold; font-size: 1.3em; margin-bottom: 10px">
// 					Session Expired
// 				</div>
// 				<div style="font-size: 0.8em">
// 					belum login atau session anda telah habis.<br>
// 					anda akan diredirect ke halaman login.
// 				</div>
// 			</div>
// 			<div style="text-align: right; height: 25px">
// 				<button class="btn waves-effect blue" onclick="$ui.redirecttologinpage()">Add</button>
// 			</div>
// 		</div>`
// 	)
// }