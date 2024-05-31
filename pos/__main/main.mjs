import { fgta4grid } from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'

import * as pStart from './main-start.mjs'
import * as pEntry from './main-entry.mjs'
import * as pPayment from './main-payment.mjs'


import {handle_home, handle_back} from './xhandler-backhome.mjs';
import * as TXClass from './xhandler-tx.mjs';


const pnl_start = $('#pnl_start')
const pnl_entry = $('#pnl_entry')
const pnl_payment = $('#pnl_payment')


var pages = fgta4pages;
var slider = fgta4pageslider;
var OuterPanels;
var LeftPanels;
var RightPanels;

export const SIZE = {width:0, height:0}


export async function init(opt) {

	global.fgta4grid = fgta4grid
	global.HANDLEKEYS = ['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
	global.title = parent.$ui.getTitle();
	global.MIN_WIDTH = 980;
	global.MIN_HEIHGT = 597;
	global.WINDOWSIZE = SIZE;
	global.TX = TXClass;

	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_start, handler: pStart},
			{panel: pnl_entry, handler: pEntry},
			{panel: pnl_payment, handler: pPayment}
		], opt)

	$ui.setPages(pages)


	document.addEventListener('OnButtonBack', (ev) => {
		handle_back(ev);
	});	

	document.addEventListener('OnButtonHome', (ev) => {
		handle_home(ev);
	});


	OuterPanels = document.getElementsByClassName('pos-outer-panel');
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height);
	})


	document.addEventListener('keydown', (ev) => {
		var current_page_id = $ui.getPages().getCurrentPage();
		var handle_keydown = $ui.getPages().ITEMS[current_page_id].handler.handle_keyboard_keydown;
		if (typeof handle_keydown === 'function') {
			if (global.HANDLEKEYS.includes(ev.code)) {
				ev.block_default_event = true;
			}
			handle_keydown(ev);
			if (ev.block_default_event) {
				ev.preventDefault();
			}
		}
	});



	// Set Store Name
	$('.pos-store-name').html('My Store');


	// set DateTime
	var DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	var MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
	setInterval(()=>{
		var d = new Date();
		var dayName = DAYS[d.getDay()];
		var date = d.getDate();
		var monthName = MONTHS[d.getMonth()];
		var year = d.getFullYear();
		var h = (`${d.getHours()}`).padStart(2, '0');
		var m = (`${d.getMinutes()}`).padStart(2, '0');
		var s = (`${d.getSeconds()}`).padStart(2, '0');


		$('.pos-datetime').html(`${dayName}, ${date} ${monthName} ${year}&nbsp;&nbsp;&nbsp;&nbsp;jam ${h}:${m}:${s}`);
	}, 1000);
}


export function OnSizeRecalculated(width, height) {
	var winheight = $(window).height() - 10;
	// var winwidth =  $(window).width() - 10;


	// console.log(width, winwidth);


	if (width < global.MIN_WIDTH ) {
		width = global.MIN_WIDTH;
	}

	if (height < global.MIN_HEIHGT) {
		height = global.MIN_HEIHGT;
	} else if (height > winheight) {
		height = winheight;
	}


	SIZE.width = width;
	SIZE.height = height;
	global.WINDOWSIZE = SIZE;

	if (OuterPanels!=null) {
		for (var pnl of OuterPanels) {
			pnl.style.width = `${width}px`;
			pnl.style.height = `${height}px`;
		}
	}

	if ($ui!=undefined) {
		var PAGES = $ui.getPages();
		if (PAGES!=undefined) {
			var current_page_id = PAGES.getCurrentPage();
			var handle_SizeRecalculated = PAGES.ITEMS[current_page_id].handler.OnSizeRecalculated;
			if (typeof handle_SizeRecalculated==='function') {
				handle_SizeRecalculated(width, height);
			}
		}
	}

}
	


// export async function ExitModule() {
// 	$ui.home();
// }


export function formatPrice(val,row){
	var num = parseFloat(val)
	return num.toLocaleString('en-us');
}