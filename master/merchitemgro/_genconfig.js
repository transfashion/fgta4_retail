'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Groups",
	autoid: false,

	persistent: {
		
		'mst_merchitemgro' : {
			primarykeys: ['merchitemgro_id'],
			comment: 'Daftar Group Merchandise',
			data: {
				merchitemgro_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchitemgro_name: {text:'Group Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Group harus diisi'}},
				merchitemgro_nameshort: {text:'Name Short', type: dbtype.varchar(90)},
				merchitemgro_descr: {text:'Description', type: dbtype.varchar(255)},

				gender_id: { 
					text: 'Gender', type: dbtype.varchar(7), uppercase: true, null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_gender',
						field_value: 'gender_id', field_display: 'gender_name',
						api: 'ent/general/gender/list'
					})
				},

				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Cluster harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				}			
			},
			defaultsearch : ['merchitemgro_id', 'merchitemgro_name'],
			uniques: {
				'merchitemgro_name' : ['brand_id', 'merchitemgro_name', 'merchitemgro_nameshort']
			}
		},


		'mst_merchitemgropic' : {
			primarykeys: ['merchitemgropic_id'],
			comment: 'Daftar Picture Category Merch Item',
			data: {
				merchitemgropic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitemgropic_name: {text:'Name', type: dbtype.varchar(30), null:false, options: {required:true,invalidMessage:'Picture Name harus diisi'}},	
				merchitemgropic_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				merchitemgropic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				merchitemgropic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				merchsea_id: {
					text:'Season', type: dbtype.varchar(10), null:true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_merchsea', 
						field_value: 'merchsea_id', field_display: 'merchsea_name', 
						api: 'retail/master/merchsea/list'})
				},
				merchitemgro_id: {text:'Group', type: dbtype.varchar(30), null:false},


			},
			defaultsearch: ['merchitemgropic_id', 'merchitemgropic_name', 'merchitemgropic_descr'],
			uniques: {
				'merchitemgropic_name' : ['merchitemgro_id', 'merchitemgropic_name']
			}
		},	
		
		
		'mst_merchitemgroprop' : {
			primarykeys: ['merchitemgroprop_id'],
			comment: 'Daftar Properties Category Merch Item',
			data: {
				merchitemgroprop_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchproptype_id: { 
					text: 'Prop Type', type: dbtype.varchar(20), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Properties harus diisi' }, 
					comp: comp.Combo({
						table: 'web_webproptype',
						field_value: 'webproptype_id', field_display: 'webproptype_name',
						api: 'retail/master/merchproptype/list'
					})
				},
				merchitemcatprop_value: {text:'Value', type: dbtype.varchar(255), null:false, options: {required:true,invalidMessage:'Value harus diisi'}},	
				merchitemgro_id: {text:'Group', type: dbtype.varchar(30), null:false},	
			},
			defaultsearch: ['merchitemcatpic_id', 'merchitemcatpic_descr'],
			uniques: {
				'merchitemgropic_name' : ['merchitemgro_id', 'merchproptype_id']
			}
		},		

	},


	schema: {
		title: 'Merchandise Groups',
		header: 'mst_merchitemgro',
		detils: {
			'picture': {title: 'Picture', table: 'mst_merchitemgropic', form: true, headerview: 'merchitemcat_name' },
			'prop': {title: 'Properties', table: 'mst_merchitemgroprop', form: true, headerview: 'merchitemcat_name' }
		}
	}

	
}
