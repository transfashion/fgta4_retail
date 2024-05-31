var this_page_id;

const dgv_list = $('#pnl_gro-dgv_list')


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

	loaddatagro()

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

export function open() {
	loaddatagro()
}

async function loaddatagro() {
	dgv_list.datagrid('loading');

	var res = await $ui.LOCALDB.find({
		selector: {
			doctype: 'summarygro'
		},

		fields: [
			'gro_id',
			'gro_name',
			'qty',
			'qtyscanned'
		]
	})

	dgv_list.datagrid('loadData', res.docs)
	dgv_list.datagrid('loaded');


	

}


function dgv_list_click(index,row) {
	var param = {
		gro_id: row.gro_id,
		gro_name: row.gro_name
	}
	$ui.getPages().show('pnl_ctg')
	$ui.getPages().ITEMS['pnl_ctg'].handler.open(param)	
}