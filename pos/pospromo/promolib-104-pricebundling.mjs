import * as base from './promolib-base.mjs'

export async function loadData(id) {
	return await base.loadData(id);
}

export function apply(dgv) {
	console.log('apply item price bundling');
}