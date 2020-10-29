import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2'

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { User } from '@model/user.model';
import { URL_SERVICIOS } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private router: Router, private http: HttpClient) { }

  // private authHeader() {
  //
  //   let token = this.auth.token;
  //
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token)
  //   }
  //
  //   return this.httpHeaders;
  // }



  crearUsuario(user: User) {

    let url = URL_SERVICIOS + '/users';

    return this.http.post(url, user)
      .pipe(
        map((resp: any) => {
          Swal.fire('Usuario creado', user.username, 'success');
          return resp.usuario;
        }),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
        })
      );
  }

  findUsuarios() {

    let url = URL_SERVICIOS + '/users';

    return this.http.get(url).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
      })
    );

  }

  findUsuariosById(idUser) {

    let url = URL_SERVICIOS + '/users/' + idUser;

    return this.http.get(url)
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
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
