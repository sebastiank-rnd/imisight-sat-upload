import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { AuthService } from './../../../@auth/auth.service';

import { environment } from './../../../../environments/environment';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user: any;
  userMenu = [ { title: 'Log out' }]; //{ title: 'Profile' },
  
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private auth: AuthService) {
  }

  ngOnInit() {
    // this.user = this.auth.profile;
    this.auth.profile$.subscribe((profile: any) => {
      this.user = profile;
    });
    this.menuService.onItemClick().subscribe(
      (event) => {
        if (event.item.title == "Log out") {
          this.auth.logout();
        }
      }
    )
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    window.location.href =  environment.homepage;
  }

  startSearch() {
  }
}
