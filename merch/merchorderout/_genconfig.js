'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Purchase Order",
	autoid: true,
	idprefix: 'PO', 
	printing: true,	
	committer: true,
	jsonOverwrite: true,
	commitOverwrite: true,
	uncommitOverwrite: true,
	approvalOverwrite: false,

	persistent: {
		'trn_merchorderout': {
			comment: 'Daftar Shipment',
			primarykeys: ['merchorderout_id'],
			data: {
				merchorderout_id: { 
					text: 'ID', type: dbtype.varchar(30), null: false, 
					reference: {table: 'trn_orderout', field_value: 'orderout_id'},
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Unit',
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},

				merchorderout_ref: {
					text:'Ref', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Referensi Order harus diisi'},
					tips:'Original no Order Confirmation dari principal',
					tipstype:'visible'
				},	

				merchorderout_date: {text:'Date', type: dbtype.date, null:false, suppresslist: true},
				merchorderout_descr: {text:'Descr', type: dbtype.varchar(1000), null:true},				


				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:false, suppresslist: true,
					tips: 'Owner Dept yang akan manage item ini',
					autobylogin: 'dept',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Owner Departemen',
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name', 
						api: 'ent/organisation/dept/list-foritem',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},

				principal_partner_id: { 
					text: 'Principal', type: dbtype.varchar(14), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Principal harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Principal',
						table: 'mst_partner',
						field_value: 'partner_id', field_display: 'partner_name', field_display_name: 'principal_partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},

				merchsea_id: { 
					text: 'Season', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Season harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Season',
						table: 'mst_merchsea',
						field_value: 'merchsea_id', field_display: 'merchsea_name',
						api: 'retail/master/merchsea/list'
					})
				},	

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list-with-currentrate',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				curr_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true},

				orderout_qty: { text: 'Total Qty', type: dbtype.int(5), null:false, default:0, options:{disabled:true}},
				orderout_totalvaluefrg: { text: 'Total Frg', type: dbtype.decimal(14,2), null:false, default:0, options:{disabled:true}},
				orderout_totalvalueidr: { text: 'Total IDR', type: dbtype.decimal(14,2), null:false, default:0, options:{disabled:true}},

				orderout_outstdqty: { text: 'Outstanding Qty', type: dbtype.int(5), null:false, unset:true, hidden:true, default:0, options:{disabled:true}},
				orderout_outstdvaluefrg: { text: 'Outstanding Value', type: dbtype.decimal(14,2), null:false, unset:true, hidden:true, default:0, options:{disabled:true}},
				orderout_outstdvalueidr: { text: 'Outstanding Value', type: dbtype.decimal(14,2), null:false, unset:true, hidden:true, default:0, options:{disabled:true}},

				merchorderout_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				merchorderout_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchorderout_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchorderout_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			}
		},

		
		'trn_merchorderoutitem': {
			comment: 'Daftar Item Ordered',
			primarykeys: ['merchorderoutitem_id'],
			data: {
				merchorderoutitem_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitem_id: { 
					text: 'Item', type: dbtype.varchar(14), null: true, 
					options: { required: true, invalidMessage: 'Item harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Item',
						table: 'mst_merchitem',
						field_value: 'merchitem_id', field_display: 'itemstock_id',
						api: 'retail/master/merchitem/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},				

				merchitem_combo: {text:'Combo', type: dbtype.varchar(103), null:true},
				orderoutitem_descr: {text:'Descr', type: dbtype.varchar(255), null:true},
				orderoutitem_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0},
				orderoutitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				orderoutitem_subtotalvaluefrg: { text: 'Subtotal', type: dbtype.decimal(14,2), null:false, default:0},

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list-with-currentrate'
					})
				},
				curr_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, default:0, suppresslist: true},
				orderoutitem_subtotalvalueidr: { text: 'IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},

				orderoutitem_outstdqty: { text: 'Outstanding Qty', type: dbtype.int(5), null:false, unset:true, hidden:true, default:0, options:{disabled:true}},
				orderoutitem_outstdvaluefrg: { text: 'Outstanding Value', type: dbtype.decimal(14,2), null:false, unset:true, hidden:true, default:0, options:{disabled:true}},
				orderoutitem_outstdvalueidr: { text: 'Outstanding Value', type: dbtype.decimal(14,2), null:false, unset:true, hidden:true, default:0, options:{disabled:true}},

				merchorderout_id: {text:'Orderout', type: dbtype.varchar(30), null:false},		
			}
		},
		
		'trn_merchship' : {
			generatetable: false, /* table digenerate dari retail/merch/merchship */
			primarykeys: ['merchship_id'],
			comment: 'Shipment dari merchorder out',
			readonly: true,

			data: {
				merchship_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				merchship_date: {text:'Date ETA', type: dbtype.date, null:false},
				merchship_descr: {text:'Descr', type: dbtype.varchar(255), null:true},				
				merchorderout_id: {text:'Orderout', type: dbtype.varchar(30), null:false},		
			}
		},

		'trn_orderoutfiles' : {
			generatetable: false,
			primarykeys: ['orderoutfiles_id'],
			fk_to_header: 'orderout_id',
			comment: 'Daftar File Inquiry',

			data: {
				orderoutfiles_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				doctype_id: {
					text:'Document Type', type: dbtype.varchar(10), null:false, 
					options: { required: true, invalidMessage: 'Tipe dokumen harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_doctype', 
						field_value: 'doctype_id', field_display: 'doctype_name', 
						api: 'ent/general/doctype/list'})
				},
				orderoutfiles_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				orderoutfiles_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				orderoutfiles_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				orderout_id: {text:'Orderout', type: dbtype.varchar(30), null:false},		
			},
			defaultsearch: ['orderoutfiles_descr'],
			uniques: {
				'orderout_doc' : ['orderout_id', 'doctype_id']
			}
		},			
	}	
	,

	schema: {
		header: 'trn_merchorderout',
		detils: {
			
			'items' : {
				title: 'Items', table: 'trn_merchorderoutitem', form: true, headerview: 'merchorderout_descr' ,
				editorHandler: true, listHandler: true
			},
			
			'ship' : {
				title: 'Shipment', table: 'trn_merchship', form: true, headerview: 'merchorderout_descr' ,
				editorHandler: true, listHandler: true
			},

			'files': {
				title: 'Files', table: 'trn_orderoutfiles', form: true, headerview: 'merchorderout_descr',
				editorHandler: true, listHandler: true
			},

			'importdata' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Import', table: 'trn_merchorderout', form: false, 
				tabvisible: false
			},

			'log' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Log', table: 'trn_merchorderout', form: false, 
				tabvisible: false
			},
		}
	}	
}			