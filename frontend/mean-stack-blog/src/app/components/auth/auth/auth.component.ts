import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  errorSignIn: any;
  userSignIn = { name: '', password: '' };


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.login(this.userSignIn)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/backOffice']);
          this.errorSignIn = null;
        },
        (error: any) => {
          this.errorSignIn = error.error.message;
        });
  }

}
