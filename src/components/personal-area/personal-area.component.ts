import { Component, OnInit } from "@angular/core";
import { UserService } from "../../modules/user-module/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'personal-area',
    templateUrl: './personal-area.component.html',
    styleUrls: ['./personal-area.component.scss']
})

export class PersonalAreaComponent implements OnInit {

    public currentUser: any

    constructor(private userService: UserService , private router: Router) { }

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
    }

}