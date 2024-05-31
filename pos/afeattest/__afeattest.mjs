const btn_printtext = document.getElementById('btn_printtest-text');
const btn_printimage = document.getElementById('btn_printtest-image');
const btn_printtestbluetext = document.getElementById('btn_printtestblue-text');

const cmdCrLf = '\u000D\u000A';
const cmdCutPaper = '\u001D\u0056\u0030';

const PrinterSetting = {}


export async function init(opt) {
	console.log('window ready');

	btn_printtext.addEventListener('click', (evt)=>{
		btn_printtext_click();
	});

	btn_printimage.addEventListener('click', (evt)=>{
		btn_printimage_click();
	});

	btn_printtestbluetext.addEventListener('click', (evt)=>{
		btn_printtestbluetext_click();
	})

	
} 


async function btn_printtext_click() {
	console.log('test');
	var devices = await navigator.usb.getDevices();
	for (let dev of devices) {
		if (dev.productName.trim()=='JRSVC Printer') {
			PrinterSetting.device = dev;
		}
	}
	if (PrinterSetting.device!=undefined) {
		var usbdevice = PrinterSetting.device;
		await usbdevice.open();
		await usbdevice.claimInterface(0);

		var string = document.getElementById("printContent").value + "\n";
		var encoder = new TextEncoder();
		var data = encoder.encode(string + cmdCrLf +  cmdCrLf + cmdCutPaper);
		                    
		// 0x1D 0x56 0x30
		
		usbdevice.transferOut(3, data)
	}
}


async function btn_printimage_click() {
	console.log('test');
	var devices = await navigator.usb.getDevices();
	for (let dev of devices) {
		if (dev.productName.trim()=='JRSVC Printer') {
			PrinterSetting.device = dev;
		}
	}
	if (PrinterSetting.device!=undefined) {
		var usbdevice = PrinterSetting.device;
		await usbdevice.open();
		await usbdevice.claimInterface(0);

		var image = document.getElementById('img_logo');
		var data = getImagePrintData(image);
		await sendDataToDevice(usbdevice, data)
		
		var string = "\ntest print dengan image\nbaris 1\r\nbaris 2\r\nBaris Terakhir============\r\n\r\n\r\n";
		var encoder = new TextEncoder();
		var data = encoder.encode(cmdCrLf + cmdCrLf + string + cmdCrLf +  cmdCrLf + cmdCutPaper);
		usbdevice.transferOut(3, data)
	}
}

async function btn_printtestbluetext_click() {

	try {
		if (PrinterSetting.printCharacteristic == undefined) {
			
			var device = await navigator.bluetooth.requestDevice({
				acceptAllDevices: true,
				optionalServices: [
					'00001101-0000-1000-8000-00805f9b34fb', '000018f0-0000-1000-8000-00805f9b34fb', '0000eee0-0000-1000-8000-00805f9b34fb', '0000eee2-0000-1000-8000-00805f9b34fb', '0000fee7-0000-1000-8000-00805f9b34fb', '0000ff00-0000-1000-8000-00805f9b34fb', 
					'0000ff10-0000-1000-8000-00805f9b34fb', '0000ff80-0000-1000-8000-00805f9b34fb', '0000fff0-0000-1000-8000-00805f9b34fb', '49535343-fe7d-4ae5-8fa9-9fafd205e455', 'e5b152ed-6b46-09e9-4678-665e9a972cbc', 'e7810a71-73ae-499d-8c15-faa9aef0c3f2'
				],
			});
			console.log(device);

			let server = await device.gatt.connect()
			console.log(server);

			let services = await server.getPrimaryServices();
			console.log(services);
			
			let service_id = services[2].uuid; 
			// 1 untuk matikan device
			// 2 
			console.log('service_id', service_id);

			let service = await server.getPrimaryService(service_id);
			let characteristics = await service.getCharacteristics();	
			console.log(characteristics);
			
			let characteristic_id = characteristics[0].uuid;
			console.log('characteristic_id', characteristic_id);
			
			PrinterSetting.printCharacteristic = await service.getCharacteristic(characteristic_id);

		}	

		console.log('Printer Connected');
		console.log(PrinterSetting.printCharacteristic);

		var image = document.getElementById('img_logo');
		var data = getImagePrintData(image);
		await BT_sendDataToDevice(PrinterSetting.printCharacteristic, data)

		var string = "\nCoba print text:\r\nbaris 1\r\nbaris 2\r\nBaris Terakhir============\r\n\r\n\r\n";
		var encoder = new TextEncoder();
		var data = encoder.encode(cmdCrLf + cmdCrLf + string + cmdCrLf +  cmdCrLf + cmdCutPaper);
		// var data = encoder.encode("test");
		await PrinterSetting.printCharacteristic.writeValue(data);
	

	} catch (err) {
		console.log('Tidak bisa connect ke bluetooth device');
		console.error(err.message);
	}

}






