import { Component, OnInit, Input } from '@angular/core';

import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio.model';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogTransactionComponent } from 'src/app/components/dialogs/dialog-transaction/dialog-transaction.component';



@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']

})
export class TransactionsComponent implements OnInit {
  brokerSymbs: import("c:/Users/rodrigo.paraparpriet/Desktop/Proyectos/GestorFondos/src/app/models/symbol-lot.model").SymbolLot[];

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
