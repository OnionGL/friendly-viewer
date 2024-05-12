import { Injectable } from "@angular/core";
import { LoginApiService } from "../../api-services/login/Login.service";
import { Observable, tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { TUser, TUserResponse } from "../../types/user";

@Injectable()
export class LoginService {
    
    constructor(private loginApiService: LoginApiService , private cookie: CookieService) {}

    public loginUser(model: TUser): Observable<TUserResponse> {
        return this.loginApiService.loginUser(model).pipe(
            tap(userData => {
                if(userData.token) {
                    this.cookie.set('token' , userData.token)
                }
            })
        )
    }

    public registerUser(model: TUser): Observable<TUserResponse> {
        return this.loginApiService.post(model).pipe(
            tap(userData => {
                if(userData.token) {
                    this.cookie.set('token' , userData.token)
                }
            })
        )
    }

    public getCurrentUserByToken(token: string): Observable<TUser> {
        return this.loginApiService.getUserByToken(token)
    }

}