// 
// '00001101-0000-1000-8000-00805f9b34fb', '000018f0-0000-1000-8000-00805f9b34fb', '0000eee0-0000-1000-8000-00805f9b34fb', '0000eee2-0000-1000-8000-00805f9b34fb', '0000fee7-0000-1000-8000-00805f9b34fb', '0000ff00-0000-1000-8000-00805f9b34fb', 
// '0000ff10-0000-1000-8000-00805f9b34fb', '0000ff80-0000-1000-8000-00805f9b34fb', '0000fff0-0000-1000-8000-00805f9b34fb', '49535343-fe7d-4ae5-8fa9-9fafd205e455', 'e5b152ed-6b46-09e9-4678-665e9a972cbc', 'e7810a71-73ae-499d-8c15-faa9aef0c3f2'









async function __btn_printtestbluetext_click() {

// chrome://bluetooth-internals/#devices

	console.log('print to bluetooth, allow dulu flag untuk bluetooth');
	// buka  chrome://flags/
	// terus cari enable-experimental-web-platform-features 
	// buat enable


try {
	if (PrinterSetting.printCharacteristic == undefined) {
		var device = await navigator.bluetooth.requestDevice({
			acceptAllDevices: true,
			optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb'],
			// filters: [{
			// 	services: ['000018f0-0000-1000-8000-00805f9b34fb']
			// }]
		});
		
		// var server = await device.gatt.connect()
		// var service = await server.getPrimaryService("000018f0-0000-1000-8000-00805f9b34fb");
		// var characteristics = await service.getCharacteristics();	
		// PrinterSetting.printCharacteristic = await service.getCharacteristic(characteristics[0].uuid);
		let server = await device.gatt.connect()
		let services = await server.getPrimaryServices();
		let service_id = services[0].uuid;
		// console.log(service_id);  //                    
		let service = await server.getPrimaryService(service_id);
		let characteristics = await service.getCharacteristics();	
		let characteristic_id = characteristics[0].uuid;
		// console.log(characteristic_id);
		PrinterSetting.printCharacteristic = await service.getCharacteristic(characteristic_id);
	}

	console.log('Printer Connected');
	console.log(PrinterSetting.printCharacteristic);



	// cetak gambar ke printer
	var image = document.getElementById('img_logo');
	var data = getImagePrintData(image);
	await BT_sendDataToDevice(PrinterSetting.printCharacteristic, data)

	// cetak text ke printer
	var string = "\nCoba print text:\r\nbaris 1\r\nbaris 2\r\nBaris Terakhir============\r\n\r\n\r\n";
	var encoder = new TextEncoder();
	var data = encoder.encode(cmdCrLf + cmdCrLf + string + cmdCrLf +  cmdCrLf + cmdCutPaper);
	await PrinterSetting.printCharacteristic.writeValue(data);

} catch (err) {
	console.log('Tidak bisa connect ke bluetooth device');
	console.error(err.message);
}




}




async function BT_sendDataToDevice(printCharacteristic, data) {
	var index = 0;
	return new Promise(function(resolve, reject) {
		BT_sendNextImageDataBatch(printCharacteristic, data, index, resolve, reject);
	});
}

function BT_sendNextImageDataBatch(printCharacteristic, data, index, resolve, reject) {
	if (index + 512 < data.length) {
		var datatoprint = data.slice(index, index + 512);
		printCharacteristic.writeValue(datatoprint)
		.then(() => {
				index += 512;
				BT_sendNextImageDataBatch(printCharacteristic, data, index, resolve, reject);
			})
		.catch(error => reject(error));
	} else {
		if (index < data.length) {
			printCharacteristic.writeValue(data.slice(index, data.length))
			.then(() => {
					resolve();
				})	
			.catch(error => reject(error));	
		} else {
			resolve();
		}
	}
}




















