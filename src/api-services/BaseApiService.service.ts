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

    public get(id: number): Observable<T> {
        return this.http.get(`api/${this.baseUrl}/${id}`) as Observable<T>
    }

    public post(model: T): Observable<any> {
        return this.http.post(`api/${this.baseUrl}` , model) as Observable<any>
    }

    public patch(model: T extends {id: number} ? Partial<T> : {id: number}): Observable<T> {
        return this.http.patch(`api/${this.baseUrl}/${model.id}` , model) as Observable<T>
    }

}