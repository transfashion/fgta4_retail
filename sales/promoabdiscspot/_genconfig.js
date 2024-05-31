'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "PromoAB Disc Spot",
	autoid: false,
	
	persistent: {
		'mst_promoabdiscspot' : {
			primarykeys: ['promoabdiscspot_id'],
			comment: 'Daftar Spot Disc Promo',
			data: {
				promoabdiscspot_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				promoabdiscspot_name: {text:'Spot', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Spot Disc Promo harus diisi'}},
				promoabdiscspot_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},

			uniques : {
				'promoabdiscspot_name': ['promoabdiscspot_name'],
			},
		},
	},

	schema: {
		title: 'Promo Disc Spot',
		header: 'mst_promoabdiscspot',
		detils: {
		}
	}

}


