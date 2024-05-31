const pnl_scanboard = $('#pnl_scan-board')
const pnl_scanboarderror = $('#pnl_scan-boarderror')
const pnl_opnameinfo = $('#pnl_scan-opnameinfo')

const btn_cleardata = $('#pnl_scan-btn_cleardata')
const btn_cleartext = $('#pnl_scan-btn_cleartext')
const btn_test = $('#pnl_scan-btn_test')
const btn_opencam = $('#pnl_scan-btn_opencam')

const obj = {
	txt_site : $('#pnl_scan-obj_txt_site'),
	txt_stockdate : $('#pnl_scan-obj_txt_stockdate'),
	txt_input : $('#pnl_scan-obj_txt_input'),
	txt_currscanned : $('#pnl_scan-txt_currscanned'),
	txt_currscannedtotal : $('#pnl_scan-txt_currscannedtotal'),
	txt_itemscanned : $('#pnl_scan-txt_itemscanned'),
	txt_itemtotal : $('#pnl_scan-txt_itemtotal'),
	txt_art : $('#pnl_scan-txt_art'),
	txt_mat : $('#pnl_scan-txt_mat'),
	txt_col : $('#pnl_scan-txt_col'),
	txt_size : $('#pnl_scan-txt_size')
}


const constraints = { video: true };
const video = document.querySelector('video');
  

var this_page_id;
var this_page_num;



export async function init(opt) {
	this_page_id = opt.id
	this_page_num = opt.pagenum	

	pnl_scanboard.hide();
	pnl_scanboarderror.hide()


	obj.txt_input.textbox({
		onClickButton: () => { scan() }
	})

	obj.txt_input.textbox('textbox').bind('keypress', (evt)=>{
		obj_txt_input_keypress(evt)
	})

	btn_cleardata.linkbutton({
		onClick: ()=>{btn_cleardata_click()}
	})

	btn_cleartext.linkbutton({
		onClick: ()=>{btn_cleartext_click()}
	})

	/*
	btn_test.linkbutton({
		onClick: ()=>{btn_test_click()}
	})
	*/

	btn_opencam.linkbutton({
		onClick: () => {btn_opencam_click()}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			btn_test.isrunning = null
		}
	})

}

export function OnSizeRecalculated(width, height) {
	if (width>200) {
		pnl_opnameinfo.css('width', `${width}px`)
		obj.txt_input.textbox('resize',  `${width-70}px`)
	} else {
		pnl_opnameinfo.css('width', '200px')
		obj.txt_input.textbox('resize',  '230px')
	}

}


export async function init_info() {
	try {
		try {
			var opnameinfo =  await $ui.LOCALDB.get('opnameinfo')
		} catch(err) {
			await $ui.LOCALDB.destroy()
			$ui.LOCALDB = new PouchDB($ui.LOCALDB_NAME)
			$ui.getPages().show('pnl_list')	
			return;		
		}

		obj.txt_site.html(opnameinfo.site_id)
		obj.txt_stockdate.html(opnameinfo.stockdate)

		obj.txt_currscanned.html('0')
		obj.txt_currscannedtotal.html('0')
		obj.txt_itemscanned.html(opnameinfo.itemscanned.toLocaleString('en-US'))
		obj.txt_itemtotal.html(opnameinfo.itemtotal.toLocaleString('en-US'))	

		// hanya untuk keperluan test
		btn_test.itemtotal = opnameinfo.itemtotal

		pnl_scanboard.show()
		pnl_scanboard.css('width', '100%')

		setTimeout(()=>{
			obj.txt_input.textbox('textbox').focus()
			obj.txt_input.textbox('resize', '100%')
		}, 400)



	} catch (err) {
		console.error(err)
		$.messager.alert('Scan', err.message, 'error')
		pnl_scanboarderror.html(err.message)
		pnl_scanboarderror.show();
	}
}


function btn_cleardata_click() {
	console.log('reset')
	$ui.getPages().ITEMS['pnl_reset'].handler.randomcode(3)
	$ui.getPages().show('pnl_reset')			
	// $.messager.confirm('Hapus Data', 'Anda yakin akan mengosongkan data scan?<br><div style="color:red">Seluruh data di device ini akan kembali kosong!</div>', async (r) =>  {
	// 	if (r) {
	// 		await $ui.LOCALDB.destroy()
	// 		$ui.LOCALDB = new PouchDB($ui.LOCALDB_NAME)
	// 		$ui.getPages().show('pnl_list')			
	// 	}
	// })
}

function btn_cleartext_click() {
	obj.txt_input.textbox('setText', '');
}


function obj_txt_input_keypress(evt) {
	if (evt.key==='Enter') {
		scan()
	}
}

function scan() {
	var barcode = obj.txt_input.textbox('getText')
	search(barcode, (err, result, opnameinfo) => {
		if (err) {
			var error = new Error(err)
			$.messager.alert('Scan', error.message, 'warning', ()=>{
				obj.txt_input.textbox('textbox').focus()
			})
		} else {
			obj.txt_input.textbox('setText', '');
			obj.txt_currscanned.html(result.qtyscanned.toLocaleString('en-US'))
			obj.txt_currscannedtotal.html(result.qty.toLocaleString('en-US'))
			obj.txt_itemscanned.html(opnameinfo.itemscanned.toLocaleString('en-US'))
			obj.txt_itemtotal.html(opnameinfo.itemtotal.toLocaleString('en-US'))	
			obj.txt_art.html(result.art)
			obj.txt_mat.html(result.mat)
			obj.txt_col.html(result.col)
			obj.txt_size.html(result.size)		
		}
	})
}


