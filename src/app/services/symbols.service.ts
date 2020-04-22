import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Symb } from '../models/symbol.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymbolsService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }


  getSymbs() {
    let url = URL_SERVICIOS + '/symbols/';
    console.log(url)
    return this.http.get<Symb[]>(url)
  }

  searchByIsin(isin: string) {
    let url = URL_SERVICIOS + '/symbols/search/' + isin;
    console.log(url)
    return this.http.get<Symb>(url)
  }


  edit(symbol: Symb) {
    let url = URL_SERVICIOS + '/symbols/';
    console.log(url)
    return this.http.patch<Symb>(url, symbol).pipe(
      map((resp: any) => {

        this.snackBar.open('Symbol edited: OK!', 'Close', {
          duration: 4000,
        });
      }))
  }

  save(symbol: Symb) {
    let url = URL_SERVICIOS + '/symbols/';
    console.log(url)
    return this.http.post<Symb>(url, symbol).pipe(
      map((resp: any) => {

        this.snackBar.open('New symbol added: ' + symbol.name, null, {
          duration: 4000,
        });
      }))
  }
}
