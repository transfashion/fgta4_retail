const obj_framescontainer = document.getElementById('obj_framescontainer');
const obj_framescontainer_loading = document.getElementById('obj_framescontainer-loading');
const obj_txt_container_username = document.getElementById('obj_txt_container-username');
const obj_txt_container_site = document.getElementById('obj_txt_container-site');
const obj_txt_container_date = document.getElementById('obj_txt_container-date');


const START_MODULE = 'retail/pos/posmain';  // 'retail/pos/afeattest'; // 'retail/pos/posmain' 
// const START_MODULE = 'retail/pos/afeattest';

export function init(opt) {

	// set body id
	document.body.id = 'poscontainer';

	// navigasi sidebar
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, {edge:'right'});
	var elsidenav = document.getElementById('obj_SideNavMenu');
	window.$sidenav = M.Sidenav.getInstance(elsidenav);

	// assign button di menu
	var btns = document.querySelectorAll('.container-menu-button');
	for (var btn of btns) {
		let module_id = btn.getAttribute('data-module-id');
		let action_data = btn.getAttribute('data-action');
		btn.addEventListener('click', (evt) => {
			btn_MenuItem_click(evt, {
				module_id: module_id,
				action_data: action_data
			})
		})
	}

	btn_MenuOpen.addEventListener('click', (obj, evt) => { btn_MenuOpen_click(obj, evt) });



	window.handledKey = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'ArrowUp', 'ArrowDown'];
	var body = document.getElementsByTagName('body')[0];
	body.addEventListener('keydown', (evt)=>{
		if (typeof window.$framesdata.active.contentWindow.receiveKeydownEvent === 'function') {
			window.$framesdata.active.contentWindow.receiveKeydownEvent(evt);
		}
		if (window.handledKey.includes(evt.key)) {
			evt.preventDefault();
		}
	});


	window.OpenModule = (module) => {
		console.log(module)
	}

	window.Wait = (iswaiting, options) => {
		if (iswaiting) {
			console.log('waiting ....');
		} else {
		}
		
	}

	// init module frames
	window.$framesdata = {
		items: {},
		active: null
	}


	try {
		var licensevalue = window.localStorage.getItem('licensevalue');
		var ld = window.parseLicenseData(licensevalue);
		obj_txt_container_site.innerHTML = ld.site_name;
		obj_txt_container_username.innerHTML = window.userdata.userfullname;

		// console.log(window.userdata);
	} catch (err) {
		console.error(err);
	}

	const width = window.innerWidth;
	const height = window.innerHeight;
	// console.log(`The viewport's width is ${width} and the height is ${height}.`);

	setTimeout(()=>{
		OpenModule({
			id:  START_MODULE
		});
	}, 50);

	var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
	var bulan = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	show_current_date(hari, bulan);
	setInterval(()=>{
		show_current_date(hari, bulan);
	}, 60000);
}


function nn(n) {
	if (n<10) {
		return "0" + n;
	} else {
		return n;
	} 
}

function show_current_date(hari, bulan) {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	var h = date.getHours();
	var i = date.getMinutes();
	var l = date.getDay();
	obj_txt_container_date.innerHTML = `${hari[l]}, ${nn(d)}/${bulan[m]}/${y} ${nn(h)}:${nn(i)}`;
}

function btn_MenuOpen_click(obj, evt) {
	window.$sidenav.open();
}

function btn_MenuItem_click(evt, param) {
	window.$sidenav.close();
	if (param.module_id==='action') {
		var action_data = param.action_data;
		if (action_data=='logout') {
			btnLogout_click();
		} else if (action_data=='reload') {
			setTimeout(()=>{
				location.reload();
			}, 150);
		}
	} else {
		// open program
		var module = {
			id:  param.module_id
		}
		OpenModule(module);
	}
}

async function btnLogout_click() {
	var result = await $pos.component.confirm({title:'Logout', text:'Anda mau logout'});
	if (result==='yes') {
		// clear cookie
		Cookies.remove('tokenid', {path: window.urlparams.cookiepath});
		Cookies.remove('userid', {path: window.urlparams.cookiepath});
		Cookies.remove('userfullname', {path: window.urlparams.cookiepath});
		Cookies.remove('site_id', {path: window.urlparams.cookiepath});
		Cookies.remove('site_name', {path: window.urlparams.cookiepath});

		location.reload();
	}
}

async function OpenModule(module) {
	obj_framescontainer_loading.classList.remove('frame-loading-hidden');

	for (var module_id in window.$framesdata.items) {
		if (module_id!=module.id) {
			window.$framesdata.items[module_id].classList.add('frame-module-hidden');
		}
	}

	//console.log(module);
	let ifr;
	if (window.$framesdata.items[module.id]==null) {
		// buat frame baru
		ifr = document.createElement('iframe');
		ifr.id = module.id;
		ifr.setAttribute('allow', 'usb; bluetooth; fullscreen');
		ifr.classList.add('frame-module');
		ifr.classList.add('frame-module-hidden');
		obj_framescontainer.appendChild(ifr);
		window.$framesdata.items[module.id] = ifr;
		ifr.addEventListener('load', ()=>{
			ifr.classList.remove('frame-module-hidden');
			obj_framescontainer_loading.classList.add('frame-loading-hidden');
			console.log('iframe loaded');
		});
		ifr.src=`index.php/module/${module.id}`;
	} else {
		ifr = window.$framesdata.items[module.id];
		obj_framescontainer_loading.classList.add('frame-loading-hidden')
		ifr.classList.remove('frame-module-hidden');
	}

	window.$framesdata.active = ifr;

}