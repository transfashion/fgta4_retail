import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './mercharticle.settings.mjs'
import * as apis from './mercharticle.apis.mjs'
import * as pList from './mercharticle-list.mjs'
import * as pEdit from './mercharticle-edit.mjs'
import * as pEditPropgrid from './mercharticle-propgrid.mjs'
import * as pEditPropform from './mercharticle-propform.mjs'
import * as pEditVariancegrid from './mercharticle-variancegrid.mjs'
import * as pEditVarianceform from './mercharticle-varianceform.mjs'
import * as pEditPicturegrid from './mercharticle-picturegrid.mjs'
import * as pEditPictureform from './mercharticle-pictureform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editpropgrid = $('#pnl_editpropgrid')
const pnl_editpropform = $('#pnl_editpropform')
const pnl_editvariancegrid = $('#pnl_editvariancegrid')
const pnl_editvarianceform = $('#pnl_editvarianceform')
const pnl_editpicturegrid = $('#pnl_editpicturegrid')
const pnl_editpictureform = $('#pnl_editpictureform')



var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}


export async function init(opt) {
	// $ui.grd_list = new fgta4grid()
	// $ui.grd_edit = new fgta4grid()

	global.fgta4grid = fgta4grid
	global.fgta4form = fgta4form



	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	opt.variancedata = global.setup.variancedata;
	settings.setup(opt);

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editpropgrid, handler: pEditPropgrid},
			{panel: pnl_editpropform, handler: pEditPropform},
			{panel: pnl_editvariancegrid, handler: pEditVariancegrid},
			{panel: pnl_editvarianceform, handler: pEditVarianceform},
			{panel: pnl_editpicturegrid, handler: pEditPicturegrid},
			{panel: pnl_editpictureform, handler: pEditPictureform}			
		], opt)

	$ui.setPages(pages)


	document.addEventListener('OnButtonHome', (ev) => {
		if (ev.detail.cancel) {
			return
		}

		ev.detail.cancel = true;
		ExitModule();
	})
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	



	await PreloadData()

}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}



async function PreloadData() {
	
}