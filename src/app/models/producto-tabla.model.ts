import { Cartera } from './cartera.model';
import { Transaction } from './producto.model';
import { DataSourceService } from '../services/dataSource.service';

export class TransactionTabla extends Transaction {

  constructor(public cartera: Cartera, public producto: Transaction, public data: DataSourceService) {
    super(producto.id, producto.isin, producto.codigoBl, producto.nombre, producto.url);
  }


  volumenTransaction: number = 0;
  totalOp: number = 0;



  precioMedioTransactionEnCartera(isin: string) {

    this.data.getOperaciones().forEach(op => {
      if (op.producto.isin === isin && op.cartera.id === this.cartera.id) {

        this.totalOp += op.precio * op.participaciones;
        this.volumenTransaction += op.participaciones;

      }
    });
    console.log(this.totalOp + " - " + this.volumenTransaction)
    return this.totalOp / this.volumenTransaction;
  }

  participacionesPorTransaction(isin: string, idCartera: string) {

    this.data.getOperaciones().forEach(op => {

      if (op.producto.isin === isin && op.cartera.id === idCartera) {

        this.volumenTransaction += op.participaciones;

      }
    });
    return this.volumenTransaction;
  }

}
