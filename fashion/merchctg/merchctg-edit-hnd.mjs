let editor, form, obj, opt;

export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	setTimeout(() => {
		var cbo_itemgroup_id_options = obj.cbo_itemgroup_id.getOptions();
		var cbo_itemgroup_id_grid = obj.cbo_itemgroup_id.getGridList();
		cbo_itemgroup_id_options.OnRowRender = (tr) => {
			cbo_itemgroup_id_rowrender(cbo_itemgroup_id_grid, tr)
		}

		console.log('ready')
	}, 300)

	
}

	
export function form_newdata(data, options) {

	var unit_id = global.search.cbo_search_unit.combo('getValue')
	if (unit_id == '--NULL--') {
		$ui.ShowMessage('Pilih unit terlebih dahulu', {
			'Ok' : () => {
				$ui.getPages().show('pnl_list')
			}
		})
		return
	}	

	options.OnNewData = () => {
		console.log('new data')
		var unit_id = global.search.cbo_search_unit.combo('getValue')
		var unit_name = global.search.cbo_search_unit.combo('getText')
		console.log(unit_id, unit_name)
		form.setValue(obj.cbo_unit_id, unit_id, unit_name)
	}	
}	

export function cbo_dept_id_dataloading(criteria, options) {
	criteria.unit_id = obj.cbo_unit_id.combobox('getValue');
	criteria.isitemowner = 1;
}

export function cbo_dept_id_selected(value, display, record, args) {
	form.setValue(obj.cbo_itemgroup_id, '--NULL--', '-- PILIH --');
}


export function cbo_itemgroup_id_dataloading(criteria, options) {
	criteria.dept_id = obj.cbo_dept_id.combobox('getValue');
}

export function cbo_itemgroup_id_selecting(value, display, record, args) {
	// args.Cancel=true; // apabila ingin membatalkan pilihan
	if (record.itemgroup_isparent==1) {
		$ui.ShowMessage('[WARNING]Cannot select parent item group!')
		args.Cancel=true;
	}
}

function cbo_itemgroup_id_rowrender(grd_list, tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping')
		if (mapping=='itemgroup_name') {
			var indent = 10 + ((record.itemgroup_level-1) * 15);
			$(td).css("padding-left", `${indent}px`);
			if (record.itemgroup_isparent=='1') {
				$(td).css('font-weight', 'bold');
			}
		}
	})

}