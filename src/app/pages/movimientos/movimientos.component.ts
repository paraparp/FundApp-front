import { Component, OnInit } from '@angular/core';
import { Lot } from 'src/app/models/lot.model';
import { ActivatedRoute } from '@angular/router';
import { LotService } from 'src/app/services/lot.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Portfolio } from 'src/app/models/portfolio.model';


@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  constructor(
    private lotService: LotService,
    private portfolioService: PortfolioService,
    private activatedRoute: ActivatedRoute
  ) { }

  lots: Lot[]
  portfolio: Portfolio;

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')

      this.portfolioService.getPortfolio(id).subscribe(portfolio => this.portfolio = portfolio)
      this.lotService.getLotsByPortfolio(id).subscribe(lots => this.lots = lots as Lot[])
    })
  }
}
