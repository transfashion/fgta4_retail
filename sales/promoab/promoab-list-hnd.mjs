let grd_list, opt;
var this_page_id;
var this_page_options;

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	

	
	fn_callback();
}

	

export function grd_list_rowrender(row) {




	if (row.mapping=='promoab_icon_sta') {

		var color = 'white';
		if (row.record.promoab_iscommit==1) {
			if (row.record.promoab_status=='expired') {
				// commit and expired: grey
				color = 'grey';
			} else if (row.record.promoab_status=='pending') {
				// commit and not yet started: yellow
				color = 'yellow';
			} else {
				// commit and started: green
				color = 'green';
			}
		} else {
			// not yet commit: red
			color = 'red';
		}

		row.td.innerHTML = `<div class="circle" style="background-color: ${color}"></div>`

	}

}