
import { Component, OnInit } from '@angular/core';
import { Operacion } from 'src/app/models/operacion.model';

import { Cartera } from 'src/app/models/cartera.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Producto } from 'src/app/models/producto.model';
import { DataSourceService } from 'src/app/services/dataSource.service';
import { UsuarioService } from 'src/app/services/usuario.service';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public data: DataSourceService, public userService: UsuarioService) { }

  cartera: Cartera;
  operaciones: Operacion[];
  usuarios: Usuario[];
  productos: Producto[];


  ngOnInit(): void {
    this.cartera = this.data.getCartera()[0];
    this.operaciones = this.data.getOperaciones();
    this.productos = this.data.getProductos();
    this.usuarios = this.data.getUsuarios();

    this.userService.findUsuarios().subscribe((resp: any) => {
      console.log(resp)
      this.usuarios = resp;
    })


  }


  displayedColumns = ['producto', 'participaciones', 'precio', 'importe', 'plataforma', 'fechaAdquisicion'];





  /** Gets the total cost of all transactions. */
  getTotalVol() {
    return this.operaciones.map(p => p.participaciones).reduce((acc, value) => acc + value, 0);
  }

  getTotalCost() {
    return this.operaciones.map(p => p.getImporte()).reduce((acc, value) => acc + value, 0);
  }
}
