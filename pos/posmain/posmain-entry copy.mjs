import * as utilities from './utilities.mjs';

const tbl_itemgrid = document.getElementById('obj_tbl_itemgrid');
const img_searchmode = document.getElementById('pnl_entry-searchmode');
const img_itemdisplay = document.getElementById('pnl_entry-img_itemdisplay');

const txt_lineinput = document.getElementById('pnl_entry-lineinput');
const txt_totalqty = document.getElementById('pnl_entry-txt_totalqty');
const txt_totalvalue = document.getElementById('pnl_entry-txt_totalvalue');
const txt_itemstock_id = document.getElementById('pnl_entry-txt_itemstock_id');
const txt_itemstock_descr = document.getElementById('pnl_entry-txt_itemstock_descr');
const txt_itemstock_code = document.getElementById('pnl_entry-txt_itemstock_code');
const txt_iteminfo = document.getElementById('pnl_entry-txt_iteminfo');
const txt_itemstock_grossprice = document.getElementById('pnl_entry-txt_itemstock_grossprice');
const txt_itemstock_disc = document.getElementById('pnl_entry-txt_itemstock_disc');
const txt_itemstock_sellprice = document.getElementById('pnl_entry-txt_itemstock_sellprice');

const obj_tx_id = document.getElementById('pnl_entry-obj_tx_id');
const obj_event = document.getElementById('pnl_entry-obj_event');
const obj_sales = document.getElementById('pnl_entry-obj_sales');
const obj_extcode = document.getElementById('pnl_entry-obj_extcode');
const obj_cust_id = document.getElementById('pnl_entry-obj_cust_id');
const obj_cust_name = document.getElementById('pnl_entry-obj_cust_name');
const obj_cust_disc = document.getElementById('pnl_entry-obj_cust_disc');
const obj_promo = document.getElementById('pnl_entry-obj_promo');


const obj_qty = document.getElementById('pnl_entry-obj_qty');
const obj_adddisc = document.getElementById('pnl_entry-obj_adddisc');
const obj_subtotal = document.getElementById('pnl_entry-obj_subtotal');
const obj_paymdisc = document.getElementById('pnl_entry-obj_paymdisc');
const obj_itemdisc = document.getElementById('pnl_entry-obj_itemdisc');
const obj_voucher = document.getElementById('pnl_entry-obj_voucher');
const obj_total = document.getElementById('pnl_entry-obj_total');
const obj_grandtotal = document.getElementById('pnl_entry-obj_grandtotal');

const btn_ok = document.getElementById('pnl_entry-btn_ok');
const btn_payment = document.getElementById('pnl_entry-btn_payment');
const btn_mode = document.getElementById('pnl_entry-btn_mode');
const btn_editqty = document.getElementById('pnl_entry-btn_editqty');
const btn_remove = document.getElementById('pnl_entry-btn_remove');
const btn_transaksi = document.getElementById('pnl_entry-btn_transaksi');
const btn_member = document.getElementById('pnl_entry-btn_member');
const btn_promo = document.getElementById('pnl_entry-btn_promo');
const btn_camera = document.getElementById('pnl_entry-btn_cam');
const btn_cameraclose = document.getElementById('pnl_entry-btn_camclose');
const btn_camflip = document.getElementById('pnl_entry-btn_camflip');
const btn_fullscreen = document.getElementById('pnl_entry-btn_fullscreen');
const btn_selector = document.getElementById('pnl_entry-btn_selector');
const btn_itemdisplay = document.getElementById('pnl_entry-btn_itemdisplay');
const btn_event = document.getElementById('pnl_entry-btn_event');
const btn_staff = document.getElementById('pnl_entry-btn_staff');
const btn_new = document.getElementById('pnl_entry-btn_new');

const pnl_itemdisplay = document.getElementById('pnl_entry-itemdisplay');
const pnl_camera = document.getElementById('pnl_entry-camera');
const pnl_transaksi = document.getElementById('pnl_entry-transaksi')
const pnl_selector = document.getElementById('pnl_entry-selector');


const self = {};
const stateKeyEvent = {};
const camelid = 'pnl_entry-codereadercam';
const camConfig = {
	fps: 10, 
	qrbox: 250	
}

