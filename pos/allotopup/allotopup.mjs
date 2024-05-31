const btn_generatebarcode = document.getElementById('btn_generatebarcode');
const btn_cancel = document.getElementById('btn_cancel');
const btn_member = document.getElementById('btn_member');
const btn_scanmember = document.getElementById('btn_scanmember');
const btn_timeoutok = document.getElementById('btn_timeoutok');
const btn_reset = document.getElementById('btn_reset');
const btn_back1 = document.getElementById('pnl_scan-btn_back');
const btn_back2 = document.getElementById('pnl_list-btn_back');
const btn_openmytopup = document.getElementById('btn_openmytopup');
const btn_load = document.getElementById('pnl_list-btn_load');


const obj_txt_nama = document.getElementById('obj_txt_nama');
const obj_txt_email = document.getElementById('obj_txt_email');
const obj_txt_phone = document.getElementById('obj_txt_phone');
const txt_amount = document.getElementById('obj_txt_amount');
const obj_lineinput = document.getElementById('obj_lineinput');
const obj_datestart = document.getElementById('obj_datestart');
const obj_dateend = document.getElementById('obj_dateend');

const obj_txt_result_datestart = document.getElementById('obj_txt_result_datestart');
const obj_txt_result_dateend = document.getElementById('obj_txt_result_dateend');
const obj_txt_result_pic = document.getElementById('obj_txt_result_pic');


const barcodecontainer = document.getElementById('barcodecontainer');
const timeoutinfo = document.getElementById('timeoutinfo');
const timeoutmessage = document.getElementById('timeoutmessage');
const pnl_barcodetimeout = document.getElementById('pnl_barcodetimeout');
const pnl_barcodepagebutton = document.getElementById('pnl_barcodepagebutton');
const pnl_result = document.getElementById('pnl_result');



export async function init(opt) {
	window.$pages = await $pos.component.initPages(opt, {
		pnl_memberinfo: {
			element: document.getElementById('pnl_memberinfo'),
			handler: {}
		},
		pnl_barcode: {
			element: document.getElementById('pnl_barcode'),
			handler: {}
		},
		pnl_scan: {
			element: document.getElementById('pnl_scan'),
			handler: {}		
		},
		pnl_list: {
			element: document.getElementById('pnl_list'),
			handler: {}
		}
	});


	btn_generatebarcode.addEventListener('click', (evt)=>{
		btn_generatebarcode_click(evt);
	});

	btn_cancel.addEventListener('click', (evt)=>{
		btn_cancel_click(evt);
	});

	btn_member.addEventListener('click', (evt)=>{
		btn_member_click(evt);
	});

	btn_scanmember.addEventListener('click', (evt)=>{
		btn_scanmember_click(evt);
	});

	btn_timeoutok.addEventListener('click', (evt)=>{
		btn_timeoutok_click(evt);
	});

	btn_reset.addEventListener('click', (evt)=>{
		btn_reset_click(evt);
	});

	obj_lineinput.addEventListener('keydown', (evt)=>{
		obj_lineinput_keydown(evt);
	});

	btn_back1.addEventListener('click', (evt)=>{
		btn_back_click(evt);
	});

	btn_back2.addEventListener('click', (evt)=>{
		btn_back_click(evt);
	});

	btn_openmytopup.addEventListener('click', (evt)=>{
		btn_openmytopup_click(evt);
	});

	btn_load.addEventListener('click', (evt)=>{
		btn_load_click(evt);
	});


	var options = { 
		format:'yyyy-mm-dd', 
		setDefaultDate: true,
		defaultDate: new Date(),
		autoClose: true,
		showClearBtn: true
	};

	obj_datestart.instance = M.Datepicker.init(obj_datestart, Object.assign({}, options));
	obj_datestart.instance.setDate(new Date());
	obj_datestart.addEventListener('change', (evt)=>{
		obj_date_change(obj_datestart, evt);
	})
	
	obj_dateend.instance = M.Datepicker.init(obj_dateend, Object.assign({}, options));
	obj_dateend.instance.setDate(new Date());
	obj_dateend.addEventListener('change', (evt)=>{
		obj_date_change(obj_dateend, evt);
	})




	var btntopupamount = document.getElementsByClassName('topupamount');
	for (var btn of btntopupamount) {
		let data_value = btn.getAttribute('data-value');
		btn.addEventListener('click', (evt)=>{
			btn_topupamount_click(evt, data_value);
		});
	}


} 


