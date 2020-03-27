import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { UserComponent } from './user/user.component';
import { ProductosComponent } from './productos/productos.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    //canActivate: [LoginGuardGuard],
    children: [
      { path: 'watchlist', component: WatchlistComponent, data: { titulo: 'Watchlist' } },
      { path: 'user', component: UserComponent, data: { titulo: 'User' } },
      { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' } },


      { path: '', redirectTo: '/watchlist', pathMatch: 'full' }

    ]
  }
]
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
