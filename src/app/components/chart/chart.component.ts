import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() public portfolioSymbs: any;
  constructor() { }

  dataVariation;
  dataCost
  cost;

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[]
  public barChartLabels: string[];
  public barChartColors: Color[];

  ngOnChanges() {

    this.dataCost = this.portfolioSymbs.map(lot => lot.cost)
    this.dataVariation = this.portfolioSymbs.map(lot => lot.variation)
    this.barChartLabels = this.portfolioSymbs.map(lot => lot.symbol.name)


    this.barChartData = [
      {
        data: this.dataCost, label: 'Cost', stack: 'a',
        // borderColor: '#393e46',
        // borderWidth: 2,
        // backgroundColor: 'grey'
      },
      {
        data: this.dataVariation, label: 'Variation', stack: 'a',
        // borderColor: '#41aaa8',
        // borderWidth: 2,
        // backgroundColor: 'aquamarine'
      }
    ];

    this.barChartColors = [
      {
        // borderColor: '#8c8c8c',
        borderWidth: 1,
        backgroundColor: '#a6a6a6',
        hoverBorderColor: "#666666",

      },
      {
        // borderColor: '#6feeb7',
        borderWidth: 1,
        backgroundColor: 'aquamarine',
        hoverBorderColor: "#7fccb6",
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

}
