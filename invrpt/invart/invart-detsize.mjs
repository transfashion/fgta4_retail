var this_page_id;


let tbl_list = $('#pnl_detsize-tbl_list')

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
			$ui.getPages().show('pnl_list', ()=>{
			})
		}
	})


}

export function OnSizeRecalculated(width, height) {
}



export function open(data, rowid, viewmode=true, fn_callback) {
	var heinv_id = data.HEINV_ID;
	var heinv_art = data.HEINV_ART;
	var heinv_mat = data.HEINV_MAT;
	var heinv_col = data.HEINV_COL;
	var heinv_pricegross = data.HEINV_PRICE
	var heinv_pricedisc = data.HEINV_PRICEDISC
	var heinv_pricenett = data.HEINV_PRICENETT


	$('.heinv_id').html(heinv_id)
	$('.heinv_art').html(heinv_art)
	$('.heinv_mat').html(heinv_mat)
	$('.heinv_col').html(heinv_col)
	// $('.heinv_pricegross').html('Rp ' + heinv_pricegross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
	// $('.heinv_pricedisc').html(heinv_pricedisc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '% disc')
	// $('.heinv_pricenett').html('Rp ' + heinv_pricenett.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))


	// $('#detsize_heinv_id').html(heinv_id)
	// $('#detsize_heinv_art').html(heinv_art)
	// $('#detsize_heinv_mat').html(heinv_mat)
	// $('#detsize_heinv_col').html(heinv_col)

	// $('#site_heinv_id').html(heinv_id)
	// $('#site_heinv_art').html(heinv_art)
	// $('#site_heinv_mat').html(heinv_mat)
	// $('#site_heinv_col').html(heinv_col)
	
	grd_list.clear()
	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/listsize`
		options.criteria['heinv_id'] = heinv_id
	}

	var fn_listloaded = async (result, options) => {
		var heinv_name = result.price.heinv_name
		var heinv_pricegross = result.price.heinv_pricegross
		var heinv_pricedisc = result.price.heinv_pricedisc
		var heinv_pricenett = result.price.heinv_pricenett
		var invcls_name = result.price.invcls_name;
		
		$('.heinv_name').html(heinv_name);
		$('.heinv_pricegross').html('Rp ' + heinv_pricegross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
		$('.heinv_pricedisc').html(heinv_pricedisc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '% disc')
		$('.heinv_pricenett').html('Rp ' + heinv_pricenett.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
		$('.invcls_name').html(invcls_name);
		
	}

	grd_list.listload(fn_listloading, fn_listloaded)	

	fn_callback()
}




function grd_list_rowformatting(tr) {

}


function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	// console.log(record)

	var viewmode = true
	last_scrolltop = $(window).scrollTop()
	$ui.getPages().ITEMS['pnl_site'].handler.open(record, trid, viewmode, (err)=> {
		if (err) {
			console.log(err)
		} else {
			$ui.getPages().show('pnl_site')	
		}
	})
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

