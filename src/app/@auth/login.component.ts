import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'ngx-login',
  template: '',
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) {
    this.auth.login();
  }

  ngOnInit() {
  }
}
