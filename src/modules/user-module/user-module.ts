import { NgModule } from "@angular/core";
import { UserService } from "./user.service";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { PersonalAreaComponent } from "../../components/personal-area/personal-area.component";

@NgModule({
    imports: [
        BrowserModule
    ],
    exports: [
        PersonalAreaComponent
    ],
    declarations: [
        PersonalAreaComponent
    ]
})

export class UserModule {}