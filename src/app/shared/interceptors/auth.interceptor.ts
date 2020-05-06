import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {



    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {

          if (this.auth.isUserLoggedIn()) {
            this.auth.logOut();
          }
          this.router.navigate(['/login']);
        }

        if (e.status == 403) {
          Swal.fire('No tienes permisos', 'warning');
          this.router.navigate(['/portfolios']);
        }
        return throwError(e);
      })
    )
  }
}
