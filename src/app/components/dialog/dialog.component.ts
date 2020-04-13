import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lot } from 'src/app/models/lot.model';
import { SymbolService } from 'src/app/services/symbols.service';
import { Symbol } from 'src/app/models/symbol.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  priceT: any;
  brokerT: any;
  symbolT: Symbol;
  symbols: Symbol[];

  constructor(
    private symbolService: SymbolService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lot: Lot,
  ) {
    this.symbolT = this.lot.symbol;
    this.priceT = this.lot.price;
    this.brokerT = this.lot.broker;

  }


  ngOnInit() {
    this.symbolService.getSymbols().subscribe(resp => this.symbols = resp)
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
