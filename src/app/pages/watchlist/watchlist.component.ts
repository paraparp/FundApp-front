import { Component, OnInit, ViewChild } from '@angular/core';


import { Lot } from 'src/app/models/lot.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { SymbolLot } from 'src/app/models/symbol-lot.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


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

  @ViewChild(MatSort, { static: true }) sort: MatSort;



  name = ''
  portfolio: Portfolio;
  lots: Lot[] = [];
  portfolioSymbs: SymbolLot[];
  panelOpenState = true;

  displayedColumns = ['name', 'representation', 'volume', 'price', 'lastPrice', 'cost', 'value', 'variation', '%', 'updated'];
  dataSource;

  ngOnInit() {

    this.getPortfolio();
    this.getPortfolioSymbs();
    this.dataSource = new MatTableDataSource(this.portfolioSymbs);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  getPortfolioSymbs() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      this.portfolioService.getPortfolioSymbs(id).subscribe(resp => {
        this.portfolioSymbs = resp;
        //Se asig na el volor en cartera %
        this.portfolioSymbs.forEach(lot => lot.percentInPortfolio = (lot.value / this.getTotalValue()))

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
    return this.portfolioSymbs.map(lot => lot.value).reduce((acc, value) => acc + value, 0)
  }

  getTotalCost() {
    return this.portfolioSymbs.map(lot => lot.cost).reduce((acc, value) => acc + value, 0)
  }
  getTotalVariation() {
    return (this.getTotalValue() - this.getTotalCost()) / this.getTotalCost()
  }


  today() {

    return new Date();
  }

}
