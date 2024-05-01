import { Injectable } from "@angular/core";
import { RoomApiService } from "../../services/ApiService/apiServices/room/roomApi.service";

@Injectable()
export class RoomService {

    constructor(private apiService: RoomApiService) {}

    public createRoom() {

    }

}