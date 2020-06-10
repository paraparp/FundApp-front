import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Portfolio } from '../models/portfolio.model';

import { catchError, map } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SymbolLot } from '../models/symbol-lot.model';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { }

  getPortfolio(id: number) {
    let url = URL_SERVICIOS + '/portfolios/' + id;

    return this.http.get<Portfolio>(url)
  }

  getPortfolioHistoricalCost(id: number) {
    let url = URL_SERVICIOS + '/portfolios/' + id + '/lots/cost';

    return this.http.get(url)
  }
  getPortfolioXrayMorningStar(id: string): Observable<string> {
    let url = URL_SERVICIOS + '/portfolios/' + id + '/xray';
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(e => {
        if (e.status != 500 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError("Error generating url");
      }));
  }
  getTypes(idPortfolio: number) {
    let url = URL_SERVICIOS + '/portfolios/' + idPortfolio + "/types";
    return this.http.get<Portfolio>(url)
  }

  getBrokers(idPortfolio: number) {

    let url = URL_SERVICIOS + '/portfolios/' + idPortfolio + "/brokers";
    return this.http.get<Portfolio>(url)
  }

  getPortfolioByUser(idUser: number) {
    let url = URL_SERVICIOS + '/portfolios/user/' + idUser;
    return this.http.get<Portfolio>(url)
  }

  getPortfolioSymbs(id: number) {
    let url = URL_SERVICIOS + '/portfolios/watchlist/' + id;

    return this.http.get<SymbolLot[]>(url)
  }
  getPortfolioSymbsByBrokerAndType(id: number, broker: string, type: string) {
    let url = URL_SERVICIOS + '/portfolios/watchlist/' + id + "/filters?broker=" + broker + "&type=" + type;

    console.log(url)

    return this.http.get<SymbolLot[]>(url)
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
