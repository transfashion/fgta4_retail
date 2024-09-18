'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Syncronize Document",
	autoid: false,
	
	persistent: {
		'fsn_merchsync' : {
			primarykeys: ['merchsync_id'],
			comment: 'Daftar Season',
			data: {
				merchsync_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				merchsync_doc: {text:'Document', type: dbtype.varchar(90), null:false, unset:true},
				merchsync_type: {text:'Type', type: dbtype.varchar(30), null:false, unset:true},
				merchsync_isprocessing: {text:'Processing', type: dbtype.boolean, unset:true, null:false, default:0},
				merchsync_timeout: {text:'TimeOut', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}},
				merchsync_batch: {text:'Batch', type: dbtype.varchar(30), null:true, unset:true},
				merchsync_isfail: {text:'Fail', type: dbtype.boolean, unset:true, null:false, default:0},
				merchsync_iscompleted: {text:'Completed', type: dbtype.boolean, unset:true, null:false, default:0},
				merchsync_result: {text:'Result', type: dbtype.varchar(255), null:true, unset:true}
			},
			uniques : {},
		},
	},

	schema: {
		title: 'Syncronize Document',
		header: 'fsn_merchsync',
		detils: {
		}
	}

}



