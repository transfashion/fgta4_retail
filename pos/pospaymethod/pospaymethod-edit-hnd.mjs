let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

export function cbo_paytype_id_selected(value, display, record, args) {
	console.log(record);

	form.setValue(obj.chk_paytype_iscash, form.toBool(record.paytype_iscash ));	
	form.setValue(obj.chk_paytype_isedc, form.toBool(record.paytype_isedc ));	
	form.setValue(obj.chk_paytype_isonline, form.toBool(record.paytype_isonline ));	
	form.setValue(obj.chk_paytype_istransfer, form.toBool(record.paytype_istransfer ));	
	form.setValue(obj.chk_paytype_isvoucher, form.toBool(record.paytype_isvoucher ));	

	form.setValue(obj.txt_paytype_nameinputtype, record.paytype_nameinputtype);
	form.setValue(obj.txt_paytype_cardinputtype, record.paytype_cardinputtype);
	form.setValue(obj.txt_paytype_apprinputtype, record.paytype_apprinputtype);
	

}	

export function cbo_posterminal_id_dataloading(criteria, options) {
	var site_id = form.getValue(obj.cbo_site_id);
	criteria.site_id = site_id;
	// console.log(site_id);
}