import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss']
})
export class ViewDashboardComponent implements OnInit {
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 30,
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 10, y: 10, r: 10 },
        { x: 15, y: 5, r: 15 },
        { x: 26, y: 12, r: 23 },
        { x: 7, y: 8, r: 8 },
      ],
      label: 'Series A',
    },
  ];


  // Doughnut
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

	//   Bar Charts

	barChartOptions: ChartOptions = {
		responsive: true,
	};
	barChartLabels: Label[] = [
		'Apple',
		'Banana',
		'Kiwifruit',
		'Blueberry',
		'Orange',
		'Grapes',
	];
	barChartType: ChartType = 'bar';
	barChartLegend = true;
	barChartPlugins = [];

	barChartColors: Color[] = [
		{
			backgroundColor: '#f9a826',
		},
	];

	barChartData: ChartDataSets[] = [
		{ data: [45, 37, 60, 100, 46, 33], label: 'Best Fruits' },
	];

  constructor() { }

  ngOnInit() {
  }

}
