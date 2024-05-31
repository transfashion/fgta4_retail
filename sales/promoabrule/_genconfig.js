'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "PromoAB Rule",
	autoid: false,
	
	persistent: {
		'mst_promoabrule' : {
			primarykeys: ['promoabrule_id'],
			comment: 'Daftar Rule Promo',
			data: {

				promoabrule_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},

				promoablevel_id: {
					text: 'Level', type: dbtype.varchar(2), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Level harus diisi'},
					comp: comp.Combo({
						table: 'mst_promoablevel',
						field_value: 'promoablevel_id', field_display: 'promoablevel_name',
						api: 'retail/sales/promoablevel/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true	
					})
				},

				promoabrule_code: {text:'Code', type: dbtype.varchar(3), null:true, suppresslist: true, uppercase: true},
				promoabrule_name: {text:'Name', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Rule Promo harus diisi'}},
				promoabrule_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},

				promoabrule_ishasgroupa: { 
					caption: 'Items Grouping',
					text: 'Group A', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
				promoabrule_ishasgroupb: { 
					text: 'Group B', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: { labelWidth:'300px' } },
	
			},

			uniques : {
				'promoabrule_code': ['promoabrule_code'],
				'promoabrule_name': ['promoabrule_name']
			},
		},

		'mst_promoabrulesection' : {
			primarykeys: ['promoabrulesection_id'],
			comment: 'Daftar Rule Promo',
			data: {
				promoabrulesection_id: {text:'ID', type: dbtype.varchar(14), null:false},
				promoabrulesection_name: {text:'Name', type: dbtype.varchar(20), null:false, options:{required:true,invalidMessage:'Nama Rule Section harus diisi'}},
				promoabrulesection_descr: {text:'Descr', type: dbtype.varchar(255)},
				promoabrule_id: {text:'ID', type: dbtype.varchar(2), null:false, hidden: true},
			},

			uniques : {
				'promoabrulesection_name': ['promoabrule_id', 'promoabrulesection_name']
			},		
		}
	},

	schema: {
		title: 'Promo Rule',
		header: 'mst_promoabrule',
		detils: {
			'section' : {title: 'Section', table:'mst_promoabrulesection', form: true, headerview:'promoabrule_name', editorHandler: true, listHandler: true},
		}
	}

}



