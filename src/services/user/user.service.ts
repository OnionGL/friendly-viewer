import { Injectable } from "@angular/core"
import { CookieService } from "ngx-cookie-service"
import { Observable, catchError, of, share, shareReplay, switchMap } from "rxjs"
import { LoginService } from "../../services/login/login.service"
import { TUser } from "../../types/user"
import { UserApiService } from "../../api-services/users/users.service"


@Injectable({providedIn: 'root'})
export class UserService {

    private _currentUser: any
    
    constructor(private loginService: LoginService , private cookie: CookieService , private userApiService: UserApiService) {}

    public get currentUser(): Observable<TUser> {
        if(this._currentUser) return of(this._currentUser)
        return this.loginService.getCurrentUserByToken(this.cookie.get('token'))
    }

    public set currentUser(currentUser: any) {
        this._currentUser = currentUser
    }

}