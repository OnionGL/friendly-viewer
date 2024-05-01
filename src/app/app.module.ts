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
import { DirectiveModule } from '../directive/directive.module';
import { AlertComponent } from '../common/alert/alert.component';
import { ViewerModule } from '../modules/viewer-module/viewer.module';
import { UserModule } from '../modules/user-module/user-module';
import {MatDialogModule} from '@angular/material/dialog'
import { ModalModule } from '../modules/modal-module/modal-module';
import { RoomModule } from '../modules/room-module/room.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';


const config: SocketIoConfig = {url: 'http://localhost:9000' , options: {}} 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    DirectiveModule,
    ViewerModule,
    UserModule,
    MatDialogModule,
    ModalModule,
    RoomModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [LoginService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
