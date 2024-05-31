const btn_back = document.getElementById('pnl_event-btn_back');


export async function init(opt) {

	btn_back.addEventListener('click', (evt)=>{
		btn_back_click();
	});
}

export async function receiveKeydownEvent(evt) {
	if (evt.key=='Escape') {
		btn_back_click();
	}	
}


function btn_back_click() {
	window.$pages.getPage('pnl_entry').Show();	
}