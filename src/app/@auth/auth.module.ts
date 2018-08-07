import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth.service';
import { TokenInterceptor } from './token-interceptor';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { CallbackComponent } from './callback/callback.component';


const SERVICES = [
  AuthService,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent,
    CallbackComponent,
  ],
  providers: [
    ...SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AuthModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
