'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "POS Terminal",
	autoid: true,

	persistent: {
		'mst_posterminal' : {
			primarykeys: ['posterminal_id'],
			comment: 'Daftar Topup Allo',
			data: {
				posterminal_id: {text:'ID', type: dbtype.varchar(14)},
				
				site_id: {
					text: 'Site', type: dbtype.varchar(30), null:true, 
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Site',
						api: 'ent/location/site/list',
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})				
				},

				store_code: { text: 'Store Code', type: dbtype.varchar(3), null: true },
				posterminal_code: { text: 'Terminal Code', type: dbtype.varchar(2), null: true },
				posterminal_license: { text: 'License', type: dbtype.varchar(64), null: true, unset: true, suppresslist: true, options:{disabled: true} },
				posterminal_licenseunlimited: { text: 'Unlimitted', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				posterminal_expireddate: { text: 'Expired Date', type: dbtype.date, null: false, suppresslist: true},
				posterminal_setupcode : { 
					text: 'Setup Code', type: dbtype.varchar(6), null: true, unset: true, suppresslist: true, options:{disabled: true}, 
					after: '<div id="pnl_edit-setupcode" class="setupinfo setupinfo-hidden"></div>'
				},
				posterminal_islock: { text: 'Lock', type: dbtype.boolean, null: false, unset: true, default: '0', suppresslist: true, options:{disabled: true} }

			},

			defaultsearch : ['posterminal_id', 'site_id'],
			uniques: {
				posterminal_code : ['store_code', 'posterminal_code'],
				posterminal_setupcode: ['site_id', 'posterminal_setupcode']
			}

		}
	},

	schema: {
		title: "POS Terminal",
		header: 'mst_posterminal',
		detils: {
			// 'barcode' : {title:'Barcode', table:'trn_allotopup',  form: false, headerview: 'allotopup_id'},
		},
		xtions: {
			setup: {
				api: 'xtion-generate',
				buttonname: 'btn_setup',
				buttontext: 'Gen S.C'
			},
			lock:  {
				api: 'xtion-lock',
				buttonname: 'btn_lock',
				buttontext: 'Lock'
			},
			unlock: {
				api: 'xtion-unlock',
				buttonname: 'btn_unlock',
				buttontext: 'UnLock'
			}
		},		
	},


}

