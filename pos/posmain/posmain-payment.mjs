import * as utilities from './utilities.mjs';

const btn_cancel = document.getElementById('pnl_payment-btn_cancel');	
const btn_addtopayment = document.getElementById('pnl_payment-btn_addtopayment');
const btn_checkout = document.getElementById('pnl_payment-btn_checkout');
const btn_remove = document.getElementById('pnl_payment-btn_remove');


const cbo_method = document.getElementById('pnl_payment-obj_cbo_method');

const pnl_cashpayminfo = document.getElementById('pnl_payment-cashpayminfo');
const pnl_paymententry = document.getElementById('pnl_payment-paymententry');
const pnl_shortcuts = document.getElementById('pnl_payment-shortcut');

const tbl_payment = document.getElementById('pnl_payment-tbl_payment')

const obj_amount = document.getElementById('pnl_payment-obj_amount');
const obj_cash = document.getElementById('pnl_payment-obj_cash');
const obj_cardnumber = document.getElementById('pnl_payment-obj_cardnumber');
const obj_cardholder = document.getElementById('pnl_payment-obj_cardholder');
const obj_approval = document.getElementById('pnl_payment-obj_approval');


const txt_totalqty = document.getElementById('pnl_payment-txt_totalqty');
const txt_adddisc = document.getElementById('pnl_payment-txt_adddisc');
const txt_voucher = document.getElementById('pnl_payment-txt_voucher');
const txt_discount = document.getElementById('pnl_payment-txt_discount');
const txt_outstanding = document.getElementById('pnl_payment-txt_outstanding');
const txt_paid = document.getElementById('pnl_payment-txt_paid');
const txt_totalvalue = document.getElementById('pnl_payment-txt_totalvalue');
const txt_cashpaid = document.getElementById('pnl_payment-txt_cashpaid');
const txt_cashreturn = document.getElementById('pnl_payment-txt_cashreturn');

const TXDATA = {}
const PAYMETHODS = [];
const SHORTCUTS = {}
const MethodShortcuts = ['F11', 'F12'];
const stateKeyEvent = {};


const cmdCrLf = '\u000D\u000A';
const cmdCutPaper = '\u001D\u0056\u0030';

const PrinterSetting = {}



let dgv;
let thousandSeparator;


export async function init(opt) {
	// console.log('payment loaded');

	$pos.component.setAsStateKeyEvent(stateKeyEvent);
	dgv = $pos.component.DataGrid(tbl_payment, {
		onItemModified: () => {
			dgv_itemmodified();
		}
	});

	utilities.setAsQtyDisplay(txt_totalqty);
	utilities.setAsPriceDisplay(txt_totalvalue);
	utilities.setAsPriceDisplay(txt_adddisc);
	utilities.setAsPriceDisplay(txt_voucher);
	utilities.setAsPriceDisplay(txt_discount);
	utilities.setAsPriceDisplay(txt_outstanding);
	utilities.setAsPriceDisplay(txt_paid);
	utilities.setAsPriceDisplay(txt_cashpaid);
	utilities.setAsPriceDisplay(txt_cashreturn);
	


	// get decimal separator
	thousandSeparator = utilities.getThousandSeparator();
	// console.log('use "' + thousandSeparator + '" as Decimal seprator');

	btn_addtopayment.addEventListener('click', ()=>{
		addToPayment();
	})

	btn_cancel.addEventListener('click', ()=>{
		btn_cancel_click();
	});

	btn_remove.addEventListener('click', ()=>{
		btn_remove_click();
	});

	btn_checkout.addEventListener('click', ()=>{
		btn_checkout_click();
	});


	cbo_method.addEventListener('change', (evt)=>{
		cbo_method_change(evt);
	});

	obj_amount.addEventListener('input', (evt)=>{
		var value = evt.target.value.replaceAll(thousandSeparator, '');
		if (!isNaN(value)) {
			evt.target.value = utilities.format_price(value);
		}
	});

	obj_amount.addEventListener('keypress', (evt)=>{
		evt.stopPropagation();
		if (evt.key=='Enter') {
			obj_cardnumber.focus();
		}
	});
	
	obj_cardnumber.addEventListener('input', (evt)=>{
		evt.target.value = utilities.patternMatch({
			input: evt.target.value,
			template: "xxxx-xxxx-xxxx-xxxx",
		});
	});

	obj_cardnumber.addEventListener('keypress', (evt)=>{
		evt.stopPropagation();
		if (evt.key=='Enter') {
			obj_cardholder.focus();
		}

		if (obj_cardnumber.inputmode=='numeric' || obj_cardnumber.inputmode=='number') {
			if (!IsNumericKey(evt)) {
				evt.preventDefault();	
			}
		}

	});

	obj_cardholder.addEventListener('keypress', (evt)=>{
		evt.stopPropagation();
		if (evt.key=='Enter') {
			obj_approval.focus();
		}

		if (obj_cardholder.inputmode=='numeric' || obj_cardholder.inputmode=='number') {
			if (!IsNumericKey(evt)) {
				evt.preventDefault();	
			}
		}
	});

	obj_approval.addEventListener('keypress', (evt)=>{
		evt.stopPropagation();
		if (evt.key=='Enter') {
			addToPayment();
		}

		if (obj_approval.inputmode=='numeric' || obj_approval.inputmode=='number') {
			if (!IsNumericKey(evt)) {
				evt.preventDefault();	
			}
		}
	});


	obj_cash.addEventListener('input', (evt)=>{
		var value = evt.target.value.replaceAll(thousandSeparator, '');
		if (!isNaN(value)) {
			evt.target.value = utilities.format_price(value);
		}
	});

	obj_cash.addEventListener('keypress', (evt)=>{
		evt.stopPropagation();
		if (evt.key=='Enter') {
			addToPayment();
		}
	});
}

