'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Register Type",
	autoid: false,

	persistent: {
		'mst_merchregtype' : {
			primarykeys: ['merchregtype_id'],
			comment: 'Master Register Type',
			data: {
				merchregtype_id: {text:'ID', type: dbtype.varchar(10)},
				merchregtype_name: {text:'Nama', type: dbtype.varchar(30)},
				merchregtype_iscangenerate: { text: 'Generate', type: dbtype.boolean, null: false, default: '0' },
				merchregtype_descr: {text:'Descr', type: dbtype.varchar(255)},

			},

			defaultsearch : ['merchregtype_id', 'merchregtype_name'],

			uniques: {
				'merchregtype_name' : ['merchregtype_name']
			}			
		}
	},

	schema: {
		title: 'Properties Type',
		header: 'mst_merchregtype',
		detils: {}
	}
	
}

