import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Operacion } from 'src/app/models/operacion.model';
import { ProductosService } from 'src/app/services/productos.service';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  @Input() public operaciones: Operacion[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public data: DataSourceService, public productoService: ProductosService) { }

  displayedColumns = ['producto', 'participaciones', 'precio', 'importe', 'plataforma', 'fechaAdquisicion', 'cartera'];
  dataSource;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.operaciones);
    if (this.sort) // check it is defined.
    {
      this.dataSource.sort = this.sort;
    }
  }


  // getPrecioMedio() {
  //
  //   return this.productoService.precioMedioProductoEnCartera(this.isin, '1');
  // }

  /** Gets the total cost of all transactions. */
  getTotalVol() {
    return this.operaciones.map(p => p.participaciones).reduce((acc, value) => acc + value, 0);
  }

  getTotalCost() {
    return this.operaciones.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  }

}
