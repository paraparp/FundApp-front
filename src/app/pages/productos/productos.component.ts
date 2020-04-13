import { Component, OnInit } from '@angular/core';

import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio.model';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']

})
export class ProductosComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private lotService: LotService,
    private portfolioService: PortfolioService,
    private activatedRoute: ActivatedRoute
  ) { }


  lot: Lot = new Lot();
  lots: Lot[]
  portfolio: Portfolio;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')
      this.portfolioService.getPortfolio(id).subscribe(portfolio => this.portfolio = portfolio)
      this.lotService.getLotsByPortfolio(id).subscribe(lots => this.lots = lots as Lot[])
    })
  }

  openDialog() {
    console.log("Row clicked");
    const dialog = this._dialog.open(DialogComponent, {
      width: "450px",
      disableClose: true,
      data: this.lot
    });

    dialog.afterClosed().subscribe(newLot => {

      if (newLot) {
        newLot =
          this.lotService.edit(newLot).subscribe()
      }
    });
  }


}
