let grd_list, opt;
var this_page_id;
var this_page_options;

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	
	fn_callback();
}

	
export function grd_list_rowrender(row) {
	// {td:td, mapping:td.mapping, text:td.innerHTML}
	// console.log(row.record.merchsea_isdisabled)
	if (row.record.merchsea_isdisabled==1) {
		row.td.classList.add('row-disabled')
	}
}