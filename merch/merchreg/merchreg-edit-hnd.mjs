let editor, form, obj, opt;

const btn_generate = $('#pnl_edit-btn_generate');


export function init(ed) {
	editor = ed;
	form = editor.form;
	obj = editor.obj;
	opt = editor.opt;

	btn_generate.linkbutton({ onClick: () => { btn_generate_click() } })

}

function btn_generate_click() {
	
}	
	