'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Stock",
	autoid: true,

	persistent: {
		'pos_itemstock': {
			comment: 'Daftar Item Stock POS',
			primarykeys: ['positemstock_id'],
			data: {

				positemstock_id: { text: 'ID', type: dbtype.varchar(36), null: false, default: 'UUID()' },

				site_id: {text:'ID', type: dbtype.varchar(30), null:false },
				itemstock_id: { text: 'Itemstock ID', type: dbtype.varchar(14), null: false },
				itemstock_code: { text: 'Uniq Code', type: dbtype.varchar(150), null: false },
				itemstock_name: { text: 'Nama Item', type: dbtype.varchar(150), null: false },
				itemstock_descr: { text: 'Descr', type: dbtype.varchar(2500), suppresslist: true },
				itemstock_couchdbid: {text:'CouchDb.Id', type: dbtype.varchar(255), null:true, suppresslist: true}, // id di couchdb

				itemstock_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				itemstock_isupdating: { text: 'Updating', type: dbtype.boolean, null: false, default: '0', options: {disabled: true} },

				itemstock_grossprice: { text: 'Gross Price', type: dbtype.decimal(16,0), suppresslist: true },
				itemstock_isdiscvalue: {text: 'Discount Using Value', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },
				itemstock_disc: {text:'Disc (%)', type: dbtype.decimal(5,2),  null:false, default: 0, suppresslist: true},
				itemstock_discval: {text:'Disc Value', type: dbtype.decimal(16,0),  null:false, default: 0, suppresslist: true},
				itemstock_sellprice: { text: 'Sell Price', type: dbtype.decimal(16,0), suppresslist: true },

				itemstock_lastqty: { text: 'LastQty', type: dbtype.decimal(14,2), suppresslist: true, unset:true, options: { disabled: true } },

				itemgroup_id: {text:'ID', type: dbtype.varchar(17), null:true},
				itemgroup_name: {text:'Item Group Name', type: dbtype.varchar(60), null:true},
				itemctg_id: {text:'Category ID', type: dbtype.varchar(30), null:true, uppercase: true},
				itemctg_name: {text:'Category Name', type: dbtype.varchar(90), null:true, uppercase: true},
				itemclass_id: { text: 'ItemClass ID', type: dbtype.varchar(14), null: true},
				itemclass_name: { text: 'ItemClass Name', type: dbtype.varchar(30), null: true, uppercase: true },
				dept_id: {text:'Dept ID', type: dbtype.varchar(30), null:true, uppercase: true},
				dept_name: {text:'Dept Name', type: dbtype.varchar(60), null:false, uppercase: true},

			},

			defaultsearch : ['itemstock_id', 'itemstock_code', 'itemstock_name'],
			uniques: {
				'itemstock_keys': ['site_id', 'itemstock_id']
			},

		},

		'pos_itemstockbarcode' : {
			comment: 'Daftar Barcode Item Stock POS',
			primarykeys: ['positemstockbarcode_id'],
			data: {
				positemstockbarcode_id: { text: 'ID', type: dbtype.varchar(36), null: false, default: 'UUID()' },
				site_id: {text:'ID', type: dbtype.varchar(30), null:false },
				itemstock_id: { text: 'Itemstock ID', type: dbtype.varchar(14), null: false },
				itemstockbarcode_text: {text:'Barcode', type: dbtype.varchar(26), null:true},
				dept_id: {text:'Dept ID', type: dbtype.varchar(30), null:true, uppercase: true},
				itemstockbarcode_isupdating: { text: 'Updating', type: dbtype.boolean, null: false, default: '0', options: {disabled: true} },
				itemstockbarcode_isinternal: { text: 'internal barcode', type: dbtype.boolean, null: false, default: '0', options: {disabled: true} },
				positemstock_id: { text: 'ID', type: dbtype.varchar(36), null: false },
			},
			uniques: {
				'positemstockbarcode_keys': ['itemstockbarcode_text', 'site_id', 'dept_id']
			},			
		}

 	},	

	schema: {
		title: 'Item Stock',
		header: 'pos_itemstock',
		detils: {
			'barcode' : {
				title: 'Barcode', table: 'pos_itemstockbarcode', form: true, headerview: 'itemstock_name',
				editorHandler: true,
				listHandler: true 
			},

		}
	}

}	