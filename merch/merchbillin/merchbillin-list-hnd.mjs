let grd_list, opt;
var this_page_id;
var this_page_options;

const buttons = {
	new: {visible: false, comp: $('#pnl_list-btn_new')},
}

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	console.log('ff');
	// inisiasi berdasar variance
	if (opt.variancename=='entry') {
		buttons.new.visible = true;
	} else if (opt.variancename=='proforma') {
		buttons.new.visible = true;
	} else if (opt.variancename=='post') {
	}

	// show/hide button
	for (var btnname in buttons) {
		if (buttons[btnname].visible) {
			buttons[btnname].comp.show();
		} else {
			buttons[btnname].comp.hide();
		}
	}


	fn_callback();
}

	