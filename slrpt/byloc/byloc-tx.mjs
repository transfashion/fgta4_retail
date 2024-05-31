var this_page_id;

const tbl_list = $('#pnl_listtx-tbl_list')
const el_dtstart = $('#pnl_listtx-obj_date_start')
const el_dtend = $('#pnl_listtx-obj_date_end')
const obj_total_qty = $('#pnl_listtx-total_qty')
const obj_total_gross = $('#pnl_listtx-total_gross')
const obj_total_nett = $('#pnl_listtx-total_nett')



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
			$ui.getPages().show('pnl_listsite', ()=>{
			})
		}
	})


}



export function OnSizeRecalculated(width, height) {
}




export function open(record, trid, viewmode, fn_callback) {
	var dtstart = el_dtstart.html();
	var dtend = el_dtend.html();
	var CITY_ID = record.CITY_ID;
	var LOCATION_ID = record.LOCATION_ID;
	var SITE_ID = record.SITE_ID;

	$('.param_city').html(CITY_ID);
	$('.param_location').html(LOCATION_ID);
	$('.param_site').html(SITE_ID);

	obj_total_qty.html(0)

	grd_list.clear()
	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/listtx`
		options.criteria = {
			dtstart: dtstart,
			dtend: dtend,
			site_id: SITE_ID
		}
	}
	
	var fn_listloaded = async (result, options) => {

		var current_total_qty = parseFloat(obj_total_qty.html())
		var current_total_gross = parseFloat(obj_total_gross.html())
		var current_total_nett = parseFloat(obj_total_nett.html())

		var total_qty = parseFloat(result.summary.QTY);
		var total_gross = parseFloat(result.summary.GROSS);
		var total_nett = parseFloat(result.summary.NETT);

		obj_total_qty.html((total_qty + current_total_qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		obj_total_gross.html((total_gross + current_total_gross).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		obj_total_nett.html((total_nett + current_total_nett).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

	}

	grd_list.listload(fn_listloading, fn_listloaded)

	fn_callback()
}



function grd_list_rowformatting(tr) {

}


function grd_list_rowclick(tr, ev) {
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	var viewmode = true
	var nextpanel = 'pnl_viewtx';

	last_scrolltop = $(window).scrollTop()
	$ui.getPages().ITEMS[nextpanel].handler.open(record, trid, viewmode, (err)=> {
		if (err) {
			console.log(err)
		} else {
			$ui.getPages().show(nextpanel)	
		}
	})
}

function grd_list_cellclick(td, ev) {
	// console.log(td)
	// ev.stopPropagation()
}

function grd_list_cellrender(td) {
	var text = td.innerHTML
	if (td.mapping == 'BON_DATE') {
		$(td).css('text-align', 'center')
	} else if (td.mapping == 'QTY') {
		$(td).css('text-align', 'right')
	} else if (td.mapping == 'GROSS') {
		$(td).css('text-align', 'right')
		text = parseFloat(text);
		td.innerHTML = text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else if (td.mapping == 'NETT') {
		$(td).css('text-align', 'right')
		text = parseFloat(text);
		td.innerHTML = text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	}
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		if (record.disabled=="1" || record.disabled==true) {
			td.classList.add('fgtable-row-disabled')
		} else {
			td.classList.remove('fgtable-row-disabled')
		}
	})
}

