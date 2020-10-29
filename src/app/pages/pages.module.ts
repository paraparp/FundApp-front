import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { PAGES_ROUTES } from '@page/pages.routes';

import { TableModule } from 'primeng/table';

import { ChartsModule } from 'ng2-charts';

import { HistoricalChartComponent } from '@component/historical-chart/historical-chart.component';
import { TableSymbolsPortfolioComponent } from '@component/table-symbols-portfolio/table-symbols-portfolio.component';
import { DialogTransactionComponent } from '@component/dialogs/dialog-transaction/dialog-transaction.component';
import { DialogSymbolComponent } from '@component/dialogs/dialog-symbol/dialog-symbol.component';
import { DialogPortfolioComponent } from '@component/dialogs/dialog-portfolio/dialog-portfolio.component';
import { TablePortfoliosComponent } from '@component/table-portfolios/table-portfolios.component';
import { ApexchartComponent } from '@component/apexchart/apexchart.component';
import { TableEditComponent } from '@component/table-transactions/table-transactions.component';
import { ChartComponent } from '@component/chart/chart.component';
import { Chart2Component } from '@component/chart2/chart2.component';
import { TableSymbolsComponent } from '@component/table-symbols/table-symbols.component';

import { WatchlistComponent } from '@page/watchlist/watchlist.component';
import { TransactionsComponent } from '@page/transactions/transactions.component';
import { TestComponent } from '@page/test/test.component';
import { Test2Component } from '@page/test2/test2.component';
import { Test3Component } from '@page/test3/test3.component';
import { PortfoliosComponent } from '@page/portfolios/portfolios.component';
import { PagesComponent } from '@page/pages.component';
import { SymbolsComponent } from '@page/symbols/symbols.component';
import { RegisterComponent } from '@page/login/register.component';
import { LoginComponent } from '@page/login/login.component';

import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/material/material.module';
import { PrimegnModule } from '@shared/primegn/primegn.module';
import { ApexchartsModule } from '@shared/apexcharts/apexcharts.module';

@NgModule({
  declarations: [
    PagesComponent,
    WatchlistComponent,
    PortfoliosComponent,
    TransactionsComponent,
    SymbolsComponent,
    LoginComponent,
    RegisterComponent,
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
    ApexchartComponent,


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
    NgApexchartsModule,
    NgxMatSelectSearchModule
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
