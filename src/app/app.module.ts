import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// importar locales
import localePy from '@angular/common/locales/es-PY';

import { APP_ROUTES } from './app.routes';

import { SharedModule } from '@shared/shared.module';
import { GlobalErrorHandler } from '@shared/errors/global-error-handler.service';
import { ServerErrorInterceptor } from '@shared/interceptors/server-error.interceptor';
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';

import { AppComponent } from './app.component';

import { AlertComponent } from '@component/alert/alert.component';

import { PagesModule } from '@page/pages.module';

import { ServiceModule } from '@service/service.module';

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
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    DatePipe

  ],
  bootstrap: [AppComponent]


})
export class AppModule { }
