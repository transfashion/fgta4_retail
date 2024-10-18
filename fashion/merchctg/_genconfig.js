'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Category",
	autoid: false,

	persistent: {
		'fsn_merchctg' : {
			primarykeys: ['merchctg_id'],
			comment: 'Daftar Category Item Fashion Merchandise',
			data: {
				merchctg_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchctg_name: {text:'Category Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Kategori harus diisi'}},
				merchctg_nameshort: {text:'Name Short', type: dbtype.varchar(90)},
				merchctg_descr: {text:'Description', type: dbtype.varchar(255), null:false},

				gender_id: { 
					text: 'Gender', type: dbtype.varchar(7), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_gender',
						field_value: 'gender_id', field_display: 'gender_name',
						api: 'ent/general/gender/list'
					})
				},

				dept_id: { 
					text: 'Dept Owner', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Dept harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: true
					})
				},

				itemgroup_id: { 
					text: 'Item Group', type: dbtype.varchar(17), suppresslist: true,
					options: { required: true, invalidMessage: 'Item Group harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemgroup',
						field_value: 'itemgroup_id', field_display: 'itemgroup_name',
						field_mappings: [
							`{mapping: 'itemgroup_id', text: 'ID', hidden: true, style: 'width: 100px'}`,
							`{mapping: 'itemgroup_name', text: 'Item Group', style: 'width: auto; padding-left: 10px'}`,
							`{mapping: '_id', text: 'ID', style: 'width: 100px'}`,
						],
						api: 'ent/items/itemgroup/list-bydept',
						onDataLoadingHandler: true,
						onDataLoadedHandler: false,
						onSelectingHandler: true,
						onSelectedHandler: false
					})
				},


				itemclass_id: { 
					text: 'ItemClass', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'ItemClass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'ent/items/itemclass/list'
					})
				},

				unit_id: { 
					text: 'Unit', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Unit harus diisi', disabled:true }, 
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list',
						onDataLoadingHandler: false,
						onDataLoadedHandler: false,
						onSelectingHandler: false,
						onSelectedHandler: false
					})
				},


			},
			defaultsearch : ['merchctg_id', 'merchctg_name'],
			uniques: {
				'merchctg_name' : ['unit_id', 'merchctg_name']
			}
		},

		'fsn_merchctgref' : {
			comment: 'Kode referensi kategori untuk keperluan interfacing dengan system lain',
			primarykeys: ['merchctgref_id'],		
			data: {
				merchctgref_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				interface_id: { 
					text: 'Interface', type: dbtype.varchar(7), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Interface harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_interface', 
						field_value: 'interface_id', field_display: 'interface_name', field_display_name: 'interface_name', 
						api: 'ent/general/interface/list'})				
				
				},
				merchctgref_name: {text:'Name', type: dbtype.varchar(30), null:false},	
				merchctgref_code: {text:'Code', type: dbtype.varchar(30), null:false},			
				merchctgref_otherdata: {
					text:'Data', type: dbtype.varchar(1000), null:true, suppresslist:true,
					tips: 'pisahkan code dan nilai dengan semicolon (;) <b>contoh:</b> code1:nilai1; code2:nilai2; code3:nilai3',
					tipstype: 'visible'
				},	
				merchctgref_notes: {text:'Notes', type: dbtype.varchar(255), null:true},
				merchctg_id: {text:'Season', type: dbtype.varchar(14), null:false, hidden: true},
			},
			uniques: {
				'merchctgref_pair': ['interface_id', 'merchctgref_name', 'merchctgref_code']
			},			
		}

	},


	schema: {
		title: 'Category',
		header: 'fsn_merchctg',
		detils: {
			'ref' : {title: 'Referensi', table:'fsn_merchctgref', form: true, headerview:'merchctg_name', editorHandler: true, listHandler: true},
		}
	}


}
