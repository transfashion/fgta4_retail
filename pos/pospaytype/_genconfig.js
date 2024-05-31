'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "POS Paym Type",
	autoid: false,

	persistent: {
		'pos_paytype' : {
			primarykeys: ['paytype_id'],
			comment: 'Metode Pembayaran POS',
			data: {
				paytype_id: {text:'ID', type: dbtype.varchar(14), uppercase: true},
				paytype_name: { text: 'Type Name', type: dbtype.varchar(60), null: true, uppercase: true },
				paytype_iscash: { 
					caption:'Type', text: 'Cash', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: false} 
				},
				paytype_isvoucher: { text: 'Voucher', type: dbtype.boolean, null: false, default: '0', suppresslist: true , options:{disabled: false}},
				paytype_isedc: { text: 'EDC', type: dbtype.boolean, null: false, default: '0', suppresslist: true , options:{disabled: false}},
				paytype_istransfer: { text: 'Transfer', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: false} },
				paytype_isonline: {
					text: 'Online Platform', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{disabled: false},
				},

				paytype_nameinputtype: { text: 'Name InputType', type: dbtype.varchar(60), null: true, lowercase: true },
				paytype_cardinputtype: { text: 'Card InputType', type: dbtype.varchar(60), null: true, lowercase: true },
				paytype_apprinputtype: { text: 'Appr InputType', type: dbtype.varchar(60), null: true, lowercase: true },
			},

			defaultsearch : ['paytype_id', 'paytype_name'],
			uniques: {
				paytype_name : ['paytype_name']
			}

		}
	},

	schema: {
		title: "POS Paym Type",
		header: 'pos_paytype',
		detils: {
			// 'barcode' : {title:'Barcode', table:'trn_allotopup',  form: false, headerview: 'allotopup_id'},
		},
		// xtions: {
		// 	setup: {
		// 		api: 'xtion-generate',
		// 		buttonname: 'btn_setup',
		// 		buttontext: 'Gen S.C'
		// 	},
		// 	lock:  {
		// 		api: 'xtion-lock',
		// 		buttonname: 'btn_lock',
		// 		buttontext: 'Lock'
		// 	},
		// 	unlock: {
		// 		api: 'xtion-unlock',
		// 		buttonname: 'btn_unlock',
		// 		buttontext: 'UnLock'
		// 	}
		// },		
	},


}


/*
INSERT INTO pos_paytype (paytype_id,paytype_name,paytype_iscash,paytype_isvoucher,paytype_isedc,paytype_istransfer,paytype_isonline,`_createby`,`_createdate`,`_modifyby`,`_modifydate`) VALUES
	 ('CASH','CASH',1,0,0,0,0,'5effbb0a0f7d1','2023-03-06 19:52:00.000',NULL,NULL),
	 ('EDC','EDC',0,0,1,0,0,'5effbb0a0f7d1','2023-03-06 19:52:27.000','5effbb0a0f7d1','2023-03-06 19:53:04.000'),
	 ('ONLN','ONLINE PLATFORM',0,0,0,0,1,'5effbb0a0f7d1','2023-03-06 19:52:53.000',NULL,NULL),
	 ('TRAN','TRANSFER',0,0,0,1,0,'5effbb0a0f7d1','2023-03-06 19:52:39.000',NULL,NULL),
	 ('VOUC','VOUCHER',0,1,0,0,0,'5effbb0a0f7d1','2023-03-06 19:52:19.000',NULL,NULL);

*/