var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './promodel-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')






const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_promodel_id: $('#pnl_edit-txt_promodel_id'),
	txt_promodel_name: $('#pnl_edit-txt_promodel_name'),
	txt_promodel_descr: $('#pnl_edit-txt_promodel_descr'),
	cbo_prorule_id: $('#pnl_edit-cbo_prorule_id'),
	txt_prorule_fn: $('#pnl_edit-txt_prorule_fn'),
	cbo_prolevel_id: $('#pnl_edit-cbo_prolevel_id'),
	chk_prorule_ishasgroupa: $('#pnl_edit-chk_prorule_ishasgroupa'),
	cbo_a_prorulesec_id: $('#pnl_edit-cbo_a_prorulesec_id'),
	txt_a_prorulesec_label: $('#pnl_edit-txt_a_prorulesec_label'),
	cbo_a_prospot_id: $('#pnl_edit-cbo_a_prospot_id'),
	cbo_a_prostep_id: $('#pnl_edit-cbo_a_prostep_id'),
	txt_a_proprog_disc: $('#pnl_edit-txt_a_proprog_disc'),
	txt_a_proprog_qtythreshold: $('#pnl_edit-txt_a_proprog_qtythreshold'),
	txt_a_proprog_qtymax: $('#pnl_edit-txt_a_proprog_qtymax'),
	chk_a_proprog_isblockonmeet: $('#pnl_edit-chk_a_proprog_isblockonmeet'),
	chk_prorule_ishasgroupb: $('#pnl_edit-chk_prorule_ishasgroupb'),
	cbo_b_prorulesec_id: $('#pnl_edit-cbo_b_prorulesec_id'),
	txt_b_prorulesec_label: $('#pnl_edit-txt_b_prorulesec_label'),
	txt_b_proprog_disc: $('#pnl_edit-txt_b_proprog_disc'),
	txt_b_proprog_qtythreshold: $('#pnl_edit-txt_b_proprog_qtythreshold'),
	txt_b_proprog_qtymax: $('#pnl_edit-txt_b_proprog_qtymax'),
	chk_b_proprog_isblockonmeet: $('#pnl_edit-chk_b_proprog_isblockonmeet')
}




