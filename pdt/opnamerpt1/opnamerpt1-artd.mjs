var this_page_id;

const dgv_list = $('#pnl_artd-dgv_list')


export async function init(opt) {
	this_page_id = opt.id

	dgv_list.datagrid({
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
			$ui.getPages().show('pnl_art')
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
	var art = param.art

	dgv_list.datagrid('loading');

	await $ui.LOCALDB.createIndex({
		ddoc: "idx-doctype-art",
		name: "idx-doctype-art",					
		index: {
			fields: ['doctype', 'art']
		}	
	});

	var res = await $ui.LOCALDB.find({
		selector: {
			doctype: 'item',
			art: art,
		},

		fields: [
			'unit_id',
			'item_id',
			'heinv_id',
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
