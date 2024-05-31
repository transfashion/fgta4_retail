let editor, form, obj, opt;

const btn_setup = $('#pnl_edit-btn_setup')
const btn_lock = $('#pnl_edit-btn_lock')
const btn_unlock = $('#pnl_edit-btn_unlock')

const setupcode = $('#pnl_edit-setupcode');

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	console.log('bar');

	document.getElementById('pnl_edit-btn_lock').addEventListener('keypress', (evt)=>{
		console.log('press on btn lock');
		if (evt.key==='Enter') {
			evt.preventDefault();
		}
	})

	document.getElementById('pnl_edit-btn_unlock').addEventListener('keypress', (evt)=>{
		console.log('press on btn lock');
		if (evt.key==='Enter') {
			// console.log('enter on btn unlock');
			evt.preventDefault();
		}
	})
	
}



export function form_newdata(data, options) {
	options.OnNewData = () => {
		form_updatebuttonstate(data);
		setupcode.addClass('setupinfo-hidden');
	}
}

export function form_dataopened(result, options) {	
	var record = result.record;
	if (record.posterminal_setupcode!='' && record.posterminal_setupcode!=null) {
		setupcode.html(`Site: <b>${record.site_id}</b>, Code: <b>${record.posterminal_setupcode}</b>`);
		setupcode.removeClass('setupinfo-hidden');
	} else {
		setupcode.html('');
		setupcode.addClass('setupinfo-hidden');
	}

	var islock = parseInt(record.posterminal_islock);
	form.lock(islock==1 ? true : false);
}


export function form_updatebuttonstate(record) {
	var islock = parseInt(record.posterminal_islock);
	lock(islock==1 ? true : false);
}

function lock(islock) {
	if (islock) {
		btn_setup.linkbutton('disable');
		btn_lock.hide();
		btn_unlock.show();
	} else {
		btn_setup.linkbutton('enable');
		btn_lock.show();
		btn_unlock.hide();
	}
}

export function do_other_action(args) {
	switch (args.action) {
		case 'setup' :
			args.param = {},
			args.act_url = `${global.modulefullname}/xtion-generatesetupcode`;
			args.act_msg_quest = `Apakah anda yakin akan membuat setup code terminal ${args.id} ?`;
			//args.act_msg_result = `setup code terminal ${args.id} telah dibuat.<br>Masukkan code site:<b></b> code setup: <b></b>`;
			args.act_msg_result = '';
			args.act_do = (result) => {	
				window.$ui.ShowMessage(`<div><div>Setup code telah dibuat.</div><div>Masukkan code site: <big><b>${result.site_id}</b></big>, code setup: <big><b>${result.posterminal_setupcode}</b></big></div></div>`);
				form.setValue(obj.txt_posterminal_license, result.posterminal_license);
				form.setValue(obj.txt_posterminal_setupcode, result.posterminal_setupcode);
				form.commit();
				
				setupcode.html(`Site: <b>${result.site_id}</b>, Code: <b>${result.posterminal_setupcode}</b>`);
				setupcode.removeClass('setupinfo-hidden');

			}
			break;

		case 'lock' :
			args.param = {
				dolock: true
			},
			args.act_url = `${global.modulefullname}/xtion-lock`;
			args.act_msg_quest = `Apakah anda yakin akan lock terminal ${args.id} ?`;
			args.act_msg_result = '';
			args.act_do = (result) => {	
				if (result.success) {
					window.$ui.ShowMessage(`Terminal telah di lock`);
					lock(true);
					form.setValue(obj.chk_posterminal_islock, true);
					form.commit();
					form.lock(true);
				} else {
					window.$ui.ShowMessage(`[WARNING]${result.message}`);
				}
			}
			break;

		case 'unlock' :
			args.param = {
				dolock: false
			},
			args.act_url = `${global.modulefullname}/xtion-lock`;
			args.act_msg_quest = `Apakah anda yakin akan unlock terminal ${args.id} ?`;
			args.act_msg_result = '';
			args.act_do = (result) => {	
				if (result.success) {
					window.$ui.ShowMessage(`Terminal telah di unlock`);
					lock(false);
					form.setValue(obj.chk_posterminal_islock, false);
					form.commit();
					form.lock(false);
				} else {
					window.$ui.ShowMessage(`[WARNING]${result.message}`);
				}
			}
			break;
	}
}

	
export function cbo_site_id_dataloading(criteria, options) {
	criteria.site_isdisabled=0;
}

export function cbo_site_id_selected(value, display, record, args) {
	form.setValue(obj.txt_store_code, record.site_code);
	form.setValue(obj.txt_posterminal_code, '01');
}	