let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;

	if (opt.settings.btn_edit_visible===false) {
		btn_edit.hide();
	} 

	if (opt.settings.btn_save_visible===false) {
		btn_save.hide();
	} 

	if (opt.settings.btn_delete_visible===false) {
		btn_delete.hide();
	} 

	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_promodel_id,
		autoid: true,
		logview: 'mst_promodel',
		btn_edit: disableedit==true? $('<a>edit</a>') : btn_edit,
		btn_save: disableedit==true? $('<a>save</a>') : btn_save,
		btn_delete: disableedit==true? $('<a>delete</a>') : btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnRecordStatusCreated: () => {
			undefined			
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}

	// Generator: Print Handler not exist
	// Generator: Commit Handler not exist
	// Generator: Approval Handler not exist
	// Generator: Xtion Handler not exist
	// Generator: Object Handler not exist

	// Generator: Upload Handler not exist


	obj.cbo_prorule_id.name = 'pnl_edit-cbo_prorule_id'		
	new fgta4slideselect(obj.cbo_prorule_id, {
		title: 'Pilih prorule_id',
		returnpage: this_page_id,
		api: $ui.apis.load_prorule_id,
		fieldValue: 'prorule_id',
		fieldDisplay: 'prorule_name',
		fields: [
			{mapping: 'prorule_id', text: 'prorule_id'},
			{mapping: 'prorule_name', text: 'prorule_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_prorule_id_selected === 'function') {
					hnd.cbo_prorule_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_prolevel_id.name = 'pnl_edit-cbo_prolevel_id'		
	new fgta4slideselect(obj.cbo_prolevel_id, {
		title: 'Pilih prolevel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_prolevel_id,
		fieldValue: 'prolevel_id',
		fieldDisplay: 'prolevel_name',
		fields: [
			{mapping: 'prolevel_id', text: 'prolevel_id'},
			{mapping: 'prolevel_name', text: 'prolevel_name'}
		],

	})				
				
	obj.cbo_a_prorulesec_id.name = 'pnl_edit-cbo_a_prorulesec_id'		
	new fgta4slideselect(obj.cbo_a_prorulesec_id, {
		title: 'Pilih a_prorulesec_id',
		returnpage: this_page_id,
		api: $ui.apis.load_a_prorulesec_id,
		fieldValue: 'a_prorulesec_id',
		fieldDisplay: 'a_prorulesec_name',
		fieldValueMap: 'prorulesec_id',
		fieldDisplayMap: 'prorulesec_name',
		fields: [
			{mapping: 'prorulesec_id', text: 'prorulesec_id'},
			{mapping: 'prorulesec_name', text: 'prorulesec_name'}
		],

	})				
				
	obj.cbo_a_prospot_id.name = 'pnl_edit-cbo_a_prospot_id'		
	new fgta4slideselect(obj.cbo_a_prospot_id, {
		title: 'Pilih a_prospot_id',
		returnpage: this_page_id,
		api: $ui.apis.load_a_prospot_id,
		fieldValue: 'a_prospot_id',
		fieldDisplay: 'a_prospot_name',
		fieldValueMap: 'prospot_id',
		fieldDisplayMap: 'prospot_name',
		fields: [
			{mapping: 'prospot_id', text: 'prospot_id'},
			{mapping: 'prospot_name', text: 'prospot_name'}
		],

	})				
				
	obj.cbo_a_prostep_id.name = 'pnl_edit-cbo_a_prostep_id'		
	new fgta4slideselect(obj.cbo_a_prostep_id, {
		title: 'Pilih a_prostep_id',
		returnpage: this_page_id,
		api: $ui.apis.load_a_prostep_id,
		fieldValue: 'a_prostep_id',
		fieldDisplay: 'a_prostep_name',
		fieldValueMap: 'prostep_id',
		fieldDisplayMap: 'prostep_name',
		fields: [
			{mapping: 'prostep_id', text: 'prostep_id'},
			{mapping: 'prostep_name', text: 'prostep_name'}
		],

	})				
				
	obj.cbo_b_prorulesec_id.name = 'pnl_edit-cbo_b_prorulesec_id'		
	new fgta4slideselect(obj.cbo_b_prorulesec_id, {
		title: 'Pilih b_prorulesec_id',
		returnpage: this_page_id,
		api: $ui.apis.load_b_prorulesec_id,
		fieldValue: 'b_prorulesec_id',
		fieldDisplay: 'b_prorulesec_name',
		fieldValueMap: 'prorulesec_id',
		fieldDisplayMap: 'prorulesec_name',
		fields: [
			{mapping: 'prorulesec_id', text: 'prorulesec_id'},
			{mapping: 'prorulesec_name', text: 'prorulesec_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_b_prorulesec_id_dataloading === 'function') {
				hnd.cbo_b_prorulesec_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_b_prorulesec_id_selected === 'function') {
					hnd.cbo_b_prorulesec_id_selected(value, display, record, args);
				}
			}
		},

	})				
				




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
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		var element = document.activeElement;
		element.blur();
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})

	//button state
	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt,
			btn_action_click: (actionargs) => {
				if (typeof btn_action_click == 'function') {
					btn_action_click(actionargs);
				}
			}
		})
	}

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}

export function getCurrentRowdata() {
	return rowdata;
}

export function open(data, rowid, viewmode=true, fn_callback) {

	rowdata = {
		data: data,
		rowid: rowid
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.prorule_id==null) { result.record.prorule_id='--NULL--'; result.record.prorule_name='NONE'; }
		if (result.record.prolevel_id==null) { result.record.prolevel_id='--NULL--'; result.record.prolevel_name='NONE'; }
		if (result.record.a_prorulesec_id==null) { result.record.a_prorulesec_id='--NULL--'; result.record.a_prorulesec_name='NONE'; }
		if (result.record.a_prospot_id==null) { result.record.a_prospot_id='--NULL--'; result.record.a_prospot_name='NONE'; }
		if (result.record.a_prostep_id==null) { result.record.a_prostep_id='--NULL--'; result.record.a_prostep_name='NONE'; }
		if (result.record.b_prorulesec_id==null) { result.record.b_prorulesec_id='--NULL--'; result.record.b_prorulesec_name='NONE'; }

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
  		updaterecordstatus(record)

		/* handle data saat opening data */   
		if (typeof hnd.form_dataopening == 'function') {
			hnd.form_dataopening(result, options);
		}


		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_prorule_id, record.prorule_id, record.prorule_name)
			.setValue(obj.cbo_prolevel_id, record.prolevel_id, record.prolevel_name)
			.setValue(obj.cbo_a_prorulesec_id, record.a_prorulesec_id, record.a_prorulesec_name)
			.setValue(obj.cbo_a_prospot_id, record.a_prospot_id, record.a_prospot_name)
			.setValue(obj.cbo_a_prostep_id, record.a_prostep_id, record.a_prostep_name)
			.setValue(obj.cbo_b_prorulesec_id, record.b_prorulesec_id, record.b_prorulesec_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)


		/* update rowdata */
		for (var nv in rowdata.data) {
			if (record[nv]!=undefined) {
				rowdata.data[nv] = record[nv];
			}
		}

		// tampilkan form untuk data editor
		if (typeof fn_callback==='function') {
			fn_callback(null, rowdata.data);
		}
		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.prorule_ishasgroupa = '0'
		data.a_proprog_disc = 0
		data.a_proprog_qtythreshold = 0
		data.a_proprog_qtymax = 0
		data.a_proprog_isblockonmeet = '0'
		data.prorule_ishasgroupb = '0'
		data.b_proprog_disc = 0
		data.b_proprog_qtythreshold = 0
		data.b_proprog_qtymax = 0
		data.b_proprog_isblockonmeet = '0'

		data.prorule_id = '--NULL--'
		data.prorule_name = 'NONE'
		data.prolevel_id = '--NULL--'
		data.prolevel_name = 'NONE'
		data.a_prorulesec_id = '--NULL--'
		data.a_prorulesec_name = 'NONE'
		data.a_prospot_id = '--NULL--'
		data.a_prospot_name = 'NONE'
		data.a_prostep_id = '--NULL--'
		data.a_prostep_name = 'NONE'
		data.b_prorulesec_id = '--NULL--'
		data.b_prorulesec_name = 'NONE'

		if (typeof hnd.form_newdata == 'function') {
			// untuk mengambil nilai ui component,
			// di dalam handler form_newdata, gunakan perintah:
			// options.OnNewData = () => {
			// 		...
			// }		
			hnd.form_newdata(data, options);
		}




		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



	})
}


