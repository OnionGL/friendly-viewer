import { Component, Inject } from "@angular/core";
import { FileUploadService } from "../../../api-services/fileUpload/fileUpload.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { BehaviorSubject, finalize, map, switchMap, tap } from "rxjs";
import { RoomApiService } from "../../../api-services/room/roomApi.service";
import { Socket } from "ngx-socket-io";
import { AlertService, AlertTypes } from "../../../services/alert/alertService.service";

@Component({
    selector: 'add-file',
    templateUrl: './addFile.component.html',
    styleUrl: './addFile.component.scss'
})

export class AddFileModalComponent {

    public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)

    constructor(
        private uploadService: FileUploadService,
        public dialogRef: MatDialogRef<AddFileModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { roomId: string },
        private sanitizer: DomSanitizer,
        private roomApiService: RoomApiService,
        private socket: Socket,
        private alertService: AlertService
    ) {

    }

    public extractVideoId(url: string): string {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            return videoIdMatch[1];
        } else {
            return '';
        }
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
                        tap(_ => this.isLoadingSubject.next(true)),
                        switchMap(file => {
                            return this.roomApiService.addVideoToRoom(this.data.roomId, file.id).pipe(
                                tap(_ => this.socket.emit("addVideo", { roomId: this.data.roomId, videoId: file.id })),
                                map(_ => file)
                            )
                        }),
                        tap(_ => this.alertService.createAlert({
                            content: 'Видео успешно загружено!',
                            type: AlertTypes.SUCCESS
                        })),
                        finalize(() => this.isLoadingSubject.next(false))
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