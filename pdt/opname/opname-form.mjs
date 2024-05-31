const btn_downloadstock = $('#pnl_form-btn_downloadstock')
const btn_liststore = $('#pnl_form-btn_liststore')

const pnl_formboard = $('#pnl_form-board')
const obj = {
	txt_site: $('#pnl_form-obj_txt_site'),
	dt_opnamedate: $('#pnl_form-obj_dt_opnamedate'),
	txt_descr: $('#pnl_form-obj_txt_descr')
}



var this_page_id;
var this_page_num;

export var itemprogress = 0


export async function init(opt) {
	this_page_id = opt.id
	this_page_num = opt.pagenum


	obj.txt_site.textbox({
		readonly:true
	})

	btn_liststore.linkbutton({
		onClick: () => { btn_liststore_click() }
	})

	btn_downloadstock.linkbutton({
		onClick: () => {
			btn_downloadstock_click()
		}
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_list')
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})



	obj.dt_opnamedate.datebox({
		editable: false,
		formatter: function(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			var d = date.getDate();
			
			// date format dd/mm/yyyy
			var r = (d < 10 ? ('0' + d) : d) + '/' + 
					(m < 10 ? ('0' + m) : m) + '/' + 
					y;
			return r;
		},

		parser: function(s) {
			if (!s) {
				return new Date();
			}
			// date format dd/mm/yyyy
			var ss = (s.split('/'));
			var d = parseInt(ss[0], 10);
			var m = parseInt(ss[1], 10);
			var y = parseInt(ss[2], 10);
			
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
				return new Date(y, m - 1, d);
			} else {
				return new Date();
			}
		}		
	})

	var opts = obj.dt_opnamedate.datebox('options');
	obj.dt_opnamedate.datebox('setValue', opts.formatter(new Date()));

}



export function OnSizeRecalculated(width, height) {
	if (width>200) {
		pnl_formboard.css('width', `${width}px`)
		obj.txt_site.textbox('resize',  `250px`)
		obj.dt_opnamedate.datebox('resize',  `250px`)
		obj.txt_descr.textbox('resize',  `250px`)
	} else {
		pnl_formboard.css('width', '200px')
		obj.txt_site.textbox('resize',  '190px')
		obj.dt_opnamedate.datebox('resize',  `190px`)
		obj.txt_descr.textbox('resize',  `190px`)
	}

}




function btn_downloadstock_click() {

	console.log('download');

	var dt = obj.dt_opnamedate.datebox('getValue')
	var site_id = obj.txt_site.textbox('getValue')

	if (site_id=='') {
		$.messager.alert('Toko', 'Toko belum dipilih', 'warning')
		return;
	}


	var opts = obj.dt_opnamedate.datebox('options');
	var dtf = opts.parser(dt)
	
	var y = dtf.getFullYear();
	var m = dtf.getMonth() + 1;
	var d = dtf.getDate();
	var dtval = '' + y + '-' + 	(m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d)

	let ajax_args = {
		site_id: site_id,
		stockdate: dtval
	}


	let ajax_call = async (args, fn_callback) => {
		let apiurl = $ui.apis.getstocksite
		try {
			let result = await $ui.apicall(apiurl, args)
			fn_callback(null, result)
		} catch (err) {
			fn_callback(err)
		}
	}

	$ui.mask('wait ...')
	ajax_call(ajax_args,  (err, result) => {
		$ui.unmask();
		if (err) {
			$.messager.alert('Download Stock' ,err.errormessage, 'error')
		} else {
			var opnameinfo = result.opnameinfo
			var rawdataitems = result.items


			$ui.getPages().show('pnl_itemloading')
			$ui.getPages().ITEMS['pnl_itemloading'].handler.loaderprogresscheck(rawdataitems.length)

			localdb_clearmasteritem(()=>{
				localdb_setup(opnameinfo, rawdataitems, (err)=>{
					if (err) {
						$.messager.alert('Download Stock' ,err.message, 'error')
					}
				})
			})
		}
	});	
}


