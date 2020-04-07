import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { Portfolio } from '../models/portfolio.model';
import { PortfolioSymbols } from '../models/portfolio-symbols.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private router: Router, private http: HttpClient) { }


  getPortfolio(id: number) {
    let url = URL_SERVICIOS + '/portfolios/' + id;
    return this.http.get<Portfolio>(url)
  }

  getPortfolioSymbols(id: number) {
    let url = URL_SERVICIOS + '/portfolios/watchlist/' + id;
    return this.http.get(url)
  }

}
