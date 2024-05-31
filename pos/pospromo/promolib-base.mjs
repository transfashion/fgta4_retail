import * as utilities from '/index.php/asset/retail/pos/posmain/utilities.mjs';


export async function loadData(id) {
	var endpoint = 'retail/pos/pospromo/getpromodata';
	var params = {
		proprog_id : id
	}

	var options = {
		OnJsonParseError: (err, result) => {
			console.error(err);
			console.log(result);
		},
		OnContentOutput: (output) => {
			console.log(output)
		}
	}

	try {
		var result = await $pos.api.call(endpoint, params, options);
		var datarespond = result.datarespond;
		
		return datarespond;
	} catch (err) {
		$pos.component.alert({title:'Error', text:err.message});
	} finally {
		//searching = false;
	}
}


export function resetrow(dgv, basketrow, fn_reset) {
	var rowdata = basketrow.rowdata;
	var tr = document.getElementById(basketrow.id);

	rowdata.item.currentsellprice = rowdata.item.itemstock_sellprice;
	rowdata.subtotal = rowdata.qty * rowdata.item.currentsellprice;

	if (typeof fn_reset == 'function') {
		fn_reset(rowdata);
	}

	dgv.updateView(tr, (td)=>{
		if (td.classList.contains('description')) {
			var prinfo = td.getElementsByClassName('pnl_entry-dgvrow-promo')[0];
			prinfo.innerHTML = '';
		} else if (td.classList.contains('valuecolumn')) {
			td.setValue(rowdata.subtotal, utilities.format_price(rowdata.subtotal) );
		}
	});
}



export function clearPromo(block, dgv, fn_clearing) {
	for (var trid in dgv.DATA) {
		var rowdata = dgv.DATA[trid];
		var tr = document.getElementById(trid);
		if (block=='B1') {
			rowdata.item.B1_proprog_id = "";
			rowdata.item.itemstock_disc = rowdata.item.itemstock_disc_ori;
			rowdata.item.itemstock_discval = rowdata.item.itemstock_discval_ori;
			rowdata.item.currentsellprice = rowdata.item.itemstock_sellprice;
			rowdata.item.itemstock_adddisc1 = 0;
			rowdata.item.itemstock_adddisc2 = 0;
			delete rowdata.item.promolineinfo;
			delete rowdata.item.proprog_id;
			delete rowdata.item.proprog_rowlabel;
		} else if (block=='B2') {
			rowdata.item.B2_proprog_id = "";
			rowdata.subt_paymdiscval1 = 0;
		} else if (block=='B3') {
			rowdata.item.B3_proprog_id = "";
			rowdata.subt_paymdiscval2 = 0;
		}

		fn_clearing(tr, rowdata);
	}
}





/*
export function resetpromo_b1(dgv, fn_dgvmodified) {
	for (var trid in dgv.DATA) {
		var basketrow = {
			id: trid,
			rowdata: dgv.DATA[trid]
		}
		resetpromo_b1_row(dgv, basketrow);
		if (typeof fn_dgvmodified === 'function') {
			fn_dgvmodified(basketrow);
		}
	}
}

export function resetpromo_b1_row(dgv, basketrow) {
	resetrow(dgv, basketrow, (rowdata)=>{
		rowdata.item.B1_proprog_id = "";
		delete rowdata.item.promolineinfo;
		delete rowdata.item.proprog_id;
		delete rowdata.item.proprog_rowlabel;
	});
}



export function resetpromo_b2(dgv) {

}

export function resetpromo_b3(dgv) {

}
*/