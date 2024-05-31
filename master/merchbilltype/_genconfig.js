'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Bill Type",
	autoid: false,

	persistent: {
		'mst_merchbilltype' : {
			primarykeys: ['merchbilltype_id'],
			comment: 'Daftar Type Bill',
			data: {
				merchbilltype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				merchbilltype_name: {text: 'Name', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama harus diisi'}},

			},
			
			uniques : {
				'merchbilltype_name': ['merchbilltype_name']
			},

			values: [
				{merchbilltype_id:"B001", merchbilltype_name:"ITEMS INVOICE"},
				{merchbilltype_id:"B002", merchbilltype_name:"IMPORT DUTY"},
				{merchbilltype_id:"B003", merchbilltype_name:"FREIGHT"},
				{merchbilltype_id:"B004", merchbilltype_name:"CLEARANCE"},
				{merchbilltype_id:"B005", merchbilltype_name:"PORT CHARGE"},
				{merchbilltype_id:"B006", merchbilltype_name:"INSURANCE"},
				{merchbilltype_id:"B007", merchbilltype_name:"INSPECTIONS"},
			]
		}
	},
	
	schema: {
		title: 'Bill Type',
		header: 'mst_merchbilltype',
		detils: {}
	}


}		