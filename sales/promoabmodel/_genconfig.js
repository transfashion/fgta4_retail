'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo AB Model",
	autoid: true,
	// icon : "icon-order-white.svg",
	// backcolor : "#348183",
	// idprefix: 'HBS', 
	// printing: true,	
	// committer: true,
	// commiter_xtion: "",
	// uncommiter_xtion: "",
	// approval: true,
	// approval_xtion: "xtion-approve-merge",
	// doc_id: 'ORDERIN',	

	persistent: {
		'mst_promoabmodel': {
			comment: 'Daftar Promo',
			primarykeys: ['promoabmodel_id'],
			data: {
				promoabmodel_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				promoabmodel_descr: { text: 'Descr', type: dbtype.varchar(255), null: true, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				promoabrule_id: {
					text: 'Rule', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Rule harus diisi'},
					comp: comp.Combo({
						table: 'mst_promoabrule',
						field_value: 'promoabrule_id', field_display: 'promoabrule_name',
						api: 'retail/sales/promoabrule/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},
				promoabrule_code: {text:'Rule Code', type: dbtype.varchar(3), null:true, suppresslist: true, uppercase: true, options: {disabled: true}},

				promoablevel_id: {
					text: 'Level', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Level harus diisi', disabled: true},
					comp: comp.Combo({
						table: 'mst_promoablevel',
						field_value: 'promoablevel_id', field_display: 'promoablevel_name',
						api: 'retail/sales/promoablevel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false	
					})
				},

				promoabrule_ishasgroupa: { 
					class: 'blockseparator',
					text: 'Group A', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				a_promoabrulesection_id: {
					class: 'group-a group-hidden',
					text: 'Rule Section', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Rule section harus diisi'},
					comp: comp.Combo({
						table: 'mst_promoabrulesection',
						field_value: 'promoabrulesection_id', field_display: 'promoabrulesection_name', field_display_name: 'a_promoabrulesection_name',
						api: 'retail/sales/promoabrule/section-list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				promoab_a_label: { 
					class: 'group-a group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, options: { required: true, invalidMessage: 'Label harus diisi' } },
				promoab_a_disc: { 
					class: 'group-a group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				promoab_a_qtythreshold: { 
					class: 'group-a group-hidden',
					text: 'Qty Threshold', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				promoab_a_qtymax: { 
					class: 'group-a group-hidden',
					text: 'Max Qty Applied', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				promoab_a_isreplacedisc: { 
					class: 'group-a group-hidden',
					text: 'Replace current discount', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				promoab_a_isblockonmeet: { 
					hidden: true, 
					// class: 'group-a group-hidden',
					text: 'Block on unmeet condition', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },


				promoabrule_ishasgroupb: { 
					class: 'blockseparator',
					text: 'Group B', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				b_promoabrulesection_id: {
					class: 'group-b group-hidden',
					text: 'Rule Section', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Rule section harus diisi'},
					comp: comp.Combo({
						table: 'mst_promoabrulesection',
						field_value: 'promoabrulesection_id', field_display: 'promoabrulesection_name', field_display_name: 'b_promoabrulesection_name',
						api: 'retail/sales/promoabrule/section-list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				promoab_b_label: { 
					class: 'group-b group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, options: { required: true, invalidMessage: 'Label harus diisi' } },
				promoab_b_disc: { 
					class: 'group-b group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				promoab_b_qtythreshold: { 
					class: 'group-b group-hidden',
					text: 'Qty Threshold', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				promoab_b_qtymax: { 
					class: 'group-b group-hidden',
					text: 'Max Qty Applied', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				promoab_b_isreplacedisc: { 
					class: 'group-b group-hidden',
					text: 'Replace current discount', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				promoab_b_isblockonmeet: { 
					class: 'group-b group-hidden',
					text: 'Block on unmeet condition', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },

			},
			
			defaultsearch: ['promoabmodel_descr']
		},

	},

	schema: {
		title: 'Promo AB Model',
		header: 'mst_promoabmodel',
		detils: {
		}
	}


}