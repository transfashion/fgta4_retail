var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './merchitem-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const fl_merchitem_picture_img = $('#pnl_edit-fl_merchitem_picture_img');
const fl_merchitem_picture_lnk = $('#pnl_edit-fl_merchitem_picture_link');				
				

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_merchitem_id: $('#pnl_edit-txt_merchitem_id'),
	txt_merchitem_art: $('#pnl_edit-txt_merchitem_art'),
	txt_merchitem_mat: $('#pnl_edit-txt_merchitem_mat'),
	txt_merchitem_col: $('#pnl_edit-txt_merchitem_col'),
	txt_merchitem_size: $('#pnl_edit-txt_merchitem_size'),
	txt_merchitem_name: $('#pnl_edit-txt_merchitem_name'),
	txt_merchitem_descr: $('#pnl_edit-txt_merchitem_descr'),
	fl_merchitem_picture: $('#pnl_edit-fl_merchitem_picture'),
	cbo_merchitemctg_id: $('#pnl_edit-cbo_merchitemctg_id'),
	cbo_merchsea_id: $('#pnl_edit-cbo_merchsea_id'),
	cbo_brand_id: $('#pnl_edit-cbo_brand_id'),
	txt_merchitem_width: $('#pnl_edit-txt_merchitem_width'),
	txt_merchitem_length: $('#pnl_edit-txt_merchitem_length'),
	txt_merchitem_height: $('#pnl_edit-txt_merchitem_height'),
	txt_merchitem_weight: $('#pnl_edit-txt_merchitem_weight'),
	txt_merchitem_priceori: $('#pnl_edit-txt_merchitem_priceori'),
	txt_merchitem_price: $('#pnl_edit-txt_merchitem_price'),
	chk_merchitem_issp: $('#pnl_edit-chk_merchitem_issp'),
	chk_merchitem_isdiscvalue: $('#pnl_edit-chk_merchitem_isdiscvalue'),
	txt_merchitem_disc: $('#pnl_edit-txt_merchitem_disc'),
	txt_merchitem_discval: $('#pnl_edit-txt_merchitem_discval'),
	txt_merchitem_pricenett: $('#pnl_edit-txt_merchitem_pricenett'),
	txt_merchitem_lastcogs: $('#pnl_edit-txt_merchitem_lastcogs'),
	dt_merchitem_lastcogsdt: $('#pnl_edit-dt_merchitem_lastcogsdt'),
	cbo_merchrpt_id: $('#pnl_edit-cbo_merchrpt_id'),
	cbo_gender_id: $('#pnl_edit-cbo_gender_id'),
	txt_merchitem_colorcode: $('#pnl_edit-txt_merchitem_colorcode'),
	txt_merchitem_colorname: $('#pnl_edit-txt_merchitem_colorname'),
	txt_merchitem_hscodeship: $('#pnl_edit-txt_merchitem_hscodeship'),
	txt_merchitem_hscode: $('#pnl_edit-txt_merchitem_hscode'),
	txt_merchitemvar_id: $('#pnl_edit-txt_merchitemvar_id'),
	cbo_merchsizetag_id: $('#pnl_edit-cbo_merchsizetag_id'),
	chk_merchitem_isallchannel: $('#pnl_edit-chk_merchitem_isallchannel'),
	chk_merchitem_isnonactive: $('#pnl_edit-chk_merchitem_isnonactive'),
	chk_merchitem_isdisabled: $('#pnl_edit-chk_merchitem_isdisabled')
}




