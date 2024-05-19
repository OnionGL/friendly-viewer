import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "../BaseApiService.service";
import { HttpClient } from "@angular/common/http";
import { Observable, map, switchMap, tap } from "rxjs";
import { TUser, TUserResponse } from "../../types/user";
import { CookieService } from "ngx-cookie-service";
import { LoginApiService } from "../login/Login.service";
import { LoginService } from "../../services/login/login.service";

@Injectable()
export class UserApiService extends BaseApiService<TUser> {

    constructor(injector: Injector , private cookie: CookieService , private loginService: LoginService){
        super(injector, 'user' , 'user')
        this.http = injector.get(HttpClient)
    }

    public createGuestUser(): Observable<TUser> {
        return this.http.post<any>('/api/user/guest' , {}).pipe(
            map(data => data),
            switchMap(({user}) => this.loginService.loginUser({email: user.email , password: "121212121212121212"})),
            map(user => {
                return user
            })
        ) as Observable<TUser>
    }

    public deleteUser(id: number): Observable<any> {
        return this.http.post('/api/user/delete' , {id})
    }
    
}