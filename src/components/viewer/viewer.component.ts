import { Component, OnInit } from "@angular/core";
import { ViewerService } from "../../services/viewer/viewer.service";
import { ModalService } from "../../services/modal/modal.service";
import { AddFileModalComponent } from "../modalComponents/addFileModal/addFile.component";
import { AddUserModalComponent } from "../modalComponents/addUserModal/addUser.component";
import { Socket } from "ngx-socket-io";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'viewer-component',
    templateUrl: 'viewer.component.html',
    styleUrl: 'viewer.component.scss'
})


export class ViewerComponent implements OnInit {

    constructor(private viewerService: ViewerService , private modalService: ModalService , private socket: Socket , private activeRoute: ActivatedRoute){}

    private roomId: string

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

    public ngOnInit(): void {

        this.activeRoute.params.subscribe(({roomId}) => {
            this.roomId = roomId
            this.socket.emit("joinRoom" , roomId)
            
            this.socket.on('history' , (history: string[]) => {
                console.log("history" , history)
            })
    
            this.socket.fromEvent("roomMessage").pipe(
    
            ).subscribe(data => console.log("data" , data))    
        })

    }

    public openAddVideoPopup() {
        this.socket.emit('sendMessage', { room: this.roomId, content: "TEST" });
        this.modalService.createDialog(AddFileModalComponent , {} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

    public openAddUserPopup() {
        this.modalService.createDialog(AddUserModalComponent , {} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

}