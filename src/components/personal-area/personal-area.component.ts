import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../modules/user-module/user.service";

@Component({
    selector: 'personal-area',
    templateUrl: './personal-area.component.html',
    styleUrls: ['./personal-area.component.scss']
})

export class PersonalAreaComponent implements OnInit {

    public currentUser: any

    constructor(private userService: UserService) { }

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
    }

}