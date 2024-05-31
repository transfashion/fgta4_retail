import drv from './printing/drv_mptii.mjs';

const btn_printimage = document.getElementById('btn_printimage');


export async function init(opt) {
	btn_printimage.addEventListener('click', (evt)=>{
		// btn_printimage_click();
		btn_printusb_click();
	});
} 


async function btn_printusb_click() {
	try {
		console.log('get USB printer');
		var usbdevice = await navigator.usb.requestDevice({
			acceptAllDevices: true,
			filters: [{}]
		});


		// var usbdevice;
		// var devices = await navigator.usb.getDevices();
		// for (let dev of devices) {
		// 	if (dev.productName.trim()=='CX58D') {
		// 		usbdevice = dev;
		// 	}
		// }
		console.log(usbdevice);
		await usbdevice.open();
		await usbdevice.claimInterface(0);




	} catch (err) {
		console.log('ERROR');
		console.error(err);
	}
}




async function btn_printimage_click() {
	try {
		var el = document.getElementById('img_logo');
		let imagedata = await drv.getImageDataFromElement(el);
		await drv.connect();
		await drv.image(imagedata);
		// await drv.textln("TEST PRINTER");
		// await drv.textln("============");
		// await drv.textln("baris 1");
		// await drv.textln("baris 2");
		// await drv.textln("baris 3");
		// await drv.textln("baris 4 (end)");
		// await drv.ln();
		// await drv.ln();
		// await drv.ln();
		// await drv.cut();

	} catch (err) {
		console.log('ERROR');
		console.error(err);
	}
}


async function btn_printqrcode_click() {
	try {
		var canvas = document.createElement('canvas');
		new QRious({
			size: 200,
			element: canvas,
			value: 'https://github.com/neocotic/qrious'
		});

		console.log(canvas);
		let imagedata = await drv.getImageDataFromCanvas(canvas);
		console.log(imagedata);

		await drv.connect();
		await drv.image(imagedata);

	} catch (err) {
		console.log('ERROR');
		console.error(err);
	}	
}