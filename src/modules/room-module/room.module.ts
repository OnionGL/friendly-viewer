import { NgModule } from "@angular/core";
import { CreateRoomComponent } from "../../components/create-room/createRoom.component";
import { DirectiveModule } from "../../directive/directive.module";
import { RoomApiService } from "../../api-services/room/roomApi.service";
import { RoomService } from "../../services/room/room.service";

@NgModule({
    imports: [DirectiveModule],
    declarations: [CreateRoomComponent],
    providers: [RoomService , RoomApiService]
})

export class RoomModule{}