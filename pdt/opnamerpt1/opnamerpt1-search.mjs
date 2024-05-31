var this_page_id;


const pnl_searchbar = $('#pnl_search-searchbar')
const dgv_list = $('#pnl_search-dgv_list')
const obj = {
	txt_input : $('#pnl_search-obj_txt_input')
}

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


	obj.txt_input.textbox({
		onClickButton: () => { txt_input_buttonclick() }
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
		pnl_searchbar.css('width', `${width}px`)
		obj.txt_input.textbox('resize',  `${width-70}px`)

		dgv_list.datagrid('resize', {
			width: `${width}px`,
			height: `${height-140}px`
		})			
		
	} else {
		pnl_searchbar.css('width', '200px')
		obj.txt_input.textbox('resize',  '230px')

		dgv_list.datagrid('resize', {
			width: `200px`
		})		
	}

}


function txt_input_buttonclick() {
	// cob a search art 50219699
	var art = obj.txt_input.textbox('getText')
	search(art, (err, result) => {
		if (err) {
			var error = new Error(err)
			$.messager.alert('Artikel', error.message, 'warning', ()=>{
				obj.txt_input.textbox('textbox').focus()
			})
		} else {
			// console.log(result)
			// obj.txt_input.textbox('setText', '');
			dgv_list.datagrid('loadData', result)
		}
	})
}

async function search(art, fn_res) {

	try {
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

		fn_res(null, res.docs)
		return res.docs

	} catch (err) {
		fn_res(err)
	}
}


