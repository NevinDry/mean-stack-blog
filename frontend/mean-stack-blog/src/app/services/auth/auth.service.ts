import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/auth/User';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config = new Config();
  user: User;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.init();
  }

  init(): void {
    if (this.getToken()) {
      const exp = JSON.parse(this.getToken()).exp;
      const date = new Date().getTime();
      if (date < exp) {
        this.user = JSON.parse(this.getToken());
      }
    } else {
      this.logout();
    }
  }


  login(user: any) {
    return this.http.post<{}>(`${this.config.getUserUrl()}` + 'login', user)
      .pipe(
        catchError(this.handleError),
        map((response: any) => {
          if (response.data && response.data.token && isPlatformBrowser(this.platformId)) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            this.init();
          }

          return response;
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.user = null;
    }
  }

  getToken = function () {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage['currentUser'];
    }
  };

  isLoggedIn() {
    if (this.getToken()) {
      const exp = JSON.parse(this.getToken()).exp;
      const date = new Date().getTime();
      if (date < exp) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  handleError(error) {

    return throwError(error);
  }
}
