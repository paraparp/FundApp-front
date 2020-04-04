import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PAGES_ROUTES } from './pages.routes';

import { ProductosComponent } from './productos/productos.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { UserComponent } from './user/user.component';

import { OperacionesComponent } from '../components/operaciones/operaciones.component';
import { TablaComponent } from '../components/tabla/tabla.component';
import { TablaProductosComponent } from '../components/tabla-productos/tabla-productos.component';
import { MaterialModule } from '../shared/material/material.module';
import { PrimegnModule } from '../shared/primegn/primegn.module';

import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ElementsComponent } from '../components/elements/elements.component';





@NgModule({
  declarations: [
    PagesComponent,
    WatchlistComponent,
    UserComponent,
    ProductosComponent,
    OperacionesComponent,
    TablaComponent,
    TablaProductosComponent,
    MovimientosComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    ElementsComponent,


  ],
  imports: [
    FormsModule,
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    MaterialModule,
    PrimegnModule,
    TableModule


  ],
  exports: [

    OperacionesComponent,
    WatchlistComponent,
    UserComponent,
    MovimientosComponent

  ],
  providers: [],
  schemas: []
})
export class PagesModule { }
