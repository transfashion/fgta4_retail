const INTERVAL_UPDATE = 5000;

const pnl_screen = document.getElementById('pnl_display-screen');
const btn_fullscreen = document.getElementById('btn_fullscreen');
const btn_update = document.getElementById('btn_update');
const btn_close = document.getElementById('btn_close');
const pnl_marquebanner = document.getElementById('pnl_display-marquebanner');
const pnl_groups = {
	c1: document.getElementById('pnl_display-group1'),
	c2: document.getElementById('pnl_display-group2'),
	c3: document.getElementById('pnl_display-group3'),
};

let datafetcher;
let divtoremove = [];
let currentdisp = {c1:null,c2:null,c3:null};

var charts = {};

export async function init(opt) {

	window.guestbook_updatedata = () => {
		window_updatedata();
	};

	btn_close.addEventListener('click', ()=>{
		window.close();
	});

	btn_fullscreen.addEventListener('click', ()=>{
		btn_fullscreen_click();
	});
	btn_update.addEventListener('click', ()=>{
		btn_update_click();
	});

	pnl_screen.addEventListener('fullscreenchange', (evt)=>{
		if (document.fullscreenElement) {
			startDisplay(true);
		} else {
			pnl_screen.classList.add('hidden');
			startDisplay(false);
		}
	})
}




async function composeChart(cn, chartDom) {
	if (charts[cn]===undefined) {
		console.log('generate chart');
		charts[cn] = echarts.init(chartDom);
		charts[cn].defoptions = {
			// title: {
			// 	text: 'Referer of a Website',
			// 	subtext: 'Fake Data',
			// 	left: 'center'
			// },
			// tooltip: {
			// 	trigger: 'item'
			// },
			// 	legend: {
			// 	orient: 'vertical',
			// 	left: 'left'
			// },
			center: ['50%', '75%'],
			radius: [20, 180],
			color: ['#f1e084', '#cbac00'],	
			series: [
				{

					type: 'pie',
					with: '100%',
					
					label: {
						show: false,
						position: 'center'
					},
					labelLine: {
						show: false
					},
					data: [
						{ value: 0, name: 'Hadir' },
						{ value: 100, name: 'Belum Hadir' },
					],
					// emphasis: {
						// scale: true, 
						// scaleSize: 140,
					// 	itemStyle: {
					// 		shadowBlur: 10,
					// 		shadowOffsetX: 0,
					// 		shadowColor: 'rgba(0, 0, 0, 0.5)'
					// 	}
					// }
				}
			]
		}

		charts[cn].setOption(charts[cn].defoptions);
	}

}





async function btn_fullscreen_click() {
	pnl_screen.classList.add('hidden');
	if ('getScreenDetails' in window) {
		// The Multi-Screen Window Placement API is supported.

		var toscreen;
		try {
			var si = await window.getScreenDetails();
			if (si.screens.length==1) {
				console.log('hanya satu monitor');
				toscreen = si.screens[0];
			} else {
				console.log('ada dua monitor');
				toscreen = si.screens[1];
			}
			// var w = window.open('index.php');
			// console.log(toscreen);
			pnl_screen.classList.remove('hidden');
			await pnl_screen.requestFullscreen({ screen: toscreen });
		} catch (err) {
			console.log(err);
			// alert(err.message);

			pnl_screen.classList.remove('hidden');
			await pnl_screen.requestFullscreen();
		}


	}
}


function btn_update_click() {
	window_updatedata();
}

async function startDisplay(fullscreen) {
	if (fullscreen) {
		pnl_screen.classList.add('bgimage');
		setTimeout(()=>{
			composeChart('c1', document.getElementById('pnl_display-chart-01'));
			composeChart('c2', document.getElementById('pnl_display-chart-02'));
			composeChart('c3', document.getElementById('pnl_display-chart-03'));
			pnl_marquebanner.classList.add('enable-animation');
		}, 500);
		datafetcher = setInterval(()=>{
			window_updatedata();
		}, INTERVAL_UPDATE);
	} else {
		clearInterval(datafetcher);
		datafetcher = null;
	}
}


async function window_updatedata() {
	// return;
	var endpoint = 'retail/pos/guestbookdisplay/getdata';
	var params = {
		args: {
			crmevent_id: window.global.crmevent_id
		}
	}

	var options = {
		OnJsonParseError: (err, result) => {
			console.error(err);
			console.log(result);
		},
		OnContentOutput: (output) => {
			console.log(output)
		}
	}

	try {
		var result = await $pos.api.call(endpoint, params, options);
		var groups = ['c1', 'c2', 'c3'];
		var i = 0;
		for (let cn of groups) {
			i++;
			setTimeout(()=>{
				updateChart(cn, result.datarespond[cn])
			}, i*200);
		}
	} catch (err) {
		console.error(err);
	}


}

async function updateChart(cn, data) {
	
	// update chart
	charts[cn].setOption({
		series: [{data: [
			{ value: data.pie[0], name: 'Hadir' },
			{ value: data.pie[1], name: 'Belum Hadir' }
		]}]
	});

	let oldlist
	if (currentdisp[cn]!=null) {
		oldlist = currentdisp[cn];
		// oldlist.classList.add('tobedisplay-abs');
		oldlist.classList.remove('tobedisplay');
		oldlist.classList.add('toberemove');
		divtoremove.push(oldlist);
		setTimeout(()=>{
			oldlist.classList.add('hidden');
		}, 250);
		

	}

	console.log(data);
	let newlist = document.createElement('div');
	newlist.classList.add('invisible');
	for (var nama of data.list) {
		var item = document.createElement('div');
		item.innerHTML = nama;
		item.classList.add('listitemdata');
		newlist.appendChild(item);
	}

	pnl_groups[cn].appendChild(newlist);
	newlist.classList.add('tobedisplay');
	setTimeout(()=>{
		newlist.classList.remove('invisible');
	}, 500);
	
	currentdisp[cn] = newlist;

}

