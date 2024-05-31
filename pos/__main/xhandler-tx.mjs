var dgv_item;
var dgv_payment;


var txt_transaction_id;


var _id = '';
var _transactiontypeid = '';

const DATA = {

	get ID() {
		return _id;
	},

	set ID(value) {
		_id = value;
		txt_transaction_id.html(value);
	},

	get TransactionTypeId() {
		return _transactiontypeid;
	},

	set TransactionTypeId(value) {
		_transactiontypeid = value;
	},

	ITEMS: [],
	PAYMENTS: []
}


export async function boundEntry(obj) {
	dgv_item = obj.dgv_item
	txt_transaction_id = obj.txt_transaction_id
} 




export async function CreateNewTransaction() {
	// console.log('new tx')

	DATA.ID = uniqid();

	// kosongkan datagrid
	DATA.ITEMS = []
	dgv_item.datagrid('loadData', DATA.ITEMS);




}



export function uniqid(a = "", b = false) {
    const c = Date.now()/1000;
    let d = c.toString(16).split(".").join("");
    while(d.length < 14) d += "0";
    let e = "";
    if(b){
        e = ".";
        e += Math.round(Math.random()*100000000);
    }
    return a + d + e;
}