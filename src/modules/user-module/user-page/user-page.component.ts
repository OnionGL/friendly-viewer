import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { CookieService } from "ngx-cookie-service";
import { TUser, TUserResponse } from "../../../services/ApiService/apiServices/Login/types";

@Component({
    selector: 'user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})

export class UserPageComponent implements OnInit {

    public currentUser: any

    constructor(private userService: UserService) { }

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
    }

}