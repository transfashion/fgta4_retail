'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Category ITem Merchandise",
	autoid: false,

	persistent: {
		'mst_merchitemctg' : {
			primarykeys: ['merchitemctg_id'],
			comment: 'Daftar Category',
			data: {
				merchitemctg_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchitemctg_name: {text:'Category Name', type: dbtype.varchar(255), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Site harus diisi'}},
				merchitemctg_nameshort: {text:'Name Short', type: dbtype.varchar(255)},
				// merchitemctg_map: {text:'Map To', type: dbtype.varchar(255)},
				merchitemctg_descr: {text:'Description', type: dbtype.varchar(255), null:false},

				merchitemgro_id: { 
					text: 'Group', type: dbtype.varchar(30), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Group harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchitemgro',
						field_value: 'merchitemgro_id', field_display: 'merchitemgro_name',
						api: 'retail/master/merchitemgro/list'
					})
				},


				itemctg_id: { 
					text: 'Item Category', type: dbtype.varchar(30), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Item Category harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemctg',
						field_value: 'itemctg_id', field_display: 'itemctg_name',
						api: 'finact/items/itemctg/list'
					})
				},


				merchrpt_id: { 
					text: 'Report', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Report harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchrpt',
						field_value: 'merchrpt_id', field_display: 'merchrpt_name',
						api: 'retail/master/merchrpt/list'
					})
				},	

				gender_id: { 
					text: 'Gender', type: dbtype.varchar(7), uppercase: true, null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Gender harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_gender',
						field_value: 'gender_id', field_display: 'gender_name',
						api: 'ent/general/gender/list'
					})
				},

				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				},
				
				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},			

			},
			defaultsearch : ['merchitemctg_id', 'merchitemctg_name'],
			uniques: {
				'merchitemctg_name' : ['brand_id', 'merchitemctg_name'],
				// 'merchitemctg_map' : ['brand_id', 'merchitemctg_map'],
			}
		},

		'mst_merchitemctgpic' : {
			primarykeys: ['merchitemctgpic_id'],
			comment: 'Daftar Picture Category Merch Item',
			data: {
				merchitemctgpic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitemctgpic_name: {text:'Name', type: dbtype.varchar(30), null:false, options: {required:true,invalidMessage:'Picture Name harus diisi'}},	
				merchitemctgpic_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				merchitemctgpic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				merchitemctgpic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				merchsea_id: {
					text:'Season', type: dbtype.varchar(10), null:true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_merchsea', 
						field_value: 'merchsea_id', field_display: 'merchsea_name', 
						api: 'retail/master/merchsea/list'})
				},
				merchitemctg_id: {text:'ID', type: dbtype.varchar(30), null:false},	
			},
			defaultsearch: ['merchitemctgpic_id', 'merchitemctgpic_descr'],
			uniques: {
				'merchitemctgpic_name' : ['merchitemctg_id', 'merchitemctgpic_name']
			}
		},

		'mst_merchitemctgprop' : {
			primarykeys: ['merchitemctgprop_id'],
			comment: 'Daftar Properties Category Merch Item',
			data: {
				merchitemctgprop_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchproptype_id: { 
					text: 'Prop Type', type: dbtype.varchar(20), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Properties harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchproptype',
						field_value: 'merchproptype_id', field_display: 'merchproptype_name',
						api: 'retail/master/merchproptype/list'
					})
				},
				merchitemctgprop_value: {text:'Value', type: dbtype.varchar(90), null:false, options: {required:true,invalidMessage:'Value harus diisi'}},	
				merchitemctg_id: {text:'ID', type: dbtype.varchar(30), null:false},	
			},
			defaultsearch: ['merchitemctgpic_id', 'merchitemctgpic_descr'],
			uniques: {}
		},	
		
		'mst_merchitemctgref' : {
			comment: 'Kode referensi merchandise item kategori untuk keperluan interfacing dengan system lain',
			primarykeys: ['merchitemctgref_id'],		
			data: {
				merchitemctgref_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				},				
				interface_id: { 
					text: 'Interface', type: dbtype.varchar(7), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Interface harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_interface', 
						field_value: 'interface_id', field_display: 'interface_name', field_display_name: 'interface_name', 
						api: 'ent/general/interface/list'})				
				
				},
				merchitemctgref_code: {text:'Code', type: dbtype.varchar(90), null:false},			
				merchitemctgref_value: {text:'Value', type: dbtype.varchar(255), null:true},			
				merchitemctg_id: {text:'ID', type: dbtype.varchar(30), null:false},
			},
			uniques: {
				'merchitemctgref_pair': ['brand_id', 'interface_id', 'merchitemctgref_code', 'merchitemctgref_value']
			},			
		}		


	},


	schema: {
		title: 'Category',
		header: 'mst_merchitemctg',
		detils: {
			'picture': {title: 'Picture', table: 'mst_merchitemctgpic', form: true, headerview: 'merchitemctg_name', editorHandler: true, listHandler: true },
			'prop': {title: 'Properties', table: 'mst_merchitemctgprop', form: true, headerview: 'merchitemctg_name', editorHandler: true, listHandler: true },
			'ref': {title: 'Referensi', table: 'mst_merchitemctgref', form: true, headerview: 'merchitemctg_name', editorHandler: true, listHandler: true },
		}
	}


}
