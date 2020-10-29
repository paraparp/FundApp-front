import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { Portfolio } from '@model/portfolio.model';
import { Lot } from '@model/lot.model';

import { LotService } from '@service/lot.service';
import { PortfolioService } from '@service/portfolio.service';

import { DialogTransactionComponent } from '@component/dialogs/dialog-transaction/dialog-transaction.component';



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

  brokerSymbs;
  lot: Lot = new Lot();
  lots: Lot[]
  portfolio: Portfolio;
  dateGroup;
  id;
  brokers = ["MyInvestor", "Openbank"]

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id')
    })

    this.getPortfolio(this.id)
    this.getLots(this.id)
  }


  openDialog(row: Lot) {
    const dialog = this._dialog.open(DialogTransactionComponent, {
      width: "450px", disableClose: true, data: row
    });
    dialog.afterClosed().subscribe(editedLot => {
      if (editedLot) {
        this.lotService.edit(editedLot).subscribe(() => this.getLots(this.id))
      }
    });
  }

  delete(lot: Lot) {

    Swal.fire({
      title: 'Sure?',
      text: "You are traying to delete a Lot",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'aquamarine',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((deleted) => {
      if (deleted.value) {
        this.lotService.delete(lot).subscribe(() => this.getLots(this.id));
      }
    })
  }



  getPortfolio(id) {
    return this.portfolioService.getPortfolio(id).subscribe(portfolio => this.portfolio = portfolio)
  }

  getLots(id) {
    return this.lotService.getLotsByPortfolio(id).subscribe((lots: Lot[]) => this.lots = lots)
  }

}
