const pnl_login = document.getElementById('pnl_login');
const obj_txt_username = document.getElementById('obj_txt_username');
const obj_txt_password = document.getElementById('obj_txt_password');
const obj_chk_remember = document.getElementById('obj_chk_remember');
const btn_login = document.getElementById('btn_login');
const btn_setting = document.getElementById('btn_setting');

export function init(opt) {
	pnl_login.classList.remove('hidden');

	btn_login.addEventListener('click', (ev)=>{
		btn_login_click();
	});

	btn_setting.addEventListener('click', (evt) => {
		btn_setting_click(evt);
	})

	obj_txt_username.addEventListener('keypress', (ev)=>{
		obj_txt_username_keypress(ev);
	});

	obj_txt_password.addEventListener('keypress', (ev)=>{
		obj_txt_password_keypress(ev);
	});


	if (window.isRunningStandalone()) {
		var pnl_setting = document.getElementById('pnl_setting');
		pnl_setting.style.display='block';
	}

	//Cookies.remove('tokenid', {path: window.urlparams.cookiepath});
	Cookies.remove('userid', {path: window.urlparams.cookiepath});
	Cookies.remove('userfullname', {path: window.urlparams.cookiepath});
	Cookies.remove('site_id', {path: window.urlparams.cookiepath});
	Cookies.remove('site_name', {path: window.urlparams.cookiepath});
}


async function btn_login_click() {


	var username = obj_txt_username.value;
	var password = obj_txt_password.value;
	var ld;

	if (username=='' || password=='') {
		return;
	}


	btn_login.disabled = true;

	if (!window.isRunningStandalone()) {
		$pos.component.alert({
			title:'Forbiden', 
			text:`<div class="loginmessage-error">Anda tidak diperbolehkan menjalankan program ini</div>`,
			buttons: {
				ok : {
					text: 'Close',
					action: (modal) => {
						btn_login.disabled = false;
						modal.close();
					}
				}
			}
		});
		return;
	} 

	

	try {
		var licensevalue = window.localStorage.getItem('licensevalue');
		ld = window.parseLicenseData(licensevalue);
	} catch (err) {
		$pos.component.alert({
			title:'Forbiden', 
			text:`<div class="loginmessage-error">License is not valid.</div><div>Please set license in setting</div>`,
			buttons: {
				ok : {
					text: 'Close',
					action: (modal) => {
						btn_login.disabled = false;
						modal.close();
					}
				}
			}
		});
		return;
	}




	var username = obj_txt_username.value;
	var password = obj_txt_password.value;
	var remember = 	obj_chk_remember.checked;

	btn_login.disabled = true;
	btn_login.innerHTML = 'wait...'

	try {

		var endpoint = 'retail/pos/poslogin/doposlogin';
		var params = {
			username: username,
			password: password,
			licensedata: ld
		}
		var options = {
			OnJsonParseError: (err, result) => {
				console.error(err);
				console.log(result);
			},
			OnContentOutput: (output) => {
				console.log(output)
			}
		}

		var result = await $pos.api.call(endpoint, params, options);
		console.log(result);
		if (!result.loginsuccess) {
			$pos.component.alert({title:'Login', text:`<div class="loginmessage-error">${result.loginmessage}</div>`});
		} else {
			Cookies.set('tokenid', result.userdata.tokenid, {path: window.urlparams.cookiepath});
			Cookies.set('userid', result.userdata.username, {path: window.urlparams.cookiepath});
			Cookies.set('userfullname', result.userdata.userfullname, {path: window.urlparams.cookiepath});
			Cookies.set('site_id', result.userdata.site_id, {path: window.urlparams.cookiepath});
			Cookies.set('site_name', result.userdata.site_name, {path: window.urlparams.cookiepath});

			location.href = result.redirect;
		}

	} catch (err) {
		console.error(err);
	}
	finally {
		btn_login.disabled = false;
		btn_login.innerHTML = 'login'
	}

}

function obj_txt_username_keypress(ev) {
	if (ev.key==='Enter') {
		var username = obj_txt_username.value;
		if (username!='') {
			obj_txt_password.focus();
		}
	}
}

function obj_txt_password_keypress(ev) {
	if (ev.key==='Enter') {
		var username = obj_txt_username.value;
		var password = obj_txt_password.value;
		if (username!='' && password!='') {
			btn_login_click();
			btn_login.focus();
			obj_txt_password.blur();
		}
	}
}

function btn_setting_click(evt) {
	location.href = 'index.php/module/retail/pos/possetting';
}

