var this_page_id;


let tbl_list = $('#pnl_site-tbl_list')

let grd_list = {}


let last_scrolltop = 0



export async function init(opt) {
	this_page_id = opt.id

	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})


	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_detsize', ()=>{
			})
		}
	})


}

export function OnSizeRecalculated(width, height) {
}



export function open(data, rowid, viewmode=true, fn_callback) {
	var heinvitem_id = data.HEINVITEM_ID;
	var heinv_size = data.HEINV_SIZE;

	$('#site_heinv_size').html(heinv_size)
	
	grd_list.clear()
	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/listsite`
		options.criteria['heinvitem_id'] = heinvitem_id
	}

	var fn_listloaded = async (result, options) => {
		// console.log(result)
	}

	grd_list.listload(fn_listloading, fn_listloaded)	

	fn_callback()
}




function grd_list_rowformatting(tr) {

}


function grd_list_rowclick(tr, ev) {
}

function grd_list_cellclick(td, ev) {
	// console.log(td)
	// ev.stopPropagation()
}

function grd_list_cellrender(td) {
	// var text = td.innerHTML
	// if (td.mapping == 'id') {
	// 	// $(td).css('background-color', 'red')
	// 	td.innerHTML = `<a href="javascript:void(0)">${text}</a>`
	// }
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		// var mapping = td.getAttribute('mapping')
		// if (mapping=='id') {
		// 	if (!record.disabled) {
		// 		td.classList.add('fgtable-rowred')
		// 	}
		// }
		if (record.disabled=="1" || record.disabled==true) {
			td.classList.add('fgtable-row-disabled')
		} else {
			td.classList.remove('fgtable-row-disabled')
		}
	})
}

