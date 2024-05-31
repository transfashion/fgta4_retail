'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo Level",
	autoid: false,
	
	persistent: {
		'mst_prolevel' : {
			primarykeys: ['prolevel_id'],
			comment: 'Daftar Level Promo',
			data: {
				prolevel_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				prolevel_name: {text:'Level', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Level harus diisi'}},
				prolevel_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},
			uniques : {
				'prolevel_name': ['prolevel_name'],
			},
		},
	},

	schema: {
		title: 'Promo Level',
		header: 'mst_prolevel',
		detils: {
		}
	}

}



