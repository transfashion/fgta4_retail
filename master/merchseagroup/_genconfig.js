'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Season Group",
	autoid: false,

	persistent: {
		'mst_merchseagroup' : {
			primarykeys: ['merchseagroup_id'],
			comment: 'Daftar Group Season',
			data: {
				merchseagroup_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				merchseagroup_name: {text: 'Season Group', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama Group harus diisi'}}
			},
			
			uniques : {
				'merchseagroup_name': ['merchseagroup_name']
			},

			values: [
				{merchseagroup_id: 'FW', merchseagroup_name: 'FW'},
				{merchseagroup_id: 'SS', merchseagroup_name: 'SS'},
			]
		}
	},
	
	schema: {
		title: 'Season Group',
		header: 'mst_merchseagroup',
		detils: {}
	}
}		