var this_page_id;
var this_page_options;


import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'

const btn_print = $('#pnl_editpreview-btn_print');
const obj_report = $('#pnl_editpreview-obj_report')
let rpt = {}

export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	rpt = new fgta4report(obj_report, {
		OnReportLoaded: (iframe) => { obj_report_loaded(iframe) },
		OnReportLoadingError: (err) => {  obj_report_loadingerror(err) },
	})
	
	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}

export function OnSizeRecalculated(width, height) {
}

function obj_report_loaded(iframe) {
	if (typeof iframe.contentWindow.onReportLoaded === 'function') {
		iframe.contentWindow.onReportLoaded(()=>{
			console.log('report loaded');
			document.body.style.cursor = 'default'
			rpt.reportloaded();
			btn_print.linkbutton('enable');
		})
	}
}

function obj_report_loadingerror(err) {
	console.error(err);
	document.body.style.cursor = 'default'
	btn_print.linkbutton('disable');

}

export function PreviewForm(doc) {
	//console.log(data);
	var id = doc.id;
	var variancename = doc.variancename;
	var reportmodule = doc.reportmodule;

	// var module = window.global.modulefullname;
	// var renderto = 'formtemplate-standard.phtml';
	// var format = 'format-01-a4-potrait';
	// var reportmodule = `${module}/merchship.xprint?renderto=${renderto}&format=${format}`;

	var params = {
		id: id,
		variancename: variancename
	}

	document.body.style.cursor = 'wait'
	btn_print.linkbutton('disable');

	console.log('loading report');
	rpt.load(reportmodule, params);
}

function btn_print_click() {
	rpt.print();
}