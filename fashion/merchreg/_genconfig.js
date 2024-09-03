'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Register",
	autoid: true,
	committer: true,

	
	persistent: {
		'fsn_merchreg' : {
			primarykeys: ['merchreg_id'],
			comment: 'Daftar Register',
			data: {
				merchreg_id: {text:'ID', type: dbtype.varchar(30), null:false},
				merchreg_date: {text:'Date', type: dbtype.date, null:false, suppresslist: true},
				merchreg_descr: {text:'Descr', type: dbtype.varchar(255), null:true},				
				
				curr_id: { 
					text: 'Curr', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Currency harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_curr',
						field_value: 'curr_id', field_display: 'curr_name',
						api: 'ent/general/curr/list'
					})
				},
				curr_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true},

				partner_id: { 
					text: 'Partner', type: dbtype.varchar(14), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Partner harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_partner',
						field_value: 'partner_id', field_display: 'partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},

				merchsea_id: { 
					text: 'Season', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Season harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchsea',
						field_value: 'merchsea_id', field_display: 'merchsea_name',
						api: 'retail/fashion/merchsea/list'
					})
				},

				unit_id: { 
					text: 'Unit', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Unit harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},	

				dept_id: { 
					text: 'Dept', type: dbtype.varchar(30), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Dept harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				merchreg_version: {
					section: section.Begin('Status'),
					text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},
				merchreg_iscommit: {
					text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},
				merchreg_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchreg_commitdate: {
					text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true
				},	

				merchreg_isgenerate: {
					text:'Generated', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},
				merchreg_generateby: {text:'GenerateBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchreg_generatedate: {
					section: section.End(),
					text:'GenerateDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true
				},	


				merchreg_isinsynprogress: {
					text:'Syn In Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},

			},

			uniques : {
			},

		},

		'fsn_merchregitem' : {
			primarykeys: ['merchregitem_id'],
			comment: 'Daftar Item Register',
			data: {
				merchregitem_id: {text:'ID', type: dbtype.varchar(32), null:false, suppresslist: true},

				merchitem_refitem: {text:'RefItem', type: dbtype.varchar(30), null:true, suppresslist: true},

				merchitem_barcode: {text:'Barcode', type: dbtype.varchar(30), null:true, suppresslist: true},

				merchitem_art: {text:'Art', type: dbtype.varchar(30)},
				merchitem_mat: {text:'Mat', type: dbtype.varchar(30)},
				merchitem_col: {text:'Col', type: dbtype.varchar(30)},
				merchitem_size: {text:'Size', type: dbtype.varchar(10)},

				merchitem_combo: {text:'Combo', type: dbtype.varchar(103), null:true, suppresslist: true},

				merchitem_name: {text:'Name', type: dbtype.varchar(255)},
				merchitem_descr: {text:'Descr', type: dbtype.varchar(2500), suppresslist: true,},
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

				merchitem_fob: {text:'fob', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true },
				merchitem_initqty: {text:'init Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true },

				merchitemctg_id: { 
					text: 'Category', type: dbtype.varchar(30), null: false, suppresslist: true,
					reference: {table: 'fsn_merchitemctg', field_value: 'merchitemctg_id', field_display:'merchitemctg_name',  field_display_name:'merchitemctg_name'}, 
					options: { required: true, invalidMessage: 'Category harus diisi' }, 
				},

				unit_id: {
					text:'Unit', type: dbtype.varchar(10), null:true, suppresslist: true,
					reference: {table: 'mst_unit', field_value: 'unit_id', field_display:'unit_name',  field_display_name:'unit_name'}, 
				},

				dept_id: {
					text:'Dept', type: dbtype.varchar(30), null:true, suppresslist: true,
					reference: {table: 'mst_dept', field_value: 'dept_id', field_display:'dept_name',  field_display_name:'dept_name'}, 
				},

				merchreg_id: {text:'Reg', type: dbtype.varchar(30), null:false},
			},
			uniques : {
			},
		}

	},

	schema: {
		title: 'Merchandise Register',
		header: 'fsn_merchreg',
		detils: {
			'item': {
				title: 'Items', table: 'fsn_merchregitem', form: true, headerview: 'merchreg_descr', 
				editorHandler: true, listHandler: true 
			},
		}
	}
}



