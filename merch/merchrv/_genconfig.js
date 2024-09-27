'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merch RV",
	autoid: true,
	printing: true,	
	committer: true,
	jsonOverwrite: false,
	commitOverwrite: true,
	uncommitOverwrite: true,
	approvalOverwrite: false,

	
	persistent: {
		'trn_merchrv' : {
			comment: 'Daftar Receiving Dokumen',
			primarykeys: ['merchrv_id'],
			data: {
				merchrv_id: {text:'RV', type: dbtype.varchar(30), null:false},		
				merchrv_ref: {
					text:'Ref', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Referensi RV harus diisi'},
					tips:'no dokumen RV TB',
					tipstype:'visible'
				},
				merchrv_date: {text:'Date Received', type: dbtype.date, null:false, suppresslist: true},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Unit harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Unit',
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},



				merchorderout_id: { 
					text: 'Order', type: dbtype.varchar(30), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Order harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Kode Order',
						table: 'trn_merchorderout',
						field_value: 'merchorderout_id', field_display: 'merchorderout_descr', field_display_name: 'merchorderout_descr',
						api: 'retail/merch/merchorderout/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},

				merchship_id: {
					text: 'Shipment', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Shipment harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Shipment',
						table: 'trn_merchship',
						field_value: 'merchship_id', field_display: 'merchship_descr',
						api: 'retail/merch/merchship/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				merchrv_descr: {text:'Descr', type: dbtype.varchar(255), null:true},				

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
						api: 'ent/financial/curr/list-with-currentrate'
					})
				},

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
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},
				merchrv_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				merchrv_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchrv_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchrv_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				merchrv_ispost: {text:'Post', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchrv_postby: {text:'PostBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchrv_postdate: {text:'PostDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			}
		},

		'trn_merchrvitem' : {
			comment: 'Daftar Item Received',
			primarykeys: ['merchrvitem_id'],
			data: {
				merchrvitem_id: {text:'ID', type: dbtype.varchar(14), null:false},	
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
				merchitem_name: {text:'Name', type: dbtype.varchar(255), null:true},

				merchrvitem_valuepo: { text: 'Value from PO', type: dbtype.decimal(14,2), null:false, default:0}, // harga satuan dari PO (frg)
				merchrvitem_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0}, // harga satuan invoice (frg)

				merchrvitem_qtyinit: { text: 'Qty PL', type: dbtype.int(4), null:false, default:0},  // qty dari packing list
				merchrvitem_qty: { text: 'Qty Actual', type: dbtype.int(4), null:false, default:0}, // qty aktual diterima

				merchrvitem_rate: { text: 'Rate', type: dbtype.decimal(12,2), null:false, default:0},
				merchrvitem_subtotalvaluefrg: { text: 'Subtotal', type: dbtype.decimal(14,2), null:false, default:0},
				merchrvitem_subtotalvalueidr: { text: 'IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
				merchrvitem_budgetaddcostidr: { text: 'Additional Cost IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
				merchrvitem_budgetlandedcostidr: { text: 'Landed Cost IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
				merchrvitem_budgetmarkupidr: { text: 'Markup IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
				merchrvitem_budgetbillidr: { text: 'Bill IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},


				merchrvitem_actualvaluefrg: { text: 'Actual Value', type: dbtype.decimal(14,2), null:false, default:0},
				merchrvitem_actualrate: { text: 'Actual Rate', type: dbtype.decimal(12,2), null:false, default:0},
				merchrvitem_actualvalueidr: { text: 'Actual Value IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
				merchrvitem_actualaddcostidr: { text: 'Actual Additional Cost IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
				merchrvitem_actuallandedcostidr: { text: 'Actual Landed Cost IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},

				merchrv_id: {text:'RV', type: dbtype.varchar(30), null:false},		
			}
		}
	},

	schema: {
		header: 'trn_merchrv',
		detils: {
			
			'items' : {
				title: 'Items', table: 'trn_merchrvitem', form: true, headerview: 'merchrv_descr' ,
				editorHandler: true, listHandler: true
			},

			'preview' : {
				title: 'Preview', table: 'trn_merchrvitem', form: false, genHandler: 'printpreview', 
				tabvisible: false,
				overwrite:{mjs:true, phtml:true}
			},

			'importdata' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Import', table: 'trn_merchrv', form: false, 
				tabvisible: false
			},

			'log' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Log', table: 'trn_merchrv', form: false, 
				tabvisible: false
			},

		},


	}	
}			

