import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login-service.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  
  constructor( private loginservice:LoginServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq=request;
    const token = this.loginservice.getToken();
    if(token!=null){
      authReq=authReq.clone({
        setHeaders:{
          Authorization :`Bearer ${token}` 
        }
      });
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProviders=[
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi : true, 
  },
]
