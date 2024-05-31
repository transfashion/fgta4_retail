import * as utilities from '/index.php/asset/retail/pos/posmain/utilities.mjs';
import * as base from './promolib-base.mjs'

const GROUP_BY_ITEM = 'G1';
const GROUP_BY_TAG = 'G2';
let self = {}

export async function init(opt) {
	self.options = opt;
}

export async function loadData(id) {
	return await base.loadData(id);
}

export function apply(dgv, promo) {
	// kalau waktunya gak cocok, return
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

	//  8809572818592
	var applied = false;
	var totalQty = 0;
	var totalValueOri = 0;
	for (var rowid in dgv.DATA) {
		var basketrow = dgv.DATA[rowid];

		var itemstock_id = basketrow.item.itemstock_id;
		var excludeCalculation = basketrow.item.exclude_calculation===true;
		
		
		if (promoItems.hasOwnProperty(itemstock_id)) {
			// baris item ini ada di daftar promo 
			applied = true;

			// tandai sebagai promo
			var tag = promoItems[itemstock_id].itemstock_tag ?? 'all';
			var gr = fn_match(itemstock_id, tag);
			if (!ItemMatchs.hasOwnProperty(gr)) {
				var promo_sellprice = promoItems[itemstock_id].itemstock_sellprice;
				var promo_discval = promoItems[itemstock_id].itemstock_discval;
				var promo_disc = promoItems[itemstock_id].itemstock_disc;

				ItemMatchs[gr] = {
					basketrow: [],
					subtotalQty: 0,
					subtotalValue: 0,
					subtotalValueOri : 0,
					promovalue: {
						sellprice: promo_sellprice > 0 ? promo_sellprice : itemA.sellprice,
						discval: promo_discval > 0 ? promo_discval : itemA.discval,
						disc: promo_disc  > 0 ? promo_disc : itemA.disc
					}
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
					promovalue: match.promovalue
				}

				if (match.subtotalQty>=itemA.qtythreshold && match.subtotalValueOri>=itemA.valuethreshold) {
					if (itemA.prostep_id=='T3') {
						doPromo_Stack(promo, dgv, basketrow);
					} else if (itemA.prostep_id=='T2') {
						doPromo_Step(promo, dgv, basketrow);
					} else {
						doPromo_Simple(promo, dgv, basketrow);
					}
				} else {
					resetrow(dgv, basketrow);
				}
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

function resetrow(dgv, basketrow) {
	base.resetrow(dgv, basketrow, (rowdata)=>{
		rowdata.item.B1_proprog_id = "";
		rowdata.item.currentsellprice = rowdata.item.itemstock_sellprice;

		delete rowdata.item.promolineinfo;
		delete rowdata.item.proprog_id;
		delete rowdata.item.proprog_rowlabel;

		rowcalculate(dgv, rowdata);
	});
}



function doPromo_Simple(promo, dgv, basketrow) {
	var rowdata = basketrow.rowdata;
	var tr = document.getElementById(basketrow.id);

	// update harga price promo
	rowdata.item.currentsellprice = basketrow.promovalue.sellprice;
	rowdata.item.promolineinfo = `Promo: ${promo.display} (${promo.id})`;
	rowdata.item.B1_proprog_id = promo.id;
	rowdata.item.proprog_rowlabel = promo.data.itemA.label;
	rowcalculate(dgv, rowdata);

	dgv.updateView(tr, (td)=>{
		if (td.classList.contains('description')) {
			var prinfo = td.getElementsByClassName('pnl_entry-dgvrow-promo')[0];
			prinfo.innerHTML = rowdata.item.promolineinfo;
		} else if (td.classList.contains('valuecolumn')) {
			td.setValue(rowdata.subtotal, utilities.format_price(rowdata.subtotal) );
		}
	});

}

function doPromo_Step(promo, dgv, basketrow) {
	
}

function doPromo_Stack(promo, dgv, basketrow) {

}

function rowcalculate(dgv, row) {
	row.subtotal = row.qty * row.item.currentsellprice;
	dgv.recalculaterow(row);
}