let dgv;
let html5QrcodeScanner;
let camIsScanning = false;
let inputSearching = false;
let TX;


export async function init(opt) {
	console.log('entry loaded');



	$pos.component.setAsStateKeyEvent(stateKeyEvent);
	dgv = $pos.component.DataGrid(tbl_itemgrid, {
		onItemModified: () => {
			dgv_itemmodified();
		}
	});


	utilities.setAsQtyDisplay(txt_totalqty);
	utilities.setAsPriceDisplay(txt_totalvalue);
	utilities.setAsPriceDisplay(txt_itemstock_grossprice);
	utilities.setAsPriceDisplay(txt_itemstock_sellprice);

	utilities.setAsTextDisplay(obj_tx_id);
	utilities.setAsTextDisplay(obj_event);
	utilities.setAsTextDisplay(obj_sales);
	utilities.setAsTextDisplay(obj_extcode);
	utilities.setAsTextDisplay(obj_cust_id);
	utilities.setAsTextDisplay(obj_cust_name);
	utilities.setAsTextDisplay(obj_cust_disc);
	utilities.setAsTextDisplay(obj_promo);
	utilities.setAsQtyDisplay(obj_qty);
	utilities.setAsPriceDisplay(obj_adddisc);
	utilities.setAsPriceDisplay(obj_subtotal);
	utilities.setAsPriceDisplay(obj_paymdisc);
	utilities.setAsPriceDisplay(obj_itemdisc);
	utilities.setAsPriceDisplay(obj_voucher);
	utilities.setAsPriceDisplay(obj_total);
	utilities.setAsPriceDisplay(obj_grandtotal);
	

	

	btn_fullscreen.addEventListener('click', (evt)=>{ btn_fullscreen_click(evt); })
	btn_ok.addEventListener('click', (evt)=>{ btn_ok_click(evt); });
	btn_payment.addEventListener('click', (evt)=>{ btn_payment_click(); });
	btn_mode.addEventListener('click', ()=>{ img_searchmode.togle(); })
	btn_editqty.addEventListener('click', ()=>{ showQtyEditor(); });
	btn_remove.addEventListener('click', ()=>{ btn_remove_click() });
	btn_transaksi.addEventListener('click', ()=>{ pnl_transaksi.show(); });
	btn_camera.addEventListener('click', ()=>{ btn_camera_click(); });
	btn_cameraclose.addEventListener('click', ()=>{ btn_cameraclose_click() });
	btn_camflip.addEventListener('click', ()=>{ btn_camflip_click() });
	btn_member.addEventListener('click', ()=>{ btn_member_click(); });
	btn_promo.addEventListener('click', ()=>{ btn_promo_click(); });
	btn_selector.addEventListener('click', ()=>{ btn_selector_click(); })
	btn_itemdisplay.addEventListener('click', ()=>{ pnl_itemdisplay.show() });
	btn_staff.addEventListener('click', ()=>{ btn_staff_click() });
	btn_event.addEventListener('click', ()=>{ btn_event_click() });
	btn_new.addEventListener('click', ()=>{ btn_new_click() });


	img_searchmode.selectedmode = 'barcode';
	img_searchmode.modes = {
		barcode: {src:'index.php/public/assets/icon-search-barcode-40x30.svg', placeholder:'Scan/ketik barcode', next:'descr'},
		descr: {src:'index.php/public/assets/icon-search-descr-40x30.svg', placeholder:'Ketik deskripsi', next:'voucher'},
		voucher: {src:'index.php/public/assets/icon-search-voucher-40x30.svg', placeholder:'Scan/Ketik kode voucher', next:'member'},
		member: {src:'index.php/public/assets/icon-search-member-40x30.svg', placeholder:'Scan QR member', next:'barcode'},
	};
	img_searchmode.selectMode = (mode) => {
		img_searchmode.selectedmode = mode;
		img_searchmode.src = img_searchmode.modes[mode].src;
		txt_lineinput.placeholder = img_searchmode.modes[mode].placeholder;
	}
	img_searchmode.togle = () => {
		var currentSelectedmode = img_searchmode.selectedmode;
		var nextSelectedmode = img_searchmode.modes[currentSelectedmode].next;
		img_searchmode.selectMode(nextSelectedmode);
	}
	img_searchmode.addEventListener('click', (evt)=>{
		img_searchmode.togle();
	});
	img_searchmode.selectMode(img_searchmode.selectedmode);



	pnl_camera.onblur = () => {
		if (html5QrcodeScanner!=null) {
			html5QrcodeScanner.clear();
		}
	}

	utilities.setDisplayPanel([pnl_itemdisplay, pnl_camera, pnl_transaksi, pnl_selector]);
	img_itemdisplay.addEventListener('error', (evt)=>{
		var isLoaded = img_itemdisplay.complete && img_itemdisplay.naturalHeight !== 0;
		if (!isLoaded) {
			if (img_itemdisplay.src != 'index.php/public/assets/icon-itemdisplay.svg') {
				img_itemdisplay.src = 'index.php/public/assets/icon-itemdisplay.svg';
			}
		}
	});


	img_itemdisplay.reset = () => {
		img_itemdisplay.src = 'index.php/public/assets/icon-itemdisplay.svg';
	};
	
	pnl_itemdisplay.onshowed = () => { pnl_itemdisplay_showed() }
	pnl_itemdisplay.show();
	pnl_itemdisplay.currentRowId = '';
	pnl_camera.active = false;

	TX = opt.getTx();
	setTimeout(async ()=>{
		var ctx = await TX.getCurrentTransaction();
		update_current_transaksi(ctx);
	}, 50);

}


