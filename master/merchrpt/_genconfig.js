'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Report",
	autoid: false,

	persistent: {
		'mst_merchrpt' : {
			primarykeys: ['merchrpt_id'],
			comment: 'Daftar Group Season',
			data: {
				merchrpt_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				merchrpt_name: {text: 'Report', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama Report harus diisi'}}
			},
			
			uniques : {
				'merchrpt_name': ['merchrpt_name']
			},

			values: [
				{merchrpt_id: 'M', merchrpt_name: 'MERCHANDISE'},
				{merchrpt_id: 'P', merchrpt_name: 'PART'},
				{merchrpt_id: 'C', merchrpt_name: 'CONSUMABLE GOODS'},
			]
		}
	},
	
	schema: {
		title: 'Merchandise Report',
		header: 'mst_merchrpt',
		detils: {}
	}
}		