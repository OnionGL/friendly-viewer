import { NgModule } from "@angular/core";
import { UserService } from "./user.service";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { PersonalAreaComponent } from "../../components/personal-area/personal-area.component";
import { DirectiveModule } from "../../directive/directive.module";
import { UserApiService } from "../../services/ApiService/users/users.service";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        DirectiveModule
    ],
    exports: [
        PersonalAreaComponent
    ],
    declarations: [
        PersonalAreaComponent
    ],
    providers: [
        UserApiService
    ]
})

export class UserModule {}