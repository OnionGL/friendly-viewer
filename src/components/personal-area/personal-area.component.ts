import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, catchError, first, map, of, switchMap, tap } from "rxjs";
import { FileUploadService } from "../../api-services/fileUpload/fileUpload.service";
import { FormControl } from "@angular/forms";
import { UserApiService } from "../../api-services/users/users.service";
import { ImagesService } from "../../services/image/images.servise";
import { TUser } from "../../types/user";
import { UserService } from "../../services/user/user.service";
import { AlertService, AlertTypes } from "../../services/alert/alertService.service";
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "../../services/login/login.service";
import { LoginApiService } from "../../api-services/login/Login.service";

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
                private userApiService: UserApiService,
                private alertService: AlertService,
                private loginApiService: LoginApiService,
                private cookie: CookieService,
            ) { }

    public ngOnInit(): void {
        this.currentUser = this.userService.currentUser
        this.initFormControl()
    }

    private initFormControl() {

        this.currentUser
            .pipe(
                first(),
                switchMap(user => this.userApiService.get(user.id))
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

    public deleteUser() {
        this.userService.currentUser.pipe(
            first(),
            switchMap(({id}) => this.userApiService.deleteUser(id))
        ).subscribe(() => {
            this.alertService.createAlert({
                content: "Пользователь успешно удален",
                type: AlertTypes.SUCCESS
            })
            this.cookie.delete("token")
            this.router.navigate(['login'])
        })
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
        
        let updateUser: Partial<TUser> = {
            id: this.currentUserApi.id,
            name: this.nameFormControl.value,
            email: this.currentUserApi.email,
            password: this.currentUserApi.password,
            imageId: this.newUploadImage?.getValue()
        }


        updateUser = Object.entries(updateUser).reduce((acc, [ k, v ]) => v !== null ? { ...acc, [k]: v } : acc, {})

        this.userApiService.patch(updateUser)
            .pipe(
                first(),
                catchError(err => {
                    this.alertService.createAlert({
                        type: AlertTypes.ERROR,
                        content: "Ошибка обновления пользователя",
                    })
                    throw new Error("Произошла ошибка")
                }),
                tap(_ => {
                    this.alertService.createAlert({
                        type: AlertTypes.SUCCESS,
                        content: "Успешно сохранено!",
                    })
                }),
            )
            .subscribe(_ => {})

    }


}