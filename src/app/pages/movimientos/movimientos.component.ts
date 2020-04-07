import { Component, OnInit } from '@angular/core';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { Portfolio } from 'src/app/models/portfolio.model';
import { Lot } from 'src/app/models/lot.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {


  constructor(
    private portfolioService: PortfolioService,
    private activatedRoute: ActivatedRoute) { }

  name = ''
  portfolio: Portfolio;
  lots: Lot[] = [];

  ngOnInit() {
    this.getPortfolio();
  }


  getPortfolio() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      this.portfolioService.getPortfolio(id).subscribe(portfolio => {
        this.portfolio = portfolio;
        this.name = portfolio.name
        this.lots = portfolio.lots
      })
    })

  }
}
