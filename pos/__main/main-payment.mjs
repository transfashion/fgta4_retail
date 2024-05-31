import { handle_home, handle_back } from './xhandler-backhome.mjs';
const btn_escape = $('#pnl_payment-btn_escape');



const pnl_main = $('#pnl_payment-main')
const pnl_right = $('#pnl_payment-right')
const pnl_summary = $('#pnl_payment-pnl_summary');
const pnl_grid = $('#pnl_payment-pnl_grid');

const dgv_payment = $('#pnl_payment-dgv_payment')

const cbo_paymentmethod = $('#pnl_payment-cbo_paymentmethod')



var this_page_id;
var this_page_options;


export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	btn_escape.linkbutton({
		onClick: () => { btn_escape_click() }
	})
	

	init_component(opt);

}

export async function showed() {
	parent.$ui.setTitle('POS - Payment');
	AdjustComponentSize(global.WINDOWSIZE.width, global.WINDOWSIZE.height);
}


export function OnSizeRecalculated(width, height) {
	AdjustComponentSize(width, height);
}



export async function handle_keyboard_keydown(ev) {
	switch (ev.code) {
		case "Escape" :
			btn_escape_click();
			break;
	}
}


export async function PreparePayment(param) {
	console.log('preparing payment')
	await paymentmethod_prepare();
}



function AdjustComponentSize(width, height) {
	var pcheight = height - 85
	var right_width = width - 555;

	pnl_main[0].style.width = `${width}px`;
	pnl_main[0].style.height = `${pcheight}px`;

	pnl_right[0].style.width = `${right_width}px`;
	
	pnl_grid[0].style.width = `${right_width}px`;


	dgv_payment.datagrid('resize');


}



function init_component(opt) {

}



function btn_escape_click() {
	handle_back();
}


async function paymentmethod_prepare() {
	// cbo_paymentmethod
	var methods = [
		{id:'EDC-MEGA', text:'EDC MEGA', type:'EDC', code:'1234'},
		{id:'EDC-BCA',  text:'EDC BCA',  type:'EDC', code:'4543'},
		{id:'MID', text:'MIDTRANS - LINKPAY', type:'EDC'},
		{id:'FIO', text:'FIO - ONLINE PAYMENT', type:'EDC'},
	];

	cbo_paymentmethod.combobox('loadData', methods);
	if (methods.length>0) {
		cbo_paymentmethod.combobox('setValue', methods[0].id);
	}

}