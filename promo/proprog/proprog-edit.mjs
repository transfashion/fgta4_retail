var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './proprog-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')


const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const btn_approve = $('#pnl_edit-btn_approve')
const btn_decline = $('#pnl_edit-btn_decline')			
				



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_proprog_id: $('#pnl_edit-txt_proprog_id'),
	txt_proprog_descr: $('#pnl_edit-txt_proprog_descr'),
	txt_proprog_display: $('#pnl_edit-txt_proprog_display'),
	cbo_prorule_id: $('#pnl_edit-cbo_prorule_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_promodel_id: $('#pnl_edit-cbo_promodel_id'),
	cbo_problock_id: $('#pnl_edit-cbo_problock_id'),
	chk_proprog_ispermanent: $('#pnl_edit-chk_proprog_ispermanent'),
	dt_proprog_dtstart: $('#pnl_edit-dt_proprog_dtstart'),
	txt_proprog_timestart: $('#pnl_edit-txt_proprog_timestart'),
	dt_proprog_dtend: $('#pnl_edit-dt_proprog_dtend'),
	txt_proprog_timeend: $('#pnl_edit-txt_proprog_timeend'),
	txt_proprog_valuethreshold: $('#pnl_edit-txt_proprog_valuethreshold'),
	txt_proprog_qtythreshold: $('#pnl_edit-txt_proprog_qtythreshold'),
	txt_proprog_priority: $('#pnl_edit-txt_proprog_priority'),
	chk_proprog_ishasgroupa: $('#pnl_edit-chk_proprog_ishasgroupa'),
	txt_a_proprog_label: $('#pnl_edit-txt_a_proprog_label'),
	cbo_a_prospot_id: $('#pnl_edit-cbo_a_prospot_id'),
	cbo_a_prostep_id: $('#pnl_edit-cbo_a_prostep_id'),
	cbo_a_progrouping_id: $('#pnl_edit-cbo_a_progrouping_id'),
	txt_a_proprog_qtythreshold: $('#pnl_edit-txt_a_proprog_qtythreshold'),
	txt_a_proprog_valuethreshold: $('#pnl_edit-txt_a_proprog_valuethreshold'),
	txt_a_proprog_sellprice: $('#pnl_edit-txt_a_proprog_sellprice'),
	txt_a_proprog_disc: $('#pnl_edit-txt_a_proprog_disc'),
	txt_a_proprog_discval: $('#pnl_edit-txt_a_proprog_discval'),
	chk_proprog_ishasgroupb: $('#pnl_edit-chk_proprog_ishasgroupb'),
	txt_b_proprog_label: $('#pnl_edit-txt_b_proprog_label'),
	cbo_b_prospot_id: $('#pnl_edit-cbo_b_prospot_id'),
	txt_b_proprog_qtythreshold: $('#pnl_edit-txt_b_proprog_qtythreshold'),
	txt_b_proprog_valuethreshold: $('#pnl_edit-txt_b_proprog_valuethreshold'),
	txt_b_proprog_sellprice: $('#pnl_edit-txt_b_proprog_sellprice'),
	txt_a_proprog_qtyapplied: $('#pnl_edit-txt_a_proprog_qtyapplied'),
	chk_b_proprog_isblockonmeet: $('#pnl_edit-chk_b_proprog_isblockonmeet'),
	txt_proprog_version: $('#pnl_edit-txt_proprog_version'),
	chk_proprog_isdisabled: $('#pnl_edit-chk_proprog_isdisabled'),
	chk_proprog_iscommit: $('#pnl_edit-chk_proprog_iscommit'),
	txt_proprog_commitby: $('#pnl_edit-txt_proprog_commitby'),
	txt_proprog_commitdate: $('#pnl_edit-txt_proprog_commitdate'),
	chk_proprog_isapprovalprogress: $('#pnl_edit-chk_proprog_isapprovalprogress'),
	chk_proprog_isapproved: $('#pnl_edit-chk_proprog_isapproved'),
	txt_proprog_approveby: $('#pnl_edit-txt_proprog_approveby'),
	txt_proprog_approvedate: $('#pnl_edit-txt_proprog_approvedate'),
	chk_proprog_isdeclined: $('#pnl_edit-chk_proprog_isdeclined'),
	txt_proprog_declineby: $('#pnl_edit-txt_proprog_declineby'),
	txt_proprog_declinedate: $('#pnl_edit-txt_proprog_declinedate'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	chk_proprog_isdownload: $('#pnl_edit-chk_proprog_isdownload')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		
const rec_approveby = $('#pnl_edit_record-approveby');
const rec_approvedate = $('#pnl_edit_record-approvedate');			
const rec_declineby = $('#pnl_edit_record-declineby');
const rec_declinedate = $('#pnl_edit_record-declinedate');			
			


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
		primary: obj.txt_proprog_id,
		autoid: true,
		logview: 'mst_proprog',
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

			


	btn_approve.linkbutton({ onClick: async () => { 
		var args = { action: 'approve', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		btn_action_click({ action: args.action, param: args.param }); 
	} });

	btn_decline.linkbutton({ onClick: async () => {
		var args = { action: 'decline', cancel: false, param: {}};
		if (typeof hnd.action_starting === 'function') {
			await hnd.action_starting(args);
		}
		if (args.cancel) {
			if (typeof args.cancelShowMessage === 'function') { args.cancelShowMessage(); }
			return;
		}
		var id = 'pnl_edit-reason_' + Date.now().toString();
		$ui.ShowMessage(`
			<div style="display: block;  margin-bottom: 10px">
				<div style="font-weight: bold; margin-bottom: 10px">Reason</div>
				<div">
					<input id="${id}" class="easyui-textbox" style="width: 300px; height: 60px;" data-options="multiline: true">
				</div>
			</div>
		`, {
			'Decline': () => {
				var txt = window.parent.document.getElementById(id);
				var reason = txt.value;
				btn_action_click({ action: args.action, param: args.param, reason: reason }); 
			},
			'Cancel': () => {
			} 
		}, ()=>{
			var txt = window.parent.document.getElementById(id);
			txt.placeholder = 'type your decline reason';
			txt.maxLength = 255;
			txt.classList.add('declinereasonbox');
			txt.addEventListener('keyup', (ev)=>{
				if (ev.key=='Enter') {
					ev.stopPropagation();
				}
			});
			txt.focus();
		})
	}});				
				
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
				
	obj.cbo_dept_id.name = 'pnl_edit-cbo_dept_id'		
	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'}
		],
		OnDataLoading: (criteria, options) => {
			
			if (typeof hnd.cbo_dept_id_dataloading === 'function') {
				hnd.cbo_dept_id_dataloading(criteria, options);
			}						
		},					
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_dept_id_selected === 'function') {
					hnd.cbo_dept_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_promodel_id.name = 'pnl_edit-cbo_promodel_id'		
	new fgta4slideselect(obj.cbo_promodel_id, {
		title: 'Pilih promodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_promodel_id,
		fieldValue: 'promodel_id',
		fieldDisplay: 'promodel_name',
		fields: [
			{mapping: 'promodel_id', text: 'promodel_id'},
			{mapping: 'promodel_name', text: 'promodel_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_promodel_id_selected === 'function') {
					hnd.cbo_promodel_id_selected(value, display, record, args);
				}
			}
		},

	})				
				
	obj.cbo_problock_id.name = 'pnl_edit-cbo_problock_id'		
	new fgta4slideselect(obj.cbo_problock_id, {
		title: 'Pilih problock_id',
		returnpage: this_page_id,
		api: $ui.apis.load_problock_id,
		fieldValue: 'problock_id',
		fieldDisplay: 'problock_name',
		fields: [
			{mapping: 'problock_id', text: 'problock_id'},
			{mapping: 'problock_name', text: 'problock_name'}
		],
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_problock_id_selected === 'function') {
					hnd.cbo_problock_id_selected(value, display, record, args);
				}
			}
		},

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
				
	obj.cbo_a_progrouping_id.name = 'pnl_edit-cbo_a_progrouping_id'		
	new fgta4slideselect(obj.cbo_a_progrouping_id, {
		title: 'Pilih a_progrouping_id',
		returnpage: this_page_id,
		api: $ui.apis.load_a_progrouping_id,
		fieldValue: 'a_progrouping_id',
		fieldDisplay: 'a_progrouping_name',
		fieldValueMap: 'progrouping_id',
		fieldDisplayMap: 'progrouping_name',
		fields: [
			{mapping: 'progrouping_id', text: 'progrouping_id'},
			{mapping: 'progrouping_name', text: 'progrouping_name'}
		],

	})				
				
	obj.cbo_b_prospot_id.name = 'pnl_edit-cbo_b_prospot_id'		
	new fgta4slideselect(obj.cbo_b_prospot_id, {
		title: 'Pilih b_prospot_id',
		returnpage: this_page_id,
		api: $ui.apis.load_b_prospot_id,
		fieldValue: 'b_prospot_id',
		fieldDisplay: 'b_prospot_name',
		fieldValueMap: 'prospot_id',
		fieldDisplayMap: 'prospot_name',
		fields: [
			{mapping: 'prospot_id', text: 'prospot_id'},
			{mapping: 'prospot_name', text: 'prospot_name'}
		],

	})				
				
	obj.cbo_doc_id.name = 'pnl_edit-cbo_doc_id'		
	new fgta4slideselect(obj.cbo_doc_id, {
		title: 'Pilih doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doc_id,
		fieldValue: 'doc_id',
		fieldDisplay: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'}
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
		if (result.record.a_prospot_id==null) { result.record.a_prospot_id='--NULL--'; result.record.a_prospot_name='NONE'; }
		if (result.record.a_prostep_id==null) { result.record.a_prostep_id='--NULL--'; result.record.a_prostep_name='NONE'; }
		if (result.record.a_progrouping_id==null) { result.record.a_progrouping_id='--NULL--'; result.record.a_progrouping_name='NONE'; }
		if (result.record.b_prospot_id==null) { result.record.b_prospot_id='--NULL--'; result.record.b_prospot_name='NONE'; }

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
			.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name)
			.setValue(obj.cbo_promodel_id, record.promodel_id, record.promodel_name)
			.setValue(obj.cbo_problock_id, record.problock_id, record.problock_name)
			.setValue(obj.cbo_a_prospot_id, record.a_prospot_id, record.a_prospot_name)
			.setValue(obj.cbo_a_prostep_id, record.a_prostep_id, record.a_prostep_name)
			.setValue(obj.cbo_a_progrouping_id, record.a_progrouping_id, record.a_progrouping_name)
			.setValue(obj.cbo_b_prospot_id, record.b_prospot_id, record.b_prospot_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
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
		data.proprog_ispermanent = '0'
		data.proprog_dtstart = global.now()
		data.proprog_dtend = global.now()
		data.proprog_valuethreshold = 0
		data.proprog_qtythreshold = 0
		data.proprog_priority = 0
		data.proprog_ishasgroupa = '0'
		data.a_proprog_qtythreshold = 0
		data.a_proprog_valuethreshold = 0
		data.a_proprog_sellprice = 0
		data.a_proprog_disc = 0
		data.a_proprog_discval = 0
		data.proprog_ishasgroupb = '0'
		data.b_proprog_qtythreshold = 0
		data.b_proprog_valuethreshold = 0
		data.b_proprog_sellprice = 0
		data.a_proprog_qtyapplied = 0
		data.b_proprog_isblockonmeet = '0'
		data.proprog_version = 0
		data.proprog_isdisabled = '0'
		data.proprog_iscommit = '0'
		data.proprog_isapprovalprogress = '0'
		data.proprog_isapproved = '0'
		data.proprog_isdeclined = '0'
		data.proprog_isdownload = '0'

		data.prorule_id = '0'
		data.prorule_name = '-- PILIH --'
		data.dept_id = '0'
		data.dept_name = '-- PILIH --'
		data.promodel_id = '0'
		data.promodel_name = '-- PILIH --'
		data.problock_id = '0'
		data.problock_name = '-- PILIH --'
		data.a_prospot_id = '--NULL--'
		data.a_prospot_name = 'NONE'
		data.a_prostep_id = '--NULL--'
		data.a_prostep_name = 'NONE'
		data.a_progrouping_id = '--NULL--'
		data.a_progrouping_name = 'NONE'
		data.b_prospot_id = '--NULL--'
		data.b_prospot_name = 'NONE'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id

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
		
		rec_approveby.html('');
		rec_approvedate.html('');
		rec_declineby.html('');
		rec_declinedate.html('');
		


		var button_commit_on = true;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');
			

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editgroupagrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editgroupbgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editsitegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editpospaymgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editapprovalgrid'].handler.createnew(data, options)


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

	rec_commitby.html(record.proprog_commitby);
	rec_commitdate.html(record.proprog_commitdate);
		
	rec_approveby.html(record.proprog_approveby);
	rec_approvedate.html(record.proprog_approvedate);
	rec_declineby.html(record.proprog_declineby);
	rec_declinedate.html(record.proprog_declinedate);
			

	if (typeof hnd.form_updaterecordstatus == 'function') {
		hnd.form_updaterecordstatus(record);
	}
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

	/* action button */
	var button_commit_on = false;
	var button_uncommit_on = false;
	var button_approve_on = false;
	var button_decline_on = false;

	
	if (record.proprog_isfirm=="1") {
		button_commit_on = false;
		button_uncommit_on = false;
		button_approve_on = false;
		button_decline_on = false;
		form.lock(true);	
	} else if (record.proprog_isdeclined=="1" || record.proprog_isuseralreadydeclined=="1") {
		button_commit_on = false;
		button_uncommit_on = true;
		button_approve_on = true;
		button_decline_on = false;
		form.lock(true);	
	} else if (record.proprog_isapproved=="1" || record.proprog_isuseralreadyapproved=="1") {
		button_commit_on = false;
		button_uncommit_on = false;
		button_approve_on = false;
		button_decline_on = true;	
		form.lock(true);	
	} else if (record.proprog_isapprovalprogress=="1") {
		button_commit_on = false;
		button_uncommit_on = false;
		button_approve_on = true;
		button_decline_on = true;
		form.lock(true);	
	} else if (record.proprog_iscommit=="1") {
		button_commit_on = false;
		button_uncommit_on = true;
		button_approve_on = true;
		button_decline_on = true;
		form.lock(true);		
	} else {
		button_commit_on = true;
		button_uncommit_on = false;
		button_approve_on = false;
		button_decline_on = false;
		form.lock(false);
	} 

	btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
	btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
	btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
	btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');		
			

	if (typeof hnd.form_updatebuttonstate == 'function') {
		hnd.form_updatebuttonstate(record);
	}
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'proprog_iscommit';
	updategriddata[col_commit] = record.proprog_iscommit;	
	
	var col_approveprogress = 'proprog_isapprovalprogress';
	var col_approve = 'proprog_isapprove'
	var col_decline = "proprog_isdeclined"
	updategriddata[col_approveprogress] = record.proprog_isapprovalprogress;
	updategriddata[col_approve] = record.proprog_isapproved;
	updategriddata[col_decline] = record.proprog_isdeclined;				
			
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
	var objid = obj.txt_proprog_id
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
	// options.skipmappingresponse = ['a_prospot_id', 'a_prostep_id', 'a_progrouping_id', 'b_prospot_id', ];
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
	form.setValue(obj.cbo_a_prospot_id, result.dataresponse.a_prospot_name!=='--NULL--' ? result.dataresponse.a_prospot_id : '--NULL--', result.dataresponse.a_prospot_name!=='--NULL--'?result.dataresponse.a_prospot_name:'NONE')
	form.setValue(obj.cbo_a_prostep_id, result.dataresponse.a_prostep_name!=='--NULL--' ? result.dataresponse.a_prostep_id : '--NULL--', result.dataresponse.a_prostep_name!=='--NULL--'?result.dataresponse.a_prostep_name:'NONE')
	form.setValue(obj.cbo_a_progrouping_id, result.dataresponse.a_progrouping_name!=='--NULL--' ? result.dataresponse.a_progrouping_id : '--NULL--', result.dataresponse.a_progrouping_name!=='--NULL--'?result.dataresponse.a_progrouping_name:'NONE')
	form.setValue(obj.cbo_b_prospot_id, result.dataresponse.b_prospot_name!=='--NULL--' ? result.dataresponse.b_prospot_id : '--NULL--', result.dataresponse.b_prospot_name!=='--NULL--'?result.dataresponse.b_prospot_name:'NONE')

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


	var docname = 'Promo'
	var txt_version = obj.txt_proprog_version;
	var chk_iscommit = obj.chk_proprog_iscommit;
	
	var chk_isapprovalprogress = obj.chk_proprog_isapprovalprogress;	
	var chk_isapprove = obj.chk_proprog_isapproved;
	var chk_isdeclined = obj.chk_proprog_isdeclined;
		
	
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
			
		
		case 'approve' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Approval Code';
			args.param = {
				approve: true,
				approval_note: ''
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprovalprogress.checkbox('check');
				chk_isapprove.checkbox(result.isfinalapproval ? "check" : "uncheck");
				chk_isdeclined.checkbox('uncheck');
				form.commit();
			}
			break;

		case 'decline' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = '', //`Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Decline Code';
			args.param = {
				approve: false,
				approval_note: args.reason
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprove.checkbox('uncheck');
				chk_isdeclined.checkbox('check');
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
	
	