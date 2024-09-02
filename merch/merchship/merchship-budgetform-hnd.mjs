let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	obj.txt_merchshipbudget_value.numberbox({ 
		onChange: (oldval, newval) => { txt_merchshipbudget_value_changed(oldval, newval) }
	});

	obj.txt_curr_rate.numberbox({ 
		onChange: (oldval, newval) => { txt_curr_rate_changed(oldval, newval) }
	});

	
}

	
export function form_datasaved(result, rowdata, options) {
	var recordtotalvalue = result.recordtotalvalue ?? 0;
	$('#pnl_editbudgetgrid-totalvalue').html(recordtotalvalue.toLocaleString('en-US'));
}	

function txt_merchshipbudget_value_changed(oldval, newval) {
	value_changed();
}

function txt_curr_rate_changed(oldval, newval) {
	value_changed();
}

function value_changed() {
	var value = form.getValue(obj.txt_merchshipbudget_value);
	var rate = form.getValue(obj.txt_curr_rate);
	var idr = value*rate;
	form.setValue(obj.txt_merchshipbudget_idr, idr);
}


