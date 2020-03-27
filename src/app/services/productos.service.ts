import { Injectable } from '@angular/core';

import { Usuario } from '../models/usuario.model';
import { Cartera } from '../models/cartera.model';
import { Producto } from '../models/producto.model';
import { Operacion } from '../models/operacion.model';
import { DataSourceService } from './dataSource.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  constructor(public data: DataSourceService) { }

  cartera: Cartera;
  productos: Producto[];

  volumenProducto: number;
  totalOp: number;
  valor: number;

  findOperacionesPorCartera(idCartera: string) {

    let operaciones: Operacion[] = [];

    this.data.getOperaciones().forEach(op => {
      if (op.cartera.id === idCartera) {

        operaciones.push(op)

      }
    });

    return operaciones;
  }

  findCarteraByUser(user: Usuario) {

    this.data.getCartera().forEach(cartera => {
      if (cartera.usuario === user) {

        return cartera;

      }
    });
  }

  precioMedioProductoEnCartera(isin: string, idCartera: string) {
    this.volumenProducto = 0;
    this.totalOp = 0;

    this.data.getOperaciones().forEach(op => {
      if (op.producto.isin === isin && op.cartera.id === idCartera) {

        this.totalOp += op.precio * op.participaciones;
        this.volumenProducto += op.participaciones;

      }
    });

    return this.totalOp / this.volumenProducto;
  }

  participacionesPorProducto(isin: string, idCartera: string) {
    this.volumenProducto = 0;

    this.data.getOperaciones().forEach(op => {

      if (op.producto.isin === isin && op.cartera.id === idCartera) {

        this.volumenProducto += op.participaciones;

      }
    });
    return this.volumenProducto;
  }

  getProducto(isin: string) {
    return this.data.getOperacionesByIsin(isin);
  }

  getValorTotalProducto(isin: string, idCartera: string) {
    this.totalOp = 0;
    this.data.getOperaciones().forEach(op => {
      if (op.producto.isin === isin && op.cartera.id === idCartera) {

        this.totalOp += op.precio * op.participaciones;

      }
    });
    return this.totalOp;

  }
  getTotalValorCartera(idCartera: string) {
    this.totalOp = 0;
    this.data.getOperaciones().forEach(op => {
      if (op.cartera.id === idCartera) {

        this.totalOp += op.precio * op.participaciones;

      }
    });
    return this.totalOp;
  }


}
