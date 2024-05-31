export function handle_home(ev) {
	console.log('home');

}

export function handle_back(ev) {
	var current_page_id = $ui.getPages().getCurrentPage();
	if (ev==null) {	ev = {detail:{cancel:true}} }


	var fn_iframe_showed = null;
	ev.detail.cancel = true;
	switch (current_page_id) {
		case 'pnl_entry' :
			var page_to_show = 'pnl_start';
			var fn_iframe_showed = $ui.getPages(). ITEMS[page_to_show].handler.showed;
			$ui.getPages().show('pnl_start', ()=>{
				parent.$ui.iframe_focus(()=>{
					fn_iframe_showed();
				});
			});
			break;

		case 'pnl_payment' :
			var page_to_show = 'pnl_entry';
			var fn_iframe_showed = $ui.getPages(). ITEMS[page_to_show].handler.showed;			
			$ui.getPages().show(page_to_show, ()=>{
				parent.$ui.iframe_focus(()=>{
					fn_iframe_showed();
				});
			});
			break;

		default :
			ev.detail.cancel = false;
	}


}