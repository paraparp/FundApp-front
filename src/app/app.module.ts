import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';

import { APP_ROUTES } from './app.routes';

import { PagesModule } from './pages/pages.module';


// importar locales
import localePy from '@angular/common/locales/es-PY';

import { registerLocaleData } from '@angular/common';

import { ServiceModule } from './services/service.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from './shared/shared.module';
import { ServerErrorInterceptor } from './shared/interceptors/server-error.interceptor';
import { GlobalErrorHandler } from './shared/errors/global-error-handler.service';





// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localePy, 'es');


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,





  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    SharedModule,
    ServiceModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]


})
export class AppModule { }
