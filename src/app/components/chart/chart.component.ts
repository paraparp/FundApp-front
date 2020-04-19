import { Component, OnInit, Input } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SymbolLot } from 'src/app/models/symbol-lot.model';


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


  ngOnChanges() {

    this.dataCost = this.portfolioSymbs.map(lot => lot.cost)
    this.dataVariation = this.portfolioSymbs.map(lot => lot.value - lot.cost)
    this.barChartLabels = this.portfolioSymbs.map(lot => lot.symbol.name)

    this.barChartData = [
      { data: this.dataCost, label: 'Cost', stack: 'a' },
      { data: this.dataVariation, label: 'Variation', stack: 'a' }
    ];

  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

}
