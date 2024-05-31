'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo Grouping",
	autoid: false,
	
	persistent: {
		'mst_progrouping' : {
			primarykeys: ['progrouping_id'],
			comment: 'Daftar Level Promo',
			data: {
				progrouping_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				progrouping_name: {text:'Grouping', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Grouping harus diisi'}},
				progrouping_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},
			uniques : {
				'progrouping_name': ['progrouping_name'],
			},
		},
	},

	schema: {
		title: 'Promo Level',
		header: 'mst_progrouping',
		detils: {
		}
	}

}



