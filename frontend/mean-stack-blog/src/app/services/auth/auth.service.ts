import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config/config';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/auth/User';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config = new Config();
  user: User;

  constructor(private http: HttpClient) { 
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
          console.log(response);
          if (response.data && response.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            this.init();
          }

          return response;
        })
        );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.user = null;
  }

  getToken = function () {
    return localStorage['currentUser'];
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
