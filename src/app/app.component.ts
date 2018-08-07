import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';

import { Subscription, Observable } from 'rxjs';
import { filter, race, startWith, map } from 'rxjs/operators';

import { MENU_ITEMS } from './pages/pages-menu';
import { AuthService } from './@auth/auth.service';

@Component({
  selector: 'ngx-app',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu$ | async"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class AppComponent implements OnInit {
  loggedInSub: Subscription;
  menu = MENU_ITEMS;
  menu$ : Observable<NbMenuItem[]>;

  constructor(private _auth : AuthService) {
  }

  ngOnInit(): void {

    const loggedin$ = this._auth.loggedIn$.pipe(
      filter(loggedIn => loggedIn),
      map(() => MENU_ITEMS
        .map<NbMenuItem>(item => {
          // if (item.title==='Auth') {
          //   return {
          //     ... item,
          //     children: item.children.filter(child => child.title==='Logout'),
          //   };
          // }

          return item;
        })
      )
    );

   const loggedOut$ = this._auth.loggedIn$.pipe(
      filter(loggedIn => !loggedIn),
      map(() => MENU_ITEMS
        .map<NbMenuItem>(item => {
          // if (item.title==='Auth') {
          //   return {
          //     ... item,
          //     children: item.children.filter(child => child.title==='Login'),
          //   };
          // }

          return item;
        })
      )
    );

    this.menu$ = loggedin$.pipe(race(loggedOut$), startWith(MENU_ITEMS));
  }
}
