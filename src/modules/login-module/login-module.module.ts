import { NgModule } from '@angular/core';
import { LoginApiService } from '../../services/ApiService/apiServices/Login/Login.service';
import { LoginComponent } from './component/login.component';
import { LoginService } from './Login.service';
import { ControlsModule } from '../controls-module/controls-module.module';

@NgModule({
    imports: [ControlsModule],
    exports: [
        LoginComponent
    ],
    providers: [
        LoginApiService,
        LoginService
    ],
    declarations: [LoginComponent]
})

export class LoginModule{}