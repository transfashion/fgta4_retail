export async function getPrinterCharacteristic(printer) {
	var device = await navigator.bluetooth.requestDevice({
		filters: printer.filters,
		optionalServices: printer.optionalServices
	});
	let server = await device.gatt.connect()
	let service = await server.getPrimaryService(printer.service_uuid);
	let characteristic = await service.getCharacteristic(printer.characteristic_uuid);
	return characteristic;
}


export async function sendText(characteristic, data) {
	await characteristic.writeValue(data);
}

export async function sendImage(characteristic, data) {
	var index = 0;
	return new Promise(function(resolve, reject) {
		sendNextImageDataBatch(characteristic, data, index, resolve, reject);
	});
}

function sendNextImageDataBatch(characteristic, data, index, resolve, reject) {
	if (index + 512 < data.length) {
		var datatoprint = data.slice(index, index + 512);
		characteristic.writeValue(datatoprint)
		.then(() => {
				index += 512;
				sendNextImageDataBatch(characteristic, data, index, resolve, reject);
			})
		.catch(error => reject(error));
	} else {
		if (index < data.length) {
			characteristic.writeValue(data.slice(index, data.length))
			.then(() => {
					resolve();
				})	
			.catch(error => reject(error));	
		} else {
			resolve();
		}
	}
}