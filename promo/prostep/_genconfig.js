'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo Disc Step",
	autoid: false,
	
	persistent: {
		'mst_prostep' : {
			primarykeys: ['prostep_id'],
			comment: 'Daftar Step Disc Promo',
			data: {
				prostep_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				prostep_name: {text:'Step', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Step Disc Promo harus diisi'}},
				prostep_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},

			uniques : {
				'prostep_name': ['prostep_name'],
			},
		},
	},

	schema: {
		title: 'Promo Disc Spot',
		header: 'mst_prostep',
		detils: {
		}
	}

}


