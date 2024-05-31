'use strict'

const dbtype = global.dbtype;
const comp = global.comp;


// Sales Order

module.exports = {
	title: "Sales Order",
	autoid: true,
	idprefix: 'SO',
	printing: true,
	committer: true,

	jsonOverwrite: true,
	commitOverwrite: false,
	uncommitOverwrite: false,
	approvalOverwrite: false,
	xprintOverwrite: false,

	creatorname: "Agung Nugroho",
	creatoremail: "agung.dhewe@gmail.com", 
	description: `
		program untuk entry sales order merchandise
	`,

	variance: {
		"view" : {title:"Sales Order (View)"},
		"entry" : {
			title:"Sales Order (Entry)", 
			data: {}
		}
	},

	persistent: {
		'trn_merchorderin': {
			comment: 'Daftar Sales Order Merchandise',
			primarykeys: ['merchorderin_id'],
			data: {
				merchorderin_id: { text: 'ID', type: dbtype.varchar(30), null: false},
				merchorderin_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				merchorderin_ref: { text: 'Ref', type: dbtype.varchar(30), null: true },
			
				merchorderin_date: { text: 'Date', type: dbtype.date, null: false },
				merchorderin_datedue: { 
					text: 'Due Date', type: dbtype.date, null: false, suppresslist: true, options: {} 
				},
			
				merchsea_id: { 
					text: 'Season', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Season harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchsea',
						field_value: 'merchsea_id', field_display: 'merchsea_name',
						api: 'retail/master/merchsea/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false						
					})
				},

				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Sub Account Unit',
						table: 'mst_unit',
						api: 'ent/organisation/unit/list',
						field_value: 'unit_id', field_display: 'unit_name',
						field_mappings : [
							`{mapping: 'unit_id', text: 'ID', style: 'width: 100px'}`,
							`{mapping: 'unit_name', text: 'Unit', style: 'width: auto'}`,
						],
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Default Sub Account Departemen',
						table: 'mst_dept', 
						api: 'ent/organisation/dept/list',
						field_value: 'dept_id', field_display: 'dept_name', 
						field_mappings: [
							`{mapping: 'dept_id', text: 'ID', style: 'width: 100px', hidden: true}`,
							`{mapping: 'dept_name', text: 'Dept', style: 'width: auto'}`,
							`{mapping: 'depttype_name', text: 'Type', style: 'width: 200px'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})				
				},

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						title: 'Pilih Partner',
						table: 'mst_partner', 
						api: 'ent/affiliation/partner/list',
						field_value: 'partner_id', field_display: 'partner_name', 
						field_mappings: [
							`{mapping: 'partner_id', text: 'ID', style: 'width: 100px', hidden: true}`,
							`{mapping: 'partner_name', text: 'Partner', style: 'width: auto'}`,
							`{mapping: 'partnertype_name', text: 'Type', style: 'width: 200px'}`,
						], 
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				project_id: {
					suppresslist: true, hidden: true,
					options:{prompt:'NONE'},
					text:'Partner', type: dbtype.varchar(30), null:true, 
					comp: comp.Combo({
						table: 'mst_project', 
						field_value: 'project_id', field_display: 'project_name', 
						api: 'finact/master/project/list'
					})
				},



				merchorderin_version: {
					// section: section.Begin('Status'),
					text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},

				merchorderin_iscommit: { caption:'Status', text: 'Commit', type: dbtype.boolean, null: false, default: '0', suppresslist: true,  unset:true, options: { disabled: true } },
				merchorderin_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'  },
				merchorderin_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},

				merchorderin_ispost: { text: 'Posted', type: dbtype.boolean, null: false, default: '0', suppresslist: false, unset:true, options: { disabled: true } },
				merchorderin_postby: { text: 'Post By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				merchorderin_postdate: { 
					// section: section.End(),
					text: 'Post Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true
				},

			},
			
			defaultsearch: ['jurnal_id', 'jurnal_descr']
		},

		'trn_merchorderinitem' : {
			comment: 'Jurnal Detil',
			primarykeys: ['merchorderinitem_id'],		
			data: {

				merchorderinitem_id: { text: 'ID', type: dbtype.varchar(14), null: false,  suppresslist: true, hidden: true},

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

				merchitem_art: {text:'Art', type: dbtype.varchar(30)},
				merchitem_mat: {text:'Mat', type: dbtype.varchar(30)},
				merchitem_col: {text:'Col', type: dbtype.varchar(30)},
				merchitem_size: {text:'Size', type: dbtype.varchar(10)},
				merchitem_name: {text:'Name', type: dbtype.varchar(255), null:true},

				merchorderinitem_qty: { 
					text: 'Qty', type: dbtype.int(4), null: false, default: 0, suppresslist: true, 
					options: { required: true } 
				},

				merchorderinitem_valfrg: { 
					text: 'Price/pcs', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, 
					options: { required: true } 
				},

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Mata Uang',
						table: 'mst_curr', 
						api: 'ent/general/curr/list-with-currentrate',
						field_value: 'curr_id', field_display: 'curr_name', 						
						field_mappings: [
							`{mapping: 'curr_id', text: 'ID', hidden: true}`,
							`{mapping: 'curr_name', text: 'Curency', style: 'width: auto'}`,
							`{mapping: 'curr_rate', text: 'Rate', style: 'width: 100px; text-align:right', formatter: 'row_format_number'}`,
						], 
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				merchorderinitem_valfrgrate: { 
					text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, 
					options: { required: true } 
				},

				merchorderinitem_subvalfrg: { 
					text: 'Sub Total Frg', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, 
					options: { required: true } 
				},

				merchorderinitem_subvalidr: { 
					text: 'Sub Total IDR', type: dbtype.decimal(14, 2), null: false, default: 0,
					options: { required: true, disabled: true } 
				},


				merchorderin_id: { text: 'Order', type: dbtype.varchar(30), null: false },
			},
			
			/*
			uniques : {
				jurnaldetil_id_ref: ['jurnaldetil_id_ref'],
			},
			*/

		}


	},

	schema: {
		title: "Sales Order",
		header: 'trn_merchorderin',
		detils: {
			'items': {
				title: 'Order Items', table: 'trn_merchorderinitem', form: true, headerview: 'merchorderin_descr', 
				editorHandler: true,
				listHandler: true
			},
			'importdata' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Import', table: 'trn_merchorderin', form: false, 
				tabvisible: false
			},

			'log' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Log', table: 'trn_merchorderin', form: false, 
				tabvisible: false
			},			
			/*
			'preview' : {
				title: 'Preview', table: 'trn_jurnal', form: false, genHandler: 'printpreview', 
				tabvisible: false,
				overwrite:{mjs:true, phtml:true}
			},
			'link' : {
				// hati-hati, jangan di overwrite
				// overwrite:{mjs:false, phtml:false} // overwrite hanya jika nilainya true
				title: 'Link', table: 'trn_jurnal', form: false, 
				tabvisible: false
			},
			*/
		},
		xtions: {
			post: {
				buttonname: 'btn_post',
				buttontext: 'Post'
			},
			unpost: {
				buttonname: 'btn_unpost',
				buttontext: 'UnPost'
			}
		},
	}


}



