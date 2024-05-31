const btn_save = document.getElementById('btn_save');
const btn_cancel = document.getElementById('btn_cancel');
const btn_back = document.getElementById('btn_back');
const btn_applycode = document.getElementById('btn_applycode');

const obj_chk_bylicensefile = document.getElementById('obj_chk_bylicensefile');
const obj_chk_bycode = document.getElementById('obj_chk_bycode');
const obj_txt_file = document.getElementById('obj_txt_file');
const obj_txt_site = document.getElementById('obj_txt_site');
const obj_txt_code = document.getElementById('obj_txt_code');
const obj_txt_settingtitle = document.getElementById('obj_txt_settingtitle');
const obj_txt_terminal_id = document.getElementById('obj_txt_terminal_id');
const obj_txt_site_id = document.getElementById('obj_txt_site_id');
const obj_txt_site_name = document.getElementById('obj_txt_site_name');
const obj_txt_license_to = document.getElementById('obj_txt_license_to');
const obj_txt_license_date = document.getElementById('obj_txt_license_date');
const obj_txt_license_validuntil = document.getElementById('obj_txt_license_validuntil');
const obj_txt_licensedata = document.getElementById('obj_txt_licensedata');

const row_licensefile = document.getElementById('row_licensefile');
const row_code = document.getElementById('row_code');
const pnl_savesetting = document.getElementById('pnl_savesetting');
const pnl_buttons = document.getElementById('pnl_buttons');



export async function init(opt) {
	// var jsonlicense = window.Base64.decode(currentlincense);
	// console.log(jsonlicense);

	obj_txt_settingtitle.innerHTML = 'Current Setting';



	btn_save.addEventListener('click', (evt)=>{
		btn_save_click(evt);
	});

	btn_cancel.addEventListener('click', (evt)=>{
		btn_cancel_click(evt);
	});

	btn_back.addEventListener('click', (evt)=>{
		btn_back_click(evt);
	})	

	btn_applycode.addEventListener('click', (evt)=>{
		btn_applycode_click(evt);
	})

	obj_txt_file.addEventListener('change', (evt)=>{
		obj_txt_file_change(evt);
	});

	obj_chk_bylicensefile.addEventListener('change', (evt)=>{
		obj_chk_bylicensefile_checked(true);
	})

	obj_chk_bycode.addEventListener('change', (evt)=>{
		obj_chk_bycode_checked(true);
	})

	// read current setting
	var licensevalue = window.localStorage.getItem('licensevalue');
	if (licensevalue!=null) {
		var ld = window.parseLicenseData(licensevalue);
		showLicenseData(ld, licensevalue);
	}

}


function obj_chk_bylicensefile_checked(checked) {
	row_licensefile.classList.remove('mode-row-hidden');
	row_code.classList.add('mode-row-hidden');
}

function obj_chk_bycode_checked(checked) {
	row_licensefile.classList.add('mode-row-hidden');
	row_code.classList.remove('mode-row-hidden');

}


async function obj_txt_file_change(evt) {
	// read oploade file
	var file = document.getElementById("obj_file_content").files[0];
	var reader = new FileReader();
	reader.readAsText(file, "UTF-8");
	reader.onload = function (evt) {
		// console.log(evt.target.result);
		try {
			var licensevalue = evt.target.result;
			var ld = window.parseLicenseData(licensevalue);


			// window.localStorage.setItem('temp_licensevalue', licensevalue);
			window.temp_license_value = licensevalue;
			showLicenseData(ld, licensevalue);


			obj_txt_settingtitle.innerHTML = '<b>Apply New Setting</b>';
			pnl_savesetting.classList.remove('hidden-element');
			pnl_buttons.classList.add('hidden-element');



		} catch (err) {
			$pos.component.alert({title:'Error', text:`<div style="color:red">License file is not valid!</div>`});
		}
	}
	reader.onerror = function (evt) {
		console.error('Cannot read file');
		$pos.component.alert({title:'Error', text:`<div style="color:red">License file is not valid!</div>`});
	}
}



function showLicenseData(ld, licensevalue) {
	console.log(ld);

	obj_txt_terminal_id.innerHTML = ld.posterminal_id;
	obj_txt_site_id.innerHTML = ld.site_id;
	obj_txt_site_name.innerHTML = ld.site_name;
	obj_txt_license_to.innerHTML = ld.license_to;
	obj_txt_license_date.innerHTML = ld.license_date;
	obj_txt_license_validuntil.innerHTML = ld.license_valid_to;
	// obj_txt_licensedata.innerHTML = '<pre>' + licensevalue + '</pre>';

}


async function btn_save_click(evt) {
	var result = await $pos.component.confirm({title:'Apply Changes', text:`do you really want to apply theses changes ?`});
	if (result=='yes') {
		try {
			var ld = window.parseLicenseData(window.temp_license_value);
			var posterminal_id = ld.posterminal_id;

			window.localStorage.setItem('licensevalue', window.temp_license_value);
			await commitcode(posterminal_id)
			location.href='index.php/module/retail/pos/poslogin';
		} catch (err) {
			$pos.component.alert({title:'Error', text:err.message});
		}
	}
}

async function btn_cancel_click(evt) {
	var result = await $pos.component.confirm({title:'Cancel', text:`do you really want cancel ?`});
	if (result=='yes') {
		location.href='index.php/module/retail/pos/poslogin';
	}
}

function btn_back_click(evt) {
	location.href='index.php/module/retail/pos/poslogin';
}


async function commitcode(posterminal_id) {
	var endpoint = 'retail/pos/possetting/commitcode';
	var params = {
		posterminal_id: posterminal_id
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

	try {
		var result = await $pos.api.call(endpoint, params, options);
		if (!result.success) {
			throw new Error(result.message)
		}
		return true;
	} catch (err) {
		console.error(err);
		$pos.component.alert({title:'Error', text:err.message});
	}
}

async function btn_applycode_click(evt) {
	var endpoint = 'retail/pos/possetting/applycode';
	var params = {
		site_id: obj_txt_site.value,
		code: obj_txt_code.value,
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

	try {

		var result = await $pos.api.call(endpoint, params, options);
		if (!result.success) {
			throw new Error(result.message)
		}
		
		var licensevalue = result.licensevalue;
		var ld = window.parseLicenseData(licensevalue);

		window.temp_license_value = licensevalue;
		showLicenseData(ld, licensevalue);

		obj_txt_settingtitle.innerHTML = '<b>Apply New Setting</b>';
		pnl_savesetting.classList.remove('hidden-element');
		pnl_buttons.classList.add('hidden-element');

	} catch (err) {
		console.error(err);
		$pos.component.alert({title:'Error', text:err.message});
	}
}