import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../../services/header/header.service";
import { Router } from "@angular/router";
import { UserService } from "../../modules/user-module/user.service";
import { Observable, first, map, of, switchMap, tap } from "rxjs";
import { TUser } from "../../services/ApiService/apiServices/Login/types";
import { UserApiService } from "../../services/ApiService/users/users.service";
import { FileUploadService } from "../../services/ApiService/fileUpload/fileUpload.service";
import { ImagesService } from "../../services/image/images.servise";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

    public currentUser: Observable<TUser>

    public imageUser: Observable<string>

    constructor(public headerService: HeaderService , private router: Router, private userService: UserService , private userApiService: UserApiService , private uploadService: FileUploadService , private imagesService: ImagesService) {}

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
        this.imageUser = this.currentUser.pipe(
            first(),
            map(({id}) => id),
            switchMap(id => this.userApiService.getUserById(id)),
            switchMap(current => current.imageId ? this.imagesService.getImageById(current.imageId) : of(null)),
        )
    }

    public routeToPersonalArea() {
        this.router.navigate(['personalArea'])
    }

    public redirectToHome() {
        this.router.navigate(['home'])
    }
    
}