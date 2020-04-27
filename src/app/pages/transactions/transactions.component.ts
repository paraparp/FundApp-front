import { Component, OnInit } from '@angular/core';

import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio.model';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']

})
export class TransactionsComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private lotService: LotService,
    private portfolioService: PortfolioService,
    private activatedRoute: ActivatedRoute
  ) { }


  lot: Lot = new Lot();
  lots: Lot[]
  portfolio: Portfolio;
  dateGroup;
  id;


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id')
      this.getPortfolio(this.id)
      this.getLots(this.id)
    })

  }

  // ngAfterViewInit() {
  //   console.log(this.id)
  //   this.getPortfolio(this.id)
  //   this.getLots(this.id)
  //
  // }


  // ngOnChanges() {
  //   this.getPortfolio(this.id)
  //   this.getLots(this.id)
  //   console.log(this.lots)
  // }

  openDialog() {

    const dialog = this._dialog.open(DialogComponent, {
      width: "450px",
      disableClose: true,
      data: new Lot
    });
    dialog.afterClosed().subscribe(newLot => {
      if (newLot.symbol) {
        newLot.idPortfolio = this.portfolio.id
        this.lotService.save(newLot).subscribe(() => this.getLots(this.id))
      }
    });
  }

  getPortfolio(id) {
    return this.portfolioService.getPortfolio(id).subscribe(portfolio => this.portfolio = portfolio)
  }

  getLots(id) {
    return this.lotService.getLotsByPortfolio(id).subscribe((lots: Lot[]) => this.lots = lots)
  }

}