export async function receiveKeydownEvent(evt) {
	if (stateKeyEvent.paused) {
		evt.preventDefault();
		evt.stopPropagation();
		if (typeof stateKeyEvent.tempHandler==='function') {
			stateKeyEvent.tempHandler(evt);
		}
		return;
	}


	if (evt.key=='F1') {
	} else if (evt.key=='F2') {
	} else if (evt.key=='F3') {
	} else if (evt.key=='F4') {
	} else if (evt.key=='F5') {
		addToPayment();
	} else if (evt.key=='F6') {
	} else if (evt.key=='F7') {
	} else if (evt.key=='F8') {	
		btn_remove_click();	
	} else if (evt.key=='F9') {	
	} else if (evt.key=='F10') {	
		btn_checkout_click();	
	} else if (MethodShortcuts.includes(evt.key)) { // F11, F12
		if (cbo_method.disabled) {
			return;
		}
		if (SHORTCUTS.hasOwnProperty(evt.key)) {
			var shortcut = SHORTCUTS[evt.key];
			if (cbo_method.value!=shortcut.value) {
				cbo_method.value = shortcut.value;
				cbo_method.dispatchEvent(new Event('change'))
			}
		}
	} else if (evt.key=='ArrowUp') {
		if (evt.ctrlKey) {
			cbo_method_up();
		} else {
			// DataGrid Up
		}
	} else if (evt.key=='ArrowDown') {
		if (evt.ctrlKey) {
			cbo_method_down();
		} else {
			// DataGrid Down
		}
	} else if (evt.key=='PageUp') {
		cbo_method_up();
	} else if (evt.key=='PageDown') {
		cbo_method_down();
	} else if (evt.key=='Escape') {
		btn_cancel_click();
	} 
}

export async function resetMethod() {
	//sembuntikan entrian amount dan card
	var eltohide = [];
	eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-noncash"));
	eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-cash"));
	for (var el of eltohide) {
		el.classList.add('hidden');
	}

	obj_cash.value = 0;
	obj_amount.value = 0;
	obj_cardholder.value = '';
	obj_cardnumber.value = '';
	obj_approval.value = '';
	
}

export async function clearPayments() {
	resetMethod();
	utilities.ClearDataObject(TXDATA);
}

