import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {


  rowData: any[];
  tranformed: any[];
  data: any;

  show: boolean = false;
  rowDataIR: any;
  data2: any;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getUrl(data: string) {
    console.log(data)
    return 'https://api.stlouisfed.org/fred/series/'
      + `observations?series_id=${data}&frequency=wef`
      + '&observation_start=2010-01-04&observation_end=9999-12-31'
      + '&api_key=1d6109900692021b3c0e18d9a1c9591f&file_type=json';
  }

  ngAfterViewInit() {
    this.getY10M03(this.getUrl('T10Y3M'));
    this.getIR(this.getUrl('DFF'));
  }

  show1() {
    console.log(this.rowData)
    this.show = true;
    this.set()
  }

  set() {

    this.data = this.rowData.map(rowData => Math.round(rowData.value * 10) / 10)
    this.barChartLabels = this.rowData.map(rowData => rowData.date)
    this.data2 = this.rowDataIR.map(rowDataIR => Math.round(rowDataIR.value * 10) / 10)

    this.barChartData = [
      {
        data: this.data, label: 'Y10M03', stack: 'a', radius: 0, borderColor: "grey",
        fill: false,
      }, {
        data: this.data2, label: 'DFF', stack: 'a', radius: 0, borderColor: "aquamarine",
        fill: false
      }
    ]

  }
  public barChartOptions: ChartOptions = {


    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'linear',

      },]
    }, legend: { display: false },
    tooltips: {
      position: 'average', // 'nearest',
      mode: 'index',
      intersect: false,
    }
  };
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartData: ChartDataSets[]
  public barChartLabels: string[];
  public barChartColors: Color[] = [
    { backgroundColor: 'aquamarine' },
    { backgroundColor: 'grey' },
  ]



  getY10M03(url: string) {
    console.log(url)
    this.http.get(url)
      .subscribe((data: Data) => {
        this.rowData = data.observations
          .map(data => { return { date: data.date, value: data.value } })
      });
  }


  getIR(url: string) {
    console.log(url)
    this.http.get(url)
      .subscribe((data: Data) => {
        this.rowDataIR = data.observations
          .map(data => { return { date: data.date, value: data.value } })
      });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

}


export interface Data {

  observations;

}
