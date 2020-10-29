import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '@model/user.model';
import { URL_SERVICIOS_OAUTH } from '../config/config';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _user: User;
  private _token: string;

  constructor(public router: Router, public http: HttpClient) { }

  public get usuario(): User {


    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('username') != null) {
      this._user = JSON.parse(sessionStorage.getItem('username')) as User
      return this._user;
    }
    return new User();
  }

  public get token(): string {

    if (this._token != null) {
      return this._token;
    } else if (this._user == null && sessionStorage.getItem('username') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;

  }

  guardarUser(accessToken: any) {
    let payload = this.obtenerDatosToken(accessToken)
    console.log("payload " + payload)
    this._user = new User();
    this._user.id = payload.id;
    this._user.username = payload.user_name;
    this._user.firstname = payload.firstname;
    this._user.lastname = payload.lastname;
    this._user.email = payload.email;
    this._user.roles = payload.authorities;

    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  guardarToken(accessToken: any) {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
    console.log(this._token)
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  login(user: User): Observable<any> {

    let url = URL_SERVICIOS_OAUTH + '/oauth/token';

    let credenciales = btoa('fundapp' + ':' + '12345')
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    })

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    console.log(user)
    return this.http.post(url, params.toString(), { headers: httpHeaders });

  }


  isUserLoggedIn() {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true
    }
    return false;
  }

  logOut() {
    this._user = null;
    this._token = null;
    sessionStorage.clear();


  }


}
