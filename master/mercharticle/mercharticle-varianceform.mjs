var this_page_id;
var this_page_options;


import * as hnd from  './mercharticle-varianceform-hnd.mjs'

const reload_header_modified = true;


const txt_title = $('#pnl_editvarianceform-title')
const btn_edit = $('#pnl_editvarianceform-btn_edit')
const btn_save = $('#pnl_editvarianceform-btn_save')
const btn_delete = $('#pnl_editvarianceform-btn_delete')
const btn_prev = $('#pnl_editvarianceform-btn_prev')
const btn_next = $('#pnl_editvarianceform-btn_next')
const btn_addnew = $('#pnl_editvarianceform-btn_addnew')
const chk_autoadd = $('#pnl_editvarianceform-autoadd')


const pnl_form = $('#pnl_editvarianceform-form')
const obj = {
	txt_merchitem_id: $('#pnl_editvarianceform-txt_merchitem_id'),
	txt_itemstock_id: $('#pnl_editvarianceform-txt_itemstock_id'),
	txt_merchitem_art: $('#pnl_editvarianceform-txt_merchitem_art'),
	txt_merchitem_mat: $('#pnl_editvarianceform-txt_merchitem_mat'),
	txt_merchitem_col: $('#pnl_editvarianceform-txt_merchitem_col'),
	txt_merchitem_size: $('#pnl_editvarianceform-txt_merchitem_size'),
	txt_merchitem_combo: $('#pnl_editvarianceform-txt_merchitem_combo'),
	txt_merchitem_name: $('#pnl_editvarianceform-txt_merchitem_name'),
	txt_merchitem_descr: $('#pnl_editvarianceform-txt_merchitem_descr'),
	txt_merchitem_colnum: $('#pnl_editvarianceform-txt_merchitem_colnum'),
	chk_merchitem_isdisabled: $('#pnl_editvarianceform-chk_merchitem_isdisabled'),
	txt_merchitem_pcpline: $('#pnl_editvarianceform-txt_merchitem_pcpline'),
	txt_merchitem_pcpgroup: $('#pnl_editvarianceform-txt_merchitem_pcpgroup'),
	txt_merchitem_pcpcategory: $('#pnl_editvarianceform-txt_merchitem_pcpcategory'),
	txt_merchitem_colorcode: $('#pnl_editvarianceform-txt_merchitem_colorcode'),
	txt_merchitem_colordescr: $('#pnl_editvarianceform-txt_merchitem_colordescr'),
	txt_merchitem_gender: $('#pnl_editvarianceform-txt_merchitem_gender'),
	txt_merchitem_fit: $('#pnl_editvarianceform-txt_merchitem_fit'),
	txt_merchitem_hscodeship: $('#pnl_editvarianceform-txt_merchitem_hscodeship'),
	txt_merchitem_hscodeina: $('#pnl_editvarianceform-txt_merchitem_hscodeina'),
	txt_merchitem_gtype: $('#pnl_editvarianceform-txt_merchitem_gtype'),
	txt_merchitem_labelname: $('#pnl_editvarianceform-txt_merchitem_labelname'),
	txt_merchitem_labelproduct: $('#pnl_editvarianceform-txt_merchitem_labelproduct'),
	txt_merchitem_bahan: $('#pnl_editvarianceform-txt_merchitem_bahan'),
	txt_merchitem_pemeliharaan: $('#pnl_editvarianceform-txt_merchitem_pemeliharaan'),
	txt_merchitem_logo: $('#pnl_editvarianceform-txt_merchitem_logo'),
	txt_merchitem_dibuatdi: $('#pnl_editvarianceform-txt_merchitem_dibuatdi'),
	txt_merchitem_width: $('#pnl_editvarianceform-txt_merchitem_width'),
	txt_merchitem_length: $('#pnl_editvarianceform-txt_merchitem_length'),
	txt_merchitem_height: $('#pnl_editvarianceform-txt_merchitem_height'),
	txt_merchitem_weight: $('#pnl_editvarianceform-txt_merchitem_weight'),
	txt_merchitemctg_id: $('#pnl_editvarianceform-txt_merchitemctg_id'),
	txt_merchsea_id: $('#pnl_editvarianceform-txt_merchsea_id'),
	txt_unit_id: $('#pnl_editvarianceform-txt_unit_id'),
	txt_dept_id: $('#pnl_editvarianceform-txt_dept_id'),
	txt_brand_id: $('#pnl_editvarianceform-txt_brand_id'),
	txt_merchregitem_id: $('#pnl_editvarianceform-txt_merchregitem_id'),
	chk_merchitem_isupdating: $('#pnl_editvarianceform-chk_merchitem_isupdating'),
	txt_merchitem_updatebatch: $('#pnl_editvarianceform-txt_merchitem_updatebatch'),
	txt_mercharticle_id: $('#pnl_editvarianceform-txt_mercharticle_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_merchitem_id,
		autoid: true,
		logview: 'mst_merchitem',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	});
	form.getHeaderData = () => {
		return header_data;
	}	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)







	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() }  })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })

	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnButtonBack', (ev) => {
		var element = document.activeElement;
		element.blur();
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_editvariancegrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editvariancegrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editvariancegrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editvariancegrid'].handler.scrolllast()
				})
			}
		
		}		
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})
	
	
	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			form.lock(true)
			btn_addnew.allow = false
			btn_addnew.linkbutton('disable')
			chk_autoadd.attr("disabled", true);	
			chk_autoadd.prop("checked", false);			
		} else {
			form.lock(false)
			btn_addnew.allow = true
			btn_addnew.linkbutton('enable')
			chk_autoadd.removeAttr("disabled");
			chk_autoadd.prop("checked", false);
		}
	})

	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt
		})
	}

}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	txt_title.html(hdata.mercharticle_art)
	header_data = hdata

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/variance-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*