async function pnl_itemdisplay_showed() {
	displayCurrentRowItem();
}

function update_current_transaksi(ctx) {
	self.currentTransaction = ctx;

	obj_tx_id.setValue(ctx.tx_id);
	obj_event.setValue(ctx.event_name);
	obj_sales.setValue(ctx.staff_name);
	obj_extcode.setValue(ctx.ext_code);
	obj_cust_id.setValue(ctx.cust_id);
	obj_cust_name.setValue(ctx.cust_name);
	obj_cust_disc.setValue(`${ctx.cust_disc} ${ctx.cust_disc_info}`);

	var promos = [];
	if (ctx.promo_paym_id!='') {
		promos.push(ctx.promo_paym_name) 
	}
	if (ctx.promo_item_id!='') {
		promos.push(ctx.promo_paym_name) 
	}
	var promo_text = promos.length > 0 ? promos.join('<br>') : '-';
	obj_promo.setValue(promo_text);

}


function onCameraScanSuccess(decodedText, decodedResult) {
	if (camIsScanning || inputSearching) {
		return;
	}

	camIsScanning = true;
	txt_lineinput.value = decodedText;
	setTimeout(()=>{
		camIsScanning = false;
	}, 2000);
	// console.log(`Code scanned = ${decodedText}`, decodedResult);

	
	searchInput(txt_lineinput.value);
}



async function btn_fullscreen_click() {
	var els = window.parent.document.getElementsByTagName('body');
	var body = els[0];
	if (window.parent.document.fullscreenElement!=null) {
		window.parent.document.exitFullscreen();
	} else {
		body.requestFullscreen();
	}

	// sumber:
	// https://developer.chrome.com/articles/multi-screen-window-placement/#new-fullscreen-options

	// var secondmonitor = document.getElementById('secondmonitor');
	// secondmonitor.classList.remove('hidden');
	// var si = await window.getScreenDetails();
	// if (si.screens.length>1) {
	// 	// console.log('support second monitor');
	// 	var toscreen = si.screens[1];
	// 	secondmonitor.requestFullscreen({ screen: toscreen, navigationUI:"show" });
	// }

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
		img_searchmode.togle();
	} else if (evt.key=='F2') {
		btn_member_click();
	} else if (evt.key=='F3') {
		showQtyEditor();
		displayCurrentRowItem();
	} else if (evt.key=='F4') {
		btn_payment_click();
	} else if (evt.key=='F5') { // add to payment
	} else if (evt.key=='F6') {
		btn_promo_click();
	} else if (evt.key=='F7') { 
		btn_event_click();
	} else if (evt.key=='F8') { 
		btn_remove_click();
	} else if (evt.key=='F9') {
		btn_staff_click();
	} else if (evt.key=='F10') { // checkout
	} else if (evt.key=='F11') { // paymn shortcut
	} else if (evt.key=='F12') { // paymn shortcut
	} else if (evt.key=='ArrowUp') {
		dgv.ArrowUp();
		displayCurrentRowItem();
	} else if (evt.key=='ArrowDown') {
		dgv.ArrowDown();
		displayCurrentRowItem();
	} else if (evt.key=='Enter') {
		var src = txt_lineinput.value;
		searchInput(src);
	} else if (isNeedFocusToInput(evt)) {
		txt_lineinput.focus();
		if (evt.srcElement.id=="poscontainer") {
			if (evt.code=='KeyR' && evt.ctrlKey) {
				location.reload();
			} else if (isAlphaNumeric(evt.keyCode)) {
				// console.log(evt);
				txt_lineinput.value = txt_lineinput.value + evt.key;
			}
		}
	}
}

