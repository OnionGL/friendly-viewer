import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RoomApiService } from "../../api-services/room/roomApi.service";
import { finalize, switchMap } from "rxjs";
import {webSocket} from 'rxjs/webSocket'
import { Socket } from "ngx-socket-io";
import { UserService } from "../../services/user/user.service";

@Component({
    selector: 'create-room',
    templateUrl: './createRoom.component.html',
    styleUrl: './createRoom.component.scss'
})


export class CreateRoomComponent {


    constructor(private router: Router , private roomApiService: RoomApiService , private socket: Socket , private userService: UserService) {}



    public createRoom() {
        this.userService.currentUser.pipe(
            switchMap(({id}) => this.roomApiService.createRoomWebSocket(id))
        ).subscribe(({roomId}) => {
            this.router.navigate(['room' , roomId])
        })
    }

}