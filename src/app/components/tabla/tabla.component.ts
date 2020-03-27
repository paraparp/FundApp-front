import { Component, OnInit } from '@angular/core';


import { ProductosService } from 'src/app/services/productos.service';
import { ImportXMLService } from 'src/app/services/import-xml.service';
import { Operacion } from 'src/app/models/operacion.model';
import { DataSourceService } from 'src/app/services/dataSource.service';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {


  constructor(
    public data: DataSourceService,
    public productoService: ProductosService,
    public importxml: ImportXMLService
  ) { }

  operaciones: Operacion[];

  ngOnInit(): void {
    this.operaciones = this.findOperacionesPorCartera();

    console.log(this.operaciones)
  }

  findOperacionesPorCartera() {

    return this.productoService.findOperacionesPorCartera('1');
  }
}
