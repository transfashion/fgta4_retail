let localeuse = 'en-US';

export const shortcutKeyCancel = 'Escape';
export const shortcutKeyOk = 'Enter';


export function getThousandSeparator() {
	var n = format_price(1000);
	var thousandSeparator = n.substring(1,2);
	return thousandSeparator;
}


export function format_qty(value) {
	return Number(value).toLocaleString(localeuse)
}

export function format_price(value) {
	return Number(value).toLocaleString(localeuse)
}

export function ClearDataArray(arr) {
	arr.splice(0,arr.length)
}

export function ClearDataObject(obj) {
	for (var key in obj){
		if (obj.hasOwnProperty(key)){
			delete obj[key];
		}
	}
}


export function setAsPriceDisplay(el) {
	el.setValue = (value) => { 
		el_setValue(el, Number(value), (value)=>{return format_price(value)}) 
	}
	el.getValue = () => { return el_getValue(el)}

}


export function setAsQtyDisplay(el) {
	el.setValue = (value) => { 
		el_setValue(el, Number(value), (value)=>{return format_qty(value)}) 
	}
	el.getValue = () => { return el_getValue(el) }
}

export function setAsTextDisplay(el) {
	el.setValue = (value) => { 
		el_setValue(el, value, (value)=>{return value}) 
	}
	el.getValue = () => { return el_getValue(el) }
}


function el_getValue(el) {
	var value = el.getAttribute('value');
	return value;
}

function el_setValue(el, value, format) {
	el.setAttribute('value', value);
	el.innerHTML = format(value);
}


export function setDisplayPanel(panels) {
	for (let pnl of panels) {
		pnl.show = () => {
			if (pnl.active) {
				return;
			}

			for (var otherpnl of panels) {
				if (otherpnl.id!=pnl.id) {
					otherpnl.classList.add('hidden');
					otherpnl.active = false;

					if (typeof otherpnl.onblur === 'function') {
						otherpnl.onblur();
					}
				}
			}
			pnl.active = true;
			pnl.classList.remove('hidden');
			if (typeof pnl.onshowed==='function') {
				pnl.onshowed();
			}
		}
	}
}



export function getTimestamp() {
	var date = new Date();
	var unixTimeStamp = Math.floor(date.getTime()/1000);
	return unixTimeStamp;
}


export function isNeedFocusToInput(evt) {
	if (isAlphaNumeric(evt.keyCode)) {
		return true;
	} else {
		return false;
	}
}

export function isAlphaNumeric(keyCode) {
	if (   (keyCode >= 48 && keyCode <= 57)  // 0-9
	    || (keyCode >= 65 && keyCode <= 90)  // a-z
		|| (keyCode >= 96 && keyCode <= 105) // 0-9 (numpad)
		|| (keyCode == 188 || keyCode == 190 || keyCode == 189 || keyCode == 32) // koma, titik, dash, spasi
	) {
		return true;
	} else {
		return false;
	}
}



export function patternMatch({input, template}) {
	// sumber https://taimoorsattar.com/blogs/format-input-text-while-typing-javascript

	try {
		let j = 0;
		let plaintext = "";
		let countj = 0;
		while (j < template.length) {
			// code block to be
			
			if (countj > input.length - 1) {
			template = template.substring(0, j);
			break;
			}

			if (template[j] == input[j]) {
			j++;
			countj++;
			continue;
			}

			if (template[j] == "x") {
			template = template.substring(0, j) + input[countj] + template.substring(j + 1);
			plaintext = plaintext + input[countj];
			countj++;
			}
			j++;
		}

		return template

	} catch {
		return ""
	}
}