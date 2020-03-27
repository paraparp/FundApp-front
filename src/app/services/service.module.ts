import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ImportXMLService } from './import-xml.service';
import { ProductosService } from './productos.service';
import { DataSourceService } from './dataSource.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ImportXMLService,
    ProductosService,
    DataSourceService
  ]
})
export class ServiceModule { }
