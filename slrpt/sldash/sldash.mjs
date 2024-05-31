

var el_myChart_1 = document.getElementById('myChart-1');
var el_myChart_2 = document.getElementById('myChart-2');



export async function init() {
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'

	CreateChart_1();
	CreateChart_2();
}


function CreateChart_1() {
	var ctx = el_myChart_1.getContext('2d');


	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN'],
			datasets: [{
				label: 'Sales 2020',
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				data: [{x:'A', y:12}, {x:'B', y:19}, {x:'C', y:3}, {x:'D', y:5}, {x:'E', y:2}, {x:'F', y:3}],
				// backgroundColor: [
				// 	'rgba(255, 99, 132, 0.2)',
				// 	'rgba(54, 162, 235, 0.2)',
				// 	'rgba(255, 206, 86, 0.2)',
				// 	'rgba(75, 192, 192, 0.2)',
				// 	'rgba(153, 102, 255, 0.2)',
				// 	'rgba(255, 159, 64, 0.2)'
				// ],
				// borderColor: [
				// 	'rgba(255, 99, 132, 1)',
				// 	'rgba(54, 162, 235, 1)',
				// 	'rgba(255, 206, 86, 1)',
				// 	'rgba(75, 192, 192, 1)',
				// 	'rgba(153, 102, 255, 1)',
				// 	'rgba(255, 159, 64, 1)'
				// ],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},

			onClick: function (e, items) {
				if ( items.length == 0 ) return; //Clicked outside any bar.
				var item = items[0];

				var item_data = this.data.datasets[0].data[item._index];
				console.log(item_data);
			}			
		}
	});
}




function CreateChart_2() {

	var randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
	};


	var ctx = el_myChart_2.getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'pie',
		data: {
			datasets: [{
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
				],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
				],
				label: 'Dataset 1'
			}],
			labels: [
				'Red',
				'Orange',
				'Yellow',
				'Green',
				'Blue'
			]
		},
		options: {
			responsive: true,
			legend: {
				position: 'right'
			}
		}
	});





}