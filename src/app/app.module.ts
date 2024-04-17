import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginModule } from '../modules/login-module/login-module.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { FooterDirective } from '../directive/footer.directive';
import { HeaderDirective } from '../directive/header.directive';
import { LoginService } from '../services/login/login.service';
import { SharedModule } from '../directive/directive.module';
import { AlertComponent } from '../common/alert/alert.component';

@NgModule({
  exports: [HeaderDirective , FooterDirective],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    SharedModule,
  ],
  providers: [LoginService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
