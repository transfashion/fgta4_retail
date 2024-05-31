'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Items",
	autoid: true,

	
	persistent: {
		'mst_merchitem' : {
			primarykeys: ['merchitem_id'],
			comment: 'Daftar Detil Item Variance merchandise',
			data: {
				merchitem_id: {
					text:'ID', type: dbtype.varchar(14), null:false,
					reference: {table: 'mst_itemstock', field_value: 'itemstock_id', field_display:'itemstock_name',  field_display_name:'itemstock_name'}, 
					options: { required: true, invalidMessage: 'Itemstock harus diisi', disabled: true } 
				},

				itemstock_id: { 
					text: 'Itemstock', type: dbtype.varchar(14),  null: false,  suppresslist: true,
					reference: {table: 'mst_itemstock', field_value: 'itemstock_id', field_display:'itemstock_name',  field_display_name:'itemstock_name'}, 
					options: { required: true, invalidMessage: 'Itemstock harus diisi', disabled: true } 
				},
				
				merchitem_art: {text:'ART', type: dbtype.varchar(30), null:true, suppresslist: true, options:{required:true,invalidMessage:'Artikel harus diisi'}},
				merchitem_mat: {text:'MAT', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_col: {text:'COL', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_size: {text:'SIZE', type: dbtype.varchar(20), null:true, suppresslist: true},
				merchitem_combo: {text:'Combo', type: dbtype.varchar(103), null:true},
				
				merchitem_name: {text:'Name', type: dbtype.varchar(255), null:true},
				merchitem_descr: {text:'Descr', type: dbtype.varchar(2500), null:true, suppresslist: true},
				merchitem_colnum: {text:'Colnum', type: dbtype.varchar(3), null:true, suppresslist: true},

				merchitem_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },

				merchitem_pcpline: {text:'pcp Line', type: dbtype.varchar(90), null:true, suppresslist: true},
				merchitem_pcpgroup: {text:'pcp group', type: dbtype.varchar(90), null:true, suppresslist: true},
				merchitem_pcpcategory: {text:'pcp category', type: dbtype.varchar(90), null:true, suppresslist: true},
				merchitem_colorcode: {text:'color code', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_colordescr: {text:'color descr', type: dbtype.varchar(30), null:true, suppresslist: true},

				merchitem_gender: {text:'Gender', type: dbtype.varchar(1), null:true, suppresslist: true},
				merchitem_fit: {text:'Fit', type: dbtype.varchar(10), null:true, suppresslist: true},
				merchitem_hscodeship: {text:'HSCode (ship)', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_hscodeina: {text:'HSCode (ina)', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_gtype: {text:'GType', type: dbtype.varchar(5), null:true, suppresslist: true},

				merchitem_labelname: {text:'label name', type: dbtype.varchar(90), null:true, suppresslist: true},
				merchitem_labelproduct: {text:'label product', type: dbtype.varchar(90), null:true, suppresslist: true},
				merchitem_bahan: {text:'label bahan', type: dbtype.varchar(150), null:true, suppresslist: true},
				merchitem_pemeliharaan: {text:'label pemeliharaan', type: dbtype.varchar(150), null:true, suppresslist: true},
				merchitem_logo: {text:'label logo', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_dibuatdi: {text:'label dibuatdi', type: dbtype.varchar(30), null:true, suppresslist: true},

				merchitem_width: {text:'Width', type: dbtype.decimal(7,2), null:false, default:0 , suppresslist: true},
				merchitem_length: {text:'Length', type: dbtype.decimal(7,2), null:false, default:0, suppresslist: true },
				merchitem_height: {text:'Height', type: dbtype.decimal(7,2), null:false, default:0, suppresslist: true },
				merchitem_weight: {text:'Weight', type: dbtype.decimal(7,2), null:false, default:0, suppresslist: true },

				merchitemctg_id: { 
					text: 'Category', type: dbtype.varchar(30), null: false, suppresslist: true,
					reference: {table: 'mst_merchitemctg', field_value: 'merchitemctg_id', field_display:'merchitemctg_name',  field_display_name:'merchitemctg_name'}, 
					options: { required: true, invalidMessage: 'Category harus diisi' }, 
				},

				merchsea_id: { 
					text: 'Season', type: dbtype.varchar(10), null: false, suppresslist: true,
					reference: {table: 'mst_merchsea', field_value: 'merchsea_id', field_display:'merchsea_name',  field_display_name:'merchsea_name'}, 
					options: { required: true, invalidMessage: 'Season harus diisi' }, 
				},

				unit_id: { 
					text: 'Unit', type: dbtype.varchar(10), null: false, suppresslist: true,
					reference: {table: 'mst_unit', field_value: 'unit_id', field_display:'unit_name',  field_display_name:'unit_name'}, 
					options: { required: true, invalidMessage: 'Unit harus diisi' }, 
				},

				dept_id: { 
					text: 'Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					reference: {table: 'mst_dept', field_value: 'dept_id', field_display:'dept_name',  field_display_name:'dept_name'}, 
					options: { required: true, invalidMessage: 'Dept harus diisi' }, 
				},

				brand_id: { 
					text: 'Brand', type: dbtype.varchar(14), null: false, suppresslist: true,
					reference: {table: 'mst_brand', field_value: 'brand_id', field_display:'brand_name',  field_display_name:'brand_name'}, 
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
				},

				merchregitem_id: { 
					text: 'Register', type: dbtype.varchar(32), null: true, suppresslist: true,
					reference: {table: 'trn_merchregitem', field_value: 'merchregitem_id', field_display:'merchregitem_id',  field_display_name:'merchregitem_id'}, 
					options: { required: true, invalidMessage: 'Merch Reg Item harus diisi' }, 
				},

				merchitem_isupdating: { text: 'Updating', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled: true } },
				merchitem_updatebatch: { 
					text: 'Last Batch Update', type: dbtype.varchar(30), null: true, suppresslist: true, options: { disabled: true } },

				mercharticle_id: {text:'Article ID', type: dbtype.varchar(14), null:false, suppresslist: true},

			},

			uniques : {
				merchitem_uniq: ['brand_id', 'merchitem_art', 'merchitem_mat', 'merchitem_col', 'merchitem_size'],
				merchitem_combo: ['brand_id', 'merchitem_combo'],
				itemstock_id: ['itemstock_id'],
			}
		},
	},

	schema: {
		title: 'Merchandise Items',
		header: 'mst_merchitem',
		detils: {
		}
	}

}