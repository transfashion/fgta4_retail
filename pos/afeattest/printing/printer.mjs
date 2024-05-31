export const crLf = '\u000D\u000A';
export const cutPaper = '\u001D\u0056\u0030';


export async function getImageDataFromElement(el) {
	console.log(el);

	var width = el.clientWidth;
	var height = el.clientHeight;

	var canvas = document.createElement('canvas');
	canvas.width = width; //360;
	canvas.height = height; // 120;

	var context = canvas.getContext("2d");
	context.drawImage(el, 0, 0, canvas.width, canvas.height);
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

export async function getImageDataFromCanvas(canvas) {
	var context = canvas.getContext("2d");
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
}


function getDarkPixel(canvas, imageData, x, y) {
	// Return the pixels that will be printed black
	let red = imageData[((canvas.width * y) + x) * 4];
	let green = imageData[((canvas.width * y) + x) * 4 + 1];
	let blue = imageData[((canvas.width * y) + x) * 4 + 2];
	return (red + green + blue) > 0 ? 0 : 1;
}

