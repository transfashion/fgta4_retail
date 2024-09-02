var this_page_id;

const btn_calculate = $('#pnl_editbill-btn_calculate');
const btn_execute = $('#pnl_editbill-btn_execute');

let header_data;

export async function init(opt) {
	this_page_id = opt.id
	

	btn_calculate.linkbutton({
		onClick: () => { btn_calculate_click() }
	});

	btn_execute.linkbutton({
		onClick: () => { btn_execute_click() }
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


export function OnSizeRecalculated(width, height) {
}



export async function OpenDetil(data) {
	header_data = data;

	try {
		// ambil data summary exixting
		var apiurl = `${global.modulefullname}/xtion-billgetinfo`
		var args = {id: header_data.merchship_id, options: {}}
		var result = await $ui.apicall(apiurl, args);

		var content = '';


		// RV Data
		content += `<table>`;
		content += `<tr>`;
		content += `	
			<td class="billheader">RV</td>
			<td class="billheader">Ref</td>
			<td class="billheader">Model</td>
			<td class="billheader billvalue">PL</td>
			<td class="billheader billvalue">RV</td>
			<td class="billheader billvalue">Value</td>
			<td class="billheader billvalue">IDR</td>
			<td class="billheader billvalue">ShipmentCost</td>
			<td class="billheader billvalue">LandedCost</td>
			<td class="billheader billvalue">Markup</td>
			<td class="billheader billvalue">DPP</td>
			<td class="billheader billvalue">PPN</td>
			<td class="billheader billvalue">Billed</td>
		`;
		content += `</tr>`;

		var total_qtyinit = 0;
		var total_qty = 0;
		var total_addcostidr = 0;
		var total_billidr = 0;
		var total_billppn = 0;
		var total_billdpp = 0;
		var total_landedcostidr = 0;
		var total_markupidr = 0;
		var total_valuefrg = 0;
		var total_valueidr = 0;
		for (var row of result.data.receive) {
			var qtyinit = parseInt(row.qtyinit);
			var qty = parseInt(row.qty);
			var addcostidr = parseFloat(row.addcostidr);
			var billidr = parseFloat(row.billidr);
			var billppn = parseFloat(row.billppn);
			var billdpp = parseFloat(row.billdpp);
			var landedcostidr = parseFloat(row.landedcostidr);
			var markupidr = parseFloat(row.markupidr);
			var valuefrg = parseFloat(row.valuefrg);
			var valueidr = parseFloat(row.valueidr);
			

			total_qtyinit += qtyinit;
			total_qty += qty;
			total_addcostidr += addcostidr;
			total_billidr += billidr;
			total_billppn += billppn;
			total_billdpp += billdpp;
			total_landedcostidr += landedcostidr;
			total_markupidr += markupidr;
			total_valuefrg += valuefrg;
			total_valueidr += valueidr;

			content += `<tr>`;
			content += `
				<td class="billrow">${row.merchrv_id}</td>
				<td class="billrow">${row.merchrv_ref}</td>
				<td class="billrow">${row.itemmodel_name}</td>
				<td class="billrow billvalue">${qtyinit.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${qty.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${valuefrg.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${valueidr.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${addcostidr.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${landedcostidr.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${markupidr.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${billdpp.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${billppn.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${billidr.toLocaleString('en-US')}</td>

			`;
			content += `</tr>`;
		}

		content += `<tr>`;
		content += `
			<td class="billfooter">&nbsp;</td>
			<td class="billfooter">&nbsp;</td>
			<td class="billfooter">&nbsp;</td>
			<td class="billfooter billvalue">${total_qtyinit.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_qty.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_valuefrg.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_valueidr.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_addcostidr.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_landedcostidr.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_markupidr.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_billdpp.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_billppn.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_billidr.toLocaleString('en-US')}</td>
		`;
		content += `</tr>`;
		content += `</table>`
		$('#pnl_editbill-currentcalculation').html(content);
	


		// Shipment Data
		content = `<table>`;
		content += `<tr>`;
		content += `	
			<td class="billheader">ID</td>
			<td class="billheader">Shipment Cost Budget</td>
			<td class="billheader billvalue">Include</td>
			<td class="billheader billvalue">Exclude</td>
		`;
		content += `</tr>`;
		var total_include = 0;
		var total_exclude = 0;
		for (var row of result.data.shipcost) {
			var merchshipbudgetacc_id = row.merchshipbudgetacc_id;
			var merchshipbudgetacc_name = row.merchshipbudgetacc_name;
			var include = parseFloat(row.shipcostidr);
			var exclude = parseFloat(row.excluded);
			content += `<tr>`;
			content += `
				<td class="billrow">${merchshipbudgetacc_id}</td>
				<td class="billrow">${merchshipbudgetacc_name}</td>
				<td class="billrow billvalue">${include.toLocaleString('en-US')}</td>
				<td class="billrow billvalue">${exclude.toLocaleString('en-US')}</td>
			`;
			content += `</tr>`;
			total_include += include;
			total_exclude += exclude;
		}
		content += `<tr>`;
		content += `
			<td class="billfooter">&nbsp;</td>
			<td class="billfooter">TOTAL</td>
			<td class="billfooter billvalue">${total_include.toLocaleString('en-US')}</td>
			<td class="billfooter billvalue">${total_exclude.toLocaleString('en-US')}</td>
		`;
		content += `</tr>`;
		content += `</table>`
		$('#pnl_editbill-shipmentdata').html(content);






		// salesorder
		content = '';
		content += `<div style="font-weight: bold">Sales Order</div>`; 
		if (result.data.salesorder!=null) {
			content += `<div>${result.data.salesorder.salesorder_id}</div>`; 
		} else {
			content += `<div>-</div>`; 
		}
		$('#pnl_editbill-salesorder').html(content);


		// delivery
		content = '';
		content += `<div style="font-weight: bold">Delivery</div>`; 
		if (result.data.delivery!=null) {
			content += `<div>${result.data.delivery.delivery_id}</div>`; 
		} else {
			content += `<div>-</div>`; 
		}
		$('#pnl_editbill-delivery').html(content);


		// Invoice
		content = '';
		content += `<div style="font-weight: bold">Invoice</div>`; 
		if (result.data.invoice!=null) {
			content += `<div>${result.data.invoice.invoice_id}</div>`; 
		} else {
			content += `<div>-</div>`; 
		}
		$('#pnl_editbill-invoice').html(content);


		// salesjurnal
		content = '';
		content += `<div style="font-weight: bold">Jurnal Sales</div>`; 
		if (result.data.salesjurnal!=null) {
			content += `<div>${result.data.salesjurnal.jurnal_id}</div>`; 
		} else {
			content += `<div>-</div>`; 
		}
		$('#pnl_editbill-salesjurnal').html(content);



	} catch (err) {
		console.error(err);
	}
}


async function btn_calculate_click() {
	try {
		var apiurl = `${global.modulefullname}/xtion-billcalculate`
		var args = {id: header_data.merchship_id, options: {}}
		var result = await $ui.apicall(apiurl, args);

		console.log(result);
		if (result.success) {
			$ui.ShowMessage('[INFO]Shipment calculated.');
		} else {
			var msg = '[ERROR]kalkulasi gagal';
			if (result.message!=null) {
				msg += result.message;
			}

			$ui.ShowMessage(msg);
		}

		await OpenDetil(header_data);
	} catch (err) {
		$ui.ShowMessage('[ERROR]kalkulasi gagal');
		console.error(err);
	}
}


async function btn_execute_click() {
	try {

		$ui.ShowMessage('[QUESTION]Anda akan eksekusi data shipment ?', {
			Ok: () => {
				executeShipment();
			},

			Cancel: () => {

			}
		});




	} catch (err) {
		console.error(err);
	}
}


async function executeShipment() {
	var apiurl = `${global.modulefullname}/xtion-billexecute`
	var args = {id: header_data.merchship_id, options: {}}
	var result = await $ui.apicall(apiurl, args);

	console.log(result);

	if (result.success) {
		OpenDetil(header_data);
		$ui.ShowMessage('[INFO]Data shipment telah di exekusi');
	} else {
		$ui.ShowMessage('[ERROR]eksekusi gagal');
	}
}