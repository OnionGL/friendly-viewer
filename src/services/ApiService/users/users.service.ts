import { Injectable, Injector } from "@angular/core";
import { TUser } from "../apiServices/Login/types";
import { BaseApiService } from "../BaseApiService.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class UserApiService extends BaseApiService<TUser> {

    constructor(injector: Injector){
        super(injector, 'users' , 'users')
        this.http = injector.get(HttpClient)
    }

    public getUserById(id: number): Observable<TUser> {
        return this.http.get(`api/user/${id}`) as Observable<TUser> 
    }

    public patchUser(user: Partial<TUser>) {
       return this.http.patch('/api/user/update' , user)
    }
    
}