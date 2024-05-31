'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Merchandise",
	autoid: true,

	
	persistent: {
		'mst_merchitem' : {
			primarykeys: ['merchitem_id'],
			comment: 'Daftar Season',
			data: {
				merchitem_id: {text:'ID', type: dbtype.varchar(14), null:false},

				merchitem_art: {text:'ART', type: dbtype.varchar(30), null:true, options:{required:true,invalidMessage:'Artikel harus diisi'}},
				merchitem_mat: {text:'MAT', type: dbtype.varchar(30), null:true},
				merchitem_col: {text:'COL', type: dbtype.varchar(30), null:true},
				merchitem_size: {text:'SIZE', type: dbtype.varchar(20), null:true},
				merchitem_name: {text:'Name', type: dbtype.varchar(255), null:true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				merchitem_descr: {text:'Descr', type: dbtype.varchar(20000), null:true, suppresslist: true, options:{multiline: true, height:'200px'}},

				merchitem_picture: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},

				merchitemctg_id: {
					text:'Category', type: dbtype.varchar(30), null:true,   suppresslist: true,
					options:{required:true,invalidMessage:'Category harus diisi'},
					comp: comp.Combo({
						table: 'mst_merchitemctg', 
						field_value: 'merchitemctg_id', field_display: 'merchitemctg_name', 
						api: 'retail/master/merchitemctg/list'})
				},

				merchsea_id: {
					text:'Season', type: dbtype.varchar(10), null:true,   suppresslist: true,
					options:{required:true,invalidMessage:'Season harus diisi'},
					comp: comp.Combo({
						table: 'mst_merchsea', 
						field_value: 'merchsea_id', field_display: 'merchsea_name', 
						api: 'retail/master/merchsea/list'})
				},


				brand_id: { 
					text: 'Brand', type: dbtype.varchar(14), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				},	

				merchitem_width: {
					section: section.Begin('Dimension & Weight'), suppresslist: true,
					text:'Width (cm)', type: dbtype.decimal(6,1), null:true},
				merchitem_length: {text:'Length (cm)', type: dbtype.decimal(6,1), null:true, suppresslist: true},
				merchitem_height: {text:'Height (cm)', type: dbtype.decimal(6,1), null:true, suppresslist: true},
				merchitem_weight: {
					section: section.End(),
					text:'Weight (Kg)', type: dbtype.decimal(6,1), null:true, suppresslist: true
				},


				merchitem_priceori: {
					section: section.Begin('Pricing & Values'),
					text:'Original Price', type: dbtype.decimal(10,0), null:false, default: 0, suppresslist: true},
				merchitem_price: {text:'Current Price', type: dbtype.decimal(10,0),  null:false, default: 0},
				merchitem_issp: {text: 'Hide Percentage Disc ', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },
				merchitem_isdiscvalue: {text: 'Discount Using Value', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },
				merchitem_disc: {text:'Disc (%)', type: dbtype.decimal(5,2),  null:false, default: 0, suppresslist: true},
				merchitem_discval: {text:'Disc Value', type: dbtype.decimal(10,0),  null:false, default: 0, suppresslist: true},
				merchitem_pricenett: {text:'Current Nett Price', type: dbtype.decimal(10,0),  null:false, default: 0},
				merchitem_lastcogs: {text:'Last COGS', type: dbtype.decimal(10,0),  null:false, default: 0, suppresslist: true},
				merchitem_lastcogsdt: {
					section: section.End(),
					text:'Last COGS Date', type: dbtype.date, null:false, suppresslist: true
				},
	

				merchrpt_id: { 
					section: section.Begin('Additional Information'),
					text: 'Report', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Report harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchrpt',
						field_value: 'merchrpt_id', field_display: 'merchrpt_name',
						api: 'retail/master/merchrpt/list'
					})
				},	

		
				gender_id: { 
					text: 'Gender', type: dbtype.varchar(7), null: true,   suppresslist: true,
					options: { required: true, invalidMessage: 'Gender harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_gender',
						field_value: 'gender_id', field_display: 'gender_name',
						api: 'ent/general/gender/list'
					})
				},

				merchitem_colorcode: {text:'Color Code', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_colorname: {text:'Color Name', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_hscodeship: {text:'HS Code Shipment', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitem_hscode: {text:'HS Code Id', type: dbtype.varchar(30), null:true, suppresslist: true},
				merchitemvar_id: {
					text:'Variance', type: dbtype.varchar(14), null:true, suppresslist: true,
					reference: {table: 'mst_merchitemvar', field_value: 'merchitemvar_id'},
					options: {disabled: true},
					unset: true
				},
				merchsizetag_id: {
					text:'Sizetag', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Sizetag harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchsizetag',
						field_value: 'merchsizetag_id', field_display: 'merchsizetag_name',
						api: 'retail/master/merchsizetag/list'
					})
				},
				merchitem_isallchannel: {text: 'Visible in all channel', type: dbtype.boolean, null: false, default: '1', suppresslist: true, options: {labelWidth: '300px'} },
				merchitem_isnonactive: {text: 'Non Active', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },
				merchitem_isdisabled: {
					section: section.End(),
					text: 'Disabled', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} 
				},
			
			},

			uniques : {
				merchitem_artmatcolsize: ['brand_id', 'merchitem_art', 'merchitem_mat', 'merchitem_col', 'merchitem_size']					
			},

		},


		'mst_merchitembarcode' : {
			primarykeys: ['merchitembarcode_id'],
			comment: 'Daftar Properties Category Merch Item',
			data: {
				merchitembarcode_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitembarcode_text: {text:'Barcode', type: dbtype.varchar(14), null:true},
				brand_id: {
					text:'Brand', type: dbtype.varchar(10), null:true, suppresslist: true,
					reference: {table: 'mst_brand', field_value: 'brand_id'},
					options: {disabled: true},
					unset: true
				},
				merchitem_id: {text:'Item', type: dbtype.varchar(30), hidden: true, null:false},
			},
			uniques: {merchitembarcode_brand: ['brand_id', 'merchitembarcode_text']}
		},


		
		'mst_merchitemprop' : {
			primarykeys: ['merchitemprop_id'],
			comment: 'Daftar Properties Category Merch Item',
			data: {
				merchitemprop_id: {text:'ID', type: dbtype.varchar(14), suppresslist: true, null:false},	
				merchproptype_id: { 
					text: 'Prop Type', type: dbtype.varchar(20), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Tipe Properties harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchproptype',
						field_value: 'merchproptype_id', field_display: 'merchproptype_name',
						api: 'retail/master/merchproptype/list'
					})
				},
				merchitemprop_value: {text:'Value', type: dbtype.varchar(90), null:true, options: {required:true,invalidMessage:'Value harus diisi'}},	
				merchitem_id: {text:'Item', type: dbtype.varchar(30), hidden: true, null:false},	
			},
			uniques: {}
		},


		'mst_merchitemretailchannel' : {
			primarykeys: ['merchitemretailchannel_id'],
			comment: 'Daftar Properties Category Merch Item',
			data: {
				merchitemretailchannel_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				retailchannel_id: { 
					text: 'Prop Type', type: dbtype.varchar(10), null: false, 
					options: { required: true, invalidMessage: 'Channel harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_retailchannel',
						field_value: 'retailchannel_id', field_display: 'retailchannel_name',
						api: 'retail/master/retailchannel/list'
					})
				},
				merchitem_isnonactive: {text: 'Non Active', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },
				merchitem_price: {text:'Current Price', type: dbtype.decimal(10,0),  null:false, default: 0},
				merchitem_isdiscvalue: {text: 'Discount Using Value', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth: '300px'} },
				merchitem_disc: {text:'Disc (%)', type: dbtype.decimal(5,2),  null:false, default: 0, suppresslist: true},
				merchitem_discval: {text:'Disc Value', type: dbtype.decimal(5,2),  null:false, default: 0, suppresslist: true},
				merchitem_pricenett: {text:'Current Nett Price', type: dbtype.decimal(10,0),  null:false, default: 0},

				merchitem_id: {text:'Item', type: dbtype.varchar(30), null:false, hidden: true},	
			},
			uniques: {}
		},


		'mst_merchitemrelated' : {
			primarykeys: ['merchitemrelated_id'],
			comment: 'Daftar Related Item',
			data: {
				merchitemrelated_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitem_id: { 
					text: 'Item', type: dbtype.varchar(14), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Item  harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_merchitem',
						field_value: 'merchitem_id', field_display: 'merchitem_name',
						api: 'retail/master/merchitem/list'
					})
				},
				merchitem_art: {text:'ART', type: dbtype.varchar(30), null:true},
				merchitem_mat: {text:'MAT', type: dbtype.varchar(30), null:true},
				merchitem_col: {text:'COL', type: dbtype.varchar(30), null:true},
				merchitem_size: {text:'SIZE', type: dbtype.varchar(30), null:true},
				merchitem_id: {text:'ID', type: dbtype.varchar(30), null:false},
				brand_id: { 
					text: 'Brand', type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				},	
				merchitem_id: {text:'Item', type: dbtype.varchar(30), null:false, hidden: true},						
			},
			uniques: {}
		},	
		
		
		'mst_merchitempic' : {
			primarykeys: ['merchitempic_id'],
			comment: 'Daftar Picture Category Merch Item',
			data: {
				merchitempic_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				merchitempic_name: {text:'Name', type: dbtype.varchar(30), null:false, options: {required:true,invalidMessage:'Picture Name harus diisi'}},	
				merchitempic_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				merchitempic_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				merchitempic_file: {text:'Picture', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				merchitem_id: {text:'Item', type: dbtype.varchar(30), null:false, hidden: true},	
			},
			uniques: {}
		},		

		'mst_merchitemref' : {
			comment: 'Kode referensi merchandise item untuk keperluan interfacing dengan system lain',
			primarykeys: ['merchitemref_id'],		
			data: {
				merchitemref_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				interface_id: { 
					text: 'Interface', type: dbtype.varchar(7), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Interface harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_interface', 
						field_value: 'interface_id', field_display: 'interface_name', field_display_name: 'interface_name', 
						api: 'ent/general/interface/list'})				
				
				},
				merchitemref_code: {text:'Code', type: dbtype.varchar(30), null:false, uppercase: true},			
				merchitem_id: {text:'Item', type: dbtype.varchar(30), null:false, hidden: true},
			},
			uniques: {
				'merchitemref_pair': ['merchitem_id', 'interface_id']
			},			
		}		
	},

	schema: {
		title: 'Item Merchandise',
		header: 'mst_merchitem',
		detils: {
			'barcode' : {title: 'Barcode', table: 'mst_merchitembarcode', form: true, headerview: 'merchitem_name' },
			'prop': {title: 'Properties', table: 'mst_merchitemprop', form: true, headerview: 'merchitem_name' },
			'channel': {title: 'Channel', table: 'mst_merchitemretailchannel', form: true, headerview: 'merchitem_name' },
			'related': {title: 'Related Item', table: 'mst_merchitemrelated', form: true, headerview: 'merchitem_name' },
			'picture': {title: 'Picture', table: 'mst_merchitempic', form: true, headerview: 'merchitem_name' },
			'ref': {title: 'Referensi', table: 'mst_merchitemref', form: true, headerview: 'partner_name' },
		}
	}
}


/*

ALTER TABLE `mst_merchitem` ADD CONSTRAINT `fk_mst_merchitem_mst_itemstock` FOREIGN KEY IF NOT EXISTS  (`merchitem_id`) REFERENCES `mst_itemstock` (`itemstock_id`);


*/
