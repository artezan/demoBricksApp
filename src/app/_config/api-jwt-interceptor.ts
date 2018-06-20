import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserSession } from '../models/user-session.model';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  /**
   * Se agrega en automatico a cada HttpRequest, ver appmodules
   * @param request peticion de http client
   * @param next envia el request modificado
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser: UserSession = JSON.parse(
      localStorage.getItem('userKey')
    );
    if (currentUser && currentUser[0].jwt) {
      // request = request.clone({
      //   setHeaders: {
      //     token: currentUser.token
      //   }
      // });
    }
    return (
      next
        .handle(request)
        // Errores de API
        .pipe(
          catchError(err => {
            localStorage.removeItem('userKey');
            this.router.navigate(['login']);
            return throwError(err);
          }),
          map((event: any) => {
            if (event.body && event.body.error === 'Token expirado') {
              localStorage.removeItem('userKey');
              this.router.navigate(['login']);
            }
            return event;
          })
        )
    );
  }
}
