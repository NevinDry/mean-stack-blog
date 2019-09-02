import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-back-office',
  templateUrl: './home-back-office.component.html',
  styleUrls: ['./home-back-office.component.scss']
})
export class HomeBackOfficeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
