'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Merchandise Images",
	autoid: true,

	
	persistent: {
		'mst_merchitemimagelink' : {
			primarykeys: ['merchitemimagelink_id'],
			comment: 'Daftar Variance item merchandise',
			data: {
				merchitemimagelink_id: {text:'ID', type: dbtype.varchar(14), null:false},
				merchitemimagelink_url: { text: 'Descr', type: dbtype.varchar(255)},
				merchitemimagelink_tag: { text: 'Tag', type: dbtype.varchar(255), suppresslist: true },
				merchitemimage_width : {text: 'Width', type: dbtype.int(4), null:false, default: 0, suppresslist: true},
				merchitemimage_height : {text: 'Height', type: dbtype.int(4), null:false, default: 0, suppresslist: true},
				merchitemimage_mime: { text: 'Mime', type: dbtype.varchar(255), suppresslist: true },
				merchitem_id: {
					text:'Merch Item', type: dbtype.varchar(14), null:false,
					reference: {table: 'mst_merchitem', field_value: 'merchitem_id', field_display:'merchitem_name',  field_display_name:'merchitem_name'}
				},
			}	
		}
	},

	schema: {
		title: 'Merchandise Images',
		header: 'mst_merchitemimagelink',
		detils: {
		}
	}

}
