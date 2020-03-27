import { Usuario } from './usuario.model';

export class Cartera {

  constructor(
    public id: string,
    public nombre: string,
    public usuario: Usuario,
    public fechaCreacion: Date,

  ) { }

}
