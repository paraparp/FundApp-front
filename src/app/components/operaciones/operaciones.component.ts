import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { Lot } from 'src/app/models/lot.model';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  @Input() public lots: Lot[];


  constructor() { }

  displayedColumns = ['symbol', 'volume', 'price', 'totalValue', 'broker'];

  ngOnInit() {
    console.log(this.lots)
  }

  /** Gets the total cost of all transactions. */
  // getTotalValue() {
  //   return this.lots.map(p => p.totalValue).reduce((acc, totalValue) => acc + totalValue, 0);
  // }
  //
  // getTotalCost() {
  //   return this.lots.map(p => p.getCost()).reduce((acc, value) => acc + value, 0);
  // }

}
