import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as settings from './proprog.settings.mjs'
import * as apis from './proprog.apis.mjs'
import * as pList from './proprog-list.mjs'
import * as pEdit from './proprog-edit.mjs'
import * as pEditGroupagrid from './proprog-groupagrid.mjs'
import * as pEditGroupaform from './proprog-groupaform.mjs'
import * as pEditGroupbgrid from './proprog-groupbgrid.mjs'
import * as pEditGroupbform from './proprog-groupbform.mjs'
import * as pEditSitegrid from './proprog-sitegrid.mjs'
import * as pEditSiteform from './proprog-siteform.mjs'
import * as pEditPospaymgrid from './proprog-pospaymgrid.mjs'
import * as pEditPospaymform from './proprog-pospaymform.mjs'
import * as pEditApprovalgrid from './proprog-approvalgrid.mjs'
import * as pEditApprovalform from './proprog-approvalform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editgroupagrid = $('#pnl_editgroupagrid')
const pnl_editgroupaform = $('#pnl_editgroupaform')
const pnl_editgroupbgrid = $('#pnl_editgroupbgrid')
const pnl_editgroupbform = $('#pnl_editgroupbform')
const pnl_editsitegrid = $('#pnl_editsitegrid')
const pnl_editsiteform = $('#pnl_editsiteform')
const pnl_editpospaymgrid = $('#pnl_editpospaymgrid')
const pnl_editpospaymform = $('#pnl_editpospaymform')
const pnl_editapprovalgrid = $('#pnl_editapprovalgrid')
const pnl_editapprovalform = $('#pnl_editapprovalform')



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
			{panel: pnl_editgroupagrid, handler: pEditGroupagrid},
			{panel: pnl_editgroupaform, handler: pEditGroupaform},
			{panel: pnl_editgroupbgrid, handler: pEditGroupbgrid},
			{panel: pnl_editgroupbform, handler: pEditGroupbform},
			{panel: pnl_editsitegrid, handler: pEditSitegrid},
			{panel: pnl_editsiteform, handler: pEditSiteform},
			{panel: pnl_editpospaymgrid, handler: pEditPospaymgrid},
			{panel: pnl_editpospaymform, handler: pEditPospaymform},
			{panel: pnl_editapprovalgrid, handler: pEditApprovalgrid},
			{panel: pnl_editapprovalform, handler: pEditApprovalform}			
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