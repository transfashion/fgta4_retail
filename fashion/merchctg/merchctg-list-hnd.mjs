import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'

let grd_list, opt;
var this_page_id;
var this_page_options;

const cbo_search_unit = $('#pnl_list-cbo_search_unit');

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	global.search = {};

	grd_list.autoload = false;
	
	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_unit: 1,
		},
		onFinished: () => {
			grd_list.doLoad();
		}
	})

	global.search.cbo_search_unit = cbo_search_unit;
	cbo_search_unit.name = 'pnl_list-cbo_search_unit'	
	cbo_search_unit.comp = new fgta4slideselect(cbo_search_unit, {
		title: 'Pilih unit',
		returnpage: this_page_id,
		api: 'ent/organisation/unit/list-byuser',

		fieldValue: 'unit_id',
		fieldValueMap: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{ mapping: 'unit_name', text: 'unit' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
			// criteria.isitemowner = 1;
		},
		OnDataLoaded: (result, options) => {
			// console.log(result)
			// result.records.unshift({ unit_id: '--NULL--', unit_name: '-- PILIH --' });
			delete result.records[0];
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			grd_list.doLoad();
		},
		OnCreated: () => {
			// console.log(global.setup);
			cbo_search_unit.combo('setValue', '--NULL--');
			cbo_search_unit.combo('setText', '-- PILIH --');

			// cbo_search_unit.combo('setValue', global.setup.unit_id);
			// cbo_search_unit.combo('setText', global.setup.unit_name);

			parallelProcess.setFinished('cbo_search_unit');
		},
		// OnRowRender: (tr) => {
		// 	cbo_search_unit_OnRowRender(tr);
		// }
	});

	
	fn_callback();
}

export function list_loading(options) {
	options.criteria.unit_id = cbo_search_unit.combo('getValue');
}


