import { Component, OnInit } from "@angular/core";
import { UserService } from "../../modules/user-module/user.service";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { TUser } from "../../services/ApiService/apiServices/Login/types";

@Component({
    selector: 'personal-area',
    templateUrl: './personal-area.component.html',
    styleUrls: ['./personal-area.component.scss']
})

export class PersonalAreaComponent implements OnInit {

    public currentUser: Observable<TUser>

    public modeChanges: BehaviorSubject<"read" | "redact"> = new BehaviorSubject<"read" | "redact">("read")

    constructor(private userService: UserService , private router: Router) { }

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
    }

    public onRedactorMode() {
        this.modeChanges.next("redact")
    }

    public onReadMode() {
        this.modeChanges.next("read")
    }

}