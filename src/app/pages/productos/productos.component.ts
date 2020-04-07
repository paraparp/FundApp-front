import { Component, OnInit } from '@angular/core';


import { DataSourceService } from 'src/app/services/dataSource.service';
import { Portfolio } from 'src/app/models/portfolio.model';


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


  cartera: Portfolio;

  cargarCartera() {
    this.cartera = this.data.getCartera()[0];
  }

}
