import { NgModule } from "@angular/core";
import { UserPageComponent } from "./user-page/user-page.component";
import { UserService } from "./user.service";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    imports: [
        BrowserModule
    ],
    exports: [
        UserPageComponent
    ],
    declarations: [
        UserPageComponent
    ]
})

export class UserModule {}