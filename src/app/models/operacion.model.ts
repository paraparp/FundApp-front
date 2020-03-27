import { Cartera } from './cartera.model';
import { Producto } from './producto.model';

export class Operacion {

  constructor(
    public id: string,
    public producto: Producto,
    public participaciones: number,
    public precio: number,
    public moneda: string = 'EUR',
    public plataforma: string,
    public cartera: Cartera,
    public fechaAdquisicion: Date,

  ) { }

  getImporte() {
    return this.precio * this.participaciones;
  }


}
