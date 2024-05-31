let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;



	
}

export function cbo_unit_id_dataloading(criteria, options) {
	criteria.unit_isdisabled=0;
}

export function cbo_unit_id_selected(value, display, record, args) {
	form.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name);
}


export function cbo_merchorderout_id_dataloading(criteria, options) {
	criteria.unit_id = obj.cbo_unit_id.combobox('getValue');
	criteria.merchorderout_iscommit = 1;
}

export function cbo_curr_id_selected(value, display, record, args) {
	form.setValue(obj.txt_merchship_rate, record.curr_rate);
}
	
export function form_newdata(data, options) {
	form.setDisable(obj.cbo_unit_id, false);
}

export function form_dataopened(result, options) {
	form.setDisable(obj.cbo_unit_id, true);
}

export function form_datasaved(result, rowdata, options) {
	form.setDisable(obj.cbo_unit_id, true);
}	



export function btn_bill_click() {
	$ui.getPages().show('pnl_editbill', ()=>{
		var header_data = form.getHeaderData();
		$ui.getPages().ITEMS['pnl_editbill'].handler.OpenDetil(header_data);
	});
}

export function btn_costing_click() {
	$ui.getPages().show('pnl_editcosting', ()=>{
		// console.log('Preview Showed');

	});
}


export function do_other_action(args) {
	var chk_isverify = obj.chk_merchship_isverify;

	if (args.action=='verify') {
		args.xtion_version = '1.1';
		args.act_url = `${global.modulefullname}/xtion-verify`;
		args.act_msg_quest = `Apakah anda yakin verifikasi shipment no ${args.id} ?`;
		args.act_msg_result = `shipment no ${args.id} telah di ${args.action}.`;
		args.act_do = (result) => {
			chk_isverify.checkbox('check');
			form.commit();
		}
	}
}