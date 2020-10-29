import { Component, OnInit, Input } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SymbolLot } from '@model/symbol-lot.model';
import { Lot } from '@model/lot.model';


@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component {
  @Input() public lots: any;
  constructor() { }

  dataVariation;
  dataCost = []
  cost;

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[]
  public barChartLabels: string[];


  ngAfterViewInit() {

    this.dataCost = this.groupLotsByDate(this.lots).map(lot => lot.cost)
    this.barChartLabels = this.groupLotsByDate(this.lots).map(lot => lot.date)

    this.barChartData = [
      {
        barPercentage: 0.5,
        barThickness: 30,
        maxBarThickness: 30,
        minBarLength: 2,
        data: this.dataCost, label: 'Cost', stack: 'a'
      },
    ];


  }



  //chart
  groupBySymbol() {

    //Group by symbol
    let group = this.lots.reduce((r, a) => {
      r[a.symbol.id] = [...r[a.symbol.id] || [], a];
      return r;
    }, {});
    console.log("group", group);
  }

  groupLotsByDate(lots: Lot[]) {
    const groups = lots.reduce((groups, lot) => {
      const date = lot.date.toString().split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(lot.cost);
      return groups;
    }, {});


    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        cost: groups[date]
      };
    });
    console.log(groupArrays)
    const group2 = [];

    groupArrays.map(((lot) => {
      group2.push({
        date: lot.date,
        cost: lot.cost.reduce((acc, value) => acc + value, 0)
      })
    }))

    return group2;
  }



}
