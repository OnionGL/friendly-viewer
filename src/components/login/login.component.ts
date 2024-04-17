import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../../services/login/login.service";
import { AlertService } from "../../services/alert/alertService.service";


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

    public ngOnInit(): void { 
        this.alertService.createAlert({content: 'TEST'})
    }

    public ngOnDestroy(): void { }

    public login() {
        const user:any = {email: this.emailFormControl.value,
                      password: this.passwordFormControl.value}

        this.loginService.loginUser(user).subscribe(() => {
            this.router.navigate(['home'])
        })
    }

    public register() {
        const user:any = {email: this.emailFormControl.value,
            password: this.passwordFormControl.value}

        this.loginService.registerUser(user).subscribe(res => console.log(res))
    }

}