async function btn_load_click(evt) {

	pnl_result.classList.remove('hidden');
	
	try {

		var endpoint = 'retail/pos/allotopup/getmytopup';
		var params = {
			parameter: {
				datestart: obj_datestart.value,
				dateend: obj_dateend.value,
			}
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
			console.log(result);

			obj_txt_result_pic.innerHTML = result.userfullname;
			obj_txt_result_datestart.innerHTML = result.datestart;
			obj_txt_result_dateend.innerHTML = result.dateend;

			var tbody = pnl_result.getElementsByTagName('tbody')[0];
			tbody.innerHTML = '';
			for (var row of result.records) {
				var tr = document.createElement('tr');
				tr.innerHTML = `
					<td>${row.date}</td>
					<td>${row.nomor}</td>
					<td>${row.nama}</td>
					<td style="text-align: right">${parseFloat(row.amount).toLocaleString("en-US")}</td>
				`;
				tbody.appendChild(tr);
			}

			var trtotal = document.createElement('tr');
			trtotal.innerHTML = `
				<td style="font-weight: bold; border-top: 2px solid #dfdfdf" colspan="3">TOTAL</td>
				<td style="font-weight: bold; border-top: 2px solid #dfdfdf; text-align: right">${parseFloat(result.totalamount).toLocaleString("en-US")}</td>
			`;
			tbody.appendChild(trtotal);

		} catch (err) {
			console.error(err);
			throw err;
		}

	} catch (err) {
		await $pos.component.alert({title:'Error', text:err.message});

	}
}


function obj_date_change(el, evt) {
	if (el.value=='') {
		el.instance.setDate(new Date());
		el.value = el.instance.toString();
	}
}

function btn_openmytopup_click(evt) {
	window.$pages.getPage('pnl_list').Show(()=>{
		// var elems = document.querySelectorAll('.datepicker');
    	// var instances = M.Datepicker.init(elems, options);
	});
}

function btn_back_click(evt) {
	window.$pages.getPage('pnl_memberinfo').Show();
}

