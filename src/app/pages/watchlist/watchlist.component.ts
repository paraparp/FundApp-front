import { Component, OnInit, ViewChild } from '@angular/core';
import { Lot } from 'src/app/models/lot.model';
import { Portfolio } from 'src/app/models/portfolio.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { SymbolLot } from 'src/app/models/symbol-lot.model';
import { MatSort } from '@angular/material/sort';



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
  portfolioSymbs: SymbolLot[];
  panelOpenState = true;

  ngOnInit() {
    this.getPortfolio();
    this.getPortfolioSymbs();

  }
  ngOnChanges() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  getPortfolio() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      this.portfolioService.getPortfolio(id).subscribe(portfolio => {
        this.portfolio = portfolio;
        this.name = portfolio.name;
      })
    })
  }

  getPortfolioSymbs() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      this.portfolioService.getPortfolioSymbs(id).subscribe(resp => {
        this.portfolioSymbs = resp;
      })
    })
  }


}
