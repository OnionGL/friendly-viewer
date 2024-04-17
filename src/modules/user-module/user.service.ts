import { Injectable } from "@angular/core"
import { TUser } from "../../services/ApiService/apiServices/Login/types"
import { CookieService } from "ngx-cookie-service"
import { Observable, of, share } from "rxjs"
import { LoginService } from "../../services/login/login.service"


@Injectable({providedIn: 'root'})
export class UserService {

    private _currentUser: any
    
    constructor(private loginService: LoginService , private cookie: CookieService) {}

    public get currentUser(): Observable<TUser> {
        if(this._currentUser) return of(this._currentUser)
        return this.loginService.getCurrentUser(this.cookie.get('token'))
    }

    public set currentUser(currentUser: any) {
        this._currentUser = currentUser
    }

}