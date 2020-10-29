import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SymbolsService } from '@service/symbols.service';
import { Symb } from '@model/symbol.model';
import { Lot } from '@model/lot.model';
import { DialogSymbolComponent } from '@component/dialogs/dialog-symbol/dialog-symbol.component';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css']
})
export class SymbolsComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private symbolService: SymbolsService,

  ) { }

  lots: Lot[]
  symbols: Symb[];

  ngOnInit() {
    this.getSymbols();
  }


  getSymbols() {
    this.symbolService.getSymbs().subscribe(
      resp => this.symbols = resp)
  }

  openDialog() {
    const dialog = this._dialog.open(DialogSymbolComponent, {
      width: "450px",
      disableClose: true,
      data: new Lot
    });
    dialog.afterClosed().subscribe(newSymbol => {
      if (newSymbol) {
        this.symbolService.save(newSymbol).subscribe(() => this.getSymbols())
      }
    });
  }
}
