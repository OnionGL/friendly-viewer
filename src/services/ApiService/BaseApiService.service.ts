import { HttpClient } from "@angular/common/http";
import { Injector } from "@angular/core";
import { Observable, pluck } from "rxjs";



export class BaseApiService<T> {
    
    protected http: HttpClient

    constructor(
        private injector: Injector,
        private baseUrl: string,
        private entityName: string
    ){
        this.http = injector.get(HttpClient)
    }

    public get(id: number) {
        return this.http.get(`${this.baseUrl}/${id}`).pipe(
            pluck(this.entityName)
        )
    }

    public post(model: T): Observable<any> {
        return this.http.post(`/api/user` , model).pipe(
            pluck(this.entityName)
        )
    }

    public test() {
        return this.http.get(`/api`)
    }

}