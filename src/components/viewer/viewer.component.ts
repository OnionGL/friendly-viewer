import { Component, OnInit, ViewChild } from "@angular/core";
import { ViewerService } from "../../services/viewer/viewer.service";
import { ModalService } from "../../services/modal/modal.service";
import { AddFileModalComponent } from "../modalComponents/addFileModal/addFile.component";
import { AddUserModalComponent } from "../modalComponents/addUserModal/addUser.component";
import { Socket } from "ngx-socket-io";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, Subscription, first, forkJoin, map, of, scan, shareReplay, switchMap, tap } from "rxjs";
import { UserApiService } from "../../api-services/users/users.service";
import { UserService } from "../../services/user/user.service";
import { FileUploadService } from "../../api-services/fileUpload/fileUpload.service";
import { ImagesService } from "../../services/image/images.servise";
import { RoomApiService } from "../../api-services/room/roomApi.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

@Component({
    selector: 'viewer-component',
    templateUrl: 'viewer.component.html',
    styleUrl: 'viewer.component.scss'
})


export class ViewerComponent implements OnInit {

    @ViewChild('videoPlayer') videoPlayer: any;

    constructor(
        private viewerService: ViewerService,
        private modalService: ModalService, 
        private socket: Socket, 
        private activeRoute: ActivatedRoute,
        private userService: UserService,
        private userApiService: UserApiService,
        private imagesService: ImagesService,
        private roomApiService: RoomApiService,
        private uploadService: FileUploadService,
        private sanitizer: DomSanitizer,
    ){}

    public videoData: Observable<SafeUrl>

    public usersInRoom: Observable<Array<any>>
    
    private roomId: string
    
    private subscriptions: Subscription[] = []

    private historyDataChanges: Observable<any>


    public ngOnInit(): void {
        this.initUsersList()
        this.initWebSocketsData()
        this.initHistoryData()
        this.initVideo()
    }

    private initVideo() {
        this.videoData = this.socket.fromEvent<{videoId: number}>("addingVideo").pipe(
            switchMap(({videoId}) => {
                return this.uploadService.get(videoId)
            }),
            map(file => {
                const videoBlob = new Blob([new Uint8Array(file.data.data)], { type: 'video/mp4' });;
                const videoUrl = URL.createObjectURL(videoBlob);
                return this.sanitizer.bypassSecurityTrustUrl(videoUrl)
            }),
            shareReplay()
        )
    }

    public togglePlayVideo(event: Event) {

        event.preventDefault()

        event.stopPropagation()

        const video: HTMLVideoElement = this.videoPlayer.nativeElement;


    }

    private initHistoryData() {
        this.socket.on("history" , (history: string[]) => {
            this.historyDataChanges = of(history)
        })
    }

    private initUsersList() {

        this.usersInRoom = this.socket.fromEvent<number[]>("joinedRoom").pipe(
            switchMap(userIds => {
                const getCurrentUsersChanges = userIds.map(userId => {
                   return this.userApiService.get(userId).pipe(
                        switchMap(user => {
                            const imageId = user.imageId

                            if(imageId) {
                                return this.imagesService.getImageById(imageId).pipe(
                                    map(image =>({...user , image}))
                                )
                            }

                            return of(user)

                        })
                   )
                }) 

                return forkJoin(getCurrentUsersChanges)
            }),
        )
    }

    private initWebSocketsData() {
            this.activeRoute.params
                .pipe(
                    first(),
                    switchMap(({roomId}) => {
                        this.roomId = roomId
                        return this.userService.currentUser.pipe(
                            tap(user => this.socket.emit("joinRoom" , {
                                roomId,
                                currentUserId: user.id
                            })),
                        )
                    }),
                )
                .subscribe(_ => {})
    }

    public openAddVideoPopup() {
        this.modalService.createDialog(AddFileModalComponent , {roomId: this.roomId} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

    public openAddUserPopup() {
        this.modalService.createDialog(AddUserModalComponent , {} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

}