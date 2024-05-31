import * as utilities from '/index.php/asset/retail/pos/posmain/utilities.mjs';
import * as base from './promolib-base.mjs'


const GROUP_BY_ITEM = 'G1';
const GROUP_BY_TAG = 'G2';
let self = {}


export async function loadData(id) {
	return await base.loadData(id);
}

export function apply(dgv, promo) {
	console.log('apply payment percent');

	var basket;
	if (promo.data.itemA.progrouping_id==GROUP_BY_ITEM) {
		// basket = match_basket_byitem(dgv, promo);
		var basket = match_basket(dgv, promo, (itemstock_id, tag)=>{ return  itemstock_id});
	}  else if (promo.data.itemA.progrouping_id==GROUP_BY_TAG) {
		// basket = match_basket_bytag(dgv, promo);
		var basket = match_basket(dgv, promo, (itemstock_id, tag)=>{ return  tag});
	} else {
		// basket = match_basket_all(dgv, promo);
		var basket = match_basket(dgv, promo, (itemstock_id, tag)=>{ return  'all'});
	}

	return {
		applied: basket.applied
	};
}



function match_basket(dgv, promo, fn_match) {

	var ItemMatchs = {};
	var itemA = promo.data.itemA;
	var promoItems = itemA.items;
	var includeAllItems = itemA.items.length == 0;

	//  8809572818592
	var applied = false;
	var totalQty = 0;
	var totalValueOri = 0;
	for (var rowid in dgv.DATA) {
		var basketrow = dgv.DATA[rowid];

		var itemstock_id = basketrow.item.itemstock_id;
		var excludeCalculation = basketrow.item.exclude_calculation===true;
		
		var item_is_match;
		if (includeAllItems) {
			item_is_match = true;
		} else {
			item_is_match = promoItems.hasOwnProperty(itemstock_id);
		}

		if (item_is_match) {
			// baris item ini ada di daftar promo 
			applied = true;

			// tandai sebagai promo
			var tag = includeAllItems ? 'all' : (promoItems[itemstock_id].itemstock_tag ?? 'all');
			var gr = fn_match(itemstock_id, tag);
			if (!ItemMatchs.hasOwnProperty(gr)) {
				ItemMatchs[gr] = {
					basketrow: [],
					subtotalQty: 0,
					subtotalValue: 0,
					subtotalValueOri : 0,
					promovalue: {}
				}
			}

			ItemMatchs[gr].basketrow.push(basketrow);
			ItemMatchs[gr].subtotalQty += parseInt(basketrow.qty);
			ItemMatchs[gr].subtotalValue += parseFloat(basketrow.subtotal);
			ItemMatchs[gr].subtotalValueOri += parseFloat(basketrow.subtotal_ori);
		}

		if (!excludeCalculation) {
			totalQty += parseInt(basketrow.qty);
			totalValueOri += parseFloat(basketrow.subtotal_ori);
		}

	}

	// cek apakah valid untuk diberikan promo
	if (totalValueOri>=promo.data.valuethreshold && totalQty>=promo.data.qtythreshold) {
		for (var gr in ItemMatchs) {
			var match = ItemMatchs[gr];
			
			for (var matchrow of match.basketrow) {
				var rowdata = dgv.DATA[matchrow.id];
				var basketrow = {
					id: matchrow.id,
					rowdata: rowdata,
					promovalue: {
						disc: promo.data.itemA.disc,
						discval: (promo.data.itemA.disc/100) * rowdata.subtotal_min_paymdiscval1
					}
				}

				if (match.subtotalQty>=itemA.qtythreshold && match.subtotalValueOri>=itemA.valuethreshold) {
					doPromo_Simple(promo, dgv, basketrow);
				} else {
					resetrow(dgv, basketrow);
				}
			}
		}
	} else {
		// Reset Matched Rows
		for (var gr in ItemMatchs) {
			var match = ItemMatchs[gr];
			for (var matchrow of match.basketrow) {
				var rowdata = dgv.DATA[matchrow.id];
				var basketrow = {
					id: matchrow.id,
					rowdata: rowdata
				}
				resetrow(dgv, basketrow);
			}
		}
	}

	return {
		applied: applied,
		ItemMatchs: ItemMatchs,
		totalQty: totalQty,
		totalValue: totalValueOri
	}
}


function doPromo_Simple(promo, dgv, basketrow) {
	var rowdata = basketrow.rowdata;
	var tr = document.getElementById(basketrow.id);

	rowdata.subt_paymdiscval2 = basketrow.promovalue.discval;
	rowdata.item.B3_proprog_id = promo.id;
	
	rowcalculate(dgv, rowdata);
	dgv.updateView(tr, (td)=>{
		if (td.classList.contains('valuecolumn')) {
			td.setValue(rowdata.subtotal, utilities.format_price(rowdata.subtotal) );
		}
	});
}

function rowcalculate(dgv, row) {
	dgv.recalculaterow(row);
}

function resetrow(dgv, basketrow) {
	base.resetrow(dgv, basketrow, (rowdata)=>{
		rowdata.item.B3_proprog_id = "";
		rowdata.subt_paymdiscval2 = 0;
		rowcalculate(dgv, rowdata); 
	});
}