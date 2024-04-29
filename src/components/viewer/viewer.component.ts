import { Component } from "@angular/core";
import { ViewerService } from "../../services/viewer/viewer.service";
import { ModalService } from "../../services/modal/modal.service";
import { AddFileModalComponent } from "../modalComponents/addFileModal/addFile.component";
import { AddUserModalComponent } from "../modalComponents/addUserModal/addUser.component";

@Component({
    selector: 'viewer-component',
    templateUrl: 'viewer.component.html',
    styleUrl: 'viewer.component.scss'
})


export class ViewerComponent {

    constructor(private viewerService: ViewerService , private modalService: ModalService){}

    public users = [
        {
            name: "Пользователь 1"
        },
        {
            name: "Пользователь 2"
        },
        {
            name: "Пользователь 3"
        }
    ]

    public openAddVideoPopup() {
        this.modalService.createDialog(AddFileModalComponent , {} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

    public openAddUserPopup() {
        this.modalService.createDialog(AddUserModalComponent , {} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

}