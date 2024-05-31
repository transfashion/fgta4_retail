const btn_printtest = document.getElementById('btn_printtest');


export async function init(opt) {
	console.log('window ready');

	btn_printtest.addEventListener('click', (evt)=>{
		btn_printtest_click();
	});

	
} 


async function btn_printtest_click() {
	console.log('test');

	// navigator.usb.requestDevice({filters: [{}]}).then(
    //     displayOutcome("usb", "success"),
    //     displayOutcome("usb", "error")
    //   );


	var usbdevice = await navigator.usb.requestDevice({filters: [{}]});
	
	await usbdevice.open();
	await usbdevice.claimInterface(0);
	
	console.log(usbdevice);

	var string = document.getElementById("printContent").value + "\n";
	var encoder = new TextEncoder();
	var data = encoder.encode(string);
	usbdevice.transferOut(3, data)
	
}




var device;

function setup(device) {
	return device.open()
	.then(() => device.selectConfiguration(1))
	.then(() => device.claimInterface(0))
}

function print() {
	var string = document.getElementById("printContent").value + "\n";
	var encoder = new TextEncoder();
	var data = encoder.encode(string);
	device.transferOut(1, data)
	.catch(error => { console.log(error); })
}

function connectAndPrint() {
	if (device == null) {
		navigator.usb.requestDevice({filters: [{}]})
		.then(selectedDevice => {
			device = selectedDevice;
			console.log(device);
			return setup(device);
		})
		.then(() => print())
		.catch(error => { console.log(error); })
	}
	else
		print();
}

navigator.usb.getDevices()
.then(devices => {
	if (devices.length > 0) {
		device = devices[0];
		return setup(device);
	}
})
.catch(error => { console.log(error); });