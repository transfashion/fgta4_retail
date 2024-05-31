'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Size Tag",
	autoid: false,

	persistent: {
		'mst_merchsizetag' : {
			primarykeys: ['merchsizetag_id'],
			comment: 'Daftar Size Tag',
			data: {
				merchsizetag_id: {text:'ID', type: dbtype.varchar(20), null:false, uppercase: true},
				merchsizetag_name: {text: 'Name', type: dbtype.varchar(90), null:false, uppercase: true,  options:{required:true,invalidMessage:'Nama Report harus diisi'}},

				merchsizetag_c01: {text:'C-01', type: dbtype.varchar(20), null:true},
				merchsizetag_c02: {text:'C-02', type: dbtype.varchar(20), null:true},
				merchsizetag_c03: {text:'C-03', type: dbtype.varchar(20), null:true},
				merchsizetag_c04: {text:'C-04', type: dbtype.varchar(20), null:true},
				merchsizetag_c05: {text:'C-05', type: dbtype.varchar(20), null:true},
				merchsizetag_c06: {text:'C-06', type: dbtype.varchar(20), null:true},
				merchsizetag_c07: {text:'C-07', type: dbtype.varchar(20), null:true},
				merchsizetag_c08: {text:'C-08', type: dbtype.varchar(20), null:true},
				merchsizetag_c09: {text:'C-09', type: dbtype.varchar(20), null:true},
				merchsizetag_c10: {text:'C-10', type: dbtype.varchar(20), null:true},
				merchsizetag_c11: {text:'C-11', type: dbtype.varchar(20), null:true},
				merchsizetag_c12: {text:'C-12', type: dbtype.varchar(20), null:true},
				merchsizetag_c13: {text:'C-13', type: dbtype.varchar(20), null:true},
				merchsizetag_c14: {text:'C-14', type: dbtype.varchar(20), null:true},
				merchsizetag_c15: {text:'C-15', type: dbtype.varchar(20), null:true},
				merchsizetag_c16: {text:'C-16', type: dbtype.varchar(20), null:true},
				merchsizetag_c17: {text:'C-17', type: dbtype.varchar(20), null:true},
				merchsizetag_c18: {text:'C-18', type: dbtype.varchar(20), null:true},
				merchsizetag_c19: {text:'C-19', type: dbtype.varchar(20), null:true},
				merchsizetag_c20: {text:'C-20', type: dbtype.varchar(20), null:true},
				merchsizetag_c21: {text:'C-21', type: dbtype.varchar(20), null:true},
				merchsizetag_c22: {text:'C-22', type: dbtype.varchar(20), null:true},
				merchsizetag_c23: {text:'C-23', type: dbtype.varchar(20), null:true},
				merchsizetag_c24: {text:'C-24', type: dbtype.varchar(20), null:true},
				merchsizetag_c25: {text:'C-25', type: dbtype.varchar(20), null:true}

			},
			
			uniques : {
				'merchsizetag_name': ['merchsizetag_name']
			}
		}
	},
	
	schema: {
		title: 'Size Tag',
		header: 'mst_merchsizetag',
		detils: {}
	}
}		