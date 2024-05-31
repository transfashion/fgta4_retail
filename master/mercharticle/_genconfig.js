'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Article",
	autoid: true,

	
	persistent: {
		'mst_mercharticle' : {
			primarykeys: ['mercharticle_id'],
			comment: 'Daftar Variance item merchandise',
			data: {
				mercharticle_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				
				mercharticle_art: {text:'Article', type: dbtype.varchar(30), null:true, options:{required:true,invalidMessage:'Artikel harus diisi'}},
				mercharticle_mat: {text:'Material Code', type: dbtype.varchar(30), null:true, options:{required:true,invalidMessage:'Material Code harus diisi'}},
				mercharticle_matname: {text:'Material Name', type: dbtype.varchar(70), null:true, suppresslist: true, options:{required:true,invalidMessage:'Material Name harus diisi'}},

				mercharticle_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				mercharticle_name: {text:'Name', type: dbtype.varchar(255), null:true},
				mercharticle_descr: { text: 'Descr', type: dbtype.varchar(2500), suppresslist: true },

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
					text: 'Brand', type: dbtype.varchar(14), null: false,
					reference: {table: 'mst_brand', field_value: 'brand_id', field_display:'brand_name',  field_display_name:'brand_name'}, 
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
				},

				
				mercharticle_couchdbid: {text:'CouchDb.Id', type: dbtype.varchar(255), suppresslist: true, null:true}, // id di couchdb
				mercharticle_picture: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				itemstock_id: { 
					text: 'Itemstock', type: dbtype.varchar(14),  null: true,  
					suppresslist: true,
					reference: {table: 'mst_itemstock', field_value: 'itemstock_id', field_display:'itemstock_name',  field_display_name:'itemstock_name'}, 
					options: { required: true, invalidMessage: 'Itemstock harus diisi', disabled: true } 
				},	

				mercharticle_isvarcolor: { caption:'Variance', text: 'Color', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				mercharticle_isvarsize: { text: 'Size', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				mercharticle_isupdating: { text: 'Updating', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options: { disabled: true }},
				mercharticle_updatebatch: { 
					text: 'Last Batch Update', type: dbtype.varchar(30), null: true, suppresslist: true, options: { disabled: true } },


			},

			defaultsearch : ['mercharticle_id', 'mercharticle_art'],
			uniques : {
				mercharticle_art: ['brand_id', 'mercharticle_art', 'mercharticle_mat'],
				itemstock_id: ['itemstock_id']
			},

		},


		'mst_mercharticleprop' : {
			primarykeys: ['mercharticleprop_id'],
			comment: 'Daftar Properties Article',
			data: {
				mercharticleprop_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},	
				itemproptype_id: { 
					text: 'Prop Type', type: dbtype.varchar(20), null: false, 
					options: { required: true, invalidMessage: 'Tipe Properties harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemproptype',
						field_value: 'itemproptype_id', field_display: 'itemproptype_name',
						api: 'finact/items/itemproptype/list'
					})
				},
				mercharticleprop_keys: {text:'ID', type: dbtype.varchar(90), null:false},	
				mercharticleprop_value: {text:'Value', type: dbtype.varchar(255), null:false, options: {required:true,invalidMessage:'Value harus diisi'}},	
				mercharticle_id: {text:'ID', type: dbtype.varchar(14), null:false},
			},
			uniques: {
				itemstockprop_keys: ['mercharticle_id', 'itemproptype_id', 'mercharticleprop_keys']
			}
		},		


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
					text: 'Itemstock', type: dbtype.varchar(14),  null: false,  
					reference: {table: 'mst_itemstock', field_value: 'itemstock_id', field_display:'itemstock_name',  field_display_name:'itemstock_name'}, 
					options: { required: true, invalidMessage: 'Itemstock harus diisi', disabled: true } 
				},
				
				merchitem_art: {text:'ART', type: dbtype.varchar(30), null:true, suppresslist: true, options:{required:true,invalidMessage:'Artikel harus diisi'}},
				merchitem_mat: {text:'MAT', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_col: {text:'COL', type: dbtype.varchar(30), null:true},
				merchitem_size: {text:'SIZE', type: dbtype.varchar(20), null:true},
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
					text: 'Register', type: dbtype.varchar(14), null: true, suppresslist: true,
					reference: {table: 'trn_merchregitem', field_value: 'merchregitem_id', field_display:'merchregitem_id',  field_display_name:'merchregitem_id'}, 
					options: { required: true, invalidMessage: 'Merch Reg Item harus diisi' }, 
				},

				merchitem_isupdating: { text: 'Updating', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled: true } },
				merchitem_updatebatch: { 
					text: 'Last Batch Update', type: dbtype.varchar(30), null: true, suppresslist: true, options: { disabled: true } },

				mercharticle_id: {text:'ID', type: dbtype.varchar(14), null:false},

			},

			uniques : {
				merchitem_uniq: ['brand_id', 'merchitem_art', 'merchitem_mat', 'merchitem_col', 'merchitem_size'],
				merchitem_combo: ['brand_id', 'merchitem_combo'],
				itemstock_id: ['itemstock_id']
			}
		},



		'mst_merchpic' : {
			primarykeys: ['merchpic_id'],
			comment: 'Daftar Picture Merch',
			data: {
				merchpic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchpic_couchdbid: {text:'CouchDb.Id', type: dbtype.varchar(255), null:true, suppresslist: true}, // id di couchdb
				merchpic_col: {text:'ColorVariance', type: dbtype.varchar(30), null:true},
				merchpic_name: {text:'Name', type: dbtype.varchar(30), null:false, options: {required:true,invalidMessage:'Picture Name harus diisi'}},	
				merchpic_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				merchpic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				merchpic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				mercharticle_id: { text: 'ID', type: dbtype.varchar(14),  null: false, hidden: true },	
			},
			uniques: {}
		},

	},


	schema: {
		title: 'Merchandise Article',
		header: 'mst_mercharticle',
		detils: {
			'prop' : {title: 'Properties', table: 'mst_mercharticleprop', form: true, headerview: 'mercharticle_art', editorHandler: true, listHandler: true },
			'variance' : {title: 'Item Variance', table: 'mst_merchitem', form: true, headerview: 'mercharticle_art', editorHandler: true, listHandler: true },
			'picture': {title: 'Picture', table: 'mst_merchpic', form: true, headerview: 'mercharticle_art',editorHandler: true,listHandler: true },
		}
	}
}



