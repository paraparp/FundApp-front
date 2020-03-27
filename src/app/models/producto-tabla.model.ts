import { Cartera } from './cartera.model';
import { Producto } from './producto.model';
import { DataSourceService } from '../dataSource/dataSource.service';

export class ProductoTabla extends Producto {

  constructor(public cartera: Cartera, public producto: Producto, public data: DataSourceService) {
    super(producto.id, producto.isin, producto.codigoBl, producto.nombre, producto.url);
  }


  volumenProducto: number = 0;
  totalOp: number = 0;



  precioMedioProductoEnCartera(isin: string) {

    this.data.getOperaciones().forEach(op => {
      if (op.producto.isin === isin && op.cartera.id === this.cartera.id) {

        this.totalOp += op.precio * op.participaciones;
        this.volumenProducto += op.participaciones;

      }
    });
    console.log(this.totalOp + " - " + this.volumenProducto)
    return this.totalOp / this.volumenProducto;
  }

  participacionesPorProducto(isin: string, idCartera: string) {

    this.data.getOperaciones().forEach(op => {

      if (op.producto.isin === isin && op.cartera.id === idCartera) {

        this.volumenProducto += op.participaciones;

      }
    });
    return this.volumenProducto;
  }

}