function isNeedFocusToInput(evt) {
	if (isAlphaNumeric(evt.keyCode)) {
		return true;
	} else {
		return false;
	}
}

function isAlphaNumeric(keyCode) {
	if (   (keyCode >= 48 && keyCode <= 57)  // 0-9
	    || (keyCode >= 65 && keyCode <= 90)  // a-z
		|| (keyCode >= 96 && keyCode <= 105) // 0-9 (numpad)
		|| (keyCode == 188 || keyCode == 190 || keyCode == 189 || keyCode == 32) // koma, titik, dash, spasi
	) {
		return true;
	} else {
		return false;
	}
}


function Wait(iswait) {
	if (iswait) {
		stateKeyEvent.pause(true);
		disableButtons(true);
	} else {
		stateKeyEvent.paused(false);
		disableButtons(false);
	}
	window.parent.Wait(iswait);
}

function disableButtons(disable) {
	txt_lineinput.disabled = disable;
	btn_ok.disabled = disable;
}

async function btn_new_click() {
	stateKeyEvent.tempHandler = (evt) => {
		if (evt.key==utilities.shortcutKeyCancel) {
			evt.preventDefault();
			stateKeyEvent.modal.respond('no');
		} else if (evt.key==utilities.shortcutKeyOk) {
			stateKeyEvent.modal.respond('yes');
		}
	}
	var result = await $pos.component.confirm({
		title:'New Transaction', 
		text:`Anda akan membuat transaksi baru.<br>semua perubahan data akan dibatalkan.<br>Lanjutkan ?`,
		stateKeyEvent: stateKeyEvent,
		shortcuts: {
			'yes': utilities.shortcutKeyOk,
			'no': utilities.shortcutKeyCancel
		} 
	});

	if (result==='yes') {
		var ctx = await TX.CreateNewTransaction(); 
		update_current_transaksi(ctx);
		dgv.clear(); 
	}
}



async function btn_ok_click(evt) {

	/* BEGIN: Data Dummy */
	
	var barcodes = [
		'8809572818592',
		'8809673270718',
		'8809810481069',
		'8809810480024',
		'8809673276567',
		'8809572818660',
		'8809673271104',
		'8809673278134',
		'8809673278202',
		'8809810483001',
		'8809810482417',
		'8809810482639',
		'8809673279933',
		'8809810483902',
		'8809673279001',
		'8809810480727',
		'8809810480000',
		'8809572816734',
		'8809572816734',
		'8809572816598',
		'8809673277700'
	];

	var randomidx = Math.floor(Math.random() * barcodes.length);
	var barcode = barcodes[randomidx];
	txt_lineinput.value = barcode;
	
	/* END: Data Dummy */


	searchInput(txt_lineinput.value);
}

