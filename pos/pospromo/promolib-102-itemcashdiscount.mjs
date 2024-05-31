import * as utilities from '/index.php/asset/retail/pos/posmain/utilities.mjs';
import * as base from './promolib-base.mjs'

const GROUP_BY_ITEM = 'G1';
const GROUP_BY_TAG = 'G2';
let self = {}


export async function loadData(id) {
	return await base.loadData(id);
}

export function apply(dgv) {
	console.log('apply item cash discount');
}

