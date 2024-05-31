// import * as utilities from './utilities.mjs';
import * as pEntry from './posmain-entry.mjs';
import * as pPayment from './posmain-payment.mjs';
import * as pItemList from './posmain-itemlist.mjs';
import * as pMember from './posmain-member.mjs';
import * as pPromo from './posmain-promo.mjs';
import * as pStaff from './posmain-staff.mjs';
import * as pEvent from './posmain-event.mjs';
import * as pTable from './posmain-table.mjs';
import * as pRecall from './posmain-recall.mjs';

import * as tx from './transaction.mjs';

let DB;

export async function init(opt) {
	// console.log('posmain loaded');	

	
	var licensevalue = window.localStorage.getItem('licensevalue');
	if (licensevalue!=null) {
		window.LICENSEDATA = window.parseLicenseData(licensevalue);
	} else {
		window.LICENSEDATA = null;
	}



	tx.init();
	opt.getTx = () => {
		return tx;
	}

	window.$pages = await $pos.component.initPages(opt, {
		pnl_entry: {
			element: document.getElementById('pnl_entry'),
			handler: pEntry,
			use_await: true,
		},
		pnl_payment: {
			element: document.getElementById('pnl_payment'),
			handler: pPayment
		},
		pnl_itemlist: {
			element: document.getElementById('pnl_itemlist'),
			handler: pItemList
		},
		pnl_member: {
			element: document.getElementById('pnl_member'),
			handler: pMember
		},
		pnl_promo: {
			element: document.getElementById('pnl_promo'),
			handler: pPromo
		},
		pnl_staff: {
			element: document.getElementById('pnl_staff'),
			handler: pStaff
		},
		pnl_event: {
			element: document.getElementById('pnl_event'),
			handler: pEvent
		},
		pnl_table: {
			element: document.getElementById('pnl_table'),
			handler: pTable
		},
		pnl_recall: {
			element: document.getElementById('pnl_recall'),
			handler: pRecall
		}					
	});


	// Load Promo
	window.$pages.getPage('pnl_promo').handler.loadTodayPromo(window.LICENSEDATA.site_id);


	
	window.handledKey = window.parent.handledKey;
	var body = document.getElementsByTagName('body')[0];

	body.style.backgroundColor = '#fff';
	body.addEventListener('keydown', (evt)=>{
		receiveKeydownEvent(evt);
		if (window.handledKey.includes(evt.key)) {
			evt.preventDefault();
		}
	});


	window.receiveKeydownEvent = (evt) => {
		receiveKeydownEvent(evt);
	}

}

async function receiveKeydownEvent(evt) {
	var page = window.$pages.getActivePage();
	if (typeof page.handler.receiveKeydownEvent === 'function') {
		page.handler.receiveKeydownEvent(evt);
	}
}