async function search(barcode, fn_res) {
	try {
		var addqty = 1


		var itemmap
		try {
			itemmap = await $ui.LOCALDB.get(`barcode/${barcode}`)
		} catch (err) {
			throw `Barcode '${barcode}' tidak ditemukan`
		}


		var item_id = itemmap.item_id
		var item
		try {
			item = await $ui.LOCALDB.get(`item/${item_id}`)
		} catch (err) {
			throw `Item ${item_id} tidak ditemukan di stok`
		}


		item.qtyscanned += addqty
		await $ui.LOCALDB.put(item)


		var opnameinfo = await $ui.LOCALDB.get('opnameinfo')
		opnameinfo.itemscanned += addqty
		await $ui.LOCALDB.put(opnameinfo)


		
		var summarygro = await $ui.LOCALDB.get(`summarygro/${item.gro_id}`)
		summarygro.qtyscanned += addqty
		await $ui.LOCALDB.put(summarygro)


		var summaryctg = await $ui.LOCALDB.get(`summaryctg/${item.gro_id}/${item.ctg_id}`)
		summaryctg.qtyscanned += addqty
		await $ui.LOCALDB.put(summaryctg)


		fn_res(null, item, opnameinfo)
	} catch (err) {
		fn_res(err)
	}
} 






async function btn_test_click() {
	if (btn_test.isrunning==null) {
		btn_test.isrunning = true
		btn_test.linkbutton({text:'Stop'});

		try {
			await $ui.LOCALDB.createIndex({
				index: {
					fields: ['doctype']
				}
			});
	
			var res = await $ui.LOCALDB.find({
				selector: {doctype: 'item'},
				fields: ['item_id', 'qty', 'qtyscanned'],
			});
	
			//console.log(res.docs[0])
			var rowtotal = res.docs.length
	
			
	
			var tobescan = res.docs.filter((doc)=>{
				if (doc.qtyscanned < doc.qty) {
					doc.qtypending = doc.qty - doc.qtyscanned
					return doc
				}
			})
	
	
			var i = 0
			var rowtotal = tobescan.length
			var scaniterval = setInterval(()=>{
				var qtypending = parseInt(tobescan[i].qtypending)
				if (qtypending>0) {
					// scan
					//console.log(i, res.docs[i])
					var item_id = tobescan[i].item_id
					obj.txt_input.textbox('setText', item_id)
					scan()
					tobescan[i].qtypending = qtypending - 1
				} else {
					i++
				}
	
				if (i>=rowtotal) {
					clearInterval(scaniterval)
				}

				if (btn_test.isrunning==null) {
					clearInterval(scaniterval)
				}
	
			}, 800)
	
		} catch (err) {
			console.error(err)
		}


	} else {
		btn_test.isrunning = null
		btn_test.linkbutton({text:'Run Test'});
	}



}


function btn_opencam_click() {
	var videoElement = document.querySelector('video');
	var audioSelect = document.querySelector('select#audioSource');
	var videoSelect = document.querySelector('select#videoSource');

	audioSelect.onchange = getStream;
	videoSelect.onchange = getStream;

	var getStream = () => {
		if (window.stream) {
			window.stream.getTracks().forEach(track => {
			  track.stop();
			});
		}

		const audioSource = audioSelect.value;
		const videoSource = videoSelect.value;
		const constraints = {
		  audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
		  video: {deviceId: videoSource ? {exact: videoSource} : undefined}
		};
		return navigator.mediaDevices.getUserMedia(constraints).
		  then(gotStream).catch(handleError);

	}

	var getDevices = () => {
		// AFAICT in Safari this only gets default devices until gUM is called :/
		return navigator.mediaDevices.enumerateDevices();
	}

	var gotDevices = (deviceInfos) => {
		window.deviceInfos = deviceInfos; // make available to console
		console.log('Available input and output devices:', deviceInfos);
		for (const deviceInfo of deviceInfos) {
		  const option = document.createElement('option');
		  option.value = deviceInfo.deviceId;
		  if (deviceInfo.kind === 'audioinput') {
			option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
			audioSelect.appendChild(option);
		  } else if (deviceInfo.kind === 'videoinput') {
			option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
			videoSelect.appendChild(option);
		  }
		}
	}

	var getStream = () => {

		if (window.stream) {
		  window.stream.getTracks().forEach(track => {
			track.stop();
		  });
		}
		const audioSource = audioSelect.value;
		const videoSource = videoSelect.value;
		const constraints = {
		  audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
		  video: {deviceId: videoSource ? {exact: videoSource} : undefined}
		};
		return navigator.mediaDevices.getUserMedia(constraints).
		  then(gotStream).catch(handleError);
	  }
	  
	var gotStream = (stream) => {
		window.stream = stream; // make stream available to console
		audioSelect.selectedIndex = [...audioSelect.options].
		  findIndex(option => option.text === stream.getAudioTracks()[0].label);
		videoSelect.selectedIndex = [...videoSelect.options].
		  findIndex(option => option.text === stream.getVideoTracks()[0].label);
		videoElement.srcObject = stream;
	  }
	  
	var handleError = (error) => {
		console.error('Error: ', error);
	}


	getStream().then(getDevices).then(gotDevices);
}