async function btn_generatebarcode_click(evt) {
	var amount = Number(parseFloat(txt_amount.value));
	if (isNaN(amount)) {
		return;
	}

	var formatted_amount = amount.toLocaleString('en-US', {maximumFractionDigits:0});

	var result = await $pos.component.confirm({title:'Cancel', text:`Anda akan top up nama senilai <b>${formatted_amount}</b>.<br>Lanjutkan ?`});
	if (result==='yes') {
		var endpoint = 'retail/pos/allotopup/generatebarcode';
		var params = {
			parameter: {
				storeId: Cookies.get('site_id'),
				cashierId: Cookies.get('userid'),
				value: amount,
				nama: obj_txt_nama.value,
				email: obj_txt_email.value,
				phone: obj_txt_phone.value
			}
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

			console.log(result);
			if (result.success) {
				var barcode = result.barcode;
				var referenceNo = result.referenceNo;
				var topup_id = result.topup_id;

				params.parameter.barcode = barcode;
				params.parameter.referenceNo = referenceNo;
				params.parameter.topup_id = topup_id;

				barcodecontainer.classList.remove('barcode-hidden');
				pnl_barcodetimeout.classList.remove('barcode-hidden');
				pnl_barcodepagebutton.classList.remove('barcode-hidden');
				timeoutinfo.classList.add('barcode-hidden');
				JsBarcode('#obj_img_barcode', barcode, {format:'CODE128'});
				window.$pages.getPage('pnl_barcode').Show();

				let TimeOutSecond = 200;
				let countDownTo = new Date();
				countDownTo.setSeconds(countDownTo.getSeconds() + TimeOutSecond);
				var now = new Date().getTime();
				var distance = countDownTo - now;
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
				document.getElementById("obj_txt_timeout").innerHTML = format_time(minutes, seconds);
		
				
				window.cekstatusTopUp = setInterval(async ()=>{
					var now = new Date().getTime();
					var distance = countDownTo - now;
					var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.floor((distance % (1000 * 60)) / 1000);
					document.getElementById("obj_txt_timeout").innerHTML = format_time(minutes, seconds);



					var rs = await getStatus(params.parameter);
					console.log(rs);

					if (rs.status.topUpStatus=="00") {
						clearInterval(window.cekstatusTopUp);
						
						barcodecontainer.classList.add('barcode-hidden');
						pnl_barcodetimeout.classList.add('barcode-hidden');
						pnl_barcodepagebutton.classList.add('barcode-hidden');
						timeoutmessage.innerHTML = "Top Up berhasil";
						timeoutinfo.classList.remove('barcode-hidden');
						document.getElementById("obj_txt_timeout").innerHTML = "SUCCESS";

						obj_txt_nama.value = "";
						obj_txt_email.value = "";
						obj_txt_phone.value = "";
						txt_amount.value = 0;

					} else if (rs.status.topUpStatus=='04') {
						clearInterval(window.cekstatusTopUp);

						barcodecontainer.classList.add('barcode-hidden');
						pnl_barcodetimeout.classList.add('barcode-hidden');
						pnl_barcodepagebutton.classList.add('barcode-hidden');
						timeoutmessage.innerHTML = "Top Up Gagal";
						timeoutinfo.classList.remove('barcode-hidden');
						document.getElementById("obj_txt_timeout").innerHTML = "SUCCESS";
					}


					if (distance < 0) {
						clearInterval(window.cekstatusTopUp);
						barcodecontainer.classList.add('barcode-hidden');
						pnl_barcodetimeout.classList.add('barcode-hidden');
						pnl_barcodepagebutton.classList.add('barcode-hidden');
						timeoutinfo.classList.remove('barcode-hidden');
						document.getElementById("obj_txt_timeout").innerHTML = "EXPIRED";
					  }
				}, 1000);

			}

		} catch (err) {
			console.error(err);
			$pos.component.alert({title:'<span style="color:red">Error</span>', text:err.message});
		}

	}


}

function format_time(minute, second) {
	var str_minute = minute;
	var str_second = second;
	
	if (minute<10) {
		str_minute = "0" + minute;
	}

	if (second<10) {
		str_second = "0" + second;
	}

	return str_minute + ":" +str_second;
}

async function btn_cancel_click(evt) {
	var result = await $pos.component.confirm({title:'Cancel', text:'Anda mau cancel top up ?'});
	if (result==='yes') {
		console.log('cancel');
		clearInterval(window.cekstatusTopUp);
		window.$pages.getPage('pnl_memberinfo').Show();
	}
}

async function btn_timeoutok_click(evt) {
	window.$pages.getPage('pnl_memberinfo').Show();
}

async function btn_member_click(evt) {
	window.$pages.getPage('pnl_scan').Show();
}

async function btn_scanmember_click(evt) {
	var lineinput = obj_lineinput.value;
	
	var inputs = lineinput.split('|');
	if (inputs.length==4) {
		var phone = inputs[1];
		var nama = inputs[2];
		var email = inputs[3];
		obj_txt_nama.value = nama;
		obj_txt_email.value = email;
		obj_txt_phone.value = phone;
		window.$pages.getPage('pnl_memberinfo').Show();
	}
	//console.log(lineinput);
	
	// window.$pages.getPage('pnl_memberinfo').Show();
}

async function obj_lineinput_keydown(evt) {
	if (evt.key=='Enter') {
		btn_scanmember_click();
	}
}

async function btn_topupamount_click(evt, data_value) {
	txt_amount.value = data_value;
}

async function getStatus(parameter) {
	var endpoint = 'retail/pos/allotopup/barcodestatus';
	var params = {
		parameter: parameter
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
		return result;
	} catch (err) {
		throw err;
	}
}


async function btn_reset_click(evt) {
	obj_txt_nama.value = "";
	obj_txt_email.value = "";
	obj_txt_phone.value = "";
	txt_amount.value = 0;
}