let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		disableedit = true;
	//		btn_edit.linkbutton('disable');
	//		btn_save.linkbutton('disable');
	//		btn_delete.linkbutton('disable');
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_merchitem_id,
		autoid: true,
		logview: 'mst_merchitem',
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








	obj.fl_merchitem_picture.filebox({
		onChange: function(value) {
			var files = obj.fl_merchitem_picture.filebox('files');
			var f = files[0];
			var reader = new FileReader();
			reader.onload = (function(loaded) {
				return function(e) {
					if (loaded.type.startsWith('image')) {
						var image = new Image();
						image.src = e.target.result;
						image.onload = function() {
							fl_merchitem_picture_img.attr('src', e.target.result);
							fl_merchitem_picture_img.show();
							fl_merchitem_picture_lnk.hide();
						}
					} else {
						fl_merchitem_picture_img.hide();
						fl_merchitem_picture_lnk.hide();
					}
				}
			})(f);
			if (f!==undefined) { reader.readAsDataURL(f) }
		}
	})				
				


	new fgta4slideselect(obj.cbo_merchitemctg_id, {
		title: 'Pilih merchitemctg_id',
		returnpage: this_page_id,
		api: $ui.apis.load_merchitemctg_id,
		fieldValue: 'merchitemctg_id',
		fieldValueMap: 'merchitemctg_id',
		fieldDisplay: 'merchitemctg_name',
		fields: [
			{mapping: 'merchitemctg_id', text: 'merchitemctg_id'},
			{mapping: 'merchitemctg_name', text: 'merchitemctg_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_merchitemctg_id_dataloading === 'function') {
				hnd.cbo_merchitemctg_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_merchitemctg_id_dataloaded === 'function') {
				hnd.cbo_merchitemctg_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_merchitemctg_id_selected === 'function') {
					hnd.cbo_merchitemctg_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_merchsea_id, {
		title: 'Pilih merchsea_id',
		returnpage: this_page_id,
		api: $ui.apis.load_merchsea_id,
		fieldValue: 'merchsea_id',
		fieldValueMap: 'merchsea_id',
		fieldDisplay: 'merchsea_name',
		fields: [
			{mapping: 'merchsea_id', text: 'merchsea_id'},
			{mapping: 'merchsea_name', text: 'merchsea_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_merchsea_id_dataloading === 'function') {
				hnd.cbo_merchsea_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_merchsea_id_dataloaded === 'function') {
				hnd.cbo_merchsea_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_merchsea_id_selected === 'function') {
					hnd.cbo_merchsea_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_brand_id, {
		title: 'Pilih brand_id',
		returnpage: this_page_id,
		api: $ui.apis.load_brand_id,
		fieldValue: 'brand_id',
		fieldValueMap: 'brand_id',
		fieldDisplay: 'brand_name',
		fields: [
			{mapping: 'brand_id', text: 'brand_id'},
			{mapping: 'brand_name', text: 'brand_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_brand_id_dataloading === 'function') {
				hnd.cbo_brand_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_brand_id_dataloaded === 'function') {
				hnd.cbo_brand_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_brand_id_selected === 'function') {
					hnd.cbo_brand_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_merchrpt_id, {
		title: 'Pilih merchrpt_id',
		returnpage: this_page_id,
		api: $ui.apis.load_merchrpt_id,
		fieldValue: 'merchrpt_id',
		fieldValueMap: 'merchrpt_id',
		fieldDisplay: 'merchrpt_name',
		fields: [
			{mapping: 'merchrpt_id', text: 'merchrpt_id'},
			{mapping: 'merchrpt_name', text: 'merchrpt_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_merchrpt_id_dataloading === 'function') {
				hnd.cbo_merchrpt_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_merchrpt_id_dataloaded === 'function') {
				hnd.cbo_merchrpt_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_merchrpt_id_selected === 'function') {
					hnd.cbo_merchrpt_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_gender_id, {
		title: 'Pilih gender_id',
		returnpage: this_page_id,
		api: $ui.apis.load_gender_id,
		fieldValue: 'gender_id',
		fieldValueMap: 'gender_id',
		fieldDisplay: 'gender_name',
		fields: [
			{mapping: 'gender_id', text: 'gender_id'},
			{mapping: 'gender_name', text: 'gender_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_gender_id_dataloading === 'function') {
				hnd.cbo_gender_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_gender_id_dataloaded === 'function') {
				hnd.cbo_gender_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_gender_id_selected === 'function') {
					hnd.cbo_gender_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_merchsizetag_id, {
		title: 'Pilih merchsizetag_id',
		returnpage: this_page_id,
		api: $ui.apis.load_merchsizetag_id,
		fieldValue: 'merchsizetag_id',
		fieldValueMap: 'merchsizetag_id',
		fieldDisplay: 'merchsizetag_name',
		fields: [
			{mapping: 'merchsizetag_id', text: 'merchsizetag_id'},
			{mapping: 'merchsizetag_name', text: 'merchsizetag_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_merchsizetag_id_dataloading === 'function') {
				hnd.cbo_merchsizetag_id_dataloading(criteria, options);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_merchsizetag_id_dataloaded === 'function') {
				hnd.cbo_merchsizetag_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_merchsizetag_id_selected === 'function') {
					hnd.cbo_merchsizetag_id_selected(value, display, record, args);
				}
			}
		}
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

		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_merchitemctg_id, record.merchitemctg_id, record.merchitemctg_name)
			.setValue(obj.cbo_merchsea_id, record.merchsea_id, record.merchsea_name)
			.setValue(obj.cbo_brand_id, record.brand_id, record.brand_name)
			.setValue(obj.cbo_merchrpt_id, record.merchrpt_id, record.merchrpt_name)
			.setValue(obj.cbo_gender_id, record.gender_id, record.gender_name)
			.setValue(obj.cbo_merchsizetag_id, record.merchsizetag_id, record.merchsizetag_name)
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
		data.merchitem_width = 0
		data.merchitem_length = 0
		data.merchitem_height = 0
		data.merchitem_weight = 0
		data.merchitem_priceori = 0
		data.merchitem_price = 0
		data.merchitem_issp = '0'
		data.merchitem_isdiscvalue = '0'
		data.merchitem_disc = 0
		data.merchitem_discval = 0
		data.merchitem_pricenett = 0
		data.merchitem_lastcogs = 0
		data.merchitem_lastcogsdt = global.now()
		data.merchitem_isallchannel = '1'
		data.merchitem_isnonactive = '0'
		data.merchitem_isdisabled = '0'

		data.merchitemctg_id = '0'
		data.merchitemctg_name = '-- PILIH --'
		data.merchsea_id = '0'
		data.merchsea_name = '-- PILIH --'
		data.brand_id = '0'
		data.brand_name = '-- PILIH --'
		data.merchrpt_id = '0'
		data.merchrpt_name = '-- PILIH --'
		data.gender_id = '0'
		data.gender_name = '-- PILIH --'
		data.merchsizetag_id = '0'
		data.merchsizetag_name = '-- PILIH --'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}


		fl_merchitem_picture_img.hide();
		fl_merchitem_picture_lnk.hide();	
		obj.fl_merchitem_picture.filebox('clear');		
				


		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editbarcodegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpropgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editchannelgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editrelatedgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpicturegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editrefgrid'].handler.createnew(data, options)


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

		obj.fl_merchitem_picture.filebox('clear');			
		if (record.merchitem_picture_doc!=undefined) {
			if (record.merchitem_picture_doc.type.startsWith('image')) {
				fl_merchitem_picture_lnk.hide();
				fl_merchitem_picture_img.show();
				fl_merchitem_picture_img.attr('src', record.merchitem_picture_doc.attachmentdata);
			} else {
				fl_merchitem_picture_img.hide();
				fl_merchitem_picture_lnk.show();
				fl_merchitem_picture_lnk[0].onclick = () => {
					fl_merchitem_picture_lnk.attr('download', record.merchitem_picture_doc.name);
					fl_merchitem_picture_lnk.attr('href', record.merchitem_picture_doc.attachmentdata);
				}
			}	
		} else {
			fl_merchitem_picture_img.hide();
			fl_merchitem_picture_lnk.hide();			
		}				
				
}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini
	
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini
	
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
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


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
	// options.skipmappingresponse = [];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
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



async function form_deleting(data) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
}




