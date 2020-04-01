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
import { AlertComponent } from './components/alert/alert.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';



// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localePy, 'fr');


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
    ServiceModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
