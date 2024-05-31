import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as pListCity from './byloc-city.mjs'
import * as pListLoc from './byloc-loc.mjs'
import * as pListSite from './byloc-site.mjs'
import * as pListTx from './byloc-tx.mjs'
import * as pViewTx from './byloc-viewtx.mjs'

const pnl_listcity = $('#pnl_listcity');
const pnl_listloc = $('#pnl_listloc');
const pnl_listsite = $('#pnl_listsite');
const pnl_listtx = $('#pnl_listtx');
const pnl_viewtx = $('#pnl_viewtx')

var pages = fgta4pages;
var slider = fgta4pageslider;

export async function init() {

	global.fgta4grid = fgta4grid

	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_listcity, handler: pListCity},
			{panel: pnl_listloc, handler: pListLoc},
			{panel: pnl_listsite, handler: pListSite},
			{panel: pnl_listtx, handler: pListTx},
			{panel: pnl_viewtx, handler: pViewTx}
			
		])

	$ui.setPages(pages)	

}