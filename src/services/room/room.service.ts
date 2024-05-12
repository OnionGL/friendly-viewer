import { Injectable } from "@angular/core";
import { RoomApiService } from "../../api-services/room/roomApi.service";

@Injectable()
export class RoomService {

    constructor(private apiService: RoomApiService) {}

    public createRoom() {

    }

}