async function searchInput(str) {

	if (str=='') {
		return;
	}

	
	var endpoint = 'retail/pos/posmain/search';
	var params = {
		mode: img_searchmode.selectedmode, 
		site_id: window.LICENSEDATA.site_id,
		searchtext: str
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

		inputSearching = true;
		var result = await $pos.api.call(endpoint, params, options);
		if (!result.success) {
			throw new Error(result.message)
		}
		
		if (result.datarespond.length>1) {
			// tampilkan list item yg ada
			window.$pages.getPage('pnl_itemlist').handler.clear();
			window.$pages.getPage('pnl_itemlist').handler.filldata(result.datarespond);
			window.$pages.getPage('pnl_itemlist').Show();
		} else {
			await addItem(result.datarespond[0]);
		}
		
	} catch (err) {
		console.error(err);
		// $pos.component.alert({title:'Error', text:err.message});
		M.toast({html: '<div class="postoast-container"><i class="material-icons">warning</i><div>' + err.message + '</div></div>'})
	} finally {
		inputSearching = false;
		if (img_searchmode.selectedmode=='barcode') {
			txt_lineinput.value = ""; // clear search line
		}
	}
}

/*
dept_id
dept_name
itemclass_id
itemclass_name
itemctg_id
itemctg_name
itemgroup_id
itemgroup_name
itemstock_code
itemstock_couchdbid
itemstock_descr
itemstock_disc
itemstock_grossprice
itemstock_id
itemstock_isdiscvalue
itemstock_lastqty
itemstock_name
itemstock_sellprice
itemstockbarcode_text
*/


async function addItem(data) {

	// cek dulu apakah current data id nya sama dengan yang akan ditambahkan
	// var tr = dgv.getCurrentRow();
	for (var trid in dgv.DATA) {
		var currow = dgv.DATA[trid];
		if (data.itemstock_id==currow.data.itemstock_id && data.currentsellprice==currow.data.currentsellprice) {
			var tr = document.getElementById(trid);
			dgv.setCurrentRow(tr);
			
			var update_qty = currow.qty + 1;
			var update_subtotal = update_qty * data.currentsellprice;
			currow.qty = update_qty;
			currow.subtotal = update_subtotal;
			dgv.update(tr, (td)=>{
				if (td.classList.contains('qtycolumn')) {
					td.setValue(update_qty, utilities.format_qty(update_qty));
				} else if (td.classList.contains('valuecolumn')) {
					td.setValue(update_subtotal, utilities.format_price(update_subtotal) );
				}
			});

			displayCurrentRowItem();
			return;
		}
	}


	// if (tr!=null) {
	// 	let currow = dgv.DATA[tr.id];
	// 	console.log(currow);
	// 	if (data.itemstock_id==currow.data.itemstock_id && data.currentsellprice==currow.data.currentsellprice) {
	// 		console.log('tambahkan qty nya saja');
	// 		var update_qty = currow.qty + 1;
	// 		var update_subtotal = update_qty * data.currentsellprice;
	// 		currow.qty = update_qty;
	// 		currow.subtotal = update_subtotal;
	// 		dgv.update(tr, (td)=>{
	// 			if (td.classList.contains('qtycolumn')) {
	// 				td.setValue(update_qty, utilities.format_qty(update_qty));
	// 			} else if (td.classList.contains('valuecolumn')) {
	// 				td.setValue(update_subtotal, utilities.format_price(update_subtotal) );
	// 			}
	// 		});
	// 		return;
	// 	}
	// }


	var qty = 1;
	var price = data.currentsellprice;
	var subtotal = qty * price;

	let options = {
		scrollIntoView: true,
		rowdata: {
			data: data,
			qty: qty,
			subtotal: subtotal
		},
		onclick: (rowdata) => {
			// console.log(rowdata);
			displayCurrentRowItem();
		}
	}

	var descr = `
		<div><b>${data.itemstock_id}</b> ${data.itemstock_code}</div>
		<div style="padding-left: 10px"><i>${data.itemstock_name}</i></div>
	`;


	
	dgv.add([
		{	class:'description', 
			value: descr
		},
		{
			class:'qtycolumn', 
			value: Number(qty), 
			onrender: (value) => { return utilities.format_qty(value) } ,
			ondblclick: (evt, td)=>{ evt.stopPropagation(); showQtyEditor(td) }
		},
		{
			class:'valuecolumn', 
			value: Number(subtotal),   
			onrender: (value) => { return utilities.format_price(value) }          
		},
		{class:'lastcolumn', value: '&nbsp;'},
	], options);

	displayCurrentRowItem();

}


