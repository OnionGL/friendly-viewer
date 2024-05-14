import { NgModule } from "@angular/core";
import { AddFileModalComponent } from "../../components/modalComponents/addFileModal/addFile.component";
import { AddUserModalComponent } from "../../components/modalComponents/addUserModal/addUser.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AddFileModalComponent,
        AddUserModalComponent
    ]
})

export class ModalModule {}