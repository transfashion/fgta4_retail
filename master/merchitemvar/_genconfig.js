'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Variance",
	autoid: true,

	
	persistent: {
		'mst_merchitemvar' : {
			primarykeys: ['merchitemvar_id'],
			comment: 'Daftar Variance item merchandise',
			data: {
				merchitemvar_id: {text:'ID', type: dbtype.varchar(14), null:false},
				
				merchitemvar_art: {text:'ART', type: dbtype.varchar(30), null:true, options:{required:true,invalidMessage:'Artikel harus diisi'}},
				merchitemvar_mat: {text:'MAT', type: dbtype.varchar(30), null:true},
				merchitemvar_col: {text:'COL', type: dbtype.varchar(30), null:true},
			
			},

			uniques : {
				
			},

		},
	},

	schema: {
		title: 'Merchandise Variance',
		header: 'mst_merchitemvar',
		detils: {}
	}
}



