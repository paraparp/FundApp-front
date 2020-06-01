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
  percentGain: any;
  constructor() { }

  dataVariation;
  dataCost;
  dataCostBond;
  cost;
  show: boolean = false;;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        stacked: true,
      }]
    },
    tooltips: {
      mode: 'x'
    }
  };
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartData: ChartDataSets[]
  public barChartLabels: string[];
  public barChartColors: Color[];


  ngOnChanges() {

    if (this.historicalValue != null && this.historicalValue.length > 0) {
      this.dataCost = this.historicalValue.map(data => Math.floor(data.totalCost - data.bondPercent))
      this.dataCostBond = this.historicalValue.map(data => Math.floor(data.bondPercent))
      this.dataVariation = this.historicalValue.map(data => Math.floor(data.totalGain - data.totalCost))
      this.percentGain = this.historicalValue.map(data =>
        ((data.totalGain - data.totalCost) / data.totalCost) * 100)


      this.show = true;

      this.barChartData = [
        {
          data: this.dataCost, label: 'Equity', stack: 'a',
          borderColor: '#333333',
          backgroundColor: '#555555',
          pointBackgroundColor: "#333333"
        },
        {
          data: this.dataCostBond, label: 'Bond', stack: 'a',
          borderColor: '#8c8c8c',
          backgroundColor: '#a6a6a6',
          pointBackgroundColor: '#8c8c8c'
        },
        {
          data: this.dataVariation, label: 'Gain', stack: 'a',
          borderColor: '#7fccb6',
          backgroundColor: 'aquamarine',
          pointBackgroundColor: '#7fccb6'
        },
        {
          data: this.percentGain, label: 'Percent',

        },
      ];
      this.barChartLabels = this.historicalValue.map(data => data.date);
    }

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
