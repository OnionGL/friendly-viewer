import { Injectable } from "@angular/core";
import { LoginApiService } from "../../services/ApiService/apiServices/Login/Login.service";
import { TUser, TUserResponse } from "../../services/ApiService/apiServices/Login/types";
import { Observable, tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";

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

    public getCurrentUser(token: string): Observable<TUser> {
        return this.loginApiService.getUserByToken(token).pipe(
            tap(data => console.log("getCurrentUser" , data))
        )
    }

}