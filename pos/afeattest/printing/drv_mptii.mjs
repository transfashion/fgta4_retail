/*
 * Print MPT II
 * Bluetooth Printer
 * 
 * by Agung N
 * 2023 Maret 18
 * 
*/

import * as PRINTER_BASE from './printer.mjs';
import * as BLU from './libbluprinter.mjs';

const encoder = new TextEncoder();
const self = {}
const printer = {
	filters: [{name: ['MPT-II']}],
	optionalServices: [
		'00001101-0000-1000-8000-00805f9b34fb', '000018f0-0000-1000-8000-00805f9b34fb', '0000eee0-0000-1000-8000-00805f9b34fb', '0000eee2-0000-1000-8000-00805f9b34fb', '0000fee7-0000-1000-8000-00805f9b34fb', '0000ff00-0000-1000-8000-00805f9b34fb', 
		'0000ff10-0000-1000-8000-00805f9b34fb', '0000ff80-0000-1000-8000-00805f9b34fb', '0000fff0-0000-1000-8000-00805f9b34fb', '49535343-fe7d-4ae5-8fa9-9fafd205e455', 'e5b152ed-6b46-09e9-4678-665e9a972cbc', 'e7810a71-73ae-499d-8c15-faa9aef0c3f2'
	],
	service_uuid: '0000fff0-0000-1000-8000-00805f9b34fb',
	characteristic_uuid: '0000fff2-0000-1000-8000-00805f9b34fb',
	endpoint: 0,

	connect: async () => { await device_connect(); },
	text: async (data) => { await device_text(data); },
	textln: async (data) => { await device_text(data + "\r\n"); },
	cut: async () => { await device_text(PRINTER_BASE.cutPaper)},
	ln:  async () => { await device_text(PRINTER_BASE.crLf)},

	getImageDataFromElement: async (el) => { return await PRINTER_BASE.getImageDataFromElement(el) },
	image: async (imagedata) => { await device_image(imagedata) }

}

Object.assign(printer, PRINTER_BASE);
export default printer;


async function device_connect() {
	if (self.characteristic===undefined) {
		self.characteristic = await BLU.getPrinterCharacteristic(printer);
	}
}

async function device_text(data) {
	await BLU.sendText(self.characteristic, encoder.encode(data));
} 


async function device_image(imagedata) {
	await BLU.sendImage(self.characteristic, imagedata);
}