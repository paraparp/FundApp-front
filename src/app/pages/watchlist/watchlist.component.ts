import { Component, OnInit, ViewChild } from '@angular/core';


import { Lot } from 'src/app/models/lot.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { PortfolioSymbols } from 'src/app/models/portfolio-symbols.model';
import { ImportXMLService } from 'src/app/services/import-xml.service';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {

  constructor(
    private portfolioService: PortfolioService,
    private activatedRoute: ActivatedRoute,
    private impXML: ImportXMLService
  ) { }

  name = ''
  portfolio: Portfolio;
  lots: Lot[] = [];
  portfolioSymbols;

  displayedColumns = ['name', 'volume', 'price', 'cost', 'lastPrice', 'value'
    // 'isin', 'participaciones', 'precio', 'precioActual', 'valor', 'valorActual', '%', 'fechaActualizacion'
  ];


  ngOnInit() {

    this.getPortfolio();
    this.portfolioSymbols = this.getPortfolioSymbols();

    console.log(this.portfolioSymbols)

  }

  getPortfolio() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      this.portfolioService.getPortfolio(id).subscribe(portfolio => {
        this.portfolio = portfolio;
        this.name = portfolio.name;
        this.lots = portfolio.lots;
      })
    })
  }

  getPortfolioSymbols() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      this.portfolioService.getPortfolioSymbols(id).subscribe(resp => {
        this.portfolioSymbols = resp;
      })
    })
  }

  getLastPrice(url) {

    return this.impXML.extraerPrecio(url, 'precioActual');
  }
}
