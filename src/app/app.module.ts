import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';

import { APP_ROUTES } from './app.routes';

import { PagesModule } from './pages/pages.module';


// importar locales
import localePy from '@angular/common/locales/es-PY';

import { registerLocaleData } from '@angular/common';

import { ServiceModule } from './services/service.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localePy, 'fr');


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    ServiceModule,
    BrowserAnimationsModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
