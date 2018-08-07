import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ImageDataUploadComponent } from './pages/image-data-upload/image-data-upload.component';
import { NotFoundComponent } from './pages/miscellaneous/not-found/not-found.component';

import { AuthComponent } from './@auth/auth.component';
import { CallbackComponent } from './@auth/callback/callback.component';
import { LoginComponent } from './@auth/login.component';
import { LogoutComponent } from './@auth/logout.component';


import { AuthGuard } from './@auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'upload',
    pathMatch: 'full'
  }, {
    path: 'upload',
    component: ImageDataUploadComponent,
    canActivate: [
      AuthGuard
    ],
  }, {
    path: '',
    component: AuthComponent,
    children: [{
      path: 'login',
      component: LoginComponent,
    }, {
      path: 'logout',
      component: LogoutComponent,
    },
  ],
  },
  // { path: 'auth', loadChildren: 'app/@auth/auth.module#AuthModule' },
  { path: 'callback', component: CallbackComponent },
  { path: '**', component:NotFoundComponent },
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing:true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  providers: [
    AuthGuard
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
