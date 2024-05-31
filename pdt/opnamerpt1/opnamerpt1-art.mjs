var this_page_id;

const dgv_list = $('#pnl_art-dgv_list')


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
			$ui.getPages().show('pnl_ctg')
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
	var ctg_id = param.ctg_id
	var ctg_name = param.ctg_name

	dgv_list.datagrid('loading');

	await $ui.LOCALDB.createIndex({
		ddoc: "idx-doctype-gro-ctg",
		name: "idx-doctype-gro-ctg",					
		index: {
			fields: ['doctype', 'gro_id', 'ctg_id']
		}	
	});


	var res = await $ui.LOCALDB.find({
		selector: {
			doctype: 'item',
			gro_id: gro_id,
			ctg_id: ctg_id
		},

		fields: [
			'art',
			'mat',
			'col',
			'size',
			'qty',
			'qtyscanned'
		]
	})	

	dgv_list.datagrid('loadData', res.docs)
	dgv_list.datagrid('loaded');

	dgv_list.datagrid('autoSizeColumn', 'art' )
	
}



function dgv_list_click(index,row) {
	var param = {
		art: row.art,
	}
	$ui.getPages().show('pnl_artd')


	// console.log($ui.getPages().ITEMS)
	$ui.getPages().ITEMS['pnl_artd'].handler.open(param)	
}


