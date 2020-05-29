import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.css']
})
export class HistoricalChartComponent implements OnInit {

  @Input() public historicalValue: any;
  constructor() { }

  dataVariation;
  dataCost;
  cost;
  show: boolean = false;;

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartData: ChartDataSets[]
  public barChartLabels: string[];
  public barChartColors: Color[] = [
    { backgroundColor: 'aquamarine' },
    { backgroundColor: 'grey' },
  ]

  showbt() {
    this.show = true;
    this.dataCost = this.historicalValue.map(data => data.totalCost)
    this.dataVariation = this.historicalValue.map(data => data.totalGain)
    this.barChartLabels = this.historicalValue.map(data => data.date)
  }
  ngOnChanges() {

    if (this.historicalValue != null && this.historicalValue.length > 0) {
      this.dataCost = this.historicalValue.map(data => data.totalCost)
      this.dataVariation = this.historicalValue.map(data => data.totalGain)
      this.barChartLabels = this.historicalValue.map(data => data.date)

      this.show = true;
    }

    this.barChartData = [

      {
        data: this.dataVariation, label: 'Variation', stack: 'a',
        // borderColor: '#41aaa8',
        // borderWidth: 2,
        // backgroundColor: 'aquamarine'
      },
      {
        data: this.dataCost, label: 'Cost', stack: 'a',
        // borderColor: '#393e46',
        // borderWidth: 2,
        // backgroundColor: 'grey'
      },
    ];

    this.barChartColors = [

      {
        borderColor: '#6feeb7',
        borderWidth: 2,
        backgroundColor: 'aquamarine',
        hoverBorderColor: "#7fccb6",
      },
      {
        borderColor: '#8c8c8c',
        borderWidth: 2,
        backgroundColor: '#a6a6a6',
        hoverBorderColor: "#666666",
      },
    ]

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  ngOnInit(): void {
  }

}
