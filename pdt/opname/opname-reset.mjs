var this_page_id;

const btn_removedb = $('#pnl_reset-btn_removedb')
const obj = {
	txt_randomcode: $('#pnl_reset-obj_txt_randomcode'),
	txt_removecode: $('#pnl_reset-obj_txt_removecode')
}


export async function init(opt) {
	this_page_id = opt.id

	obj.txt_removecode.textbox('textbox').css('text-transform','uppercase')

	btn_removedb.linkbutton({
		onClick: ()=>{btn_removedb_click()}
	})


	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_scan')
		}
	})	


}


export function randomcode(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	
	obj.txt_randomcode.html(result)
	btn_removedb.randomcode = result
}


function btn_removedb_click() {
	var randomcode = obj.txt_removecode.textbox('getText').trim().toUpperCase()

	console.log(randomcode, btn_removedb.randomcode)
	if (randomcode!=btn_removedb.randomcode) {
		$.messager.alert('Hapus Data', 'Kode yang anda masukkan salah', 'warning')
		return
	}

	$.messager.confirm('Hapus Data', 'Anda yakin akan mengosongkan data scan?<br><div style="color:red">Seluruh data di device ini akan kembali kosong!</div>', async (r) =>  {
		if (r) {
			await $ui.LOCALDB.destroy()
			$ui.LOCALDB = new PouchDB($ui.LOCALDB_NAME)
			$ui.getPages().show('pnl_list')			
		}
	})

}