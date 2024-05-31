'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Shipment",
	autoid: true,
	printing: false,	
	committer: false,
	jsonOverwrite: true,
	commitOverwrite: false,
	uncommitOverwrite: false,
	approvalOverwrite: false,
	xprintOverwrite: false,

	creatorname: "Agung Nugroho",
	creatoremail: "agung.dhewe@gmail.com", 
	description: `
		idset shipment, untuk keperluan autogenerate dokumen yang related ke shipment
	`,

	variance: {
		"view" : {title:"Shipment (View)", data:{}},
	},

	persistent: {
		'trn_merchshipidset': {
			comment: 'Daftar Shipment',
			primarykeys: ['merchshipidset_id'],
			data: {
				merchshipidset_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				
				merchship_id: { 
					text: 'Shipment', type: dbtype.varchar(30), null: false, suppresslist: false,
					reference: {table: 'trn_merchship', field_value: 'merchship_id', field_display:'merchship_descr',  field_display_name:'merchship_descr'}, 
					options: { disabled: true, required: true, invalidMessage: 'Shipment harus diisi' }, 
				},

				merchshipidset_doc: {
					text:'Value', type: dbtype.varchar(10), null:false,
					options: {required: true, invalidMessage: 'Value harus diisi'}
				},	

				merchshipidset_value: {
					text:'Value', type: dbtype.varchar(60), null:false,
					options: {required: true, invalidMessage: 'Value harus diisi'}
				},		
				
			}
		},
	
	},

	schema: {
		title: "Shipment",
		header: 'trn_merchshipidset',
		detils: {},
		xtions: {},	
	}	
}