'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Season",
	autoid: false,

	
	persistent: {
		'mst_merchsea' : {
			primarykeys: ['merchsea_id'],
			comment: 'Daftar Season',
			data: {
				merchsea_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchsea_name: {text:'Season', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Season harus diisi'}},
				merchsea_namedisplay: {text:'Display Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Display Name harus diisi'}},
				merchsea_year: {text:'Year', type: dbtype.int(4), null:false, options:{groupSeparator:''} },
				merchsea_yearmaxvisible: {text:'Visible Until', type: dbtype.int(4), null:false, options:{groupSeparator:''} },
				merchsea_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				merchsea_datestart: {text:'Start', type: dbtype.date, null:false, suppresslist: true},
				merchsea_dateend: {text:'End', type: dbtype.date, null:false, suppresslist: true},
				merchseagroup_id: {
					text:'Season Group', type: dbtype.varchar(2), null:false, 
					options:{required:true,invalidMessage:'Group Season harus diisi'},
					comp: comp.Combo({
						table: 'mst_merchseagroup', 
						field_value: 'merchseagroup_id', field_display: 'merchseagroup_name', 
						api: 'retail/master/merchseagroup/list'})
				}			
			},

			uniques : {
				'merchsea_name': ['merchsea_name']
			},

		},



		'mst_merchsearef' : {
			comment: 'Kode referensi season untuk keperluan interfacing dengan system lain',
			primarykeys: ['merchsearef_id'],		
			data: {
				merchsearef_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				interface_id: { 
					text: 'Interface', type: dbtype.varchar(7), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Interface harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_interface', 
						field_value: 'interface_id', field_display: 'interface_name', field_display_name: 'interface_name', 
						api: 'ent/general/interface/list'})				
				
				},
				merchsearef_code: {text:'Code', type: dbtype.varchar(30), null:false},			
				merchsea_id: {text:'Season', type: dbtype.varchar(14), null:false, hidden: true},
			},
			uniques: {
				'merchsearef_pair': ['merchsea_id', 'interface_id', 'merchsearef_code']
			},			
		}


	},

	schema: {
		title: 'Season',
		header: 'mst_merchsea',
		detils: {
			'ref' : {title: 'Referensi', table:'mst_merchsearef', form: true, headerview:'merchsea_name', editorHandler: true, listHandler: true},
		}
	}

}



