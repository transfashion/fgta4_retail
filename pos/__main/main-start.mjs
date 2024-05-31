const btn_entry = $('#pnl_entry-btn_entry');



export async function init(opt) {
	btn_entry.linkbutton({
		onClick: () => { btn_entry_click() }
	})
}

export async function showed() {
	parent.$ui.setTitle('POS');
}

export async function handle_keyboard_keydown(ev) {
	// console.log('keypress at Start')

}




function btn_entry_click() {
	var page_to_show = 'pnl_entry';
	var fn_iframe_showed = $ui.getPages(). ITEMS[page_to_show].handler.showed;			
	$ui.getPages().show(page_to_show, ()=>{
		fn_iframe_showed();
	});


	// $ui.getPages().show('pnl_entry', () => {
	// 	console.log('pnl_entry showed');
	// 	$('#pnl_entry-txt_lineinput').textbox('textbox').focus();
	// })	
}