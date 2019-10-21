import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  // case insensitive check against config and value


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req && req.url.includes("api")) {
      const authToken = this.authService.getToken() ? JSON.parse(this.authService.getToken()).token : null;

      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      return next.handle(authRequest).pipe(catchError(err => {
        let message = err.error.message;
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/admin']);
          message = 'Authentification failed';
        }

        return throwError({
          error: {
            message: message
          }
        });
      }));


    } else {
      return next.handle(req);
    }
  }
}
