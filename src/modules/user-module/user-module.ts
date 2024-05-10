import { NgModule } from "@angular/core";
import { UserService } from "./user.service";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { PersonalAreaComponent } from "../../components/personal-area/personal-area.component";
import { DirectiveModule } from "../../directive/directive.module";
import { UserApiService } from "../../services/ApiService/users/users.service";
import { FileUploadService } from "../../services/ApiService/fileUpload/fileUpload.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ImagesService } from "../../services/image/images.servise";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        DirectiveModule,
        ReactiveFormsModule 
    ],
    exports: [
        PersonalAreaComponent
    ],
    declarations: [
        PersonalAreaComponent
    ],
    providers: [
        FileUploadService,
        UserApiService,
        ImagesService
    ]
})

export class UserModule {}