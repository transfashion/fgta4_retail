var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './merchship-edit-hnd.mjs'

const txt_caption = $('#pnl_edit-caption')


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const btn_verify = $('#pnl_edit-btn_verify')
const btn_bill = $('#pnl_edit-btn_bill')
const btn_costing = $('#pnl_edit-btn_costing')



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_merchship_id: $('#pnl_edit-txt_merchship_id'),
	cbo_unit_id: $('#pnl_edit-cbo_unit_id'),
	cbo_principal_partner_id: $('#pnl_edit-cbo_principal_partner_id'),
	cbo_fowarder_partner_id: $('#pnl_edit-cbo_fowarder_partner_id'),
	txt_merchship_descr: $('#pnl_edit-txt_merchship_descr'),
	dt_merchship_date: $('#pnl_edit-dt_merchship_date'),
	cbo_periodemo_id: $('#pnl_edit-cbo_periodemo_id'),
	txt_merchship_qty: $('#pnl_edit-txt_merchship_qty'),
	txt_merchship_value: $('#pnl_edit-txt_merchship_value'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id'),
	txt_merchship_rate: $('#pnl_edit-txt_merchship_rate'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	txt_merchship_version: $('#pnl_edit-txt_merchship_version'),
	chk_merchship_iscommit: $('#pnl_edit-chk_merchship_iscommit'),
	txt_merchship_commitby: $('#pnl_edit-txt_merchship_commitby'),
	txt_merchship_commitdate: $('#pnl_edit-txt_merchship_commitdate'),
	chk_merchship_isverify: $('#pnl_edit-chk_merchship_isverify'),
	txt_merchship_verifyby: $('#pnl_edit-txt_merchship_verifyby'),
	txt_merchship_verifydate: $('#pnl_edit-txt_merchship_verifydate'),
	chk_merchship_iscalculate: $('#pnl_edit-chk_merchship_iscalculate'),
	txt_merchship_calculateby: $('#pnl_edit-txt_merchship_calculateby'),
	txt_merchship_calculatedate: $('#pnl_edit-txt_merchship_calculatedate'),
	chk_merchship_isexecute: $('#pnl_edit-chk_merchship_isexecute'),
	txt_merchship_executeby: $('#pnl_edit-txt_merchship_executeby'),
	txt_merchship_executedate: $('#pnl_edit-txt_merchship_executedate'),
	chk_merchship_isbill: $('#pnl_edit-chk_merchship_isbill'),
	txt_merchship_billby: $('#pnl_edit-txt_merchship_billby'),
	txt_merchship_billdate: $('#pnl_edit-txt_merchship_billdate'),
	chk_merchship_iscost: $('#pnl_edit-chk_merchship_iscost'),
	txt_merchship_costby: $('#pnl_edit-txt_merchship_costby'),
	txt_merchship_costydate: $('#pnl_edit-txt_merchship_costydate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	txt_caption.template = txt_caption.html();
	var disableedit = false;


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_merchship_id,
		autoid: true,
		logview: 'trn_merchship',
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
			
		$('#pnl_edit_record_custom').detach().appendTo("#pnl_edit_record");
		$('#pnl_edit_record_custom').show();		
					
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}


	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });	
	


	btn_commit.linkbutton({ onClick: async () => { 
		var args = { action: 'commit', cancel: false, options: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, options: args.options }); 
	} });

	btn_uncommit.linkbutton({ onClick: async () => { 
		var args = { action: 'uncommit', cancel: false, options: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, options: args.options }); 
	} });

			
	// Generator: Approval Handler not exist
	btn_verify.linkbutton({ onClick: () => { 
		if (typeof hnd.btn_verify_click==='function') {
			hnd.btn_verify_click(); 
		} else {
			btn_action_click({ action: 'verify' }); 
		}
	} });
	btn_bill.linkbutton({ onClick: () => { 
		if (typeof hnd.btn_bill_click==='function') {
			hnd.btn_bill_click(); 
		} else {
			btn_action_click({ action: 'bill' }); 
		}
	} });
	btn_costing.linkbutton({ onClick: () => { 
		if (typeof hnd.btn_costing_click==='function') {
			hnd.btn_costing_click(); 
		} else {
			btn_action_click({ action: 'costing' }); 
		}
	} });

	// Generator: Object Handler not exist

	// Generator: Upload Handler not exist


	obj.cbo_unit_id.name = 'pnl_edit-cbo_unit_id'		
	new fgta4slideselect(obj.cbo_unit_id, {
		title: 'Pilih Unit',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'ID'},
			{mapping: 'unit_name', text: 'Unit'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_unit_id_dataloading === 'function') {
				hnd.cbo_unit_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_unit_id_selected === 'function') {
					hnd.cbo_unit_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_principal_partner_id.name = 'pnl_edit-cbo_principal_partner_id'		
	new fgta4slideselect(obj.cbo_principal_partner_id, {
		title: 'Pilih Principal',
		returnpage: this_page_id,
		api: $ui.apis.load_principal_partner_id,
		fieldValue: 'principal_partner_id',
		fieldDisplay: 'principal_partner_name',
		fieldValueMap: 'partner_id',
		fieldDisplayMap: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'}
		],

	})				
				
	obj.cbo_fowarder_partner_id.name = 'pnl_edit-cbo_fowarder_partner_id'		
	new fgta4slideselect(obj.cbo_fowarder_partner_id, {
		title: 'Pilih Fowarder',
		returnpage: this_page_id,
		api: $ui.apis.load_fowarder_partner_id,
		fieldValue: 'fowarder_partner_id',
		fieldDisplay: 'fowarder_partner_name',
		fieldValueMap: 'partner_id',
		fieldDisplayMap: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'}
		],

	})				
				
	obj.cbo_periodemo_id.name = 'pnl_edit-cbo_periodemo_id'		
	new fgta4slideselect(obj.cbo_periodemo_id, {
		title: 'Pilih Periode Buku',
		returnpage: this_page_id,
		api: $ui.apis.load_periodemo_id,
		fieldValue: 'periodemo_id',
		fieldDisplay: 'periodemo_name',
		fields: [
			{mapping: 'periodemo_id', text: 'periodemo_id'},
			{mapping: 'periodemo_name', text: 'periodemo_name'}
		],

	})				
				
	obj.cbo_curr_id.name = 'pnl_edit-cbo_curr_id'		
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih curr_id',
		returnpage: this_page_id,
		api: $ui.apis.load_curr_id,
		fieldValue: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_id', text: 'curr_id'},
			{mapping: 'curr_name', text: 'curr_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_curr_id_selected === 'function') {
					hnd.cbo_curr_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_dept_id.name = 'pnl_edit-cbo_dept_id'		
	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih Owner Departemen',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],

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

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', '');
	caption = caption.replace('{{STATE_END}}', ' View');
	txt_caption.html(caption);


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
		if (result.record.periodemo_id==null) { result.record.periodemo_id='--NULL--'; result.record.periodemo_name='NONE'; }

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
			.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name)
			.setValue(obj.cbo_principal_partner_id, record.principal_partner_id, record.principal_partner_name)
			.setValue(obj.cbo_fowarder_partner_id, record.fowarder_partner_id, record.fowarder_partner_name)
			.setValue(obj.cbo_periodemo_id, record.periodemo_id, record.periodemo_name)
			.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name)
			.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name)
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

	var caption = txt_caption.template;
	caption = caption.replace('{{STATE_BEG}}', 'Create New ');
	caption = caption.replace('{{STATE_END}}', '');
	txt_caption.html(caption);


	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.merchship_date = global.now()
		data.merchship_qty = 0
		data.merchship_value = 0
		data.merchship_rate = 0
		data.merchship_version = 0
		data.merchship_iscommit = '0'
		data.merchship_isverify = '0'
		data.merchship_iscalculate = '0'
		data.merchship_isexecute = '0'
		data.merchship_isbill = '0'
		data.merchship_iscost = '0'

		data.unit_id = '0'
		data.unit_name = '-- PILIH --'
		data.principal_partner_id = '0'
		data.principal_partner_name = '-- PILIH --'
		data.fowarder_partner_id = '0'
		data.fowarder_partner_name = '-- PILIH --'
		data.periodemo_id = '--NULL--'
		data.periodemo_name = 'NONE'
		data.curr_id = '0'
		data.curr_name = '-- PILIH --'
		data.dept_id = global.setup.dept_id
		data.dept_name = global.setup.dept_name

		if (typeof hnd.form_newdata == 'function') {
			// untuk mengambil nilai ui component,
			// di dalam handler form_newdata, gunakan perintah:
			// options.OnNewData = () => {
			// 		...
			// }		
			hnd.form_newdata(data, options);
		}

		rec_commitby.html('');
		rec_commitdate.html('');
		


		var button_commit_on = true;
		var button_uncommit_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editorderoutgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editbudgetgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editrecvgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editrealisasigrid'].handler.createnew(data, options)


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

	rec_commitby.html(record.merchship_commitby);
	rec_commitdate.html(record.merchship_commitdate);
		

	if (typeof hnd.form_updaterecordstatus == 'function') {
		hnd.form_updaterecordstatus(record);
	}
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

	/* action button */
	var button_commit_on = false;
	var button_uncommit_on = false;	
	
	if (record.merchship_iscommit=="1") {
		button_commit_on = false;
		button_uncommit_on = true;
		form.lock(true);		
	} else {
		button_commit_on = true;
		button_uncommit_on = false;
		form.lock(false);
	} 
	btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
	btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
		

	if (typeof hnd.form_updatebuttonstate == 'function') {
		hnd.form_updatebuttonstate(record);
	}
}

