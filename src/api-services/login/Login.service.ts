import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "../BaseApiService.service";
import { HttpClient , HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs";
import { TUser } from "../../types/user";

@Injectable()
export class LoginApiService extends BaseApiService<TUser> {

    constructor(injector: Injector){
        super(injector, 'user' , 'user')
        this.http = injector.get(HttpClient)
    }

    public loginUser(model: any): Observable<any> {
        return this.http.post('api/auth/login' , model)
    }

    public getUserByToken(token: string): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })

        return this.http.get('api/auth/profile' , {headers: headers})
    }

}