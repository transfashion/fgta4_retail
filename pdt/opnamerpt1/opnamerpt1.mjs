import * as fgta4pages from '../../../../../jslibs/fgta4pages.js'
import * as fgta4pageslider from '../../../../../jslibs/fgta4pageslider.js'
import * as apis from './opnamerpt1.apis.mjs'
import * as pSearch from './opnamerpt1-search.mjs'
import * as pGro from './opnamerpt1-gro.mjs'
import * as pCtg from './opnamerpt1-ctg.mjs'
import * as pArt from './opnamerpt1-art.mjs'
import * as pArtd from './opnamerpt1-artd.mjs'

const pnl_search = $('#pnl_search')
const pnl_gro = $('#pnl_gro')
const pnl_ctg = $('#pnl_ctg')
const pnl_art = $('#pnl_art')
const pnl_artd = $('#pnl_artd')
const btn_searchbyart = $('#btn_searchbyart')
const btn_summary = $('#btn_summary')


var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}
export const LOCALDB_NAME = 'masteritemdb'
export const LOCALDB = new PouchDB(LOCALDB_NAME)

export async function init() {
	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_gro, handler: pGro},
			{panel: pnl_ctg, handler: pCtg},
			{panel: pnl_art, handler: pArt},
			{panel: pnl_artd, handler: pArtd},
			{panel: pnl_search, handler: pSearch},
		])

	$ui.setPages(pages)

	
	btn_searchbyart.linkbutton({
		onClick: () => { btn_searchbyart_click() }
	})

	btn_summary.linkbutton({
		onClick: () => { btn_summary_click() }
	})	

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}



function btn_searchbyart_click() {
	$ui.getPages().show('pnl_search')
}


function btn_summary_click() {
	$ui.getPages().show('pnl_gro')
	$ui.getPages().ITEMS['pnl_gro'].handler.open()
}