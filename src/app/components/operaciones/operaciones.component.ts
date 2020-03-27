import { Component, OnInit, Input } from '@angular/core';
import { Operacion } from 'src/app/models/operacion.model';
import { Cartera } from 'src/app/models/cartera.model';
import { ProductosService } from 'src/app/services/productos.service';
import { DataSourceService } from 'src/app/services/dataSource.service';

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  @Input() public isin: string = '';

  constructor(public data: DataSourceService, public productoService: ProductosService) { }

  displayedColumns = ['producto', 'participaciones', 'precio', 'importe', 'plataforma', 'fechaAdquisicion', 'cartera'];


  cartera: Cartera;
  operaciones: Operacion[] = [];;



  ngOnInit() {
    this.cargarCartera();
    this.cargarOperaciones();

  }

  cargarOperaciones() {
    this.operaciones = this.data.getOperacionesByIsin(this.isin);
  }
  cargarCartera() {
    this.cartera = this.data.getCartera()[0];

  }

  getPrecioMedio() {

    return this.productoService.precioMedioProductoEnCartera(this.isin, '1');
  }

  /** Gets the total cost of all transactions. */
  getTotalVol() {
    return this.operaciones.map(p => p.participaciones).reduce((acc, value) => acc + value, 0);
  }

  getTotalCost() {
    return this.operaciones.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  }

}
