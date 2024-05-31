'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Properties Type",
	autoid: false,

	persistent: {
		'mst_merchproptype' : {
			primarykeys: ['merchproptype_id'],
			comment: 'Master Data Properties Type',
			data: {
				merchproptype_id: {text:'ID', type: dbtype.varchar(20), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchproptype_name: {text:'Nama', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Tipe Properti harus diisi'}},
				merchproptype_group: {text:'Group', type: dbtype.varchar(20), null:false, uppercase: true},
			},

			defaultsearch : ['merchproptype_id', 'merchproptype_name'],

			uniques: {
				'merchproptype_name' : ['merchproptype_name']
			}			
		}
	},

	schema: {
		title: 'Properties Type',
		header: 'mst_merchproptype',
		detils: {}
	}
	
}

