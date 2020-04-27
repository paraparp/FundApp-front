import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { UserComponent } from './user/user.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SymbolsComponent } from './symbols/symbols.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

import { AuthGuardService } from '../services/auth-guard.service';


const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    //canActivate: [LoginGuardGuard],
    children: [
      { path: 'watchlist', component: WatchlistComponent, data: { label: 'Portfolio' }, canActivate: [AuthGuardService] },
      { path: 'user', component: UserComponent, data: { label: 'User' }, canActivate: [AuthGuardService] },
      { path: 'transactions', component: TransactionsComponent, data: { label: 'Transactions' }, canActivate: [AuthGuardService] },
      { path: 'symbols', component: SymbolsComponent, data: { label: 'Symbols' }, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent, data: { label: 'Login' } },
      { path: 'register', component: RegisterComponent, data: { label: 'Register' } },
      { path: 'watchlist/:id', component: WatchlistComponent, data: { label: 'Portfolio' } },
      { path: 'symbols/:id', component: SymbolsComponent, data: { label: 'Portfolio' } },
      { path: 'transactions/:id', component: TransactionsComponent, data: { label: 'Transactions' } },
      { path: '', redirectTo: '/login', pathMatch: 'full' }

    ]
  }
]
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
