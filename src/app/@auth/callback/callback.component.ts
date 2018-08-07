import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit, OnDestroy {
  loggedInSub: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    // Parse authentication hash
    this.auth.handleLoginCallback();
  }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(loggedIn => {
       if (loggedIn) {
         return this.router.navigate(['/upload'])
       } else {
        //return this.router.navigate(['/login'])
      }
    });
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}
