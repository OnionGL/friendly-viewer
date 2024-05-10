import { Component, OnInit } from "@angular/core";
import { UserService } from "../../modules/user-module/user.service";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, first, map, of, switchMap } from "rxjs";
import { TUser } from "../../services/ApiService/apiServices/Login/types";
import { FileUploadService } from "../../services/ApiService/fileUpload/fileUpload.service";
import { FormControl } from "@angular/forms";
import { UserApiService } from "../../services/ApiService/users/users.service";
import { ImagesService } from "../../services/image/images.servise";

@Component({
    selector: 'personal-area',
    templateUrl: './personal-area.component.html',
    styleUrls: ['./personal-area.component.scss']
})

export class PersonalAreaComponent implements OnInit {

    public currentUser: Observable<TUser>

    public modeChanges: BehaviorSubject<"read" | "redact"> = new BehaviorSubject<"read" | "redact">("read")

    public newUploadImage: BehaviorSubject<number> = new BehaviorSubject<number>(null)

    public nameFormControl: FormControl<string>

    public passwordFromControl: FormControl<string>

    public emailFormControl: FormControl<string>

    public imageUser: Observable<string>

    public newImage: string

    public currentUserApi: TUser

    constructor(
                private userService: UserService, 
                private router: Router, 
                private uploadService: FileUploadService,
                private imageService: ImagesService,
                private userApiService: UserApiService
            ) { }

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
        this.initFormControl()
    }

    private initFormControl() {

        this.currentUser
            .pipe(
                first(),
                switchMap(user => this.userApiService.getUserById(user.id))
            )
            .subscribe(user => {
                this.currentUserApi = user
                this.imageUser = user.imageId ? this.imageService.getImageById(user.imageId) : of(null)
                this.nameFormControl = new FormControl(user?.name)
                this.passwordFromControl = new FormControl(user?.password)
                this.emailFormControl = new FormControl(user?.email)
            })  
    }

    public onRedactorMode() {
        this.modeChanges.next("redact")
    }

    public onReadMode() {
        this.modeChanges.next("read")
    }

    public setNewAvatar() {
        const input = document.createElement('input');
        input.type = 'file'
        input.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                this.uploadService.upload(file).subscribe((res: any) => {
                    const bufferArray = Array.from(new Uint8Array(res.data.data));
                    const imageData = 'data:image/jpeg;base64,' + btoa(bufferArray.map(byte => String.fromCharCode(byte)).join(''));
                    this.newImage = imageData
                    this.newUploadImage.next(res.id)
                })
            }
            
            if (input.parentNode) {
                input.parentNode.removeChild(input);
            }
        });
        input.click()
        document.appendChild(input);
    }

    public updateUser = () => {
        
        const updateUser: Partial<TUser> = {
            id: this.currentUserApi.id,
            name: this.nameFormControl.value,
            email: this.emailFormControl.value,
            imageId: this.newUploadImage?.getValue()
        }

        this.userApiService.patchUser(updateUser)
            .pipe(
                first()
            )
            .subscribe(_ => {})

    }


}