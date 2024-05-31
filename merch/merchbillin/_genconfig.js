'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merch Bill In",
	autoid: true,
	printing: true,	
	committer: true,
	jsonOverwrite: true,
	commitOverwrite: true,
	uncommitOverwrite: true,
	approvalOverwrite: true,

	variance: {
		"entry" : {
			title:"Shipment Bill (Entry)", 
			data: {}
		},

		"proforma" : {
			title:"Shipment Bill (Proforma)",
			data: {}
		},

		"post" : {
			title:"Shipment Bill (Posting)",
			data: {}
		}
	},
	
	persistent: {
		'trn_merchbillin' : {
			comment: 'Daftar Receiving Dokumen',
			primarykeys: ['merchbillin_id'],
			data: {
				merchbillin_id: {text:'ID', type: dbtype.varchar(30), null:false},		

				merchbilltype_id: {
					text: 'Bill Type', type: dbtype.varchar(10), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Type bill harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Tipe Bill',
						table: 'mst_merchbilltype',
						field_value: 'merchbilltype_id', field_display: 'merchbilltype_name',
						api: 'retail/master/merchbilltype/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},
				merchbillin_isproforma: {text:'Proforma', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
			
				unit_id: {
					text: 'Unit', type: dbtype.varchar(30), null: true, suppresslist: true, 
					options: { required: true, invalidMessage: 'Unit harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Unit',
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
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
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},

				merchbillin_ref: {
					text:'Ref', type: dbtype.varchar(30), null:true, suppresslist: true,
					options:{required:true,invalidMessage:'Referensi Invoice harus diisi'},
					tips:'no invoice original',
					tipstype:'visible'
				},

				merchbillin_date: {text:'Date', type: dbtype.date, null:false, suppresslist: true},
				merchbillin_datedue: {text:'Due Date', type: dbtype.date, null:false, suppresslist: true},
				merchbillin_descr: {text:'Descr', type: dbtype.varchar(255), null:true},				

				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
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

				merchbillin_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				merchbillin_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchbillin_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchbillin_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				merchbillin_ispost: {text:'Post', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				merchbillin_postby: {text:'PostBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				merchbillin_postdate: {text:'PostDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			}
		},


		'trn_merchbillindet' : {
			comment: 'Daftar Receiving Dokumen',
			primarykeys: ['merchbillindet_id'],
			data: {
				merchbillindet_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchbillindet_descr: {text:'Name', type: dbtype.varchar(255), null:true},

				merchshipbudget_id: { 
					text: 'Periode', type: dbtype.varchar(10), null: false, suppresslist: false, 
					options: { required: true, invalidMessage: 'Budget harus diisi' }, 
					comp: comp.Combo({
						title: 'Pilih Budget Shipment',
						table: 'mst_merchshipbudget',
						field_value: 'merchshipbudget_id', field_display: 'merchshipbudget_name',
						api: 'retail/master/merchshipbudget/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})				
				},

				merchbillindet_qty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true},
				merchbillindet_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},

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
				merchbillindet_idr: { text: 'IDR', type: dbtype.decimal(14,2), null:false, default:0, suppresslist: true},

				merchbillin_id: {text:'Bill', type: dbtype.varchar(30), null:false},		
			}
		}


	},

	schema: {
		title: 'Bill In',
		header: 'trn_merchbillin',
		detils: {
			
			'items' : {
				title: 'Items', table: 'trn_merchbillindet', form: true, headerview: 'merchbillin_descr' ,
				editorHandler: true, listHandler: true
			}

		},

		xtions: {
			generate: {
				api: 'xtion-post',
				buttonname: 'btn_post',
				buttontext: 'Post'
			},
		}
	}	
}			


