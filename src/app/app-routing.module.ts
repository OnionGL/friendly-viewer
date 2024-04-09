import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from '../modules/user-module/user-page/user-page.component';
import { UserService } from '../modules/user-module/user.service';
import { LoginComponent } from '../modules/login-module/component/login.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../modules/login-module/Login.service';
import { HomeComponent } from '../modules/home-module/component/home.component';

@Component({template: ''})
export class RedirectStartPageComponent {
  constructor(private router: Router,
              private userService: UserService, 
              private cookie: CookieService,
              private loginService: LoginService 
            ){
        if(this.cookie.get('token')) {
          this.loginService.getCurrentUser(this.cookie.get('token')).subscribe(user => {
            userService.currentUser = user
            router.navigate([`home`])
          })  
        } else {
          router.navigate(['login'])
        }
    }
}

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'personalArea',
    component: UserPageComponent
  },
  // {
  //   path: 'createRoom',
  //   component: CreateRoomComponent
  // },
  {
    path: '**',
    component: RedirectStartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
