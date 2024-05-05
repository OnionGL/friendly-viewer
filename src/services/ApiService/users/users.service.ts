import { Injectable, Injector } from "@angular/core";
import { TUser } from "../apiServices/Login/types";
import { BaseApiService } from "../BaseApiService.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserApiService extends BaseApiService<TUser> {

    constructor(injector: Injector){
        super(injector, 'users' , 'users')
        this.http = injector.get(HttpClient)
    }

    public getUserById(id: number) {
        return this.http.get(`api/user/${id}`)
    }
    
}