import { NgModule } from "@angular/core";
import { CreateRoomComponent } from "../../components/create-room/createRoom.component";
import { RoomService } from "./room.service";
import { DirectiveModule } from "../../directive/directive.module";
import { RoomApiService } from "../../services/ApiService/apiServices/room/roomApi.service";

@NgModule({
    imports: [DirectiveModule],
    declarations: [CreateRoomComponent],
    providers: [RoomService , RoomApiService]
})

export class RoomModule{}