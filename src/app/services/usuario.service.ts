import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public router: Router, public http: HttpClient) { }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/users';

    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario creado', usuario.username, 'success');
          return resp.usuario;
        })
      );
  }

  usuarios() {

    let url = URL_SERVICIOS + '/users';

    return this.http.get(url);

  }


  //
  // login(usuario: Usuario, recordar: boolean = false) {
  //
  //   if (recordar) {
  //     localStorage.setItem('email', usuario.email);
  //   } else {
  //     localStorage.removeItem('email')
  //   }
  //
  //
  //   let url = URL_SERVICIOS + '/login';
  //
  //   return this.http.post(url, usuario)
  //     .pipe(
  //       map((resp: any) => {
  //
  //         this.guardarStorage(resp.id, resp.token, resp.usuario);
  //         return true;
  //       }))
  // }





}
