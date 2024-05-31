import { handle_home, handle_back } from './xhandler-backhome.mjs';
import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'



const SEARCHMODE = [{text:'Search Barcode', src:'searchmode-barcode.svg'}, {text:'Search Article', src:'searchmode-article.svg'}];
const txt_lineinput = $('#pnl_entry-txt_lineinput');


const btn_payment = $('#pnl_entry-btn_payment');
const btn_searchmode = $('#pnl_entry-btn_searchmode');
const btn_escape = $('#pnl_entry-btn_escape');
const btn_cari = $('#pnl_entry-btn_cari')

const cbo_salesperson = $('#pnl_edit-cbo_salesperson');


const pnl_main = $('#pnl_entry-main')
const pnl_left = $('#pnl_entry-left')
const pnl_right = $('#pnl_entry-right')
const pnl_grid = $('#pnl_entry-pnl_grid')

const dgv_item = $('#pnl_entry-dgv_item')
const tab_info = $('#pnl_entry-tab_info')

const SIZE = {width:0, height:0}


var current_search_mode_index = null;
var this_page_id;
var this_page_options;



export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	pnl_right.WIDTH = 450;
	
	btn_searchmode.linkbutton({
		onClick: () => { btn_searchmode_click() }
	})

	btn_payment.linkbutton({
		onClick: () => { btn_payment_click() }
	});

	btn_escape.linkbutton({
		onClick: () => { btn_escape_click() }
	})

	btn_cari.linkbutton({
		onClick: () => { btn_cari_click() }
	})
	


	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height);
	});


	init_component(opt);
	btn_searchmode_click();

}

export async function showed() {
	parent.$ui.setTitle('POS - Entry');
	AdjustComponentSize(SIZE.width, SIZE.height);
}

export function OnSizeRecalculated(width, height) {
	SIZE.width = width;
	SIZE.height = height;
	AdjustComponentSize(width, height);
}


export async function handle_keyboard_keydown(ev) {
	// console.log(ev.code)
	txt_lineinput.textbox('textbox').focus();

	switch (ev.code) {
		case 'ArrowUp':
			ev.preventDefault();
			break;

		case 'ArrowDown':
			ev.preventDefault();
			break;

		case "F1" :
			btn_searchmode_click();
			break;

		case "F4" :
			btn_payment_click();
			break;

		case "Escape" :
			btn_escape_click();
			break;
	}

}


function AdjustComponentSize(width, height) {
	
	if (width < global.MIN_WIDTH) {
		width = global.MIN_WIDTH;
	}

	if (height < global.MIN_HEIGHT) {
		height = global.MIN_HEIGHT;
	}

	var left_width = width-pnl_right.WIDTH;
	var right_width = pnl_right.WIDTH;

	var r = pnl_main[0].getBoundingClientRect();
	//var pcheight = r.height - 5;
	var pcheight = height - 85

	console.log(width, height);
	console.log(width, pcheight);



	pnl_left[0].style.width = `${left_width}px`;
	pnl_left[0].style.height = `${pcheight}px`;
	pnl_left[0].style.minHeight = `${pcheight}px`;

	pnl_grid[0].style.width = `${left_width}px`;
	pnl_grid[0].style.height = `${pcheight - 201}px`;
	pnl_grid[0].style.minHeight = `${pcheight - 201}px`;

	dgv_item.datagrid('resize', {
		width: left_width - 3,
		height: pcheight - 203
	});


	pnl_right[0].style.width = `${right_width}px`;
	pnl_right[0].style.height = `${pcheight + 3}px`;
	pnl_right[0].style.minHeight = `${pcheight + 3}px`;

	tab_info.tabs('resize');


}



function init_component(opt) {

	new fgta4slideselect(cbo_salesperson, {
		title: 'Pilih Sales Person',
		returnpage: this_page_id,
		api: 'ent/organisation/dept/list',
		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{ mapping: 'dept_id', text: 'dept_id' },
			{ mapping: 'dept_name', text: 'dept_name' },
		],
		OnDataLoading: (criteria) => { },
		OnDataLoaded: (result, options) => {

		},
		OnSelected: (value, display, record) => { }
	})

}


function btn_searchmode_click() {

	if (current_search_mode_index==null) {
		current_search_mode_index = -1;
	}

	current_search_mode_index++;
	if (current_search_mode_index>SEARCHMODE.length-1) {
		current_search_mode_index = 0;
	}
	var search_mode = SEARCHMODE[current_search_mode_index];
	var next_search_mode_index = 1 + current_search_mode_index;
	if (next_search_mode_index>SEARCHMODE.length-1) {
		next_search_mode_index = 0;
	}	
	
	var next_search_mode = SEARCHMODE[next_search_mode_index];
	$('#pnl_entry-txt_next_searchmode').html(next_search_mode.text);
	$("#pnl_entry-img_searchmode").attr("src", 'index.php/asset/retail/pos/main/icons/' + search_mode.src);


	// txt_lineinput.textbox('textbox').focus();
}

function btn_payment_click() {
	$ui.getPages().show('pnl_payment', () => {
		var param = {}
		var pnl_payment = $ui.getPages().ITEMS['pnl_payment'];
		pnl_payment.handler.PreparePayment(param);
		pnl_payment.handler.showed();
	})	
}

function btn_escape_click() {
	handle_back();
}

function btn_cari_click() {
	console.log('cari');
	dgv_item.datagrid('loadData', [
		{code:'123', name:'aaa', price:1234},
		{code:'123', name:'aaa', price:1234},
		{code:'123', name:'aaa', price:1234},
		{code:'123', name:'aaa', price:1234}
	])

}