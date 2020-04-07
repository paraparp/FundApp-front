import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Lot } from 'src/app/models/lot.model';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  @Input() public lots: Lot[];
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public data: DataSourceService, public productoService: ProductosService) { }

  displayedColumns = ['symbol', 'volume', 'price', 'totalValue', 'broker'];
  dataSource;

  ngOnInit() {
    console.log(this.lots)
    //
    // this.dataSource = new MatTableDataSource(this.lots);
    // if (this.sort) // check it is defined.
    // {
    //   this.dataSource.sort = this.sort;
    // }
  }


  // getPrecioMedio() {
  //
  //   return this.productoService.precioMedioProductoEnCartera(this.isin, '1');
  // }

  /** Gets the total cost of all transactions. */
  getTotalValue() {
    return this.lots.map(p => p.totalValue).reduce((acc, totalValue) => acc + totalValue, 0);
  }

  getTotalCost() {
    return this.lots.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  }

}
