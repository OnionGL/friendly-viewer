import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'create-room',
    templateUrl: './createRoom.component.html',
    styleUrl: './createRoom.component.scss'
})


export class CreateRoomComponent {

    constructor(private router: Router) {}

    public createRoom() {
        this.router.navigate(['room'])
    }

}