import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lot } from 'src/app/models/lot.model';
import { SymbolsService } from 'src/app/services/symbols.service';
import { Symb } from 'src/app/models/symbol.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { map, takeUntil, filter, tap, } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dialog-transaction',
  templateUrl: './dialog-transaction.component.html',
  styleUrls: ['./dialog-transaction.component.css']
})
export class DialogTransactionComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private symbolService: SymbolsService,
    public dialogRef: MatDialogRef<DialogTransactionComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public lot: Lot
  ) { }


  public symbolFilteringCtrl: FormControl = new FormControl('');
  public searching: boolean = false;
  public filteredSymbols: ReplaySubject<Symb[]> = new ReplaySubject<Symb[]>(1);
  protected _onDestroy = new Subject<void>();
  public symbols: Symb[];
  public tForm: FormGroup;
  public date;
  priceDate;

  ngOnInit() {

    this.createFrom();
    this.getSymbols();

    this.filter();

    // this.tForm.controls['date'].valueChanges.subscribe(change => { this.setPriceOnChange(), console.log("change") })
    this.tForm.controls['symbol'].valueChanges.subscribe(change => this.setPriceOnChange(null))
  }

  OnDateChange(value) {
    this.setPriceOnChange(value)
  }

  setPriceOnChange(date) {
    if (this.symbol != null) {
      this.priceDate = this.getPriceByDate(this.symbol.isin, date);
      setTimeout(() => {
        this.tForm.patchValue({
          price: this.priceDate
        });
      }, 1500);
    }
  }

  get symbol() {
    return this.tForm.get('symbol').value;
  }
  get dateF() {
    return;
  }

  getPriceByDate(isin, date) {
    let dateT = this.datePipe.transform(new Date(date), "yyyy-MM-dd");
    this.symbolService.getPriceByDate(isin, dateT).subscribe(resp => this.priceDate = resp)
  }

  getSymbols() {
    return this.symbolService.getSymbs().subscribe(resp => {
      this.symbols = resp
      this.filteredSymbols.next(resp);

    })
  }

  filter() {
    this.symbolFilteringCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        map(search => {
          if (!this.symbols) {
            return [];
          }
          return this.symbols.filter(symbol =>
            ((symbol.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
              ||
              symbol.isin.toLowerCase().indexOf(search.toLowerCase()) > -1))
        })
      )
      .subscribe(filteredSymbols => {
        this.searching = false;
        this.filteredSymbols.next(filteredSymbols);

      },
        error => {
          this.searching = false;
        });
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  save(tForm): void {
    tForm.date = this.date.value;
    this.dialogRef.close(tForm);
  }

  createFrom() {
    this.tForm = new FormGroup({
      symbol: new FormControl(null, Validators.required),
      price: new FormControl(0, Validators.required),
      volume: new FormControl(0, Validators.required),
      date: new FormControl(new Date()),
      broker: new FormControl(''),
    });

    if (this.lot != null) {
      this.date = new FormControl((new Date(this.lot.date)));
      this.tForm = this.formBuilder.group(this.lot)
    } else {
      this.date = new FormControl((new Date()));
      this.lot = new Lot();
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
