var this_page_id;

const tbl_list = $('#pnl_listloc-tbl_list')
const el_dtstart = $('#pnl_listloc-obj_date_start')
const el_dtend = $('#pnl_listloc-obj_date_end')
const obj_total_tx = $('#pnl_listloc-total_tx')
const obj_total_qty = $('#pnl_listloc-total_qty')
const obj_total_gross = $('#pnl_listloc-total_gross')
const obj_total_nett = $('#pnl_listloc-total_nett')


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
			$ui.getPages().show('pnl_listcity', ()=>{
			})
		}
	})


}

export function OnSizeRecalculated(width, height) {
}


export function open(record, trid, viewmode, fn_callback) {
	var dtstart = el_dtstart.html();
	var dtend = el_dtend.html();
	var CITY_ID = record.CITY_ID


	$('.param_city').html(CITY_ID);


	grd_list.clear()
	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/listloc`
		options.criteria = {
			dtstart: dtstart,
			dtend: dtend,
			city_id: CITY_ID
		}
	}
	
	var fn_listloaded = async (result, options) => {
		// console.log(result)
		// obj_date_start.sqldatevalue = result.params.dtstart;
		// obj_date_end.sqldatevalue = result.params.dtend;

		var total_tx = result.summary.TX;
		var total_qty = result.summary.QTY;
		var total_gross = result.summary.GROSS;
		var total_nett = result.summary.NETT;

		obj_total_tx.html(total_tx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		obj_total_qty.html(total_qty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		obj_total_gross.html(total_gross.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
		obj_total_nett.html(total_nett.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));		
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
	var nextpanel = 'pnl_listsite';

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
	if (td.mapping == 'TX') {
		$(td).css('text-align', 'right')
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