export async function setdata(summarydata) {
	var site_id = window.LICENSEDATA.site_id;
	var posterminal_id =  window.LICENSEDATA.posterminal_id;

	loadPaymentMethods(site_id, posterminal_id);

	// // hide dulu semua
	// var eltohide = [];
	// eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-cash"));
	// eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-noncash"));
	// eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-action"));

	// for (var el of eltohide) {
	// 	el.classList.add('hidden');
	// }
	// pnl_cashpayminfo.classList.add('hidden');
	resetPaymentMethod();


	Object.assign(TXDATA,summarydata);
	txt_totalqty.setValue(TXDATA.totalQty);
	txt_totalvalue.setValue(TXDATA.totalValue);
	txt_outstanding.setValue(TXDATA.totalValue);
	txt_paid.setValue(0);

	dgv.clear();
	disablePaymentMethod(false);
}


async function btn_cancel_click() {
	if (Object.keys(dgv.DATA).length>0) {
		stateKeyEvent.tempHandler = (evt) => {
			if (evt.key==utilities.shortcutKeyCancel) {
				stateKeyEvent.modal.respond('no');
			} else if (evt.key==utilities.shortcutKeyOk) {
				stateKeyEvent.modal.respond('yes');
			}
		}
		var result = await $pos.component.confirm({
			title:'Cancel Payment', 
			text:`Anda akan membatalkan proses pembayaran dan kembali ke halaman sebelumnya<br>Lanjutkan ?`,
			stateKeyEvent: stateKeyEvent,
			shortcuts: {
				'yes': utilities.shortcutKeyOk,
				'no': utilities.shortcutKeyCancel
			} 
		});
	
		if (result!=='yes') {
			return;
		}
	}

	window.$pages.getPage('pnl_entry').Show();
}

async function btn_remove_click() {
	var tr = dgv.getCurrentRow();
	if (tr==null) {
		return;
	}


	if (dgv.DATA.hasOwnProperty(tr.id)) {
		var row = dgv.DATA[tr.id];
		var descr = row.descr;
		var amount = row.amount;
		var isintegrated = row.isintegrated;

		if (isintegrated) {
			// pembayaran terintegrasi tidak bisa dihapus
			return;
		}

		stateKeyEvent.tempHandler = (evt) => {
			if (evt.key==utilities.shortcutKeyCancel) {
				stateKeyEvent.modal.respond('no');
			} else if (evt.key==utilities.shortcutKeyOk) {
				stateKeyEvent.modal.respond('yes');
			}
		}
		var result = await $pos.component.confirm({
			title:'Remove', 
			text:`Anda menghapus payment:<br>'${descr}',<br>senilai <b>${utilities.format_price(amount)}</b>.<br>Lanjutkan ?`,
			stateKeyEvent: stateKeyEvent,
			shortcuts: {
				'yes': utilities.shortcutKeyOk,
				'no': utilities.shortcutKeyCancel
			} 
		});
	
		if (result!=='yes') {
			return;
		}
	
		dgv.remove(tr);
		resetPaymentMethod();
	}
} 

async function btn_checkout_click() {
	var outstanding = txt_outstanding.getValue();

	if (outstanding>0) {
		return;
	}


	// Simpan Data
	await saveTransaction();
	printTicket();

	// Infokan kalau ada kembalian, tanya apakah akan reprint
	stateKeyEvent.tempHandler = (evt) => {
		if (evt.key==utilities.shortcutKeyCancel) {
			stateKeyEvent.modal.respond('no');
		} else if (evt.key==utilities.shortcutKeyOk) {
			stateKeyEvent.modal.respond('yes');
		}
	}

	var confirmtext;
	var cashreturn = txt_cashreturn.getValue();
	if (cashreturn>0) {
		confirmtext = `Cash refund customer sebesar <b>${utilities.format_price(cashreturn)}</b>.<br><br>Apakah akan re-print struk ?`;
	} else {
		confirmtext = 'Apakah akan re-print struk ?';
	}

	var result = await $pos.component.confirm({
		title:'Transaksi berhasil', 
		text: confirmtext,
		stateKeyEvent: stateKeyEvent,
		shortcuts: {
			'yes': utilities.shortcutKeyOk,
			'no': utilities.shortcutKeyCancel
		} 
	});

	if (result=='yes') {
		printTicket();
	}


	// Clear Data, Create New Transaction
	clearPayments();
	window.$pages.getPage('pnl_entry').handler.CreateNewTransaction();
	window.$pages.getPage('pnl_entry').Show();

}



