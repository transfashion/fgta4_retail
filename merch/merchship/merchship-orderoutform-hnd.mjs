let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;	
}


export function cbo_merchorderout_id_selected(value, display, record, args) {
	form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name);
	form.setValue(obj.cbo_merchsea_id, record.merchsea_id, record.merchsea_name);
	form.setValue(obj.txt_orderout_qty, record.orderout_outstdqty);
	form.setValue(obj.txt_orderout_valuefrg, record.orderout_outstdvaluefrg);
}
	
	