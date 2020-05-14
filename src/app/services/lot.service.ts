import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Lot } from '../models/lot.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }


  getLotsByPortfolio(idPortfolio: number) {
    let url = URL_SERVICIOS + '/portfolios/' + idPortfolio + "/lots";
    console.log(url)
    return this.http.get<Lot[]>(url)
  }


  edit(lot: Lot) {
    let url = URL_SERVICIOS + '/lots/';
    console.log(url)
    return this.http.patch<Lot>(url, lot).pipe(
      map((resp: any) => {
        this.snackBar.open(`Lot: "${resp.symbol.name}" at ${resp.broker} edited: OK!`, 'Close', {
          duration: 4000,
        });
      }))
  }

  save(lot: Lot) {
    let url = URL_SERVICIOS + '/lots/';
    console.log(url)
    return this.http.post<Lot>(url, lot).pipe(
      map((resp: Lot) => {
        this.snackBar.open(`Lot: "${resp.symbol.name}" at ${resp.broker} saved: OK!`, 'Close', {
          duration: 4000,
        });
      }))
  }

  delete(lot: Lot) {
    let url = URL_SERVICIOS + '/lots/' + lot.id;
    console.log(url)
    return this.http.delete<Lot>(url).pipe(
      map((resp: Lot) => {
        this.snackBar.open('Lot ' + lot.symbol.name + ' deleted: OK!', 'Close', {
          duration: 4000,
        });
      }))
  }
}
