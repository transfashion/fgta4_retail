'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Retail Channel",
	autoid: false,

	persistent: {
		'mst_retailchannel' : {
			primarykeys: ['retailchannel_id'],
			comment: 'Daftar Group Season',
			data: {
				retailchannel_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				retailchannel_name: {text: 'Report', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama Report harus diisi'}}
			},
			
			uniques : {
				'retailchannel_name': ['retailchannel_name']
			},

			values: [
				{retailchannel_id: 'S1', retailchannel_name: 'BUTIK'},
				{retailchannel_id: 'S2', retailchannel_name: 'MULTI BRAND STORE'},
				{retailchannel_id: 'W1', retailchannel_name: 'WEB MAIN'},
				{retailchannel_id: 'W2', retailchannel_name: 'WEB MP'},
			]
		}
	},
	
	schema: {
		title: 'Retail Channel',
		header: 'mst_retailchannel',
		detils: {}
	}
}		