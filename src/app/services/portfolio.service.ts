import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Portfolio } from '../models/portfolio.model';

import { catchError, map } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }


  getPortfolio(id: number) {
    let url = URL_SERVICIOS + '/portfolios/' + id;

    return this.http.get<Portfolio>(url)
  }

  getPortfolioSymbols(id: number) {
    let url = URL_SERVICIOS + '/portfolios/watchlist/' + id;

    return this.http.get(url)
  }

  save(portfolio: Portfolio) {
    let url = URL_SERVICIOS + '/portfolios/';
    return this.http.post<Portfolio>(url, portfolio).pipe(
      map((resp: any) => {

        this.snackBar.open('Porfolio created: OK!', 'Close', {
          duration: 4000,
        });
      }))
  }

  delete(portfolio: Portfolio) {
    let url = URL_SERVICIOS + '/portfolios/' + portfolio.id;
    return this.http.delete(url).pipe(
      map((resp: any) => {

        this.snackBar.open('Porfolio ' + portfolio.name + ' deleted: OK!', 'Close', {
          duration: 4000,
        });
      }));
  }

  edit(portfolio: Portfolio) {
    let url = URL_SERVICIOS + '/portfolios/';
    return this.http.patch<Portfolio>(url, portfolio).pipe(
      map((resp: any) => {

        this.snackBar.open('Porfolio modified: OK!', 'Close', {
          duration: 4000,
        });
      }))
  }
}
