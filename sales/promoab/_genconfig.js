'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo AB",
	autoid: true,
	// icon : "icon-order-white.svg",
	// backcolor : "#348183",
	// idprefix: 'HBS', 
	// printing: true,	
	committer: true,
	// commiter_xtion: "",
	// uncommiter_xtion: "",
	// approval: true,
	// approval_xtion: "xtion-approve-merge",
	// doc_id: 'ORDERIN',	

	persistent: {
		'mst_promoab': {
			comment: 'Daftar Promo',
			primarykeys: ['promoab_id'],
			data: {
				promoab_id: { text: 'ID', type: dbtype.varchar(10), null: false },



				brand_id: { 
					text: 'Brand', type: dbtype.varchar(14), null: false,
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})

				},


				promoabmodel_id: {
					text: 'Model', type: dbtype.varchar(14), null: true,
					options: { required: true, invalidMessage: 'Model harus diisi'},
					comp: comp.Combo({
						table: 'mst_promoabmodel',
						field_value: 'promoabmodel_id', field_display: 'promoabmodel_descr',
						api: 'retail/sales/promoabmodel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},

				promoabrule_name: {text:'Promo Name', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true, invalidMessage:'Nama Rule Promo harus diisi'}},
				promoab_descr: { text: 'Promo Descr', type: dbtype.varchar(255), null: true, suppresslist: true, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				promoabrule_dtstart: {text:'Date Start', type: dbtype.date, null:false, suppresslist: true,},
				promoabrule_timestart: {text:'Time Start', type: dbtype.time, null:false, suppresslist: true,},

				promoabrule_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},
				promoabrule_timeend: {text:'Time End', type: dbtype.time, null:false, suppresslist: true}, 

				promoabrule_ispaymdiscallowed: { caption:'Payment Disc', text: 'Allowed', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				promoabrule_valuethreshold: { text: 'Min Total Value', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true,},

				a_promoabrulesection_id: {
					class: 'blockseparator group-a group-hidden',
					section: section.Begin('Group A', {
							additionalclass:'group-a group-hidden',
							cancollapse: false,
							collapse: false
						}), 
					text: 'Rule Section', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt:'NONE', disabled: true},
					comp: comp.Combo({
						table: 'mst_promoabrulesection',
						field_value: 'promoabrulesection_id', field_display: 'promoabrulesection_name', field_display_name: 'a_promoabrulesection_name',
						api: 'retail/sales/promoabrule/section-list',
						onOnDataLoadingHandler: true,
						onOnDataLoadedHandler: false,
						onSelectingHandler: false,
						onOnSelectedHandler: false
					})
				},
				promoab_a_label: { 
					class: 'group-a group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, options: { required: true, invalidMessage: 'Label harus diisi' } },
				promoab_a_itemlist: { 
					class: 'group-a group-hidden',
					text: 'Item List', type: dbtype.varchar(30), null: true, suppresslist: true, options: { required: true, invalidMessage: 'Item List harus diisi' } },
				promoab_a_qtythreshold: { 
					class: 'group-a group-hidden',
					text: 'Min Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true}},
				promoab_a_valuethreshold: { 
					class: 'group-a group-hidden',
					text: 'Min Value', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: {required: true}},
				promoab_a_disc: { 
					class: 'group-a group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				promoab_a_qtymax: { 
					class: 'group-a group-hidden',
					text: 'Max Qty Applied', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				promoab_a_isreplacedisc: { 
					class: 'group-a group-hidden',
					text: 'Replace current discount', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				promoab_a_isblockonmeet: { 
					section: section.End(),
					class: 'group-a group-hidden',
					text: 'Block on unmeet condition', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },



				b_promoabrulesection_id: {
					class: 'blockseparator group-b group-hidden',
					section: section.Begin('Group B', {
							additionalclass:'group-b group-hidden',
							cancollapse: true,
							collapse: false
						}),
					before: `
					<!-- BEGIN: Container 2 Kolom -->
					<div style="display:flex; flex-wrap: wrap"> 
						<div style="width: 550px;"><!-- BEGIN: Kolom 1 -->

					
					`,	
					text: 'Rule Section', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt:'NONE',  disabled: true},
					comp: comp.Combo({
						table: 'mst_promoabrulesection',
						field_value: 'promoabrulesection_id', field_display: 'promoabrulesection_name', field_display_name: 'b_promoabrulesection_name',
						api: 'retail/sales/promoabrule/section-list',
						onOnDataLoadingHandler: true,
						onOnDataLoadedHandler: false,
						onSelectingHandler: false,
						onOnSelectedHandler: false
					})
				},
				promoab_b_label: { 
					class: 'group-b group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, options: { required: true, invalidMessage: 'Label harus diisi' } },
				promoab_b_itemlist: { 
					class: 'group-b group-hidden',
					text: 'Item List', type: dbtype.varchar(30), null: true, suppresslist: true, options: { required: true, invalidMessage: 'Item List harus diisi' } },
				promoab_b_qtythreshold: { 
					class: 'group-b group-hidden',
					text: 'Min Qty', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true}},
				promoab_b_valuethreshold: { 
					class: 'group-b group-hidden',
					text: 'Min Value', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: {required: true},
					after: `
						</div> <!-- END: Kolom 1 -->
						<div style="width: 550px;"> <!-- BEGIN: Kolom 2 -->
					`
				},
				promoab_b_disc: { 
					class: 'group-b group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				promoab_b_qtymax: { 
					class: 'group-b group-hidden',
					text: 'Max Qty Applied', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				promoab_b_isreplacedisc: { 
					class: 'group-b group-hidden',
					text: 'Replace current discount', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				promoab_b_isblockonmeet: { 
					section: section.End(),
					after: `

						</div> <!-- END: Kolom 2 -->
					</div> 
					<!-- END: Container 2 Kolom -->
					`,

					class: 'group-b group-hidden',
					text: 'Block on unmeet condition', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },



				promoabrule_id: {
					section: section.Begin('Setting'), 
					text: 'Rule', type: dbtype.varchar(2), null: true,
					options: { required: true, invalidMessage: 'Rule harus diisi', disabled: true},
					comp: comp.Combo({
						table: 'mst_promoabrule',
						field_value: 'promoabrule_id', field_display: 'promoabrule_name',
						api: 'retail/sales/promoabrule/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})
				},
				promoabrule_code: {text:'Rule Code', type: dbtype.varchar(3), options: {disabled: true}},	
				brand_nameshort: {text:'Brand Code', type: dbtype.varchar(10), null:false, uppercase: true, options:{disabled: true, required:true, invalidMessage:'Brand Shortname harus diisi'}},


				promoabrule_ishasgroupa: { text: 'Group A', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled: true, labelWidth:'300px' } },
				promoabrule_ishasgroupb: { 
					section: section.End(),
					text: 'Group B', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { disabled: true, labelWidth:'300px' } },


				promoab_version: {
					section: section.Begin('Status'),
					text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}
				},
				promoab_iscommit: {
					text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},
				promoab_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				promoab_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				promoab_isdownload: {
					section: section.End(),
					text:'Downloaded', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}
				},

			},
			
			defaultsearch: ['promoabrule_name', 'promoab_descr']
		},


		'mst_promoabsite' : {
			primarykeys: ['promoabsite_id'],
			comment: 'Daftar limitiasi site',
			data: {				
				promoabsite_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				site_id: {
					text:'Site', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
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
				site_code: { text: 'Code', type: dbtype.varchar(30) },

				promoab_id: { text: 'Promo', type: dbtype.varchar(10), null: false },
			},

			uniques: {
				'promoabsite_pair' : ['promoab_id', 'site_code']
			}	

		},


		'mst_promoabpospaym' : {
			primarykeys: ['promoabpospaym_id'],
			comment: 'Daftar limitiasi site',
			data: {	
				promoabpospaym_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				pospaym_code: { text: 'Code', type: dbtype.varchar(30) },
				promoab_id: { text: 'Promo', type: dbtype.varchar(10), null: false },
			},

			uniques: {
				'promoabpospaym_pair' : ['promoab_id', 'pospaym_code']
			}				
		}




	},

	schema: {
		title: 'Promo AB',
		header: 'mst_promoab',
		
		/* Download ditambah manual di handler
		xtions: {
			download: {
				api: 'xtion-download',
				buttonname: 'btn_download', buttontext: 'Download'
			}
		},
		*/

		detils: {
			'site' : {
				title: 'Restrict Site', table: 'mst_promoabsite', form: true, headerview: 'promoab_descr', 
				editorHandler: true,
				listHandler: true,
			},
			'pospaym' : {
				title: 'Restrict Pos Payment', table: 'mst_promoabpospaym', form: true, headerview: 'promoab_descr', 
				editorHandler: true,
				listHandler: true,
			}			
		}
	}


}