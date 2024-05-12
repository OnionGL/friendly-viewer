import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../../services/header/header.service";
import { Router } from "@angular/router";
import { Observable, first, map, of, switchMap, tap } from "rxjs";
import { UserApiService } from "../../api-services/users/users.service";
import { FileUploadService } from "../../api-services/fileUpload/fileUpload.service";
import { ImagesService } from "../../services/image/images.servise";
import { TUser } from "../../types/user";
import { UserService } from "../../services/user/user.service";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

    public currentUser: Observable<TUser>

    public user: Observable<TUser & {image?: string}>

    constructor(public headerService: HeaderService, 
                private router: Router, private userService: UserService, 
                private userApiService: UserApiService, 
                private uploadService: FileUploadService, 
                private imagesService: ImagesService) {}

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
        this.user = this.currentUser.pipe(
            first(),
            map(({id}) => id),
            switchMap(id => this.userApiService.get(id)),
            switchMap(current => current.imageId ? this.imagesService.getImageById(current.imageId).pipe(map(image => ({...current , image}))) : of(null).pipe(map(_ => ({...current})))),
        )
    }

    public routeToPersonalArea() {
        this.router.navigate(['personalArea'])
    }

    public redirectToHome() {
        this.router.navigate(['home'])
    }
    
}