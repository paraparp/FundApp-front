import { Component, OnInit } from '@angular/core';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { Cartera } from 'src/app/models/cartera.model';
import { Operacion } from 'src/app/models/operacion.model';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {


  constructor(public data: DataSourceService) { }

  cartera: Cartera;
  operaciones: Operacion[] = [];

  ngOnInit() {
    this.cargarCartera();
    console.log(this.cargarOperaciones());
    this.operaciones = this.cargarOperaciones();

  }

  cargarOperaciones() {

    return this.operaciones = this.data.getOperaciones();

  }
  cargarCartera() {

    this.cartera = this.data.getCartera()[0];

  }

}
