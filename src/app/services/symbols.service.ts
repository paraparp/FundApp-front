import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Symbol } from '../models/symbol.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }


  getSymbols() {
    let url = URL_SERVICIOS + '/symbols/';
    console.log(url)
    return this.http.get<Symbol[]>(url)
  }


  edit(symbol: Symbol) {
    let url = URL_SERVICIOS + '/symbols/';
    console.log(url)
    return this.http.patch<Symbol>(url, symbol).pipe(
      map((resp: any) => {

        this.snackBar.open('Symbol edited: OK!', 'Close', {
          duration: 4000,
        });
      }))
  }

  save(symbol: Symbol) {
    let url = URL_SERVICIOS + '/symbols/';
    console.log(url)
    return this.http.put<Symbol>(url, symbol).pipe(
      map((resp: any) => {

        this.snackBar.open('Symbol saved: OK!', 'Close', {
          duration: 4000,
        });
      }))
  }
}
