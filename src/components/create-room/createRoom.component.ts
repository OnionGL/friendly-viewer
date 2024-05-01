import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RoomApiService } from "../../services/ApiService/apiServices/room/roomApi.service";
import { finalize } from "rxjs";
import {webSocket} from 'rxjs/webSocket'
import { Socket } from "ngx-socket-io";

@Component({
    selector: 'create-room',
    templateUrl: './createRoom.component.html',
    styleUrl: './createRoom.component.scss'
})


export class CreateRoomComponent {


    constructor(private router: Router , private roomApiService: RoomApiService , private socket: Socket) {}



    public createRoom() {
        this.roomApiService.createRoomWebSocket()
            .subscribe(({roomId}) => {
                this.router.navigate(['room' , roomId])
            })
    }

}