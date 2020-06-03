import { Component, OnDestroy, ViewChild, Input, OnInit } from "@angular/core";
import { ChartComponent } from 'ng-apexcharts';

import {

  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};


@Component({
  selector: "app-apexchart",
  templateUrl: './apexchart.component.html',
  styles: [``]
})
export class ApexchartComponent implements OnDestroy {
  ngOnChanges(): void {
    this.getdata()
  }

  @ViewChild('chart', { static: false })
  chartComponent: ChartComponent;
  @Input() public historicalValue: any;

  public chartOptions: Partial<ChartOptions>;

  dataCost: any;
  barChartLabels: any;
  show: boolean = false;

  chartData: any;
  dataCostBond: any;
  dataVariation: any;

  getdata() {
    if (this.historicalValue != null && this.historicalValue.length > 0) {
      this.dataCost = this.historicalValue.map(data => Math.floor(data.totalCost - data.bondPercent))
      this.dataCostBond = this.historicalValue.map(data => Math.floor(data.bondPercent))
      this.dataVariation = this.historicalValue.map(data => Math.floor(data.totalGain - data.totalCost))
      this.barChartLabels = this.historicalValue.map(data => { data.date, console.log('yaaaaa') });

      this.show = true
      console.log('carhando grafico')
      this.getChart();
    }

  }
  getChart() {

    console.log('carhando grafico')

    this.chartOptions = {
      chart: {
        type: "area",
        stacked: true,
        height: 'auto'
      },
      series: [
        {
          name: "Data",
          data: this.dataCost
        },
        {
          name: "Data",
          data: this.dataCostBond
        },
        {
          name: "Data",
          data: this.dataVariation
        }
      ],
      // dataLabels: {
      //   enabled: false
      // },
      // xaxis: {
      //   type: "datetime",
      //   categories: this.barChartLabels
      // }
    }


    //
    // stroke: {
    //   curve: 'straight'
    // },
    //
    // title: {
    //   text: "Historical Portfolio Value"
    //
    // }


  }

  ngOnDestroy() {
    // this.chartComponent.destroy();
  }
}
