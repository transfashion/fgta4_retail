'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo Model",
	autoid: true,
	
	jsonOverwrite: true,
	persistent: {
		'mst_promodel': {
			comment: 'Daftar Promo',
			primarykeys: ['promodel_id'],
			data: {
				promodel_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				promodel_name: { text: 'Name', type: dbtype.varchar(255), null: true, uppercase:true, options: { required: true, invalidMessage: 'Name harus diisi' } },
				promodel_descr: { text: 'Descr', type: dbtype.varchar(255), null: true },

				prorule_id: {
					text: 'Rule', type: dbtype.varchar(2), null: true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Rule harus diisi'},
					options: { required: false, prompt:'NONE'},
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
				prorule_fn: {text:'Function Name', type: dbtype.varchar(90), null:true, suppresslist: true, options: {disabled: true}},

				prolevel_id: {
					text: 'Level', type: dbtype.varchar(2), null: true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Level harus diisi', disabled: true},
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prolevel',
						field_value: 'prolevel_id', field_display: 'prolevel_name',
						api: 'retail/promo/prolevel/list'
					})
				},

				prorule_ishasgroupa: { 
					class: 'blockseparator',
					text: 'Group A', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				a_prorulesec_id: {
					class: 'group-a group-hidden',
					text: 'Rule Section', type: dbtype.varchar(14), null: true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Rule section harus diisi'},
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prorulesec',
						field_value: 'prorulesec_id', field_display: 'prorulesec_name', field_display_name: 'a_prorulesec_name',
						api: 'retail/promo/prorule/section-list',
					})
				},
				a_prorulesec_label: { 
					class: 'group-a group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, 
					// options: { required: true, invalidMessage: 'Label harus diisi' } 
				},
				a_prospot_id: {
					text: 'Spot', type: dbtype.varchar(2), null: true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Spot harus diisi'},
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prospot',
						field_value: 'prospot_id', field_display: 'prospot_name', field_display_name: 'a_prospot_name',
						api: 'retail/promo/prospot/list',
					})
				},
				a_prostep_id: {
					text: 'Step', type: dbtype.varchar(2), null: true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Step harus diisi'},
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prostep',
						field_value: 'prostep_id', field_display: 'prostep_name', field_display_name: 'a_prostep_name',
						api: 'retail/promo/prostep/list',
					})
				},				
				a_proprog_disc: { 
					class: 'group-a group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				a_proprog_qtythreshold: { 
					class: 'group-a group-hidden',
					text: 'Qty Threshold', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				a_proprog_qtymax: { 
					class: 'group-a group-hidden',
					text: 'Max Qty Applied', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },


				a_proprog_isblockonmeet: { 
					hidden: true, 
					// class: 'group-a group-hidden',
					text: 'Block on unmeet condition', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },


				prorule_ishasgroupb: { 
					class: 'blockseparator',
					text: 'Group B', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				b_prorulesec_id: {
					class: 'group-b group-hidden',
					text: 'Rule Section', type: dbtype.varchar(14), null: true, suppresslist: true,
					// options: { required: true, invalidMessage: 'Rule section harus diisi'},
					options: { required: false, prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_prorulesec',
						field_value: 'prorulesec_id', field_display: 'prorulesec_name', field_display_name: 'b_prorulesec_name',
						api: 'retail/promo/prorule/section-list',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},
				b_prorulesec_label: { 
					class: 'group-b group-hidden',
					text: 'Label', type: dbtype.varchar(20), null: true,  suppresslist: true, 
					// options: { required: true, invalidMessage: 'Label harus diisi' } 
				},
				b_proprog_disc: { 
					class: 'group-b group-hidden',
					text: 'Disc (%)', type: dbtype.decimal(4,1), null: false, default:0, suppresslist: true, options: {required: true}},
				b_proprog_qtythreshold: { 
					class: 'group-b group-hidden',
					text: 'Qty Threshold', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },
				b_proprog_qtymax: { 
					class: 'group-b group-hidden',
					text: 'Max Qty Applied', type: dbtype.int(4), null:false, default:0, suppresslist: true, options: {required: true} },

				b_proprog_isblockonmeet: { 
					class: 'group-b group-hidden',
					text: 'Block on unmeet condition', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },

			},
			
			defaultsearch: ['promodel_name'],
			uniques : {
				'promodel_name': ['promodel_name'],
			},

		},

	},

	schema: {
		title: 'Promo Model',
		header: 'mst_promodel',
		detils: {
		}
	}


}