import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public router: Router, public http: HttpClient) { }


  private isNotAuth(e): boolean {

    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return true;
  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/users';

    return this.http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario creado', usuario.username, 'success');
          return resp.usuario;
        }),
        catchError(e => {
          if (this.isNotAuth(e)) {
            return throwError(e);
          }
        })
      );
  }

  findUsuarios() {

    let url = URL_SERVICIOS + '/users';

    return this.http.get(url).pipe(
      catchError(e => {
        this.isNotAuth(e);
        return throwError(e);
      })
    );

  }

  findUsuariosById(idUser: String) {

    let url = URL_SERVICIOS + '/users/' + idUser;

    return this.http.get(url).pipe(
      catchError(e => {
        this.isNotAuth(e);
        return throwError(e);
      })
    );

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
