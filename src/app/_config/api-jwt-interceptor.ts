import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSession } from '../models/user-session.model';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

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
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          token: currentUser.token
        }
      });
    }
    return next.handle(request);
    // Errores de API
  }
}
