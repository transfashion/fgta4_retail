'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo Rule",
	autoid: false,
	
	persistent: {
		'mst_prorule' : {
			primarykeys: ['prorule_id'],
			comment: 'Daftar Rule Promo',
			data: {

				prorule_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				prolevel_id: {
					text: 'Level', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Level harus diisi'},
					comp: comp.Combo({
						table: 'mst_prolevel',
						field_value: 'prolevel_id', field_display: 'prolevel_name',
						api: 'retail/promo/prolevel/list',
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

				prorule_name: {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Rule Promo harus diisi'}},
				prorule_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},

				prorule_lib: {text:'Library', type: dbtype.varchar(90), null:true, suppresslist: true, options:{required:true,invalidMessage:'Nama Library harus diisi'}},
				prorule_fn: {text:'Function Name', type: dbtype.varchar(90), null:true, suppresslist: true, options:{required:true,invalidMessage:'Nama Fungsi harus diisi'}},

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
					options: { required: true, invalidMessage: 'Step harus diisi'},
					comp: comp.Combo({
						table: 'mst_prostep',
						field_value: 'prostep_id', field_display: 'prostep_name', field_display_name: 'a_prostep_name',
						api: 'retail/promo/prostep/list',
					})
				},
				prorule_ishasgroupa: { 
					caption: 'Items Grouping',
					text: 'Group A', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				prorule_ishasgroupb: { 
					text: 'Group B', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
						
			},

			uniques : {
				'prorule_name': ['prorule_name']
			},
		},

		'mst_prorulesec' : {
			primarykeys: ['prorulesec_id'],
			comment: 'Daftar Section Rule Promo',
			data: {
				prorulesec_id: {text:'ID', type: dbtype.varchar(14), null:false},
				prorulesec_name: {text:'Name', type: dbtype.varchar(20), null:false, options:{required:true,invalidMessage:'Nama Rule Section harus diisi'}},
				prorulesec_label: {text:'Name', type: dbtype.varchar(20), null:false, options:{required:true,invalidMessage:'Label Section harus diisi'}},
				prorulesec_descr: {text:'Descr', type: dbtype.varchar(255)},
				prorule_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},
			},

			uniques : {
				'prorulesec_name': ['prorule_id', 'prorulesec_name']
			},		
		}
	},

	schema: {
		title: 'Promo Rule',
		header: 'mst_prorule',
		detils: {
			'section' : {title: 'Section', table:'mst_prorulesec', form: true, headerview:'prorule_name', editorHandler: true, listHandler: true},
		}
	}

}



