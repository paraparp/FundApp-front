import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lot } from 'src/app/models/lot.model';
import { SymbolsService } from 'src/app/services/symbols.service';
import { Symb } from 'src/app/models/symbol.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  // name: any;
  volume: number;
  date: Date;
  price: number;
  broker: any;
  symbol: Symb = new Symb();
  symbols: Symb[];
  originalLot: Lot;

  dateFormCtrl = new FormControl(new Date());

  constructor(
    private symbolService: SymbolsService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public lot: Lot,
  ) {
    this.symbol = this.lot.symbol
    this.price = this.lot.price;
    this.volume = this.lot.volume;
    this.broker = this.lot.broker;
    this.date = new Date(this.lot.date)
  }


  ngOnInit() {
    // console.log(this.lot.symbol.id, this.lot.symbol.name);
    this.symbolService.getSymbs().subscribe(resp => this.symbols = resp)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save(): void {
    this.lot.volume = this.volume
    this.lot.broker = this.broker
    this.lot.price = this.price
    this.lot.symbol = this.symbol
    this.lot.date = this.date
    this.dialogRef.close(this.lot);
  }

}
