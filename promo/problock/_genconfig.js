'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Promo Block",
	autoid: false,
	
	persistent: {
		'mst_problock' : {
			primarykeys: ['problock_id'],
			comment: 'Daftar Level Promo',
			data: {
				problock_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				problock_name: {text:'Level', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Block harus diisi'}},
				problock_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},
			uniques : {
				'problock_name': ['problock_name'],
			},
		},
	},

	schema: {
		title: 'Promo Block',
		header: 'mst_problock',
		detils: {
		}
	}

}



