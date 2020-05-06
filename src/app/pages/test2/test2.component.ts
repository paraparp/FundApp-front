import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component {
  name = 'Angular   6';
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  @ViewChild('data') data;
  rowDataIR: any;
  rowData: any;
  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',

      data: {
        datasets: [{
          label: 'Höhenlinie',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: [
            { x: 1, y: 2 },
            { x: 2500, y: 2.5 },
            { x: 3000, y: 5 },
            { x: 3400, y: 2.75 },
            { x: 3600, y: 4.75 },
            { x: 5200, y: 6 },
            { x: 6000, y: 9 },
            { x: 7100, y: 6 },
          ],
        }, {
          label: 'Höhenlinie',
          backgroundColor: "aquamarine",
          borderColor: "aquamarine",
          fill: true,
          data: [
            { x: 1, y: 2 },
            { x: 2500, y: 21.5 },
            { x: 3000, y: 5 },
            { x: 3400, y: 21.75 },
            { x: 3600, y: 4.75 },
            { x: 5200, y: 61 },
            { x: 6000, y: 9 },
            { x: 7100, y: 6 },
          ],
        }]
      },
      options: {
        legend: { display: false },
        tooltips: {
          position: 'average', // 'nearest',
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        title: {
          display: true,
          text: 'Höhenlinie'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',

            scaleLabel: {
              labelString: 'Länge',
              display: true,
            }
          }],
          yAxes: [{
            type: 'linear',

            scaleLabel: {
              labelString: 'Höhe',
              display: true
            }
          }]
        }
      }
    });
  }


  getY10M03(url: string) {
    console.log(url)
    this.http.get(url)
      .subscribe((data: Data) => {
        this.rowData = data.observations
          .map(data => { return { x: data.date, y: data.value } })
      });
  }


  getIR(url: string) {
    console.log(url)
    this.http.get(url)
      .subscribe((data: Data) => {
        this.rowDataIR = data.observations
          .map(data => { return { x: data.date, y: data.value } })
      });
  }

  getUrl(data: string) {
    console.log(data)
    return 'https://api.stlouisfed.org/fred/series/'
      + `observations?series_id=${data}&frequency=wef`
      + '&observation_start=2010-01-04&observation_end=9999-12-31'
      + '&api_key=1d6109900692021b3c0e18d9a1c9591f&file_type=json';
  }

}


export interface Data {

  observations;

}
