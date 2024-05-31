'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "POS Paym Method",
	autoid: true,

	persistent: {
		'pos_paymethod' : {
			primarykeys: ['paymethod_id'],
			comment: 'Metode Pembayaran POS',
			data: {
				paymethod_id: {text:'ID', type: dbtype.varchar(14)},
				site_id: {
					text: 'Site', type: dbtype.varchar(30), null:true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Site',
						api: 'ent/location/site/list',
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},

				paymethod_name: { text: 'Method Name', type: dbtype.varchar(60), null: true, uppercase: true },
				paymethod_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0'},
				paymethod_order: { text: 'Order', type: dbtype.int(4), suppresslist: true, default: '0' },

				paytype_id: {
					text: 'Type', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Type harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Site',
						api: 'retail/pos/pospaytype/list',
						table: 'pos_paytype', 
						field_value: 'paytype_id', field_display: 'paytype_name', 
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})				
				},

				posterminal_id: {
					class: 'paytype-edc',
					text: 'Terminal', type: dbtype.varchar(14), null:true, suppresslist: true,
					tips: 'Kosongkan agar available di semua terminal',
					tipstype: 'visible',
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Terminal',
						api: 'retail/pos/posterminal/list',
						table: 'mst_posterminal', 
						field_value: 'posterminal_id', field_display: 'posterminal_code', 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},				

				paymethod_code: {class: 'paytype-edc', text: 'Code', type: dbtype.varchar(30), null: true, suppresslist: true },
				paymethod_isintegrated: { text: 'Integration', type: dbtype.boolean, null: false, default: '0'},
				paymethod_setting: {class: 'paytype-edc', text: 'Setting', type: dbtype.varchar(3000), null: true, suppresslist: true },
				paymethod_shortcut: {text: 'Shortcut', type: dbtype.varchar(15), null: true, suppresslist: true },

				paytype_iscash: { 
					section: section.Begin('Setting'),
					caption:'Type Setting', text: 'Cash', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true} 
				},
				paytype_isvoucher: { text: 'Voucher', type: dbtype.boolean, null: false, default: '0', suppresslist: true , options:{disabled: true}},
				paytype_isedc: { text: 'EDC', type: dbtype.boolean, null: false, default: '0', suppresslist: true , options:{disabled: true}},
				paytype_istransfer: { text: 'Transfer', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true} },
				paytype_isonline: {
					section: section.End(),
					text: 'Online Platform', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: true}
				},

				paytype_nameinputtype: { text: 'Name InputType', type: dbtype.varchar(60), null: true, lowercase: true },
				paytype_cardinputtype: { text: 'Card InputType', type: dbtype.varchar(60), null: true, lowercase: true },
				paytype_apprinputtype: { text: 'Appr InputType', type: dbtype.varchar(60), null: true, lowercase: true },

				
			},

			defaultsearch : ['paymethod_id', 'site_id', 'paymethod_name'],
			uniques: {
				paymethod_name : ['site_id', 'posterminal_id', 'paymethod_name']
			}

		}
	},

	schema: {
		title: "POS Pay Method",
		header: 'pos_paymethod',
		detils: {
			// 'barcode' : {title:'Barcode', table:'trn_allotopup',  form: false, headerview: 'allotopup_id'},
		},
		// xtions: {
		// 	setup: {
		// 		api: 'xtion-generate',
		// 		buttonname: 'btn_setup',
		// 		buttontext: 'Gen S.C'
		// 	},
		// 	lock:  {
		// 		api: 'xtion-lock',
		// 		buttonname: 'btn_lock',
		// 		buttontext: 'Lock'
		// 	},
		// 	unlock: {
		// 		api: 'xtion-unlock',
		// 		buttonname: 'btn_unlock',
		// 		buttontext: 'UnLock'
		// 	}
		// },		
	},


}

/*
INSERT INTO kalistadblocal.pos_paymethod (paymethod_id,site_id,paymethod_name,paymethod_isdisabled,paymethod_order,paytype_id,posterminal_id,paymethod_code,paymethod_setting,paytype_iscash,paytype_isvoucher,paytype_isedc,paytype_istransfer,paytype_isonline,`_createby`,`_createdate`,`_modifyby`,`_modifydate`) VALUES
	 ('6405fc58b31d3','HO','CASH',0,10,'CASH',NULL,NULL,NULL,1,0,0,0,0,'5effbb0a0f7d1','2023-03-06 21:44:40.000','5effbb0a0f7d1','2023-03-06 21:46:24.000'),
	 ('6405fc8896f68','HO','EDC 1',0,20,'EDC',NULL,'43235',NULL,0,0,1,0,0,'5effbb0a0f7d1','2023-03-06 21:45:28.000','5effbb0a0f7d1','2023-03-06 21:46:31.000'),
	 ('6405fca924011','HO','EDC 2',0,30,'EDC',NULL,'43238',NULL,0,0,1,0,0,'5effbb0a0f7d1','2023-03-06 21:46:01.000',NULL,NULL);


*/