let editor, form, obj, opt;

/*
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');
const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
const btn_post = $('#pnl_edit-btn_post');
*/

const buttons = {
	edit: {visible: false, comp: $('#pnl_edit-btn_edit')},
	save: {visible: false, comp: $('#pnl_edit-btn_save')},
	delete: {visible: false, comp: $('#pnl_edit-btn_delete')},
	print: {visible: false, comp: $('#pnl_edit-btn_print')},
	commit: {visible: false, comp: $('#pnl_edit-btn_commit')},
	uncommit: {visible: false, comp: $('#pnl_edit-btn_uncommit')},
	post: {visible: false, comp: $('#pnl_edit-btn_post')},
}


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;


	// inisiasi berdasar variance
	if (opt.variancename=='entry') {
		buttons.edit.visible = true;
		buttons.save.visible = true;
		buttons.delete.visible = true;
		buttons.print.visible = true;
		buttons.commit.visible = true;
	} else if (opt.variancename=='proforma') {
		buttons.edit.visible = true;
		buttons.save.visible = true;
		buttons.delete.visible = true;
		buttons.print.visible = true;
		buttons.commit.visible = true;
	} else if (opt.variancename=='post') {
		buttons.post.visible = true;
	}
	

	// show/hide button
	for (var btnname in buttons) {
		if (buttons[btnname].visible) {
			buttons[btnname].comp.show();
		} else {
			buttons[btnname].comp.hide();
		}
	}
}

export function form_newdata(data, options) {

	if (opt.variancename=='proforma') {
		data.merchbillin_isproforma = '1';
	}

	options.OnNewData = () => {
	}		
}	
	