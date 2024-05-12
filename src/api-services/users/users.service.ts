import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "../BaseApiService.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TUser } from "../../types/user";

@Injectable()
export class UserApiService extends BaseApiService<TUser> {

    constructor(injector: Injector){
        super(injector, 'user' , 'user')
        this.http = injector.get(HttpClient)
    }
    
}