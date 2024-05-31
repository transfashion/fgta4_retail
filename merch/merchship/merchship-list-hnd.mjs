import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'


let grd_list, opt;
var this_page_id;
var this_page_options;

const cbo_search_unit = $('#pnl_list-cbo_search_unit');
const btn_filter = $('#pnl_list-btn_filter');


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	


	grd_list.autoload = false;

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_unit: 1,
		},
		onFinished: () => {
			grd_list.doLoad();
		}
	})


	cbo_search_unit.name = 'pnl_list-cbo_search_unit'	
	cbo_search_unit.comp = new fgta4slideselect(cbo_search_unit, {
		title: 'Pilih Unit',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldValueMap: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{ mapping: 'unit_name', text: 'Unit' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
			//criteria.dept_isitemowner = 1;
		},
		OnDataLoaded: (result, options) => {
			//result.records.unshift({ unit_id: '--ALL--', unit_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			grd_list.doLoad();
		},
		OnCreated: () => {
			console.log(global.setup);
			cbo_search_unit.combo('setValue', '0');
			cbo_search_unit.combo('setText', '-- PILIH --');
			parallelProcess.setFinished('cbo_search_unit');
		},
		// OnRowRender: (tr) => {
		// 	cbo_search_dept_OnRowRender(tr);
		// }
	});
	

	btn_filter.linkbutton({
		onClick: () => { btn_filter_click() }
	})


	fn_callback();
}

export function grd_list_rowrender(row) {
	if (row.mapping=='merchship_descr') {
		var content = `
			<div class="grd-lst-id">${row.record.merchship_id}</div>
			<div class="grd-lst-desc">${row.record.merchship_descr}</div>
			<div class="grd-lst-per">${row.record.periodemo_name}</div>
		`;
		row.td.innerHTML = content;
	}
}	

function btn_filter_click() {
	$ui.getPages().show('pnl_editfilter', ()=>{
		// $ui.getPages().ITEMS['pnl_editpreview'].handler.PreviewForm({});
	})
}