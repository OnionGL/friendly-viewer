import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../modules/login-module/component/login.component';
import { LoginModule } from '../modules/login-module/login-module.module';
import { LoginService } from '../modules/login-module/Login.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { FooterDirective } from '../directive/footer.directive';
import { HeaderDirective } from '../directive/header.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FooterDirective,
    HeaderDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
  ],
  providers: [LoginService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
