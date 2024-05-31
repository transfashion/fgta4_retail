import * as pMain from './guestbook-main.mjs';
// import * as pDisplay from './guestbook-display.mjs';



export async function init(opt) {
	window.$pages = await $pos.component.initPages(opt, {
		pnl_main: {
			element: document.getElementById('pnl_main'),
			handler: pMain
		},
		// pnl_display: {
		// 	element: document.getElementById('pnl_display'),
		// 	handler: pDisplay
		// }		
	});



	window.handledKey = window.parent.handledKey;
	var body = document.getElementsByTagName('body')[0];
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