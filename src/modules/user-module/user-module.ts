import { NgModule } from "@angular/core";
import { UserService } from "./user.service";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { PersonalAreaComponent } from "../../components/personal-area/personal-area.component";
import { DirectiveModule } from "../../directive/directive.module";

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
    ]
})

export class UserModule {}