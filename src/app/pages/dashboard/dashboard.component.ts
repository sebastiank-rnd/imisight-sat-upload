import {Component, OnDestroy} from '@angular/core';

import { AuthService } from './../../@auth/auth.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  constructor(public auth : AuthService) {}

  ngOnDestroy() {}
}
