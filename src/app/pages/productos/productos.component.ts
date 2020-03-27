import { Component, OnInit } from '@angular/core';


import { Cartera } from 'src/app/models/cartera.model';
import { DataSourceService } from 'src/app/services/dataSource.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']

})
export class ProductosComponent implements OnInit {

  constructor(public data: DataSourceService) { }

  ngOnInit(): void {
    this.cargarCartera()
  }


  cartera: Cartera;

  cargarCartera() {
    this.cartera = this.data.getCartera()[0];
  }

}