function showQtyEditor(td) {
	
	if (td===undefined) {
		var tr = dgv.getCurrentRow();
		if (tr==null) {
			return;
		}
		var tds = tr.getElementsByClassName('qtycolumn');
		td = tds[0];
	}


	var currentvalue = td.getAttribute('value');
	let eledit = document.createElement('input');

	eledit.classList.add('qtyEditor');
	eledit.setAttribute('maxlength', 2);
	eledit.value = currentvalue;

	td.innerHTML = '';
	td.appendChild(eledit);

	displayCurrentRowItem();

	eledit.addEventListener('keydown', (evt)=>{
		evt.stopPropagation();
		if (['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(evt.code)) {
			evt.preventDefault()
		} else if (evt.code=='Enter') {
			commitQtyEdit(td, eledit);
		} else if (evt.code=='Escape') {
			cancelQtyEdit(td, eledit);
		}
	});

	eledit.addEventListener('keypress', (evt)=>{
		// hanya boleh angka
		var keyCode = evt.keyCode;
		if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))) {
			evt.preventDefault();
		}
	});

	eledit.editHandler = (evt) => {
		evt.stopPropagation();
		commitQtyEdit(td, eledit);
	}
	eledit.addEventListener('blur', eledit.editHandler);
	eledit.focus();
}


function cancelQtyEdit(td, eledit) {
	var qty = td.getAttribute('value');
	eledit.removeEventListener('blur', eledit.editHandler, false);
	if (eledit.parentNode.hasChildNodes()) {
		eledit.parentNode.removeChild(eledit);
	}
	td.innerHTML = utilities.format_qty(qty);
}


function commitQtyEdit(td, eledit) {
	
	var qty = eledit.value;
	if (isNaN(qty) || eledit.value.trim()=='') {
		// ambil nilai yg lama
		qty = td.getAttribute('value');
	}

	eledit.removeEventListener('blur', eledit.editHandler, false);
	if (eledit.parentNode.hasChildNodes()) {
		eledit.parentNode.removeChild(eledit);
	}

	td.setAttribute('value', qty);
	td.innerHTML = utilities.format_qty(qty);

	var row = dgv.DATA[td.parentNode.id];
	var currentsellprice = row.data.currentsellprice
	var subtotal = 	currentsellprice * qty;

	row.qty = qty;
	row.subtotal = subtotal;
	
	// console.log(dgv.DATA[td.parentNode.id]);
	var tds = td.parentNode.getElementsByClassName('valuecolumn');
	tds[0].innerHTML = utilities.format_price(subtotal);

	dgv_itemmodified();
}


function dgv_itemmodified() {
	var qty = 0;
	var subtotal = 0;
	for (var id in dgv.DATA) {
		var row = dgv.DATA[id];
		qty += Number(row.qty);
		subtotal += Number(row.subtotal);
	}

	txt_totalqty.setValue(qty);
	txt_totalvalue.setValue(subtotal);
}


function btn_payment_click() {
	window.$pages.getPage('pnl_payment').handler.clearPayments();
	window.$pages.getPage('pnl_payment').handler.setdata({
		allowedPayType: ['CASH'],
		totalQty: txt_totalqty.getValue(),
		totalValue: txt_totalvalue.getValue(),
		member: {},
		items: []
	});
	window.$pages.getPage('pnl_payment').Show();
}

function btn_camera_click() {
	pnl_camera.show(); 
	img_searchmode.selectMode('barcode');

	var startCam = false;
	var camregion = document.getElementById('pnl_entry-codereadercam__scan_region');
	if (camregion==null) {
		startCam = true;
	} else {
		var els = camregion.getElementsByTagName('video');
		if (els.length==0) {
			startCam = true;
		}
	}

	if (startCam) {
		if (html5QrcodeScanner==null) {
			html5QrcodeScanner = new Html5QrcodeScanner(camelid, camConfig);
		}
		setTimeout(()=>{
			html5QrcodeScanner.render(onCameraScanSuccess);
		}, 200);
	}
}

function btn_cameraclose_click() {
	html5QrcodeScanner.clear();
	pnl_itemdisplay.show();
}

