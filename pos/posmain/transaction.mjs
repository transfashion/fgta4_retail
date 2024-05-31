import * as utilities from './utilities.mjs';

const DBNAME = 'POS'
const DBVERSION = 1;

const CURR_ITEMS = {name:'ci', keyPath:'row_id', idxname:'ciidx', idxprop:'itemstock_id'}
const CURR_PAYMENTS = {name:'cp', keyPath:'row_id'};
const CURR_VOUCHERS = {name:'cv', keyPath:'voucher_id'};
const CURR_TX = {name:'ct', keyPath:'id'};

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const self = {}

export async function init() {
	try {
		var db = await opendb(DBNAME, DBVERSION, upgradeDb);
		self.db = db;
	} catch (err) {
		console.error(err);
	}
	
}

async function opendb(dbname, version, onupgrade) {
	return new Promise((resolve, reject)=>{
		let db = indexedDB.open(dbname, version);
		if (typeof onupgrade === 'function') {
			db.onupgradeneeded = (evt) => {
				onupgrade(evt.target.result);
			}
		}

		db.onsuccess = (evt) => {
			resolve(evt.target.result);
		}
		
		db.onerror = (evt) => {
			console.error(evt.target.error);
			reject(evt.target.error)
		}
	});
}

function upgradeDb(db) {
	db.createObjectStore(CURR_ITEMS.name, {keyPath: CURR_ITEMS.keyPath}).createIndex(CURR_ITEMS.idxname, CURR_ITEMS.idxprop);
	db.createObjectStore(CURR_PAYMENTS.name, {keyPath: CURR_PAYMENTS.keyPath});
	db.createObjectStore(CURR_VOUCHERS.name, {keyPath: CURR_VOUCHERS.keyPath});
	db.createObjectStore(CURR_TX.name, {keyPath: CURR_TX.keyPath});
}

function getTimestamp() {
	var date = new Date();
	var unixTimeStamp = Math.floor(date.getTime()/1000);
	return unixTimeStamp;
}

export async function getCurrentTransaction() {
	var db = self.db;
	if (db==null) {
		db = await opendb(DBNAME, DBVERSION, upgradeDb);
		self.db = db;
	}

	var dbtx = db.transaction(CURR_TX.name, 'readwrite');
	var store = dbtx.objectStore(CURR_TX.name);
	var id = 'tx_id';
	
	try {
		var data = await get(store, id);
		if (data===undefined) {
			var txdata = await CreateNewTransaction(store);
			return txdata;
		} else {
			console.log('load data dari CURR_TX');
			var txdata = {};
			var rows = await getAll(store);
			for (var row of rows) {
				txdata[row.id] = row.value;
			}
			self.tx_id = txdata.tx_id;
			return txdata;			
		}
	} catch (err) {
		console.error(err);
	}
}

export async function CreateNewTransaction(sto) {
	var method;
	var db, dbtx, store;
	if (store===undefined) {
		db = self.db;
		dbtx = db.transaction(CURR_TX.name, 'readwrite');
		store = dbtx.objectStore(CURR_TX.name);
		method = 'put';
	} else {
		store = sto;
		method = 'add';
	}

	var txdata = create_new_tx_data();
	for (var id in txdata) {
		var data = {
			id: id,
			value: txdata[id]
		}
		var res;
		if (method=='put') {
			res = await put(data, store);
		} else {
			res = await add(data, store);
		}
		// console.log(res);
	}

	self.tx_id = txdata.tx_id;
	return txdata;
}

export function getCurrentTxId() {
	return self.tx_id;
}

async function getAll(store) {
	return new Promise((resolve, reject) => {
		var query = store.getAll();
		query.onsuccess = (evt) => {
			resolve(evt.target.result);
		}
		query.onerror = (evt) => {
			reject(evt.target.error);
		}
	});
}

async function get(store, id) {
	return new Promise((resolve, reject) => {
		var query = store.get(id);
		query.onsuccess = (evt) => {
			resolve(evt.target.result);
		}
		query.onerror = (evt) => {
			reject(evt.target.error);
		}
	});
}

export async function add(data, store) {
	return new Promise((resolve, reject)=>{
		let request = store.add(data);
		request.onsuccess = (evt) => {
			resolve(evt.target.result);
		}
		request.onerror = (evt) => {
			reject(evt.target.error);
		};
	})
}

export async function put(data, store) {
	return new Promise((resolve, reject)=>{
		let request = store.put(data);
		request.onsuccess = (evt) => {
			resolve(evt.target.result);
		}
		request.onerror = (evt) => {
			reject(evt.error);
		};
	})
}


export async function upsert(txdata) {
	var db, dbtx, store;
	db = self.db;
	dbtx = db.transaction(CURR_TX.name, 'readwrite');
	store = dbtx.objectStore(CURR_TX.name);
	for (var id in txdata) {
		var data = {
			id: id,
			value: txdata[id]
		}
		// console.log(data);
		await put(data, store);
	}
}

export async function ItemUpsert(id, data) {
	var db = self.db;
	var dbtx = db.transaction(CURR_ITEMS.name, 'readwrite');
	var store = dbtx.objectStore(CURR_ITEMS.name);
	try {
		await put({
			row_id: id,
			itemstock_id: data.item.itemstock_id,
			data: data
		}, store);	 
	} catch (err) {
		throw err;
	}

}

export async function ItemClear() {
	var db = self.db;
	var dbtx = db.transaction(CURR_ITEMS.name, 'readwrite');
	var store = dbtx.objectStore(CURR_ITEMS.name);
	store.clear();
}


export async function ItemRemove(id) {
	var db = self.db;
	var dbtx = db.transaction(CURR_ITEMS.name, 'readwrite');
	var store = dbtx.objectStore(CURR_ITEMS.name);
	store.delete(id);	
}

export async function ItemsRetrieve() {
	var db = self.db;
	var dbtx = db.transaction(CURR_ITEMS.name, 'readwrite');
	var store = dbtx.objectStore(CURR_ITEMS.name);
	return await getAll(store);
}



function create_new_tx_data() {
	return {
		'tx_id': getTimestamp(),
		'cust_id' : '',
		'cust_name' : '',
		'cust_disc' : 0,
		'cust_disc_info' : '',
		'cust_type' : '',
		
		'B1_proprog_id' : '',
		'B1_proprog_name' : '',
		'B1_prorule_id' : '',
		'B2_proprog_id' : '',
		'B2_proprog_name' : '',
		'B2_prorule_id' : '',
		'B3_proprog_id' : '',
		'B3_proprog_name' : '',
		'B3_prorule_id' : '',
		
		'event_id' : '',
		'event_name' : '',
		'staff_id' : '',
		'staff_name' : '',
		'staff_data' : '',
		'ext_code' : ''
	};
}
