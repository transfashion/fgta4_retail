let editor, form, obj, opt;


const btn_download = $('#pnl_edit-btn_download');


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	obj.chk_promoabrule_ishasgroupa.checkbox({ onChange: (checked) => { chk_promoabrule_ishasgroupa_changed(checked) }});
	obj.chk_promoabrule_ishasgroupb.checkbox({ onChange: (checked) => { chk_promoabrule_ishasgroupb_changed(checked) }});


	btn_download.linkbutton({ onClick: () => { 
		var args = { action: 'download', cancel: false, param: {}};
		editor.btn_action_click({ 
			action: args.action, 
			param: args.param 
		
		}); 
	}});			

}

export function form_newdata(data, options) {
	data.promoabrule_name = "";
	data.promoabrule_ispaymdiscallowed = true;
	data.promoabrule_timestart = '00:00:00';
	data.promoabrule_timeend = '59:59:59';

	options.OnNewData = () => {
		chk_promoabrule_ishasgroupa_changed();
		chk_promoabrule_ishasgroupb_changed();
	}
}

export function form_dataopened(result, options) {
	chk_promoabrule_ishasgroupa_changed();
	chk_promoabrule_ishasgroupb_changed();
}


export function cbo_brand_id_dataloading(criteria, options) {
	options.load_region_id = true;
	criteria.brand_isdisabled = 0;
}

export function cbo_brand_id_selected(value, display, record, args) {
	console.log(record);
	form.setValue(obj.txt_brand_nameshort, record.brand_nameshort);
}	

export function cbo_promoabmodel_id_selected(value, display, record, args) {
	console.log(record);
	form.setValue(obj.txt_promoabrule_name, record.promoabrule_name);
	// form.setValue(obj.txt_promoabrule_descr, record.promoabmodel_descr);

	form.setValue(obj.cbo_promoabrule_id, record.promoabrule_id, record.promoabrule_name);
	form.setValue(obj.chk_promoabrule_ishasgroupa, form.toBool(record.promoabrule_ishasgroupa));
	form.setValue(obj.chk_promoabrule_ishasgroupb, form.toBool(record.promoabrule_ishasgroupb));


	
	form.setValue(obj.cbo_a_promoabrulesection_id, record.a_promoabrulesection_id, record.a_promoabrulesection_name);
	form.setValue(obj.txt_promoab_a_label, record.promoab_a_label);
	form.setValue(obj.txt_promoab_a_qtymax, record.promoab_a_qtymax);
	form.setValue(obj.txt_promoab_a_disc, record.promoab_a_disc);
	form.setValue(obj.chk_promoab_a_isreplacedisc, form.toBool(record.promoab_a_isreplacedisc));
	form.setValue(obj.chk_promoab_a_isblockonmeet, form.toBool(record.promoab_a_isblockonmeet));

	form.setValue(obj.cbo_b_promoabrulesection_id, record.b_promoabrulesection_id, record.b_promoabrulesection_name);
	form.setValue(obj.txt_promoab_b_label, record.promoab_b_label);
	form.setValue(obj.txt_promoab_b_qtymax, record.promoab_b_qtymax);
	form.setValue(obj.txt_promoab_b_disc, record.promoab_b_disc);
	form.setValue(obj.chk_promoab_b_isreplacedisc, form.toBool(record.promoab_b_isreplacedisc));
	form.setValue(obj.chk_promoab_b_isblockonmeet, form.toBool(record.promoab_b_isblockonmeet));

	form.setValue(obj.txt_promoabrule_code, record.promoabrule_code);

}

export function form_datasaveerror(err, options) {
	if (err.errorcode>1000) {
		$ui.ShowMessage(err.errormessage);
	}
}

export function form_updatebuttonstate(record) {
	var button_download_on = false;	

	if (record.promoab_iscommit=="1") {
		button_download_on = true
	} else {
		button_download_on = false;
	}


	btn_download.linkbutton(button_download_on ? 'enable' : 'disable');		
}


export function do_other_action(args) {
	switch (args.action) {
		case 'download' :
			args.cancel = true;
			btn_download_click(args)
			break;
	}
}


function chk_promoabrule_ishasgroupa_changed(checked) {
	if (checked===undefined) {
		checked = form.getValue(obj.chk_promoabrule_ishasgroupa);
	}

	console.log('test tsets');

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
		obj.txt_promoab_a_label.revalidate({required: true, invalidMessage:  'Label A harus diisi'});
		obj.txt_promoab_a_itemlist.revalidate({required: true, invalidMessage:  'Item List A harus diisi'});
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_a_promoabrulesection_id, promptMandatory.value, promptMandatory.text);
		}
	} else {
		var promptOptional = form.getDefaultPrompt(false)
		obj.cbo_a_promoabrulesection_id.revalidate(form.optionalValidation());
		obj.txt_promoab_a_label.revalidate({required: false, invalidMessage:  null});
		obj.txt_promoab_a_itemlist.revalidate({required: false, invalidMessage:  null});
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
		obj.txt_promoab_b_label.revalidate({required: true, invalidMessage:  'Label B harus diisi'});
		obj.txt_promoab_b_itemlist.revalidate({required: true, invalidMessage:  'Item List A harus diisi'});
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_b_promoabrulesection_id, promptMandatory.value, promptMandatory.text);
		}
	} else {
		var promptOptional = form.getDefaultPrompt(false)
		obj.cbo_b_promoabrulesection_id.revalidate(form.optionalValidation());
		obj.txt_promoab_b_label.revalidate({required: false, invalidMessage:  null});
		obj.txt_promoab_b_itemlist.revalidate({required: false, invalidMessage:  null})
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_b_promoabrulesection_id, promptOptional.value, promptOptional.text);
		}
	}	
}


function btn_download_click(args) {	
	var param = {
		id: args.id
	}
	var mask = $ui.mask('wait..');
	$ui.download(global.modulefullname + '/xtion-download', param, (response, err)=>{
		if (err!=null) {
			$ui.unmask(mask);
			$ui.ShowMessage('[ERROR]' + err.message);
			return;
		}
		
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.data));
		element.setAttribute('download', response.filename);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		$ui.unmask();

		/*
		var link = document.createElement('A');				
		link.href = response.data;
		link.download = response.filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		*/

	});
}

