'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Shipment",
	autoid: true,
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
		shipment barang
	`,

	variance: {
		"view" : {title:"Shipment (View)"},
		"entry" : {
			title:"Shipment (Entry)", 
			data: {}
		},
		"verify" : {
			title:"Shipment (Verify)",
			data: {}
		},
		"activate" : {
			title:"Shipment (Activate)",
			data: {}
		},
		"costing" : {
			title:"Shipment (Costing)",
			data: {}
		}
	},

	persistent: {
		'trn_merchship': {
			comment: 'Daftar Shipment',
			primarykeys: ['merchship_id'],
			data: {
				merchship_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				
				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Unit harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Unit',
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						field_mappings : [
							`{mapping: 'unit_id', text: 'ID'}`,
							`{mapping: 'unit_name', text: 'Unit'}`,
						],
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
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

				fowarder_partner_id: { 
					text: 'Fowarder', type: dbtype.varchar(14), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Fowarder harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Fowarder',
						table: 'mst_partner',
						field_value: 'partner_id', field_display: 'partner_name', field_display_name: 'fowarder_partner_name',
						api: 'ent/affiliation/partner/list'
					})
				},

				merchship_descr: {
					text:'Descr', type: dbtype.varchar(255), null:true,
					options: {required: true, invalidMessage: 'Descr harus diisi'}
				},				
				merchship_date: {text:'Date ETA', type: dbtype.date, null:false, suppresslist: true},
				
				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: true, suppresslist: false, hidden: true,
					options: { required:false, prompt:'NONE' }, 
					comp: comp.Combo({
						title: 'Pilih Periode Buku',
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periodemo/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},

				merchship_qty: { text: 'Qty', type: dbtype.int(5), null:false, default:0, suppresslist: true},
				merchship_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
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
				merchship_rate: { text: 'Rate Budget', type: dbtype.decimal(12,0), null:false, default:0},

				dept_id: {
					// section: section.Begin('Info'),
					text: 'Dept', type: dbtype.varchar(30), null:true, suppresslist: false,
					tips: 'Owner Dept yang akan manage item ini',
					autobylogin: 'dept',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --', disabled:true},
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



				merchship_version: {
					// section: section.Begin('Status'),
					text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				merchship_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchship_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchship_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				merchship_isverify: {text:'Verify', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchship_verifyby: {text:'VerifyBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchship_verifydate: {text:'VerifyDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				/*
				merchship_isactivate: {text:'Activate', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchship_activateby: {text:'ActivateBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchship_activatedate: {text:'ActivateDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				*/

				
				merchship_iscalculate: {text:'Calculate', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchship_calculateby: {text:'CalculateBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchship_calculatedate: {text:'CalculateDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				merchship_isexecute: {text:'Execute', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchship_executeby: {text:'ExecuteBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchship_executedate: {text:'ExecuteDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	


				merchship_isbill: {text:'Bill', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchship_billby: {text:'BillBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchship_billdate: {text:'BillDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				merchship_iscost: {text:'Costing', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchship_costby: {text:'CostingBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchship_costydate: {
					// section: section.End(),
					text:'CostingDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			}
		},
		

		'trn_merchshiporderout' : {
			primarykeys: ['merchshiporderout_id'],
			comment: 'Budget dari Shipment',
			data: {
				merchshiporderout_id: { text: 'ID', type: dbtype.varchar(14), null: true },

				merchorderout_id: { 
					text: 'Order', type: dbtype.varchar(30), null: true, 
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

				merchsea_id: { 
					// section: section.End(),
					text: 'Season', type: dbtype.varchar(10), null: true, 
					options: { required: true, invalidMessage: 'Season harus diisi', disabled:true }, 
					comp: comp.Combo({
						title: 'Pilih Season',
						table: 'mst_merchsea',
						field_value: 'merchsea_id', field_display: 'merchsea_name',
						api: 'retail/master/merchsea/list'
					})
				},
				
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --', disabled:true},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list-with-currentrate'
					})
				},

				orderout_qty: { text: 'Qty', type: dbtype.int(5), null:false, default:0},
				orderout_valuefrg: { text: 'Value Frg', type: dbtype.decimal(14,2), null:false, default:0},
				orderout_valueidr: { text: 'Value IDR', type: dbtype.decimal(14,2), null:false, hidden:true, suppresslist: true, default:0},

				merchship_id: {text:'Shipment', type: dbtype.varchar(30), null:false}
			}
		},


		'trn_merchshipbudget' : {
			primarykeys: ['merchshipbudget_id'],
			comment: 'Budget dari Shipment',
			data: {
				merchshipbudget_id: { text: 'ID', type: dbtype.varchar(14), null: true },
				merchshipbudgetacc_id: {
					text: 'Budget Account', type: dbtype.varchar(10), null:false, suppresslist: false,
					options:{required:true,invalidMessage:'Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						title: 'Pilih Budget',
						table: 'mst_merchshipbudgetacc', 
						field_value: 'merchshipbudgetacc_id', field_display: 'merchshipbudgetacc_name', 
						field_display_name: 'merchshipbudgetacc_name', 
						api: 'retail/master/merchshipbudgetacc/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},
				merchshipbudget_descr: {text:'Descr', type: dbtype.varchar(255), null:true},
				merchshipbudget_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list-with-currentrate'
					})
				},
				curr_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, default:0},
				merchshipbudget_idr: { text: 'IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},

				merchshipbudget_alcvalue: { text: 'Allocated Value', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true, options:{disabled:true}},
				merchshipbudget_alcidr: { text: 'Allocated IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true, options:{disabled:true}},
				merchshipbudget_relvalue: { text: 'Actual Value', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true, options:{disabled:true}},
				merchshipbudget_relidr: { text: 'Actual IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true, options:{disabled:true}},

				merchship_id: {text:'Shipment', type: dbtype.varchar(30), null:false}
			}
		},
		
		'trn_merchrv' : {
			generatetable: false, /* table digenerate dari retail/merch/merchship */
			primarykeys: ['merchrv_id'],
			comment: 'Shipment dari merchorder out',
			readonly: true,

			data: {
				merchrv_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				merchrv_date: {text:'Date ETA', type: dbtype.date, null:false},
				merchrv_descr: {text:'Descr', type: dbtype.varchar(255), null:true},				
				merchship_id: {text:'Shipment', type: dbtype.varchar(30), null:false},		
			}
		},		

		'trn_merchbillin' : {
			generatetable: false, /* table digenerate dari retail/merch/merchship */
			primarykeys: ['merchbillin_id'],
			comment: 'Invoice dari merchorder out',
			readonly: true,

			data: {
				merchbillin_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				merchbillin_date: {text:'Date', type: dbtype.date, null:false},
				merchbillin_descr: {text:'Descr', type: dbtype.varchar(255), null:true},				
				merchship_id: {text:'Shipment', type: dbtype.varchar(30), null:false},		
			}
		}
	},

	schema: {
		title: "Shipment",
		header: 'trn_merchship',
		detils: {
			'orderout' : {
				title: 'Order', table: 'trn_merchshiporderout', form: true, headerview: 'merchship_descr' ,
				editorHandler: true, listHandler: true
			},

			'budget' : {
				title: 'Budget', table: 'trn_merchshipbudget', form: true, headerview: 'merchship_descr' ,
				editorHandler: true, listHandler: true
			},
			'recv' : {
				title: 'Receive', table: 'trn_merchrv', form: true, headerview: 'merchship_descr' ,
				editorHandler: true, listHandler: true
			},
			'realisasi' : {
				title: 'Realisasi', table: 'trn_merchbillin', form: true, headerview: 'merchship_descr' ,
				overwrite:{mjs_list:true, phtml_list:true, mjs_form:true, phtml_form:true, api:true},
				editorHandler: true, listHandler: true
			},
			'preview' : {
				title: 'Preview', table: 'trn_merchship', form: false, genHandler: 'printpreview', 
				tabvisible: false,
				overwrite:{mjs:true, phtml:true}
			},
			'filter' : {
				title: 'Filter', table: 'trn_merchship', form: false, 
				tabvisible: false,
				overwrite:{mjs:false, phtml:false}
			},
			'summary' : {
				title: 'Summary', table: 'trn_merchship', form: false, 
				tabvisible: false,
				overwrite:{mjs:false, phtml:false}
			},
			'bill' : {
				title: 'Bill', table: 'trn_merchship', form: false, 
				tabvisible: false,
				overwrite:{mjs:false, phtml:false}
			},	
			'costing' : {
				title: 'Costing', table: 'trn_merchship', form: false, 
				tabvisible: false,
				overwrite:{mjs:false, phtml:false}
			}
		},
		xtions: {
			verify: {
				buttonname: 'btn_verify',
				buttontext: 'Verify',
			},
			bill: {
				buttonname: 'btn_bill',
				buttontext: 'Bill'
			},
			costing: {
				buttonname: 'btn_costing',
				buttontext: 'Costing'
			},
		},	
	}	
}