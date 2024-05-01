import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "../../BaseApiService.service";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class RoomApiService extends BaseApiService<any> {
    
    constructor(injector: Injector) {
        super(injector , 'room' , 'room')
        this.http = injector.get(HttpClient)
    }

    public createRoomWebSocket(): Observable<{roomId: string , message: string}> {
        return this.http.post<{roomId: string , message: string}>('api/room/connect' , {})
    }


}