async function sendDataToDevice(usbdevice, data) {
	var index = 0;
	return new Promise(function(resolve, reject) {
		sendNextImageDataBatch(usbdevice, data, index, resolve, reject);
	});
}


function sendNextImageDataBatch(usbdevice, data, index, resolve, reject) {
	if (index + 512 < data.length) {
		var datatoprint = data.slice(index, index + 512);
		usbdevice.transferOut(3, datatoprint)
		.then(() => {
				index += 512;
				sendNextImageDataBatch(usbdevice, data, index, resolve, reject);
			})
		.catch(error => reject(error));
	} else {
		if (index < data.length) {
			usbdevice.transferOut(3, data.slice(index, data.length))
			.then(() => {
					resolve();
				})	
			.catch(error => reject(error));	
		} else {
			resolve();
		}
	}
}
















function getDarkPixel(canvas, imageData, x, y) {
	// Return the pixels that will be printed black
	let red = imageData[((canvas.width * y) + x) * 4];
	let green = imageData[((canvas.width * y) + x) * 4 + 1];
	let blue = imageData[((canvas.width * y) + x) * 4 + 2];
	return (red + green + blue) > 0 ? 0 : 1;
}

function getImagePrintData(image) {
	var canvas = document.createElement('canvas');
	canvas.width = 360;
	canvas.height = 120;

	var context = canvas.getContext("2d");
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	try {
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
		if (imageData == null) {
			throw new Error('No image to print!');
		}

		var printData = new Uint8Array(canvas.width / 8 * canvas.height + 8);
		 var offset = 0;


		printData[0] = 29;  // Print raster bitmap
		printData[1] = 118; // Print raster bitmap
		printData[2] = 48; // Print raster bitmap
		printData[3] = 0;  // Normal 203.2 DPI
		printData[4] = canvas.width / 8; // Number of horizontal data bits (LSB)
		printData[5] = 0; // Number of horizontal data bits (MSB)
		printData[6] = canvas.height % 256; // Number of vertical data bits (LSB)
		printData[7] = canvas.height / 256;  // Number of vertical data bits (MSB)
		offset = 7;
		
		// Loop through image rows in bytes
		for (let i = 0; i < canvas.height; ++i) {
			for (let k = 0; k < canvas.width / 8; ++k) {
				let k8 = k * 8;
				//  Pixel to bit position mapping
				printData[++offset] = getDarkPixel(canvas, imageData, k8 + 0, i) * 128 + getDarkPixel(canvas, imageData, k8 + 1, i) * 64 +
							getDarkPixel(canvas, imageData, k8 + 2, i) * 32 + getDarkPixel(canvas, imageData, k8 + 3, i) * 16 +
							getDarkPixel(canvas, imageData, k8 + 4, i) * 8 + getDarkPixel(canvas, imageData, k8 + 5, i) * 4 +
							getDarkPixel(canvas, imageData, k8 + 6, i) * 2 + getDarkPixel(canvas, imageData, k8 + 7, i);
			}
		}

		return printData;

	} catch (err) {
		throw err;
	}
}

// function sendNextImageDataBatch(printCharacteristic, data, index, resolve, reject) {
// 	// Can only write 512 bytes at a time to the characteristic
// 	// Need to send the image data in 512 byte batches
// 	if (index + 512 < data.length) {
// 		var datatoprint = data.slice(index, index + 512);
// 		printCharacteristic.writeValue(datatoprint).then(() => {
// 			index += 512;
// 			sendNextImageDataBatch(printCharacteristic, data, index, resolve, reject);
// 		})
// 		.catch(error => reject(error));
// 	} else {
// 		// Send the last bytes
// 		if (index < data.length) {
// 			printCharacteristic.writeValue(data.slice(index, data.length)).then(() => {
// 			resolve();
// 			})
// 			.catch(error => reject(error));
// 		} else {
// 			resolve();
// 		}
// 	}
// }


// async function sendImageData(printCharacteristic, image_id) {
// 	var index = 0;
// 	var data = getImagePrintData(image_id);
// 	return new Promise(function(resolve, reject) {
// 		sendNextImageDataBatch(printCharacteristic, data, index, resolve, reject);
// 	});
// }