export function getHeaderData() {
	var header_data = form.getData();
	if (typeof hnd.form_getHeaderData == 'function') {
		hnd.form_getHeaderData(header_data);
	}
	return header_data;
}

export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	let header_data = getHeaderData();
	if (typeof hnd.form_detil_opening == 'function') {
		hnd.form_detil_opening(pnlname, (cancel)=>{
			if (cancel===true) {
				return;
			}
			$ui.getPages().show(pnlname, () => {
				$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
			})
		});
	} else {
		$ui.getPages().show(pnlname, () => {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
		})
	}

	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage


	if (typeof hnd.form_updatefilebox == 'function') {
		hnd.form_updatefilebox(record);
	}
}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini


	if (typeof hnd.form_updaterecordstatus == 'function') {
		hnd.form_updaterecordstatus(record);
	}
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini


	if (typeof hnd.form_updatebuttonstate == 'function') {
		hnd.form_updatebuttonstate(record);
	}
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini


	if (typeof hnd.form_updategridstate == 'function') {
		hnd.form_updategridstate(record);
	}
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_promodel_id
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


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
	// options.skipmappingresponse = ['prorule_id', 'prolevel_id', 'a_prorulesec_id', 'a_prospot_id', 'a_prostep_id', 'b_prorulesec_id', ];
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
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)
	/*
	form.setValue(obj.cbo_prorule_id, result.dataresponse.prorule_name!=='--NULL--' ? result.dataresponse.prorule_id : '--NULL--', result.dataresponse.prorule_name!=='--NULL--'?result.dataresponse.prorule_name:'NONE')
	form.setValue(obj.cbo_prolevel_id, result.dataresponse.prolevel_name!=='--NULL--' ? result.dataresponse.prolevel_id : '--NULL--', result.dataresponse.prolevel_name!=='--NULL--'?result.dataresponse.prolevel_name:'NONE')
	form.setValue(obj.cbo_a_prorulesec_id, result.dataresponse.a_prorulesec_name!=='--NULL--' ? result.dataresponse.a_prorulesec_id : '--NULL--', result.dataresponse.a_prorulesec_name!=='--NULL--'?result.dataresponse.a_prorulesec_name:'NONE')
	form.setValue(obj.cbo_a_prospot_id, result.dataresponse.a_prospot_name!=='--NULL--' ? result.dataresponse.a_prospot_id : '--NULL--', result.dataresponse.a_prospot_name!=='--NULL--'?result.dataresponse.a_prospot_name:'NONE')
	form.setValue(obj.cbo_a_prostep_id, result.dataresponse.a_prostep_name!=='--NULL--' ? result.dataresponse.a_prostep_id : '--NULL--', result.dataresponse.a_prostep_name!=='--NULL--'?result.dataresponse.a_prostep_name:'NONE')
	form.setValue(obj.cbo_b_prorulesec_id, result.dataresponse.b_prorulesec_name!=='--NULL--' ? result.dataresponse.b_prorulesec_id : '--NULL--', result.dataresponse.b_prorulesec_name!=='--NULL--'?result.dataresponse.b_prorulesec_name:'NONE')

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
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
	rowdata = {
		data: data,
		rowid: form.rowid
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}
}



async function form_deleting(data, options) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data, options);
	}
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
}




