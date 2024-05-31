let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}


export function cbo_site_id_dataloading(criteria, options) {
	var header_data = form.getHeaderData();
	var brand_id = header_data.brand_id;
	
	options.load_branch_id = true;
	criteria.site_isdisabled = 0;
	criteria.brand_id = brand_id;
}

export function cbo_site_id_selected(value, display, record, args) {
	form.setValue(obj.txt_site_code, record.branch_id);
}
	