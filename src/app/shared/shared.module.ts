import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MaterialModule } from './material/material.module';
import { PrimegnModule } from './primegn/primegn.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    PrimegnModule,

  ],
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,

  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
  ]
})
export class SharedModule { }
