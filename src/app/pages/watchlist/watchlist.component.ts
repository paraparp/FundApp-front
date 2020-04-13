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
  styleUrls: ['./watchlist.component.css'
  ],
})
export class WatchlistComponent implements OnInit {

  constructor(
    private portfolioService: PortfolioService,
    private activatedRoute: ActivatedRoute,

  ) { }

  name = ''
  portfolio: Portfolio;
  lots: Lot[] = [];
  portfolioSymbols;

  displayedColumns = ['name', 'volume', 'price', 'cost', 'lastPrice', 'value', 'updated'];


  ngOnInit() {

    this.getPortfolio();
    this.portfolioSymbols = this.getPortfolioSymbols();

    console.log(this.portfolioSymbols)

    alert(this.getTotalValue() + " -- " + this.getTotalCost())

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

  isUpdated(updatedAt): boolean {

    var today = new Date();
    var yesterDay = today.getDate() - 1;
    var day = updatedAt.split(" ")[1];
    if (yesterDay == parseInt(day)) {
      return true
    }
    return false
  }


  getTotalValue() {
    return this.portfolioSymbols.map(p => p.totalValue).reduce((acc, totalValue) => acc + totalValue, 0);
  }

  getTotalCost() {
    return this.portfolioSymbols.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  }



}
