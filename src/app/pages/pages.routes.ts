import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';

import { TransactionsComponent } from './transactions/transactions.component';
import { SymbolsComponent } from './symbols/symbols.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { AuthGuardService } from '../services/auth-guard.service';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';


const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    //canActivate: [LoginGuardGuard],
    children: [
      { path: 'watchlist', component: WatchlistComponent, data: { label: 'Portfolio' }, canActivate: [AuthGuardService] },
      { path: 'portfolios', component: PortfoliosComponent, data: { label: 'Portfolios' }, canActivate: [AuthGuardService] },
      { path: 'transactions', component: TransactionsComponent, data: { label: 'Transactions' }, canActivate: [AuthGuardService] },
      { path: 'symbols', component: SymbolsComponent, data: { label: 'Symbols' }, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent, data: { label: 'Login' } },
      { path: 'register', component: RegisterComponent, data: { label: 'Register' } },
      { path: 'watchlist/:id', component: WatchlistComponent, data: { label: 'Portfolio' } },
      { path: 'symbols/:id', component: SymbolsComponent, data: { label: 'Portfolio' } },
      { path: 'transactions/:id', component: TransactionsComponent, data: { label: 'Transactions' } },
      { path: 'test', component: TestComponent, data: { label: 'Test' } },
      { path: 'test2', component: Test2Component, data: { label: 'Test2' } },
      { path: 'test3', component: Test3Component, data: { label: 'Test3' } },
      { path: '', redirectTo: '/login', pathMatch: 'full' }

    ]
  }
]
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