async function cbo_method_change(evt) {
	var cbo = evt.target;

	if (cbo.disabled) {
		return;
	}

	var selected = cbo.options[cbo.selectedIndex];
	var settingdata = selected.getAttribute('settingdata');
	var setting = JSON.parse(window.Base64.decode(settingdata));
	var eltohide = [];
	var eltoshow = [];
	let eltofocus;
	if (setting.iscash) {
		eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-noncash"));
		eltoshow = Array.prototype.concat.apply(eltoshow, pnl_paymententry.getElementsByClassName("paymethod-cash"));
		eltofocus = obj_cash;
	} else {
		eltoshow = Array.prototype.concat.apply(eltoshow, pnl_paymententry.getElementsByClassName("paymethod-noncash"));
		eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-cash"));
		eltofocus = obj_amount;

		obj_cardholder.inputmode = setting.nameinputtype;
		obj_cardnumber.inputmode = setting.cardinputtype;
		obj_approval.inputmode = setting.apprinputtype;
		
		if (setting.nameinputtype!=null && setting.nameinputtype!='') {
			obj_cardholder.setAttribute('inputmode', setting.nameinputtype);
		}

		if (setting.cardinputtype!=null && setting.cardinputtype!='') {
			obj_cardnumber.setAttribute('inputmode', setting.cardinputtype);
		}

		if (setting.apprinputtype!=null && setting.apprinputtype!='') {
			obj_approval.setAttribute('inputmode', setting.apprinputtype);
		}

	}
	eltoshow = Array.prototype.concat.apply(eltoshow, pnl_paymententry.getElementsByClassName("paymethod-action"));
	obj_amount.value = utilities.format_price(txt_outstanding.getValue());
	obj_cash.value = 0;

	for (var el of eltohide) {
		el.classList.add('hidden');
	}

	for (var el of eltoshow) {
		el.classList.remove('hidden');
	}

	btn_addtopayment.disabled = false;
	setTimeout(()=>{
		eltofocus.focus();
		eltofocus.select();
	}, 100);
	
}

async function cbo_method_up() {
	if (cbo_method.disabled) {
		return;
	}


	var currentIndex = cbo_method.selectedIndex;
	var nextIndex = currentIndex;

	if (currentIndex<=0) {
		nextIndex = 1;
	} 

	if (currentIndex>1) {
		nextIndex = currentIndex - 1;
	}

	var paymethod_id = PAYMETHODS[nextIndex-1];
	cbo_method.value = paymethod_id;
	cbo_method.dispatchEvent(new Event('change'))

}

async function cbo_method_down() {
	if (cbo_method.disabled) {
		return;
	}

	var currentIndex = cbo_method.selectedIndex;
	var nextIndex = currentIndex;

	if (currentIndex<PAYMETHODS.length) {
		nextIndex = currentIndex + 1;
	}

	var paymethod_id = PAYMETHODS[nextIndex-1];
	cbo_method.value = paymethod_id;
	cbo_method.dispatchEvent(new Event('change'))
}


async function dgv_itemmodified() {
	console.log('hitung total paid');
	var totalpaid = 0;
	for (var id in dgv.DATA) {
		var row = dgv.DATA[id];
		totalpaid += Number(row.amount);
	}

	var totalvalue = txt_totalvalue.getValue();
	var outstanding = totalvalue - totalpaid;

	txt_paid.setValue(totalpaid);
	txt_outstanding.setValue(outstanding);

	if (outstanding<=0) {
		disablePaymentMethod(true);

	} else {
		disablePaymentMethod(false);
	}


}