function btn_liststore_click() {
	$ui.getPages().show('pnl_stores')
	$ui.getPages().ITEMS['pnl_stores'].handler.loadsite()

}

export function selectsite(id) {
	obj.txt_site.textbox('setValue', id)
}


async function localdb_setup(opnameinfo, rawdataitems, fn_finish) {
	try {

		await $ui.LOCALDB.createIndex({
			ddoc: "idx-doctype",
			name: "idx-doctype",					
			index: {
				fields: ['doctype']
			}	
		});

		await $ui.LOCALDB.createIndex({
			ddoc: "idx-doctype-art",
			name: "idx-doctype-art",					
			index: {
				fields: ['doctype', 'art']
			}	
		});

		await $ui.LOCALDB.createIndex({
			ddoc: "idx-doctype-gro",
			name: "idx-doctype-gro",					
			index: {
				fields: ['doctype', 'gro_id']
			}	
		});

		await $ui.LOCALDB.createIndex({
			ddoc: "idx-doctype-gro-ctg",
			name: "idx-doctype-gro-ctg",					
			index: {
				fields: ['doctype', 'gro_id', 'ctg_id']
			}	
		});


		var i = 0
		var itemtotal = 0
		for (var data of rawdataitems) {
			var id = `barcode/${data.barcode}`
			try {
				await $ui.LOCALDB.get(id)
			} catch (err) {
				await $ui.LOCALDB.put({
					_id: id,
					doctype: 'barcode',
					item_id: data.item_id
				})
			}

			await $ui.LOCALDB.put({
				_id: `barcode/${data.item_id}`,
				doctype: 'barcode',
				item_id: data.item_id
			})			


			await $ui.LOCALDB.put(
				Object.assign({
					_id: `item/${data.item_id}`,
					doctype: 'item',
					qtyscanned: 0
				}, data))
	

			itemtotal += parseInt(data.qty)
			i++


			// buat summary group
			var summarygro = {
				_id: `summarygro/${data.gro_id}`,
				doctype: 'summarygro',
				gro_id: data.gro_id,
				gro_name: data.gro_name,
				qty: data.qty,
				qtyscanned: 0
			}

			try {
				console.log('get database');
				var sg = await $ui.LOCALDB.get(summarygro._id)
				sg.qty += data.qty
				Object.assign(summarygro, sg)
			} catch (err) {
				console.error(err)
			} finally {
				await $ui.LOCALDB.put(summarygro)
			}



			// buat summary category
			var summaryctg = {
				_id: `summaryctg/${data.gro_id}/${data.ctg_id}`,
				doctype: 'summaryctg',
				gro_id: data.gro_id,
				gro_name: data.gro_name,
				ctg_id: data.ctg_id,
				ctg_name: data.ctg_name,
				qty: data.qty,
				qtyscanned: 0
			}

			try {
				var sc = await $ui.LOCALDB.get(summaryctg._id)
				sc.qty += data.qty
				Object.assign(summaryctg, sc)
			} catch (err) {
				console.error(err)
			} finally {
				await $ui.LOCALDB.put(summaryctg)
			}			


			itemprogress = i	
		}

		opnameinfo.itemscanned = 0
		opnameinfo.itemtotal = itemtotal
		
		await localdb_init(opnameinfo)

		fn_finish(null)
	} catch (err) {
		fn_finish(err)
	}
}

async function localdb_clearmasteritem(fn) {
	try {
		await $ui.LOCALDB.destroy()
		$ui.LOCALDB = new PouchDB($ui.LOCALDB_NAME)
		fn()
	} catch (err) {
		throw err
	}
}


async function localdb_init(opnameinfo) {
	try {
		opnameinfo._id = "opnameinfo"
		await $ui.LOCALDB.put(opnameinfo)
	} catch (err) {
		throw err
	}	
}