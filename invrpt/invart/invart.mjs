import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as pList from './invart-list.mjs'
import * as pDetsize from './invart-detsize.mjs'
import * as pSite from './invart-site.mjs'



const pnl_list = $('#pnl_list')
const pnl_detsize = $('#pnl_detsize')
const pnl_site = $('#pnl_site')



var pages = fgta4pages;
var slider = fgta4pageslider;

export async function init() {

	global.fgta4grid = fgta4grid


	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_detsize, handler: pDetsize},
			{panel: pnl_site, handler: pSite}
		])

	$ui.setPages(pages)

}