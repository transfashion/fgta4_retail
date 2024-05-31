'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "PromoAB Level",
	autoid: false,
	
	persistent: {
		'mst_promoablevel' : {
			primarykeys: ['promoablevel_id'],
			comment: 'Daftar Level Promo',
			data: {
				promoablevel_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				promoablevel_name: {text:'Level', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Rule Promo harus diisi'}},
				promoablevel_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},

			uniques : {
				'promoablevel_name': ['promoablevel_name'],
			},
		},
	},

	schema: {
		title: 'Promo Level',
		header: 'mst_promoablevel',
		detils: {
		}
	}

}



