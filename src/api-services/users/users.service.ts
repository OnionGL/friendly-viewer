import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "../BaseApiService.service";
import { HttpClient } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";
import { TUser, TUserResponse } from "../../types/user";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class UserApiService extends BaseApiService<TUser> {

    constructor(injector: Injector , private cookie: CookieService){
        super(injector, 'user' , 'user')
        this.http = injector.get(HttpClient)
    }

    public createGuestUser(): Observable<TUser> {
        return this.http.post<TUserResponse & {user: TUser}>('/api/user/guest' , {}).pipe(
            tap((data) => {
                this.cookie.set('token' , data.token)
            }),
            map(data => data.user)
        ) as Observable<TUser>
    }
    
}