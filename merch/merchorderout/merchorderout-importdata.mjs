var this_page_id;


import * as fgta4longtask from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4longtask.mjs'

const obj_txt_region_id = $('#pnl_editimportdata-obj_txt_region_id');
const obj_txt_register_id = $('#pnl_editimportdata-obj_txt_register_id');


const btn_clear = $('#pnl_editimportdata-btn_clear');
const taskSyncReg = fgta4longtask.init('#pnl_editimportdata-syncregister', {name: 'process-tbsyncreg'});

let header_data = {};

export async function init(opt) {
	this_page_id = opt.id;
	

	// init sync register
	((task)=>{
		task.onStarting = (task) => { taskSyncReg_starting(task); }
		task.onCanceled = (param) => { longtask_canceled(param); }
		task.onCompleted = (param) => { longtask_completed(param); }
		task.onError = (param) => { longtask_error(param); }
		if (task.getUserActiveTask()!=null) {
			task.MonitorProgress();
		}
	})(taskSyncReg);


	// event 
	btn_clear.linkbutton({
		onClick: () => { btn_clear_click() }
	})


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	
}


export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data) {
}


export function setupDataToImport(args) {
	header_data = args.header_data; 
}



function longtask_canceled(param) {
	$ui.ShowMessage("[WARNING]Task Canceled");
}

function longtask_completed(param) {
	$ui.ShowMessage("[INFO]Task Completed");
}

function longtask_error(param) {
	console.log(param);

	
	var buttons = { Ok: async () => {} }
	if (param.data!=null) {
		if (param.data.log!=null) {
			buttons['Show Log'] = async () => {
				$ui.getPages().show('pnl_editlog', ()=>{
					$ui.getPages().ITEMS['pnl_editlog'].handler.showLog(param.data.log);
				})
			}
		}
	}
	$ui.ShowMessage("[ERROR]"+param.message, buttons);
	//$ui.ShowMessage("[ERROR]"+param.message);

}

function btn_clear_click() {
	console.log('Clear PID');
	taskSyncReg.Clear();
}



async function taskSyncReg_starting(task) {
	console.log('starting sync Register');

	var merchorderout_id = header_data.merchorderout_id;
	var region_id = obj_txt_region_id.textbox('getText');
	var heinvregister_id = obj_txt_register_id.textbox('getText');
	var data = {
		region_id:region_id, 
		heinvregister_id:heinvregister_id,
		merchorderout_id: merchorderout_id
	};

	//var apiurl = `${global.modulefullname}/xtion-importregtopo`;
	var apiurl = `retail/merch/merchorderout/xtion-importregtopo`;
	var args = {
		params: {
			taskname: task.taskname,
			synctype: 'REG',
			data: JSON.stringify(data)
		}
	};

	console.log(args);

	try {
		let result = await $ui.apicall(apiurl, args);
		console.log(result);
		if (result.error===true) {
			throw Error(result.errormessage);
		}

		var pid = result.pid;
		var log = result.log;
		task.setUserActiveTask(pid, {log:log});
		task.MonitorProgress();
	} catch (err) {
		console.error(err);
		task.Reset();
		longtask_error({message: err.message});
	}
}
