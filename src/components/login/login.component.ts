import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoginService } from "../Login.service";
import { FormControl } from "@angular/forms";
import { TUser } from "../../../services/ApiService/apiServices/Login/types";
import { Router } from "@angular/router";


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
        private router: Router
        ) {}

    public ngOnInit(): void {  }

    public ngOnDestroy(): void { }

    public login() {
        const user:TUser = {email: this.emailFormControl.value,
                      password: this.passwordFormControl.value}

        this.loginService.loginUser(user).subscribe(() => {
            this.router.navigate(['home'])
        })
    }

    public register() {
        const user:TUser = {email: this.emailFormControl.value,
            password: this.passwordFormControl.value}

        this.loginService.registerUser(user).subscribe(res => console.log(res))
    }

}