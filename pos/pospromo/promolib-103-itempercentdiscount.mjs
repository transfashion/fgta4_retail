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
	console.log('apply additional percent discount');

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
				var promo_disc1;
				var promo_disc2;
				if (promoItems.hasOwnProperty(itemstock_id)) {
					promo_disc1 = itemA.disc;
					promo_disc2 = promoItems[itemstock_id].itemstock_disc;
				} else {
					promo_disc1 = itemA.disc;
					promo_disc2 = 0;
				}

				ItemMatchs[gr] = {
					basketrow: [],
					subtotalQty: 0,
					subtotalValue: 0,
					subtotalValueOri : 0,
					promovalue: {
						promo_disc1: promo_disc1,
						promo_disc2: promo_disc2
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
		
		rowdata.item.itemstock_disc = rowdata.item.itemstock_disc_ori;
		rowdata.item.itemstock_discval = rowdata.item.itemstock_discval_ori;
		rowdata.item.currentsellprice = rowdata.item.itemstock_sellprice;
		rowdata.item.itemstock_adddisc1 = 0;
		rowdata.item.itemstock_adddisc2 = 0;

		delete rowdata.item.promolineinfo;
		delete rowdata.item.proprog_id;
		delete rowdata.item.proprog_rowlabel;

		rowcalculate(dgv, rowdata);
	});
}



function doPromo_Simple(promo, dgv, basketrow) {
	var itemA = promo.data.itemA;
	var rowdata = basketrow.rowdata;
	var tr = document.getElementById(basketrow.id);

	console.log('promo simple');

	// update harga price promo
	// rowdata.item.currentsellprice = itung lagi based on discount
	var gross = rowdata.item.itemstock_grossprice;
	var disc =rowdata.item.itemstock_disc;
	var discval = rowdata.item.itemstock_discval;
	var adddisc1 = 0;
	var adddisc2 = 0;
	var currentsellprice = rowdata.item.itemstock_sellprice;
	if (itemA.prospot_id=='D1') {
		disc = basketrow.promovalue.promo_disc2 > 0 ? basketrow.promovalue.promo_disc2 : basketrow.promovalue.promo_disc1;
		discval = (disc/100)*gross;
		adddisc1 = 0;
		adddisc2 = 0;
		currentsellprice = 	gross - discval;
	} else if (itemA.prospot_id='D2') {
		adddisc1 = basketrow.promovalue.promo_disc2 > 0 ? basketrow.promovalue.promo_disc2 : basketrow.promovalue.promo_disc1;
		adddisc2 = 0;
	} else if (itemA.prospot_id='D3') {
		adddisc1 = basketrow.promovalue.promo_disc1;
		adddisc2 = basketrow.promovalue.promo_disc2;
	}
	
	var adddisc1val = (adddisc1/100) *  currentsellprice;
	var currentsellprice = currentsellprice - adddisc1val;

	var adddisc2val = (adddisc2/100) *  currentsellprice;
	var currentsellprice = currentsellprice - adddisc2val;

	rowdata.item.disc = disc;
	rowdata.item.discval = discval;
	rowdata.item.itemstock_adddisc1 = adddisc1;
	rowdata.item.itemstock_adddisc2 = adddisc2;
	rowdata.item.currentsellprice = currentsellprice;
	rowdata.item.promolineinfo = `Promo: ${promo.display} [${disc}%+${adddisc1}%+${adddisc2}%] (${promo.id})`;
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
