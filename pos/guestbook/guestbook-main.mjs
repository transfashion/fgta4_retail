let html5QrCode;
let html5QrcodeScanner;

const obj_lineinput = document.getElementById('pnl_main-obj_lineinput');
const chk_ismanual = document.getElementById('pnl_main-chk_ismanual');

const obj_txt_nama = document.getElementById('pnl_main-obj_txt_nama');
const obj_txt_alamat = document.getElementById('pnl_main-obj_txt_alamat');
const obj_txt_telp = document.getElementById('pnl_main-obj_txt_telp');
const obj_txt_email = document.getElementById('pnl_main-obj_txt_email');
const btn_save = document.getElementById('pnl_main-btn_save');
const pnl_result = document.getElementById('pnl_main-result');
const btn_display = document.getElementById('pnl_main-btn_display');
const btn_update = document.getElementById('pnl_main-btn_update');
const btn_reload = document.getElementById('pnl_main-btn_reload');

let db_crmevent_id = 'RAKER2023';

let searching = false;

export async function init(opt) {

	console.log('77');
	let config = {
		fps: 10, 
		qrbox: 250
	};

	// html5QrCode = new Html5Qrcode("qr-reader");
	// html5QrCode.start({ facingMode: "user" }, config, onScanSuccess);

	html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", config);
	html5QrcodeScanner.render(onScanSuccess);

	setTimeout(()=>{
		obj_lineinput.focus();
	}, 1000);


	chk_ismanual.addEventListener('change', function(evt) {
		chk_ismanual_changed(this.checked);
	});

	btn_display.addEventListener('click', (evt)=>{
		btn_display_click(evt);
	});

	btn_update.addEventListener('click', (evt)=>{
		btn_update_click(evt);
	})

	btn_reload.addEventListener('click', (evt)=>{
		btn_reload_click(evt);
	})

	btn_save.addEventListener('click', ()=>{
		btn_save_click();
	})

	chk_ismanual_changed(false);

}


function onScanSuccess(decodedText, decodedResult) {
	// console.log(`Code scanned = ${decodedText}`, decodedResult);
	obj_lineinput.value = decodedText;
	readScannedInput('CAM');
}


export async function receiveKeydownEvent(evt) {
	if (evt.srcElement.id==obj_lineinput.id) {
		clearForm();
		if (evt.key=='Enter') {
			readScannedInput('LINE');
		}
	}
}


function clearForm() {
	obj_txt_nama.value = '';
	obj_txt_alamat.value = '';
	obj_txt_telp.value = '';
	obj_txt_email.value = '';

	obj_txt_nama.classList.remove('active');

	M.updateTextFields();
}