function updategridstate(record) {
	var updategriddata = {}

	// apabila ada keperluan untuk update state grid list di sini

	var col_commit = 'merchship_iscommit';
	updategriddata[col_commit] = record.merchship_iscommit;	
	

	if (typeof hnd.form_updategridstate == 'function') {
		hnd.form_updategridstate(updategriddata, record);
	}

	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);

}

function form_viewmodechanged(viewmode) {

	var caption = txt_caption.template;
	if (viewmode) {
		caption = caption.replace('{{STATE_BEG}}', '');
		caption = caption.replace('{{STATE_END}}', ' View');
	} else {
		caption = caption.replace('{{STATE_BEG}}', '');
		caption = caption.replace('{{STATE_END}}', ' Edit');
	}
	txt_caption.html(caption);


	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_merchship_id
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
	// options.skipmappingresponse = ['periodemo_id', ];
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
	console.error(err)
	if (typeof hnd.form_datasaveerror == 'function') {
		hnd.form_datasaveerror(err, options);
	}
	if (options.supress_error_dialog!=true) {
		$ui.ShowMessage('[ERROR]'+err.message);
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
	form.setValue(obj.cbo_periodemo_id, result.dataresponse.periodemo_name!=='--NULL--' ? result.dataresponse.periodemo_id : '--NULL--', result.dataresponse.periodemo_name!=='--NULL--'?result.dataresponse.periodemo_name:'NONE')

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
	var rowdata = {
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



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var module = window.global.modulefullname;
	var renderto = 'formtemplate-standard.phtml';
	var format = 'format-01-a4-potrait';

	var args = {
		id: form.getCurrentId(),
		variancename: this_page_options.variancename,
		reportmodule: `${module}/merchship.xprint?renderto=${renderto}&format=${format}`,
		handled: false
	}

	if (typeof hnd.form_printing == 'function') {
		hnd.form_printing(args);
	}


	if (!args.handled) {
		$ui.getPages().show('pnl_editpreview', ()=>{
			// console.log('Preview Showed');
			$ui.getPages().ITEMS['pnl_editpreview'].handler.PreviewForm({
				id: args.id, 
				variancename: args.variancename,
				reportmodule: args.reportmodule
			});
		});
	}
}	





async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Shipment'
	var txt_version = obj.txt_merchship_version;
	var chk_iscommit = obj.chk_merchship_iscommit;
	
	
	var id = form.getCurrentId();

	Object.assign(args, {
		id: id,
		act_url: null,
		act_msg_quest: null,
		act_msg_result: null,
		act_do: null,
		use_otp: false,
		otp_message: `Berikut adalah code yang harus anda masukkan untuk melakukan ${args.action} ${docname} dengan no id ${id}`,
	});

	switch (args.action) {
		
		case 'commit' :
			args.xtion_version = '1.1';
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
				form.commit();
			}
			break;

		case 'uncommit' :
			args.xtion_version = '1.1';
			args.act_url = `${global.modulefullname}/xtion-uncommit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;		
			
		
	
		default:
			if (typeof hnd.do_other_action == 'function') {
				hnd.do_other_action(args);
			}
	}

	
	if (args.cancel) { return } // batalkan xtion

	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				if (result.dataresponse!=undefined) { updaterecordstatus(result.dataresponse) };
				args.act_do(result);

				if (result.dataresponse!=undefined) {
					updatebuttonstate(result.dataresponse);
					updategridstate(result.dataresponse);
				}

				if (typeof hnd.action_done == 'function') {
					hnd.action_done(result, args);
				}

				if (args.act_msg_result!=='') $ui.ShowMessage('[INFO]' + args.act_msg_result);	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}	
	
	