async function loadPaymentMethods(site_id, posterminal_id) {
	var endpoint = 'retail/pos/posmain/getpaymethod';
	var params = {
		site_id : site_id,
		posterminal_id : posterminal_id
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

	// clear data reated to payment method
	utilities.ClearDataArray(PAYMETHODS);
	utilities.ClearDataObject(SHORTCUTS);
	pnl_shortcuts.innerHTML = '';
	
	try {
		var result = await $pos.api.call(endpoint, params, options);
		var datarespond = result.datarespond;

		var opt = '<option value="" disabled selected>Choose your option</option>';
		for (var row of datarespond) {
			// console.log(row)
			var setting = {
				paymethod_id: row.paymethod_id,
				paymethod_name: row.paymethod_name,
				paytype_id: row.paytype_id,
				iscash: row.paytype_iscash,
				isvoucher: row.paytype_isvoucher,
				isedc: row.paytype_isedc,
				isonline: row.paytype_isonline,
				istransfer: row.paytype_istransfer,
				shortcut: row.paymethod_shortcut,
				isintegrated: row.paymethod_isintegrated,
				code: row.paymethod_code,
				data: row.paymethod_setting,
				nameinputtype: row.paytype_nameinputtype,
				cardinputtype: row.paytype_cardinputtype,
				apprinputtype: row.paytype_apprinputtype
			}

			if (!SHORTCUTS.hasOwnProperty(setting.shortcut)){
				SHORTCUTS[setting.shortcut] = {text: row.paymethod_name, value:row.paymethod_id}
				
			}

			PAYMETHODS.push(row.paymethod_id);
			
			var settingdata = window.Base64.encode(JSON.stringify(setting));
			opt += `<option value="${row.paymethod_id}" settingdata="${settingdata}">${row.paymethod_name}</option>`;
		}
		
		cbo_method.innerHTML = opt;
		M.FormSelect.init(cbo_method);


		for (var key in SHORTCUTS) {
			if (!MethodShortcuts.includes(key)) {
				continue;
			}

			let shortcut = SHORTCUTS[key];
			let btn = document.createElement('button');
			btn.classList.add('waves-effect');
			btn.classList.add('waves-light');
			btn.classList.add('btn');
			btn.style.marginRight = '5px';
			btn.innerHTML = `${shortcut.text} [${key}]`;
			btn.addEventListener('click', ()=>{
				if (cbo_method.disabled) {
					return;
				}
				if (cbo_method.value != shortcut.value) {
					cbo_method.value = shortcut.value;
					cbo_method.dispatchEvent(new Event('change'))
				}
			});
			pnl_shortcuts.appendChild(btn);
			
		}

	} catch (err) {
		console.error(err);
	} finally {
		//searching = false;
	}
}

async function addToPayment() {
	var optselected = cbo_method.options[cbo_method.selectedIndex];
	var settingdata = optselected.getAttribute('settingdata');
	var jsonsettingdata =  window.Base64.decode(settingdata);
	var method = JSON.parse(jsonsettingdata);
	var cash_return = 0;
	var cash_paid = 0;
	var otherincome = 0; // untuk pembayaran berbentuk voucher yang tidak ada kembalian
	var donation = 0;

	var outstanding = txt_outstanding.getValue();
	var amount_paid = Number(obj_amount.value.replaceAll(utilities.getThousandSeparator(), ''))
	var cash_paid = Number(obj_cash.value.replaceAll(utilities.getThousandSeparator(), ''))

	if (isNaN(amount_paid) || isNaN(cash_paid)) {
		return;
	}


	try {
		if (method.iscash) {
			// cek apakah nilai yang diinput sudah cukup atau belum
			amount_paid = outstanding;
			if (cash_paid<amount_paid) {
				throw new ErrorPayment('Cash belum cukup', `Nilai pembayaran cash masih kurang.<br>`, obj_cash);
			}
			cash_return = cash_paid - amount_paid;
		} else {
			if (obj_cardnumber.value.trim()=='') {
				obj_cardnumber.focus();
				return;
			}
	
			if (obj_cardholder.value.trim()=='') {
				obj_cardholder.focus();
				return;
			}
	
			if (obj_approval.value.trim()=='') {
				obj_approval.focus();
				return;
			}

			if (method.isedc || method.isonline || method.istransfer) {
				if (amount_paid > outstanding) {
					throw new ErrorPayment('Pembayaran Melebihi', `Nilai pembayaran melebihi outstanding.<br>`, obj_amount);
				}
			}
		}

	} catch (err) {

		stateKeyEvent.tempHandler = (evt) => {
			if (evt.key==utilities.shortcutKeyOk) {
				stateKeyEvent.modal.respond('ok');
			}
		}

		await $pos.component.alert({
			title: err.title, 
			text: err.message,
			stateKeyEvent: stateKeyEvent,
			shortcuts: {
				'ok': utilities.shortcutKeyOk
			} 
		});
	
		if (err.eltofocus !== undefined) {
			err.eltofocus.focus();
		}
		
		return;
	}



	var cardnumber;
	var cardholder;
	var approval;
	var isintegrated = Boolean(method.isintegrated)
	var success = false;
	if (isintegrated) {
		var setting = JSON.parse(method.data);
		var ret = {cardnumber:'', cardholder:'', approval:''}; // await getPaymentFromDevice();
		cardnumber = ret.cardnumber;
		cardholder = ret.cardholder;
		approval =ret.approval;
		success = true; // ini dari method integrasi
	} else {
		cardnumber = obj_cardnumber.value;
		cardholder = obj_cardholder.value.toUpperCase();
		approval = obj_approval.value;
		success = true;
	}


	if (success) {
		console.log(method.paymethod_id, method.paymethod_name);
		var descr;
		if (method.iscash) {
			descr = `CASH Rp ${utilities.format_price(cash_paid)}<br>return ${utilities.format_price(cash_return)}`;
		} else {
			descr = `${cardholder}<br>${cardnumber}`
		}
	
		let options = {
			scrollIntoView: true,
			rowdata: {
				method: method,
				descr: descr,
				cash_paid: cash_paid,
				cash_return: cash_return,
				amount: amount_paid,
				otherincome: otherincome,
				cardnumber: obj_cardnumber.value,
				cardholder: obj_cardholder.value,
				approval: obj_approval.value,
				isintegrated: method.isintegrated
			},
			onclick: (rowdata) => {
				console.log(rowdata);
			}
		}

		dgv.add([
			{	
				class:'description', 
				value: descr
			},
			{
				class:'valuecolumn', 
				value: amount_paid,   
				onrender: (amount) => { return utilities.format_price(amount) }          
			},
			{class:'lastcolumn', value: '&nbsp;'},
		], options);

		// reset method
		resetMethod();


		// tampilkan uang kembalian
		if (method.iscash) {
			txt_cashpaid.setValue(cash_paid);
			txt_cashreturn.setValue(cash_return);
			if (cash_return>0) {
				pnl_cashpayminfo.classList.remove('hidden');
				txt_cashreturn.classList.add('blink');	
			} else {
				pnl_cashpayminfo.classList.add('hidden');
				txt_cashreturn.classList.remove('blink');
			}
		} else {
			txt_cashpaid.setValue(0);
			txt_cashreturn.setValue(0);
		}

	}



}

async function disablePaymentMethod(disabled) {
	btn_addtopayment.disabled = disabled;
	btn_checkout.disabled = !disabled;
	cbo_method.disabled = disabled;
	obj_cash.disabled = disabled;
	obj_amount.disabled = disabled;
	obj_cardholder.disabled = disabled;
	obj_cardnumber.disabled = disabled;
	obj_approval.disabled = disabled;

	M.FormSelect.init(cbo_method);

}


async function resetPaymentMethod() {
	var eltohide = [];
	eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-cash"));
	eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-noncash"));
	eltohide = Array.prototype.concat.apply(eltohide, pnl_paymententry.getElementsByClassName("paymethod-action"));

	for (var el of eltohide) {
		el.classList.add('hidden');
	}
	pnl_cashpayminfo.classList.add('hidden');


	cbo_method.value = '';
	M.FormSelect.init(cbo_method);
}

async function saveTransaction() {
}

async function printTicket() {
	return;


	// test print ticket
	var transactiontext = `
Transaksi POS
Sabtu, 18 Maret 2023 13:45

BOSTON BAGS
   Rp 2,400,000  x1        2,400,000

BASIC LETTTERING
   Rp 2,300,000  x1        2,300,000
   
====================================
TOTAL                      4,700,000


Terimakasih Telah berbelanja

   
`;

	var devices = await navigator.usb.getDevices();
	for (let dev of devices) {
		if (dev.productName.trim()=='JRSVC Printer') {
			PrinterSetting.device = dev;
		}
	}
	if (PrinterSetting.device!=undefined) {
		var usbdevice = PrinterSetting.device;
		await usbdevice.open();
		await usbdevice.claimInterface(0);

		var image = document.getElementById('pnl_payment-img_logo');
		var data = getImagePrintData(image);
		await sendDataToDevice(usbdevice, data)
		
		var string = transactiontext + "\r\n\r\n\r\n";
		var encoder = new TextEncoder();
		var data = encoder.encode(cmdCrLf + cmdCrLf + string + cmdCrLf +  cmdCrLf + cmdCutPaper);
		usbdevice.transferOut(3, data)
	}


}









async function sendDataToDevice(usbdevice, data) {
	var index = 0;
	return new Promise(function(resolve, reject) {
		sendNextImageDataBatch(usbdevice, data, index, resolve, reject);
	});
}


function sendNextImageDataBatch(usbdevice, data, index, resolve, reject) {
	if (index + 512 < data.length) {
		var datatoprint = data.slice(index, index + 512);
		usbdevice.transferOut(3, datatoprint)
		.then(() => {
				index += 512;
				sendNextImageDataBatch(usbdevice, data, index, resolve, reject);
			})
		.catch(error => reject(error));
	} else {
		if (index < data.length) {
			usbdevice.transferOut(3, data.slice(index, data.length))
			.then(() => {
					resolve();
				})	
			.catch(error => reject(error));	
		} else {
			resolve();
		}
	}
}


function getDarkPixel(canvas, imageData, x, y) {
	// Return the pixels that will be printed black
	let red = imageData[((canvas.width * y) + x) * 4];
	let green = imageData[((canvas.width * y) + x) * 4 + 1];
	let blue = imageData[((canvas.width * y) + x) * 4 + 2];
	return (red + green + blue) > 0 ? 0 : 1;
}

function getImagePrintData(image) {
	var canvas = document.createElement('canvas');
	canvas.width = 360;
	canvas.height = 120;

	var context = canvas.getContext("2d");
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	try {
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
		if (imageData == null) {
			throw new Error('No image to print!');
		}

		var printData = new Uint8Array(canvas.width / 8 * canvas.height + 8);
		 var offset = 0;


		printData[0] = 29;  // Print raster bitmap
		printData[1] = 118; // Print raster bitmap
		printData[2] = 48; // Print raster bitmap
		printData[3] = 0;  // Normal 203.2 DPI
		printData[4] = canvas.width / 8; // Number of horizontal data bits (LSB)
		printData[5] = 0; // Number of horizontal data bits (MSB)
		printData[6] = canvas.height % 256; // Number of vertical data bits (LSB)
		printData[7] = canvas.height / 256;  // Number of vertical data bits (MSB)
		offset = 7;
		
		// Loop through image rows in bytes
		for (let i = 0; i < canvas.height; ++i) {
			for (let k = 0; k < canvas.width / 8; ++k) {
				let k8 = k * 8;
				//  Pixel to bit position mapping
				printData[++offset] = getDarkPixel(canvas, imageData, k8 + 0, i) * 128 + getDarkPixel(canvas, imageData, k8 + 1, i) * 64 +
							getDarkPixel(canvas, imageData, k8 + 2, i) * 32 + getDarkPixel(canvas, imageData, k8 + 3, i) * 16 +
							getDarkPixel(canvas, imageData, k8 + 4, i) * 8 + getDarkPixel(canvas, imageData, k8 + 5, i) * 4 +
							getDarkPixel(canvas, imageData, k8 + 6, i) * 2 + getDarkPixel(canvas, imageData, k8 + 7, i);
			}
		}

		return printData;

	} catch (err) {
		throw err;
	}
}




function IsNumericKey(evt) {
	var keyCode = evt.charCode;
	var isNumber = keyCode >= 48 && keyCode <= 57;
	var isPad = false; // keyCode >= 96 && keyCode <= 105;
	return isNumber || isPad;
}



class ErrorPayment extends Error {
	constructor(title, message, eltofocus) {
		super(message);
		this.title = title;
		this.message = message;
		this.eltofocus = eltofocus;
	}
}