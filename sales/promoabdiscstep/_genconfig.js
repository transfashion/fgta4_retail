'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "PromoAB Disc Step",
	autoid: false,
	
	persistent: {
		'mst_promoabdiscstep' : {
			primarykeys: ['promoabdiscstep_id'],
			comment: 'Daftar Step Disc Promo',
			data: {
				promoabdiscstep_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				promoabdiscstep_name: {text:'Step', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Step Disc Promo harus diisi'}},
				promoabdiscstep_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
			},

			uniques : {
				'promoabdiscstep_name': ['promoabdiscstep_name'],
			},
		},
	},

	schema: {
		title: 'Promo Disc Spot',
		header: 'mst_promoabdiscstep',
		detils: {
		}
	}

}


