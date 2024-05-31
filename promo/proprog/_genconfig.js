'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo",
	autoid: true,
	// icon : "icon-order-white.svg",
	// backcolor : "#348183",
	// idprefix: 'HBS', 
	// printing: true,	
	committer: true,
	// commiter_xtion: "",
	// uncommiter_xtion: "",
	approval: true,
	// approval_xtion: "xtion-approve-merge",
	doc_id: 'PROMO',	

	persistent: {
		'mst_proprog': {
			comment: 'Daftar Promo',
			primarykeys: ['proprog_id'],
			data: {
				proprog_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				proprog_descr: { text: 'Promo Descr', type: dbtype.varchar(255), null: true, suppresslist: true},
				proprog_display: { text: 'Promo Display', type: dbtype.varchar(30), null: true, suppresslist: true, options: { required: true, invalidMessage: 'Display harus diisi' } },


				prorule_id: {
					text: 'Rule', type: dbtype.varchar(14), null: true,
					options: { required: true, invalidMessage: 'Rule harus diisi'},
					comp: comp.Combo({
						table: 'mst_prorule',
						field_value: 'prorule_id', field_display: 'prorule_name',
						api: 'retail/promo/prorule/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},	

				dept_id: { 
					text: 'Dept', type: dbtype.varchar(14), null: false,
					options: { required: true, invalidMessage: 'Dept harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},

				promodel_id: {
					text: 'Model', type: dbtype.varchar(14), null: true,
					options: { required: true, invalidMessage: 'Model harus diisi'},
					comp: comp.Combo({
						table: 'mst_promodel',
						field_value: 'promodel_id', field_display: 'promodel_name',
						api: 'retail/promo/promodel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},
			
				problock_id: {
					text: 'Block', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Block harus diisi'},
					comp: comp.Combo({
						table: 'mst_problock',
						field_value: 'problock_id', field_display: 'problock_name',
						api: 'retail/promo/problock/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},

				proprog_ispermanent: { text:'Permanent', type: dbtype.boolean, null:false, default:'0', suppresslist: true },

				proprog_dtstart: {caption:'Start', text:'Date Start', type: dbtype.date, null:false, suppresslist: true,},
				proprog_timestart: {text:'Time Start', type: dbtype.time, null:false, suppresslist: true,},

				proprog_dtend: {caption :'End', text:'Date End', type: dbtype.date, null:false, suppresslist: true},
				proprog_timeend: {text:'Time End', type: dbtype.time, null:false, suppresslist: true}, 

				proprog_valuethreshold: { text: 'Min Total Value', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true,},
				proprog_qtythreshold: { text: 'Min TotalQty', type: dbtype.int(4), null:false, default:0, suppresslist: true},



				proprog_priority: { text: 'Priority', type: dbtype.int(4), null:false, default:100, suppresslist: true, suppresslist: true},

				proprog_ishasgroupa: { text: 'Group A', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				a_proprog_label: { 
					class: 'group-a group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, options: { required: true, invalidMessage: 'Label harus diisi' } },
				a_prospot_id: {
					text: 'Spot', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prospot',
						field_value: 'prospot_id', field_display: 'prospot_name', field_display_name: 'a_prospot_name',
						api: 'retail/promo/prospot/list',
					})
				},
				a_prostep_id: {
					text: 'Step', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prostep',
						field_value: 'prostep_id', field_display: 'prostep_name', field_display_name: 'a_prostep_name',
						api: 'retail/promo/prostep/list',
					})
				},	
				a_progrouping_id: {
					text: 'Grouping', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_progrouping',
						field_value: 'progrouping_id', field_display: 'progrouping_name', field_display_name: 'a_progrouping_name',
						api: 'retail/promo/progrouping/list',
					})
				},

				a_proprog_qtythreshold: { 
					class: 'group-a group-hidden',
					text: 'Min Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true}},
				a_proprog_valuethreshold: { 
					class: 'group-a group-hidden',
					text: 'Min Value', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: {required: true}},

				a_proprog_sellprice: { 
					class: 'group-a group-hidden',
					text: 'Promo Price', type: dbtype.decimal(16,0), suppresslist: true },
				a_proprog_disc: { 
					class: 'group-a group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				a_proprog_disc: { 
					class: 'group-a group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				a_proprog_discval: { 
					class: 'group-a group-hidden',
					text: 'Disc Value', type: dbtype.decimal(16,0), null:false, default:0, suppresslist: true, options: {required: true} },

				proprog_ishasgroupb: { text: 'Group B', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				b_proprog_label: { 
					class: 'group-b group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, options: { required: true, invalidMessage: 'Label harus diisi' } },
				b_prospot_id: {
					class: 'group-b group-hidden',
					text: 'Spot', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prospot',
						field_value: 'prospot_id', field_display: 'prospot_name', field_display_name: 'b_prospot_name',
						api: 'retail/promo/prospot/list',
					})
				},
				b_proprog_qtythreshold: { 
					class: 'group-b group-hidden',
					text: 'Min Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true}},
				b_proprog_valuethreshold: { 
					class: 'group-b group-hidden',
					text: 'Min Value', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: {required: true}},
				b_proprog_sellprice: { 
					class: 'group-b group-hidden',
					text: 'Promo Price', type: dbtype.decimal(16,0), suppresslist: true },
				a_proprog_disc: { 
					class: 'group-b group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				a_proprog_qtyapplied: { 
					class: 'group-b group-hidden',
					text: 'Qty Applied', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				b_proprog_isblockonmeet: { 
					class: 'group-b group-hidden',
					text: 'Block on unmeet condition', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },




				proprog_version: {
					section: section.Begin('Status'),
					text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},

				proprog_isdisabled: { text:'Disabled', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true} },

				proprog_iscommit: { text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true} },
				proprog_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				proprog_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				
				proprog_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				proprog_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				proprog_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				proprog_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				proprog_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				proprog_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				proprog_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true,
					options: { required:true, invalidMessage:'ID harus diisi', disabled:true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				proprog_isdownload: {
					section: section.End(),
					text:'Downloaded', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},

			},
			
			defaultsearch: ['proprog_name', 'proprog_display']
		},


		'mst_proprogitemstocka' : {
			primarykeys: ['proprogitemstocka_id'],
			comment: 'Daftar Item Promo Group A',
			data: {		
				proprogitemstocka_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				itemstock_id: {
					class: 'detilitemstockrow',
					text:'Item Stock', type: dbtype.varchar(14), null:true, 
					// options: { required: true, invalidMessage: 'Item Stock harus diisi' } ,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_itemstock', 
						field_value: 'itemstock_id', field_display: 'itemstock_name', field_display_name: 'itemstock_name', 
						api: 'finact/items/itemstock/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						// onSelectedHandler: true					
					})					
				},
				itemstock_tag: { text: 'Tag', type: dbtype.varchar(90), null: true,  suppresslist: true },
				itemstock_sellprice: { text: 'Sell Price', type: dbtype.decimal(16,0),  },
				itemstock_discval: {text:'Disc Value', type: dbtype.decimal(16,0),  null:false, default: 0, },
				itemstock_disc: {text:'Disc (%)', type: dbtype.decimal(5,2),  null:false, default: 0, },

				proprog_id: { text: 'Promo', type: dbtype.varchar(14), null: false },
			},
			uniques: {
				'proprogitemstocka_pair' : ['proprog_id', 'itemstock_id']
			}	
		},

		'mst_proprogitemstockb' : {
			primarykeys: ['proprogitemstockb_id'],
			comment: 'Daftar Item Promo Group B',
			data: {		
				proprogitemstockb_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				itemstock_id: {
					class: 'detilitemstockrow',
					text:'Item Stock', type: dbtype.varchar(14), null:true, 
					// options: { required: true, invalidMessage: 'Item Stock harus diisi' } ,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_itemstock', 
						field_value: 'itemstock_id', field_display: 'itemstock_name', field_display_name: 'itemstock_name', 
						api: 'finact/items/itemstock/list',
						// onDataLoadingHandler: true,
						// onDataLoadedHandler: true,
						// onSelectingHandler: true,
						// onSelectedHandler: true					
					})					
				},
				itemstock_sellprice: { text: 'Sell Price', type: dbtype.decimal(16,0),  },
				itemstock_discval: {text:'Disc Value', type: dbtype.decimal(16,0),  null:false, default: 0, },
				itemstock_disc: {text:'Disc (%)', type: dbtype.decimal(5,2),  null:false, default: 0, },

				proprog_id: { text: 'Promo', type: dbtype.varchar(14), null: false },
			},
			uniques: {
				'proprogitemstockb_pair' : ['proprog_id', 'itemstock_id']
			}			
		},


		'mst_prosite' : {
			primarykeys: ['prosite_id'],
			comment: 'Daftar limitiasi site',
			data: {				
				prosite_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				site_id: {
					text:'Site', type: dbtype.varchar(30), null:false,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})				
				},			
				proprog_id: { text: 'Promo', type: dbtype.varchar(14), null: false },
			},
			uniques: {
				'prosite_pair' : ['proprog_id', 'site_id']
			}	
		},


		'mst_propaymethod' : {
			primarykeys: ['propaymethod_id'],
			comment: 'Daftar limitiasi Payment method',
			data: {	
				propaymethod_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				paymethod_id: {
					text:'Method', type: dbtype.varchar(14), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Payment Method harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'pos_paymethod', 
						field_value: 'paymethod_id', field_display: 'paymethod_name', 
						api: 'retail/pos/pospaymethod/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})				
				},
				paymethod_code: { text: 'Code', type: dbtype.varchar(1000) },
				proprog_id: { text: 'Promo', type: dbtype.varchar(14), null: false },
			},

			uniques: {
				'propaymethod_pair' : ['proprog_id', 'paymethod_id']
			}				
		}

	},


	schema: {
		title: 'Promo',
		header: 'mst_proprog',
		
		/* Download ditambah manual di handler
		xtions: {
			download: {
				api: 'xtion-download',
				buttonname: 'btn_download', buttontext: 'Download'
			}
		},
		*/

		detils: {
			'groupa' : {
				title: 'Item Group A', table: 'mst_proprogitemstocka', form: true, headerview: 'proprog_display', 
				editorHandler: true,
				listHandler: true,
			},

			'groupb' : {
				title: 'Item Group B', table: 'mst_proprogitemstockb', form: true, headerview: 'proprog_display', 
				editorHandler: true,
				listHandler: true,
			},			

			'site' : {
				title: 'Restrict Site', table: 'mst_prosite', form: true, headerview: 'proprog_display', 
				editorHandler: true,
				listHandler: true,
			},
			'pospaym' : {
				title: 'Restrict Payment Method', table: 'mst_propaymethod', form: true, headerview: 'proprog_display', 
				editorHandler: true,
				listHandler: true,
			}			
		}
	}


}