'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo Disc Spot",
	autoid: false,
	
	persistent: {
		'mst_prospot' : {
			primarykeys: ['prospot_id'],
			comment: 'Daftar Spot Disc Promo',
			data: {
				prospot_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				prospot_name: {text:'Spot', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Spot Disc Promo harus diisi'}},
				prospot_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},

			uniques : {
				'prospot_name': ['prospot_name'],
			},
		},
	},

	schema: {
		title: 'Promo Disc Spot',
		header: 'mst_prospot',
		detils: {
		}
	}

}


