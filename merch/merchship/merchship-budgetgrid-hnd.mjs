let grd_list, opt;
var this_page_id;
var this_page_options;


const obj_pastebox = $('#pnl_editbudgetgrid-obj_pastebox');


export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;	


	obj_pastebox[0].addEventListener('paste', (e) => {
		var clipboardData = e.clipboardData || window.clipboardData;
		var pastedData = clipboardData.getData('Text');
		obj_pastebox[0].blur();
		$ui.ShowMessage("[QUESTION]Apakah anda yakin akan <b>upload</b> data ?", {
			"OK": async () => {
				// obj_pastebox.hide();
				obj_pastebox[0].classList.add('pastebox-processing');
				obj_pastebox.html('Processing Data ...');
				obj_pastebox.prop('contenteditable', false);
				obj_pastebox_paste(pastedData, (err)=>{
					obj_pastebox[0].classList.remove('pastebox-processing');
					obj_pastebox.prop('contenteditable', true);
					obj_pastebox.html('');
					obj_pastebox.show();

					if (err) {
						$ui.ShowMessage("[ERROR]"+err.message);
					} else {
						var header_data = grd_list.getHeaderData();
						$ui.getPages().ITEMS['pnl_editbudgetgrid'].handler.OpenDetil(header_data);
					}
				});
			},
			"Cancel": () => {
			}
		})

	});

	fn_callback();
}

	
export function grd_list_rowrender(row) {
	var rec = row.record; 
	if (row.mapping=='merchshipbudget_descr') {
		var content = `<div class="grd-bud-acc">${rec.merchshipbudgetacc_name}</div>`;
		
		if (rec.curr_id != global.setup.local_curr) {
			content += `
				${rec.curr_id} ${rec.merchshipbudget_value.toLocaleString('en-US')} 
				&nbsp;&nbsp; rate 
				${rec.curr_rate.toLocaleString('en-US')} 
			`
		}

		if (rec.merchshipbudget_descr!='' && rec.merchshipbudget_descr!=null) {
			content += `<div class="grd-bud-desc">${rec.merchshipbudget_descr}</div>`;
		}




		row.td.innerHTML = content;
	}
}	


export function OpenDetil(data, result, options) {
	console.log(result);
	var recordtotalvalue = result.recordtotalvalue ?? 0;
	$('#pnl_editbudgetgrid-totalvalue').html(recordtotalvalue.toLocaleString('en-US'));
}


async function obj_pastebox_paste(pastedData, fn_finish) {
	var header_data = grd_list.getHeaderData();
	
	var colspattern = "BudgetAccount $ AccountName $ Descr $ Value $ Curr $ Rate $ IDR";
	var rows = pastedData.split("\n");

	try {
		var i = 0;
		var total = rows.length;
		for (var row of rows) {
			if (row === "") continue;
			var cells = row.split("\t");
			if (i==0) {
				var headpatt = cells.join(' $ ').trim();
				if (headpatt.toUpperCase()!=colspattern.toUpperCase()) {
					console.log(headpatt.toUpperCase());
					console.log(colspattern.toUpperCase());
					throw new Error('Format data tidak sesuai');
				}
			} else {
				// Paste Data
				var data = {
					BudgetAccount: cells[0],
					AccountName: cells[1],
					Descr: cells[2],
					Value: cells[3],
					Curr: cells[4],
					Rate: cells[5],
					IDR: cells[6]
				}
				
				console.log(row);
				var apiurl = `${global.modulefullname}/xtion-budgetupload`
				var args = {
					id: header_data.merchship_id,
					data: data
				}

				try {
					obj_pastebox.html(`Processing Data ${i} of ${total} ...`);
					var result = await $ui.apicall(apiurl, args);
					console.log(result);
				} catch (err) {
					throw err;
				}
			}
			i++;
		}

		obj_pastebox.html('Reloading Data ...');

		if (typeof fn_finish === 'function') {
			setTimeout(()=>{
				fn_finish();
			}, 1000);
		}
	} catch (err) {
		if (typeof fn_finish === 'function') {
			setTimeout(()=>{
				fn_finish(err);
			}, 1000);
		}
	}


}