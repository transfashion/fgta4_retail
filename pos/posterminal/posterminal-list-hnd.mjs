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
	if (row.mapping=='posterminal_setupcode') {
		if (row.record.posterminal_setupcode==null) {
			for (var td of row.tr.children) {
				td.classList.add('row-generated')
			}
		}
	} else if (row.mapping=='posterminal_status') {
		var text = "";
		if (row.record.posterminal_islock==1) {
			text = '<img src="index.php/public/images/iconbar-lock.svg" width="34" height="8">';
		}
		row.td.innerHTML = text;
	}
}	