const btn_back = document.getElementById('pnl_itemlist-btn_back');
const tbl_itemlist =  document.getElementById('pnl_itemlist-tbl_itemlist');

let dgv;



export async function init(opt) {
	// console.log('itemlist loaded');

	dgv = $pos.component.DataGrid(tbl_itemlist);

	btn_back.addEventListener('click', (evt)=>{
		window.$pages.getPage('pnl_entry').Show();
	});
}

export async function receiveKeydownEvent(evt) {
	if (evt.key=='ArrowUp') {
		dgv.ArrowUp();
	} else if (evt.key=='ArrowDown') {
		dgv.ArrowDown();
	} else if (evt.key=='Enter') {
		var rowdata = dgv.getCurrentRowData();
		SelectRow(rowdata);
	} else if (evt.key=='Escape') {
	 	window.$pages.getPage('pnl_entry').Show();
	} 
}

export function clear() {
	dgv.clear();
}

export function filldata(data) {
	for (var row of data) {
		var descr = `
			<div><b>${row.itemstock_id}</b> ${row.itemstock_code}</div>
			<div style="padding-left: 10px"><i>${row.itemstock_name}</i></div>
		`;

		let options = {
			rowdata: row,
			onclick: (rowdata) => {
				SelectRow(rowdata);
			}
		}

		dgv.add([
			{class:'description', value: descr},
			{class:'valuecolumn', value: Number(row.currentsellprice), onrender: (value) => { return render_price(value) }},
			{class:'lastcolumn', value: '&nbsp;'},
		], options);
	}
}

function SelectRow(rowdata) {
	window.$pages.getPage('pnl_entry').handler.addItem(rowdata);
	window.$pages.getPage('pnl_entry').Show();
}

function render_price(value) {
	return Number(value).toLocaleString('en-US')
}