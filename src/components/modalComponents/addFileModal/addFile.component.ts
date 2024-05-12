import { Component, Inject } from "@angular/core";
import { FileUploadService } from "../../../api-services/fileUpload/fileUpload.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { map, switchMap, tap } from "rxjs";
import { RoomApiService } from "../../../api-services/room/roomApi.service";
import { Socket } from "ngx-socket-io";

@Component({
    selector: 'add-file',
    templateUrl: './addFile.component.html',
    styleUrl: './addFile.component.scss'
})

export class AddFileModalComponent {

    constructor(
        private uploadService: FileUploadService,
        public dialogRef: MatDialogRef<AddFileModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {roomId: string},
        private sanitizer: DomSanitizer,
        private roomApiService: RoomApiService,
        private socket: Socket,
    ) {

    }

    public addVideoContent() {
        const input = document.createElement('input');
        input.type = 'file'
        input.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            
            if (target.files && target.files.length > 0) {
                const file = target.files[0];
                this.uploadService.upload(file)
                    .pipe(
                        switchMap(file => {
                            return this.roomApiService.addVideoToRoom(this.data.roomId , file.id).pipe(
                                tap(_ => this.socket.emit("addVideo" , {roomId: this.data.roomId , videoId: file.id})),
                                map(_ => file)
                            )
                        })
                    )
                    .subscribe((res: any) => {
                        this.dialogRef.close()
                    })
            }
            
            if (input.parentNode) {
                input.parentNode.removeChild(input);
            }
        });
        input.click()
        document.body.appendChild(input);
    }

}