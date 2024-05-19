import { Injectable, Injector } from "@angular/core";
import { BaseApiService } from "../BaseApiService.service";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class RoomApiService extends BaseApiService<any> {
    
    constructor(injector: Injector) {
        super(injector , 'room' , 'room')
        this.http = injector.get(HttpClient)
    }

    public createRoomWebSocket(adminId: number): Observable<{roomId: string , message: string}> {
        return this.http.post<{roomId: string , message: string}>('api/room/connect' , {adminId})
    }

    public addVideoToRoom(roomId: string , videoId: number): Observable<any> {
        return this.http.post('api/room/video' , {roomId , videoId})
    }

    public getVideo(roomId: string): Observable<{videoId: number}> {
        return this.http.get(`api/room/${roomId}`) as Observable<{videoId: number}>
    }

    public getAdminId(roomId: string): Observable<{adminId: number}> {
        return this.http.get(`api/room/admin/${roomId}`) as Observable<{adminId: number}>
    }


}