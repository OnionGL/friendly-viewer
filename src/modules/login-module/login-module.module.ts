import { NgModule } from '@angular/core';
import { LoginApiService } from '../../services/ApiService/apiServices/Login/Login.service';
import { ControlsModule } from '../controls-module/controls-module.module';
import { LoginService } from '../../services/login/login.service';
import { LoginComponent } from '../../components/login/login.component';
import { FooterDirective } from '../../directive/footer.directive';
import { DirectiveModule } from '../../directive/directive.module';

@NgModule({
    imports: [
        ControlsModule,
        DirectiveModule
    ],
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