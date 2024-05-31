let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	obj.chk_promoabrule_ishasgroupa.checkbox({ onChange: (checked) => { chk_promoabrule_ishasgroupa_changed(checked) }});
	obj.chk_promoabrule_ishasgroupb.checkbox({ onChange: (checked) => { chk_promoabrule_ishasgroupb_changed(checked) }});

	
}


export function form_dataopened(result, options) {
	chk_promoabrule_ishasgroupa_changed();
	chk_promoabrule_ishasgroupb_changed();
}

export function form_newdata(data, options) {
	data.promoab_a_qtymax = 10;
	data.promoab_b_qtymax = 10;

	options.OnNewData = () => {
		chk_promoabrule_ishasgroupa_changed();
		chk_promoabrule_ishasgroupb_changed();
	}
}
	
export function cbo_promoabrule_id_selected(value, display, record, args) {

	form.setValue(obj.txt_promoabrule_code, record.promoabrule_code);
	form.setValue(obj.chk_promoabrule_ishasgroupa, form.toBool(record.promoabrule_ishasgroupa));
	form.setValue(obj.chk_promoabrule_ishasgroupb, form.toBool(record.promoabrule_ishasgroupb));

	chk_promoabrule_ishasgroupa_changed();
	chk_promoabrule_ishasgroupb_changed();
}	


export function cbo_a_promoabrulesection_id_dataloading(criteria, options) {
	var promoabrule_id = form.getValue(obj.cbo_promoabrule_id);
	criteria.promoabrule_id = promoabrule_id;
}

export function cbo_a_promoabrulesection_id_selected(value, display, record, args) {
	form.setValue(obj.txt_promoab_a_label ,record.promoabrulesection_name);
}

export function cbo_b_promoabrulesection_id_dataloading(criteria, options) {
	var promoabrule_id = form.getValue(obj.cbo_promoabrule_id);
	criteria.promoabrule_id = promoabrule_id;
}

export function cbo_b_promoabrulesection_id_selected(value, display, record, args) {
	form.setValue(obj.txt_promoab_b_label ,record.promoabrulesection_name);
}





function chk_promoabrule_ishasgroupa_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_promoabrule_ishasgroupa);
	}

	// group-a
	var formrows = document.querySelectorAll('.group-a');
	for (var el of formrows) {
		if (checked) {
			el.classList.remove('group-hidden');
		} else {
			el.classList.add('group-hidden');
		}
	}

	if (checked) {
		var promptMandatory = form.getDefaultPrompt(true)
		obj.cbo_a_promoabrulesection_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_a_promoabrulesection_id', 'Rule Section A harus diisi'));
		obj.txt_promoab_a_label.revalidate({required: true, invalidMessage:  'Label A harus diisi'})
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_a_promoabrulesection_id, promptMandatory.value, promptMandatory.text);
		}
	} else {
		var promptOptional = form.getDefaultPrompt(false)
		obj.cbo_a_promoabrulesection_id.revalidate(form.optionalValidation());
		obj.txt_promoab_a_label.revalidate({required: false, invalidMessage:  null})
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_a_promoabrulesection_id, promptOptional.value, promptOptional.text);
		}
	}
}


function chk_promoabrule_ishasgroupb_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_promoabrule_ishasgroupb);
	}

	// group-b
	var formrows = document.querySelectorAll('.group-b');
	for (var el of formrows) {
		if (checked) {
			el.classList.remove('group-hidden');
		} else {
			el.classList.add('group-hidden');
		}
	}
	
	if (checked) {
		var promptMandatory = form.getDefaultPrompt(true)
		obj.cbo_b_promoabrulesection_id.revalidate(form.mandatoryValidation('pnl_edit-cbo_b_promoabrulesection_id', 'Rule Section B harus diisi'));
		obj.txt_promoab_b_label.revalidate({required: true, invalidMessage:  'Label B harus diisi'})
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_b_promoabrulesection_id, promptMandatory.value, promptMandatory.text);
		}
	} else {
		var promptOptional = form.getDefaultPrompt(false)
		obj.cbo_b_promoabrulesection_id.revalidate(form.optionalValidation());
		obj.txt_promoab_b_label.revalidate({required: false, invalidMessage:  null})
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_b_promoabrulesection_id, promptOptional.value, promptOptional.text);
		}
	}	
}