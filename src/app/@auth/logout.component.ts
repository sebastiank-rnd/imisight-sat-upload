import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'ngx-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(public auth: AuthService) {
    // Parse authentication hash
  }

  ngOnInit() {
    this.auth.logout();
  }
}
