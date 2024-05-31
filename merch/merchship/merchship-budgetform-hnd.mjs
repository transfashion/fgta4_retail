let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

	
export function form_datasaved(result, rowdata, options) {
	var recordtotalvalue = result.recordtotalvalue ?? 0;
	$('#pnl_editbudgetgrid-totalvalue').html(recordtotalvalue.toLocaleString('en-US'));
}	