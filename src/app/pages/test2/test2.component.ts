import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {


  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  @ViewChild('data') data;
  rowDataIR: any;
  rowData: any;

  historicalData: any;

  constructor(private http: HttpClient, private portfolioService: PortfolioService) {



  }


  ngOnInit(): void {
    this.getHistorical()


    setTimeout(() => { this.getHistorical() }, 1000);
    setTimeout(() => { this.getGraph() }, 2000);
  }

  getGraph() {



    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');



    console.log(this.historicalData)

    let myChart = new Chart(this.ctx, {
      type: 'line',

      data: {
        datasets: [{
          label: 'Höhenlinie',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: false,
          data: [
            this.historicalData
          ],
        }]
      }

    });
  }



  getHistorical() {

    this.portfolioService.getPortfolioHistoricalCost(4).subscribe((resp: any) => {
      this.historicalData = resp.map(data => { return data.y })
    }
    )


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