async function readScannedInput(source) {

	var value = obj_lineinput.value;
	obj_lineinput.value = '';

	if (searching) {
		return;
	}

	searching = true;
	setTimeout(()=>{
		searching = false;
	}, 2000);

	
	console.log('scann inputnya');
	console.log(value);
	console.log(Cookies.get('site_id'));

	// 000201000000033282|085885525565|agung agung|agung_dhewe@yahoo.com
	// 000201000000033282|085885525565dd|agung agung|agung_dhewe@yahoo.com
	// 
	var vpart = value.split('|');
	if (vpart.length==4) {

		try {

			var invitation_id = vpart[0];
			var phone = vpart[1];
			var nama = vpart[2];
			var email = vpart[3];

			// read input from database
			var endpoint = 'retail/pos/guestbook/getguestinfo';
			var params = {
				data: {
					nama : nama,
					event_id : db_crmevent_id,
					ticket_id : invitation_id,
					phonenumber: phone
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
				if (!result.success) {
					if (source=='CAM') /* CAM | LINE */  {
						// dari camera
						// let elmsg = document.createElement('div');
						// elmsg.classList.add('notfound');
						// elmsg.innerHTML = result.message;
						// pnl_result.insertBefore(elmsg,  pnl_result.firstChild);
						// setTimeout(()=>{
						// 	elmsg.remove()
						// }, 2000);

						$pos.component.alert({
							title:'<span style="color:red">Tidak terdaftar</span>', 
							text:`<h5>${result.message}</h5>`, 
							onOpened: (modal)=>{
								setTimeout(()=>{
									clearForm();
									searching = false;
									modal.close();
								}, 2000);
							}
						});

					} else {
						// dari line input
						await $pos.component.alert({title:'Error', text:result.message});
					}
				} else {
					obj_txt_nama.value = result.datarespond.name;
					obj_txt_alamat.value = result.datarespond.address;
					obj_txt_telp.value = phone;
					obj_txt_email.value = email;
					M.updateTextFields();

					// simpan data
					await SimpanData(source, {
						name: obj_txt_nama.value,
						address: obj_txt_alamat.value, 
						phone: obj_txt_telp.value,
						email: obj_txt_email.value, 
						invitation_id: invitation_id,
						crmevent_id: result.datarespond.crmevent_id,
						site_id: Cookies.get('site_id')
					});

					if (source=='CAM') {

						$pos.component.alert({
							title:'Selamat Datang', 
							text:`<h5>${result.datarespond.name}<br>${result.datarespond.address}</h5>`, 
							onOpened: (modal)=>{
								setTimeout(()=>{
									clearForm();
									searching = false;
									modal.close();
								}, 2000);
							}
						});



						// let elmsg = document.createElement('div');
						// elmsg.classList.add('welcome');
						// elmsg.innerHTML = `
						// 	Selamat Datang,<br><br>
						// 	<b>${result.datarespond.name}</b><br>
						// 	${result.datarespond.address}
						// `;
						// pnl_result.insertBefore(elmsg,  pnl_result.firstChild);
						// setTimeout(()=>{
						// 	clearForm();
						// 	elmsg.remove()
						// }, 2000);
					}
				}

			} catch (err) {
				console.error(err);
				throw err;
			} finally {
				//searching = false;
			}

		} catch (err) {
			await $pos.component.alert({title:'Error', text:err.message});
		}
	}

}


function btn_save_click() {
	SimpanData('MANUAL', {
		name: obj_txt_nama.value,
		address: obj_txt_alamat.value, 
		phone: obj_txt_telp.value,
		email: obj_txt_email.value, 
		invitation_id: '',
		crmevent_id: db_crmevent_id
	});
}


async function SimpanData(source, data) {
		
	var endpoint = 'retail/pos/guestbook/save';
	var params = {
		data: data
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
			throw Error(result.message);
		}

		if (source=='MANUAL') {
			await $pos.component.alert({text: 'Data telah disimpan.'});
			chk_ismanual.checked = false;
			clearForm();
			chk_ismanual_changed(false);

		} 

	} catch (err) {
		// if (source=='CAM') {
		// 	let elmsg = document.createElement('div');
		// 	elmsg.classList.add('notfound');
		// 	elmsg.innerHTML = err.message;
		// 	pnl_result.insertBefore(elmsg,  pnl_result.firstChild);
		// 	setTimeout(()=>{
		// 		elmsg.remove()
		// 	}, 2000);
		// } else {
		await $pos.component.alert({title:'Error', text:err.message});
		// }
	}
}





function chk_ismanual_changed(checked) {
	if (checked) {
		obj_txt_nama.disabled = false;
		obj_txt_alamat.disabled = false;
		obj_txt_telp.disabled = false;
		obj_txt_email.disabled = false;
		btn_save.disabled = false;
	} else {
		obj_txt_nama.disabled = true;
		obj_txt_alamat.disabled = true;
		obj_txt_telp.disabled = true;
		obj_txt_email.disabled = true;
		btn_save.disabled = true;
	}
}


async function btn_display_click() {
	const windowName = 'popupDisplay';
	var url = `index.php/module/retail/pos/guestbookdisplay/${db_crmevent_id}`;
	var spec = 'top=0,left=0,width=300,height=500,location=no,menubar=no,rezisable=no,scrollbars=no,status=no,titlebar=no,toolbar=no';

	window.popupDisplay = window.open(url, windowName, spec);
	if (typeof window.popupDisplay.onunload !== 'function') {
		window.popupDisplay.onunload = () => {
			setTimeout(function() {
				if (window.popupDisplay.closed) {
					window.popupDisplay = null;
					console.log('closed ini');
				}
			}, 100); 
		}
	}
	window.popupDisplay.focus();

}



function btn_update_click(evt) {
	console.log('updating...');
	if (window.popupDisplay!=null) {
		if ('guestbook_updatedata' in window.popupDisplay) {
			window.popupDisplay.guestbook_updatedata();
		}
	}
}


function btn_reload_click(evt) {
	location.reload();
}