function btn_camflip_click() {
	var camregion = document.getElementById('pnl_entry-codereadercam__scan_region');
	if (camregion==null) {
		return;
	}

	var els = camregion.getElementsByTagName('video');
	if (els.length>0) {
		var video = els[0];
		if (video.classList.contains('camflip')) {
			video.classList.remove('camflip');
		} else {
			video.classList.add('camflip');
		}
	}
}


async function btn_selector_click() {
	pnl_selector.show(); 
}



async function displayCurrentRowItem() {
	if (pnl_camera.active || pnl_selector.active) {
		return;
	}

	pnl_itemdisplay.show();
	var tr = dgv.getCurrentRow();
	if (tr==null) {
		img_itemdisplay.reset();
		txt_itemstock_id.innerHTML = '';
		txt_itemstock_descr.innerHTML = '';
		txt_itemstock_code.innerHTML = '';
		txt_iteminfo.innerHTML = '';
		txt_itemstock_grossprice.innerHTML = '';
		txt_itemstock_disc.innerHTML = '';
		txt_itemstock_sellprice.innerHTML = '';
		return;
	}


	if (pnl_itemdisplay.currentRowId!=tr.id) {
		pnl_itemdisplay.currentRowId = tr.id;
		var row = dgv.DATA[tr.id];
		let docid = row.data.itemstock_couchdbid;
		
		viewimage(docid);

		var grossprice = Number(row.data.itemstock_grossprice);
		var disc = Number(row.data.itemstock_disc);
		var sellprice = Number(row.data.itemstock_sellprice);

		txt_itemstock_id.innerHTML = row.data.itemstock_id;
		txt_itemstock_descr.innerHTML = row.data.itemstock_descr;
		txt_itemstock_code.innerHTML = row.data.itemstock_code;
		txt_iteminfo.innerHTML = '';

		if (sellprice>=grossprice) {
			txt_itemstock_grossprice.innerHTML = '';
		} else {
			txt_itemstock_grossprice.setValue(row.data.itemstock_grossprice);
		}
		
		if (disc > 0) {
			txt_itemstock_disc.innerHTML = `Disc ${row.data.itemstock_disc}%`
		} else {
			if (sellprice < grossprice) {
				txt_itemstock_disc.innerHTML = 'Disc SP';
			} else {
				txt_itemstock_disc.innerHTML = '';
			}
		}
		 
		txt_itemstock_sellprice.setValue(row.data.itemstock_sellprice);
	}


}

async function viewimage(docid, queue_id) {
	img_itemdisplay.src = `index.php/cfs/${docid}`;
}

function btn_member_click() {
	window.$pages.getPage('pnl_member').Show();
}

function btn_promo_click() {
	window.$pages.getPage('pnl_promo').Show();
}

function btn_event_click() {
	window.$pages.getPage('pnl_event').Show();
}

function btn_staff_click() {
	window.$pages.getPage('pnl_staff').Show();
}

async function btn_remove_click() {
	var tr = dgv.getCurrentRow();
	if (tr==null) {
		return;
	}

	var id = tr.id;
	if (dgv.DATA.hasOwnProperty(id)) {
		var row = dgv.DATA[id];
		var descr = row.data.itemstock_descr;


		stateKeyEvent.tempHandler = (evt) => {
			// console.log(stateKeyEvent.modal);
			// console.log(evt);
			if (evt.key==utilities.shortcutKeyCancel) {
				stateKeyEvent.modal.respond('no');
			} else if (evt.key==utilities.shortcutKeyOk) {
				stateKeyEvent.modal.respond('yes');
			}
		}
		var result = await $pos.component.confirm({
			title:'Remove', 
			text:`Anda menghapus item '${descr}'.<br>Lanjutkan ?`,
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

	var id = tr.id;
	if (dgv.DATA.hasOwnProperty(id)) {
		delete dgv.DATA[id];
	}

	if (document.getElementById(id)!=null) {
		if (tr.nextElementSibling!=null) {
			dgv.ArrowDown();
		} else if (tr.previousElementSibling!=null) {
			dgv.ArrowUp();
		} else {
			dgv.currentRow = null;
			dgv.previousRow = null;
		}
		tr.parentNode.removeChild(tr);
	} 
	

	displayCurrentRowItem();
	dgv_itemmodified();

}