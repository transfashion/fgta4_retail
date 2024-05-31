var this_page_id;

const dgv_list = $('#pnl_ctg-dgv_list')


export async function init(opt) {
	this_page_id = opt.id

	dgv_list.datagrid({
		onClickRow: (index,row) => { dgv_list_click(index,row)},
		rowStyler:function(index,row){
			var qty = parseInt(row.qty)
			var qtyscanned = parseInt(row.qtyscanned)

			if (qtyscanned<qty) {
				return 'background-color:pink;color:black'
			} else if (qtyscanned>qty) {
				return 'background-color:pink;color:red'
			} 
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})		

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_gro')
		}
	})		
}

export function OnSizeRecalculated(width, height) {
	if (width>200) {
		dgv_list.datagrid('resize', {
			width: `${width}px`,
			height: `${height-90}px`
		})			
		
	} else {
		dgv_list.datagrid('resize', {
			width: `200px`
		})		
	}

}

export async function open(param) {
	var gro_id = param.gro_id
	var gro_name = param.gro_name

	dgv_list.datagrid('loading');



	await $ui.LOCALDB.createIndex({
		ddoc: "idx-doctype-gro",
		name: "idx-doctype-gro",					
		index: {
			fields: ['doctype', 'gro_id']
		}	
	});


	var res = await $ui.LOCALDB.find({
		selector: {
			doctype: 'summaryctg',
			gro_id: gro_id
		},

		fields: [
			'gro_id',
			'gro_name',
			'ctg_id',
			'ctg_name',
			'qty',
			'qtyscanned'
		]
	})	

	dgv_list.datagrid('loadData', res.docs)
	dgv_list.datagrid('loaded');
	dgv_list.datagrid('autoSizeColumn', 'ctg_name' )


}




function dgv_list_click(index,row) {
	var param = {
		gro_id: row.gro_id,
		gro_name: row.gro_name,
		ctg_id: row.ctg_id,
		ctg_name: row.ctg_name		
	}
	$ui.getPages().show('pnl_art')
	$ui.getPages().ITEMS['pnl_art'].handler.open(param)	
}