import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './merchitemctg.settings.mjs'
import * as apis from './merchitemctg.apis.mjs'
import * as pList from './merchitemctg-list.mjs'
import * as pEdit from './merchitemctg-edit.mjs'
import * as pEditPicturegrid from './merchitemctg-picturegrid.mjs'
import * as pEditPictureform from './merchitemctg-pictureform.mjs'
import * as pEditPropgrid from './merchitemctg-propgrid.mjs'
import * as pEditPropform from './merchitemctg-propform.mjs'
import * as pEditRefgrid from './merchitemctg-refgrid.mjs'
import * as pEditRefform from './merchitemctg-refform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editpicturegrid = $('#pnl_editpicturegrid')
const pnl_editpictureform = $('#pnl_editpictureform')
const pnl_editpropgrid = $('#pnl_editpropgrid')
const pnl_editpropform = $('#pnl_editpropform')
const pnl_editrefgrid = $('#pnl_editrefgrid')
const pnl_editrefform = $('#pnl_editrefform')



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
			{panel: pnl_editpicturegrid, handler: pEditPicturegrid},
			{panel: pnl_editpictureform, handler: pEditPictureform},
			{panel: pnl_editpropgrid, handler: pEditPropgrid},
			{panel: pnl_editpropform, handler: pEditPropform},
			{panel: pnl_editrefgrid, handler: pEditRefgrid},
			{panel: pnl_editrefform, handler: pEditRefform}			
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