*/
		for (var objid in obj) {
			let o = obj[objid]
			if (o.isCombo() && !o.isRequired()) {
				var value =  result.record[o.getFieldValueName()];
				if (value==null ) {
					record[o.getFieldValueName()] = pOpt.value;
					record[o.getFieldDisplayName()] = pOpt.text;
				}
			}
		}

		/* handle data saat opening data */   
		if (typeof hnd.form_dataopening == 'function') {
			hnd.form_dataopening(result, options);
		}


		form.SuspendEvent(true);
		form
			.fill(record)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		form.commit()
		form.SuspendEvent(false);


		// Editable
		if (form.AllowEditRecord!=true) {
			btn_edit.hide();
			btn_save.hide();
			btn_delete.hide();
		}
		

		// tambah baris
		if (form.AllowAddRecord) {
			btn_addnew.show()
		} else {
			btn_addnew.hide()
		}	

		// hapus baris
		if (form.AllowRemoveRecord) {
			btn_delete.show()
		} else {
			btn_delete.hide()
		}

		var prevnode = $(`#${rowid}`).prev()
		if (prevnode.length>0) {
			btn_prev.linkbutton('enable')
		} else {
			btn_prev.linkbutton('disable')
		}

		var nextode = $(`#${rowid}`).next()
		if (nextode.length>0) {
			btn_next.linkbutton('enable')
		} else {
			btn_next.linkbutton('disable')
		}		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	txt_title.html('Create New Row')
	form.createnew(async (data, options)=>{
		data.mercharticle_id= hdata.mercharticle_id
		data.variance_value = 0

		data.merchitem_width = 0
		data.merchitem_length = 0
		data.merchitem_height = 0
		data.merchitem_weight = 0


		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}


		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editvariancegrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/variance-save`

	// options.skipmappingresponse = [];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			// console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}	
}


async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
	if (typeof hnd.form_datasaveerror == 'function') {
		hnd.form_datasaveerror(err, options);
	}
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	/*

	*/

	var pOpt = form.getDefaultPrompt(false)
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var value =  result.dataresponse[o.getFieldValueName()];
			var text = result.dataresponse[o.getFieldDisplayName()];
			if (value==null ) {
				value = pOpt.value;
				text = pOpt.text;
			}
			form.setValue(o, value, text);
		}
	}
	form.rowid = $ui.getPages().ITEMS['pnl_editvariancegrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/variance-delete`
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editvariancegrid', ()=>{
		$ui.getPages().ITEMS['pnl_editvariancegrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function form_viewmodechanged(viewonly) {
	if (viewonly) {
		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}

	if (typeof hnd.form_viewmodechanged == 'function') {
		hnd.form_viewmodechanged(viewonly);
	}
}


function form_idsetup(options) {
	var objid = obj.txt_merchitem_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}

function btn_addnew_click() {
	createnew(header_data)
}


function btn_prev_click() {
	var prevode = $(`#${form.rowid}`).prev()
	if (prevode.length==0) {
		return
	} 
	
	var trid = prevode.attr('id')
	var dataid = prevode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editvariancegrid'].handler.getGrid().DATA[dataid]

	if (form.isDataChanged()) {
		var datachangemessage = form.getDataChangeMessage();
		$ui.ShowMessage(datachangemessage, {
			"Ya" : () => {
				open(record, trid, header_data);
			},
			"Tidak" : () => {}
		})
	} else {
		open(record, trid, header_data);
	}
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editvariancegrid'].handler.getGrid().DATA[dataid]

	if (form.isDataChanged()) {
		var datachangemessage = form.getDataChangeMessage();
		$ui.ShowMessage(datachangemessage, {
			"Ya" : () => {
				open(record, trid, header_data);
			},
			"Tidak" : () => {}
		})
	} else {
		open(record, trid, header_data);
	}
}