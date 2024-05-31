let grd_list, opt;
var this_page_id;
var this_page_options;

const btn_importdata = $('#pnl_edititemsgrid-btn_importdata');

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	btn_importdata.linkbutton({
		onClick: () => { btn_importdata_click() }
	});


	fn_callback();
}

	
function btn_importdata_click() {
	var header_data = grd_list.getHeaderData(); 
	$ui.getPages().show('pnl_editimportdata', ()=>{
		var args = { 
			header_data: header_data
		}
		$ui.getPages().ITEMS['pnl_editimportdata'].handler.setupDataToImport(args);
	})
}