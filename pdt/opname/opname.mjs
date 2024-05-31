import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './opname.apis.mjs'
import * as pList from './opname-list.mjs'
import * as pForm from './opname-form.mjs'
import * as pScan from './opname-scan.mjs'
import * as pItemLoading from './opname-itemloading.mjs'
import * as pReset from './opname-reset.mjs'
import * as pStores from './opname-stores.mjs'

// const fgta4submoduleBase = Object.assign({}, fgta4submodule)


const pnl_list = $('#pnl_list')
const pnl_form = $('#pnl_form')
const pnl_scan = $('#pnl_scan')
const pnl_itemloading = $('#pnl_itemloading')
const pnl_reset = $('#pnl_reset')
const pnl_stores = $('#pnl_stores')

var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}
export const LOCALDB_NAME = 'masteritemdb'
export var LOCALDB = new PouchDB(LOCALDB_NAME)
export var WorkerSync;

export async function init() {
	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_form, handler: pForm},
			{panel: pnl_itemloading, handler: pItemLoading},
			{panel: pnl_scan, handler: pScan},
			{panel: pnl_reset, handler: pReset},
			{panel: pnl_stores, handler: pStores}
		])

	$ui.setPages(pages)
	

	document.addEventListener('OnButtonHome', (ev) => {
		ev.detail.cancel = true;
		ExitModule();
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnUnload', (ev) => {
		clearInterval($ui.WorkerSync)
	})	



	try {
		var info = await $ui.LOCALDB.info()
		if (info.doc_count>0) {
			$ui.getPages()
				.show('pnl_scan')
				.handler.init_info()
			
		}
	} catch (err) {
		console.error(err)
	}

	$ui.WorkerSync = setInterval(()=>{ syncronize() }, 1000);


}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}


async function syncronize() {
	// console.log('syncing...')
} 