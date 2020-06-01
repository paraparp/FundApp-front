import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PAGES_ROUTES } from './pages.routes';

import { TransactionsComponent } from './transactions/transactions.component';
import { WatchlistComponent } from './watchlist/watchlist.component';


import { MaterialModule } from '../shared/material/material.module';
import { PrimegnModule } from '../shared/primegn/primegn.module';

import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { SymbolsComponent } from './symbols/symbols.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


import { TableEditComponent } from '../components/table-transactions/table-transactions.component';

import { TableSymbolsPortfolioComponent } from '../components/table-symbols-portfolio/table-symbols-portfolio.component';
import { ChartComponent } from '../components/chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { Chart2Component } from '../components/chart2/chart2.component';
import { TableSymbolsComponent } from '../components/table-symbols/table-symbols.component';
import { ContactComponent } from '../components/contact/contact.component';

import { TablePortfoliosComponent } from '../components/table-portfolios/table-portfolios.component';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { DialogPortfolioComponent } from '../components/dialogs/dialog-portfolio/dialog-portfolio.component';
import { DialogSymbolComponent } from '../components/dialogs/dialog-symbol/dialog-symbol.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { DialogTransactionComponent } from '../components/dialogs/dialog-transaction/dialog-transaction.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Test3Component } from './test3/test3.component';
import { HistoricalChartComponent } from '../components/historical-chart/historical-chart.component';
import { ApexchartsModule } from '../shared/apexcharts/apexcharts.module';
import { ApexchartComponent } from '../components/apexchart/apexchart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    PagesComponent,
    WatchlistComponent,
    PortfoliosComponent,
    TransactionsComponent,
    SymbolsComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    DialogPortfolioComponent,
    TableEditComponent,
    DialogTransactionComponent,
    TableSymbolsPortfolioComponent,
    ChartComponent,
    Chart2Component,
    HistoricalChartComponent,
    TableSymbolsComponent,
    DialogSymbolComponent,
    TablePortfoliosComponent,
    TestComponent,
    Test2Component,
    Test3Component,
    ApexchartComponent


  ],
  imports: [
    FormsModule,
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    MaterialModule,
    PrimegnModule,
    TableModule,
    ChartsModule,
    ApexchartsModule,
    NgApexchartsModule
  ],
  exports: [

    WatchlistComponent,
    PortfoliosComponent,
    SymbolsComponent,
    PagesComponent
  ],
  providers: [],
  schemas: [],
  entryComponents: [
    DialogPortfolioComponent
  ]
})
export class PagesModule { }
