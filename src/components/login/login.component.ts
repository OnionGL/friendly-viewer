import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";
import { AlertService, AlertTypes } from "../../services/alert/alertService.service";
import { catchError, tap } from "rxjs";


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit , OnDestroy {

    public emailFormControl: FormControl<string> = new FormControl()

    public passwordFormControl: FormControl<string> = new FormControl()

    constructor(
        private loginService: LoginService,
        private router: Router,
        private alertService: AlertService
        ) {}

    public ngOnInit(): void { }

    public ngOnDestroy(): void { }

    public login() {
        const user:any = {email: this.emailFormControl.value,
                      password: this.passwordFormControl.value}

        this.loginService.loginUser(user)
            .pipe(
                catchError(err => {
                    this.alertService.createAlert({content: "Ошибка авторизации" , type: AlertTypes.ERROR})
                    throw new Error("Ошибка авторизации")
                }),
                tap(_ => this.alertService.createAlert({content: "Авторизация прошла успешно" , type: AlertTypes.SUCCESS}))
            )
            .subscribe(() => {
                this.router.navigate(['home'])
            })
    }

    public register() {
        const user:any = {email: this.emailFormControl.value,
            password: this.passwordFormControl.value}

        this.loginService.registerUser(user)
            .pipe(
                catchError(err => {
                    this.alertService.createAlert({content: "Ошибка регистрация" , type: AlertTypes.ERROR})
                    throw new Error("Ошибка регистрация")
                }),
                tap(_ => this.alertService.createAlert({content: "Регистрация прошла успешно" , type: AlertTypes.SUCCESS}))
            )
            .subscribe(res => console.log(res))
    }

}