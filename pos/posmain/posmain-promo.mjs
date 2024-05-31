const btn_back = document.getElementById('pnl_promo-btn_back');
const btn_resetb1 = document.getElementById('pnl_promo-btn_resetb1');
const btn_resetb2 = document.getElementById('pnl_promo-btn_resetb2');
const btn_resetb3 = document.getElementById('pnl_promo-btn_resetb3');



const pnl_promoblockitem = document.getElementById('pnl_promo-block-item');
const pnl_promoblocksubtotal = document.getElementById('pnl_promo-block-subtotal');
const pnl_promoblocktotal = document.getElementById('pnl_promo-block-total');

const promostatus = {
	'B1' : document.getElementById('pnl_promo-txt_promoactive_b1'),
	'B2' : document.getElementById('pnl_promo-txt_promoactive_b2'),
	'B3' : document.getElementById('pnl_promo-txt_promoactive_b3'),
} 


const RULES = {};
const PROMOS = {};


export async function init(opt) {

	btn_back.addEventListener('click', (evt)=>{
		btn_back_click();
	});

	btn_resetb1.addEventListener('click', (evt)=>{
		btn_reset_click(evt, 'B1');
	});

	btn_resetb2.addEventListener('click', (evt)=>{
		btn_reset_click(evt, 'B2');
	});

	btn_resetb3.addEventListener('click', (evt)=>{
		btn_reset_click(evt, 'B3');
	});

}

export async function receiveKeydownEvent(evt) {
	if (evt.key=='Escape') {
		btn_back_click();
	}	
}


export async function loadTodayPromo(site_id) {
	var endpoint = 'retail/pos/pospromo/gettodaypromo';
	var params = {
		site_id : site_id
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
		
		for (let p of datarespond) {

			PROMOS[p.proprog_id] = {
				id: p.proprog_id,
				display: p.proprog_display,
				description: p.proprog_descr,
				block: p.problock_id,
				rule: p.prorule_id,
				libname: p.prorule_lib,
				fnname:  p.prorule_fn,
			}

			if (p.problock_id=='B1') {
				addPromoButton(PROMOS[p.proprog_id], pnl_promoblockitem);
			} else if (p.problock_id=='B2') {
				addPromoButton(PROMOS[p.proprog_id], pnl_promoblocksubtotal);
			} else if (p.problock_id=='B3') {
				addPromoButton(PROMOS[p.proprog_id], pnl_promoblocktotal);
			}

		}

		window.$pages.getPage('pnl_entry').handler.initPromo(PROMOS, async (promo)=>{
			await loadPromo(promo, false);
		});

	} catch (err) {
		console.error(err);
		$pos.component.alert(err.message);
	} finally {
		//searching = false;
	}
}

export function getRule(prorule_id) {
	return RULES[prorule_id];
}

export function attachPromo_B1() {
	if (pnl_promoblockitem.defaultButton!=null) {
		var btn = pnl_promoblockitem.defaultButton;
		loadPromo(btn.promo, false);
	}
}

export function attachPromo_B2() {
	if (pnl_promoblocksubtotal.defaultButton!=null) {
		var btn = pnl_promoblocksubtotal.defaultButton;
		loadPromo(btn.promo, false);
	}
}

export function attachPromo_B3() {
	if (pnl_promoblocktotal.defaultButton!=null) {
		var btn = pnl_promoblocktotal.defaultButton;
		loadPromo(btn.promo, false);
	}
}


async function btn_back_click() {
	window.$pages.getPage('pnl_entry').Show();	
}

async function btn_reset_click(evt, block) {
	promostatus[block].innerHTML = 'not set';
	window.$pages.getPage('pnl_entry').handler.setPromo(block, null);
}



async function loadPromo(promo, masking=true) {
	promostatus[promo.block].innerHTML = promo.display;

	var mask;
	if (masking) {
		mask = $pos.component.mask('loading promo');
	}

	try {
		if (!RULES.hasOwnProperty(promo.rule)){
			RULES[promo.rule] = await import(promo.libname);
		}
		if (PROMOS[promo.id].data===undefined) {
			PROMOS[promo.id].data = await RULES[promo.rule].loadData(promo.id);
		}

		window.$pages.getPage('pnl_entry').handler.setPromo(promo.block, PROMOS[promo.id]);

	} catch (err) {
		console.error(err);	
		$pos.component.alert({title:'Error', text:err.message});
	} finally {
		if (mask!=null) {
			mask.remove();
		}
	}
}

function addPromoButton(promo, panel) {
		let btn = document.createElement('button');
		btn.classList.add('waves-effect');
		btn.classList.add('waves-light');
		btn.classList.add('btn');
		btn.promo = promo;
		btn.innerHTML = promo.display
		btn.addEventListener('click', async (evt)=>{
			loadPromo(promo)
		});
		panel.appendChild(btn);

		if (panel.defaultButton==null) {
			panel.defaultButton = btn;
		}
}

