var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './promoab-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')


const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			




const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_promoab_id: $('#pnl_edit-txt_promoab_id'),
	cbo_brand_id: $('#pnl_edit-cbo_brand_id'),
	cbo_promoabmodel_id: $('#pnl_edit-cbo_promoabmodel_id'),
	txt_promoabrule_name: $('#pnl_edit-txt_promoabrule_name'),
	txt_promoab_descr: $('#pnl_edit-txt_promoab_descr'),
	dt_promoabrule_dtstart: $('#pnl_edit-dt_promoabrule_dtstart'),
	txt_promoabrule_timestart: $('#pnl_edit-txt_promoabrule_timestart'),
	dt_promoabrule_dtend: $('#pnl_edit-dt_promoabrule_dtend'),
	txt_promoabrule_timeend: $('#pnl_edit-txt_promoabrule_timeend'),
	chk_promoabrule_ispaymdiscallowed: $('#pnl_edit-chk_promoabrule_ispaymdiscallowed'),
	txt_promoabrule_valuethreshold: $('#pnl_edit-txt_promoabrule_valuethreshold'),
	cbo_a_promoabrulesection_id: $('#pnl_edit-cbo_a_promoabrulesection_id'),
	txt_promoab_a_label: $('#pnl_edit-txt_promoab_a_label'),
	txt_promoab_a_itemlist: $('#pnl_edit-txt_promoab_a_itemlist'),
	txt_promoab_a_qtythreshold: $('#pnl_edit-txt_promoab_a_qtythreshold'),
	txt_promoab_a_valuethreshold: $('#pnl_edit-txt_promoab_a_valuethreshold'),
	txt_promoab_a_disc: $('#pnl_edit-txt_promoab_a_disc'),
	txt_promoab_a_qtymax: $('#pnl_edit-txt_promoab_a_qtymax'),
	chk_promoab_a_isreplacedisc: $('#pnl_edit-chk_promoab_a_isreplacedisc'),
	chk_promoab_a_isblockonmeet: $('#pnl_edit-chk_promoab_a_isblockonmeet'),
	cbo_b_promoabrulesection_id: $('#pnl_edit-cbo_b_promoabrulesection_id'),
	txt_promoab_b_label: $('#pnl_edit-txt_promoab_b_label'),
	txt_promoab_b_itemlist: $('#pnl_edit-txt_promoab_b_itemlist'),
	txt_promoab_b_qtythreshold: $('#pnl_edit-txt_promoab_b_qtythreshold'),
	txt_promoab_b_valuethreshold: $('#pnl_edit-txt_promoab_b_valuethreshold'),
	txt_promoab_b_disc: $('#pnl_edit-txt_promoab_b_disc'),
	txt_promoab_b_qtymax: $('#pnl_edit-txt_promoab_b_qtymax'),
	chk_promoab_b_isreplacedisc: $('#pnl_edit-chk_promoab_b_isreplacedisc'),
	chk_promoab_b_isblockonmeet: $('#pnl_edit-chk_promoab_b_isblockonmeet'),
	cbo_promoabrule_id: $('#pnl_edit-cbo_promoabrule_id'),
	txt_promoabrule_code: $('#pnl_edit-txt_promoabrule_code'),
	txt_brand_nameshort: $('#pnl_edit-txt_brand_nameshort'),
	chk_promoabrule_ishasgroupa: $('#pnl_edit-chk_promoabrule_ishasgroupa'),
	chk_promoabrule_ishasgroupb: $('#pnl_edit-chk_promoabrule_ishasgroupb'),
	txt_promoab_version: $('#pnl_edit-txt_promoab_version'),
	chk_promoab_iscommit: $('#pnl_edit-chk_promoab_iscommit'),
	txt_promoab_commitby: $('#pnl_edit-txt_promoab_commitby'),
	txt_promoab_commitdate: $('#pnl_edit-txt_promoab_commitdate'),
	chk_promoab_isdownload: $('#pnl_edit-chk_promoab_isdownload')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


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
		primary: obj.txt_promoab_id,
		autoid: true,
		logview: 'mst_promoab',
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

	// Generator: Print Handler not exist


	btn_commit.linkbutton({ onClick: async () => { 
		var args = { action: 'commit', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, param: args.param }); 
	} });

	btn_uncommit.linkbutton({ onClick: async () => { 
		var args = { action: 'uncommit', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, param: args.param }); 
	} });

			
	// Generator: Approval Handler not exist
	// Generator: Xtion Handler not exist
	// Generator: Object Handler not exist

	// Generator: Upload Handler not exist


	obj.cbo_brand_id.name = 'pnl_edit-cbo_brand_id'		
	new fgta4slideselect(obj.cbo_brand_id, {
		title: 'Pilih brand_id',
		returnpage: this_page_id,
		api: $ui.apis.load_brand_id,
		fieldValue: 'brand_id',
		fieldDisplay: 'brand_name',
		fields: [
			{mapping: 'brand_id', text: 'brand_id'},
			{mapping: 'brand_name', text: 'brand_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_brand_id_dataloading === 'function') {
				hnd.cbo_brand_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_brand_id_selected === 'function') {
					hnd.cbo_brand_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_promoabmodel_id.name = 'pnl_edit-cbo_promoabmodel_id'		
	new fgta4slideselect(obj.cbo_promoabmodel_id, {
		title: 'Pilih promoabmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_promoabmodel_id,
		fieldValue: 'promoabmodel_id',
		fieldDisplay: 'promoabmodel_descr',
		fields: [
			{mapping: 'promoabmodel_id', text: 'promoabmodel_id'},
			{mapping: 'promoabmodel_descr', text: 'promoabmodel_descr'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_promoabmodel_id_selected === 'function') {
					hnd.cbo_promoabmodel_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_a_promoabrulesection_id.name = 'pnl_edit-cbo_a_promoabrulesection_id'		
	new fgta4slideselect(obj.cbo_a_promoabrulesection_id, {
		title: 'Pilih a_promoabrulesection_id',
		returnpage: this_page_id,
		api: $ui.apis.load_a_promoabrulesection_id,
		fieldValue: 'a_promoabrulesection_id',
		fieldDisplay: 'a_promoabrulesection_name',
		fieldValueMap: 'promoabrulesection_id',
		fieldDisplayMap: 'promoabrulesection_name',
		fields: [
			{mapping: 'promoabrulesection_id', text: 'promoabrulesection_id'},
			{mapping: 'promoabrulesection_name', text: 'promoabrulesection_name'}
		],

	})				
				
	obj.cbo_b_promoabrulesection_id.name = 'pnl_edit-cbo_b_promoabrulesection_id'		
	new fgta4slideselect(obj.cbo_b_promoabrulesection_id, {
		title: 'Pilih b_promoabrulesection_id',
		returnpage: this_page_id,
		api: $ui.apis.load_b_promoabrulesection_id,
		fieldValue: 'b_promoabrulesection_id',
		fieldDisplay: 'b_promoabrulesection_name',
		fieldValueMap: 'promoabrulesection_id',
		fieldDisplayMap: 'promoabrulesection_name',
		fields: [
			{mapping: 'promoabrulesection_id', text: 'promoabrulesection_id'},
			{mapping: 'promoabrulesection_name', text: 'promoabrulesection_name'}
		],

	})				
				
	obj.cbo_promoabrule_id.name = 'pnl_edit-cbo_promoabrule_id'		
	new fgta4slideselect(obj.cbo_promoabrule_id, {
		title: 'Pilih promoabrule_id',
		returnpage: this_page_id,
		api: $ui.apis.load_promoabrule_id,
		fieldValue: 'promoabrule_id',
		fieldDisplay: 'promoabrule_name',
		fields: [
			{mapping: 'promoabrule_id', text: 'promoabrule_id'},
			{mapping: 'promoabrule_name', text: 'promoabrule_name'}
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
		if (result.record.a_promoabrulesection_id==null) { result.record.a_promoabrulesection_id='--NULL--'; result.record.a_promoabrulesection_name='NONE'; }
		if (result.record.b_promoabrulesection_id==null) { result.record.b_promoabrulesection_id='--NULL--'; result.record.b_promoabrulesection_name='NONE'; }

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
			.setValue(obj.cbo_brand_id, record.brand_id, record.brand_name)
			.setValue(obj.cbo_promoabmodel_id, record.promoabmodel_id, record.promoabmodel_descr)
			.setValue(obj.cbo_a_promoabrulesection_id, record.a_promoabrulesection_id, record.a_promoabrulesection_name)
			.setValue(obj.cbo_b_promoabrulesection_id, record.b_promoabrulesection_id, record.b_promoabrulesection_name)
			.setValue(obj.cbo_promoabrule_id, record.promoabrule_id, record.promoabrule_name)
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
		data.promoabrule_dtstart = global.now()
		data.promoabrule_dtend = global.now()
		data.promoabrule_ispaymdiscallowed = '0'
		data.promoabrule_valuethreshold = 0
		data.promoab_a_qtythreshold = 0
		data.promoab_a_valuethreshold = 0
		data.promoab_a_disc = 0
		data.promoab_a_qtymax = 0
		data.promoab_a_isreplacedisc = '0'
		data.promoab_a_isblockonmeet = '0'
		data.promoab_b_qtythreshold = 0
		data.promoab_b_valuethreshold = 0
		data.promoab_b_disc = 0
		data.promoab_b_qtymax = 0
		data.promoab_b_isreplacedisc = '0'
		data.promoab_b_isblockonmeet = '0'
		data.promoabrule_ishasgroupa = '0'
		data.promoabrule_ishasgroupb = '0'
		data.promoab_version = 0
		data.promoab_iscommit = '0'
		data.promoab_isdownload = '0'

		data.brand_id = '0'
		data.brand_name = '-- PILIH --'
		data.promoabmodel_id = '0'
		data.promoabmodel_descr = '-- PILIH --'
		data.a_promoabrulesection_id = '--NULL--'
		data.a_promoabrulesection_name = 'NONE'
		data.b_promoabrulesection_id = '--NULL--'
		data.b_promoabrulesection_name = 'NONE'
		data.promoabrule_id = '0'
		data.promoabrule_name = '-- PILIH --'

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

		$ui.getPages().ITEMS['pnl_editsitegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpospaymgrid'].handler.createnew(data, options)


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

	rec_commitby.html(record.promoab_commitby);
	rec_commitdate.html(record.promoab_commitdate);
		

	if (typeof hnd.form_updaterecordstatus == 'function') {
		hnd.form_updaterecordstatus(record);
	}
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

	/* action button */
	var button_commit_on = false;
	var button_uncommit_on = false;	
	
	if (record.promoab_iscommit=="1") {
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
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'promoab_iscommit';
	updategriddata[col_commit] = record.promoab_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
		

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
	var objid = obj.txt_promoab_id
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
	// options.skipmappingresponse = ['a_promoabrulesection_id', 'b_promoabrulesection_id', ];
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
	form.setValue(obj.cbo_a_promoabrulesection_id, result.dataresponse.a_promoabrulesection_name!=='--NULL--' ? result.dataresponse.a_promoabrulesection_id : '--NULL--', result.dataresponse.a_promoabrulesection_name!=='--NULL--'?result.dataresponse.a_promoabrulesection_name:'NONE')
	form.setValue(obj.cbo_b_promoabrulesection_id, result.dataresponse.b_promoabrulesection_name!=='--NULL--' ? result.dataresponse.b_promoabrulesection_id : '--NULL--', result.dataresponse.b_promoabrulesection_name!=='--NULL--'?result.dataresponse.b_promoabrulesection_name:'NONE')

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





async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Promo AB'
	var txt_version = obj.txt_promoab_version;
	var chk_iscommit = obj.chk_promoab_iscommit;
	
	
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
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
				form.commit();
			}
			break;

		case 'uncommit' :
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
	
	