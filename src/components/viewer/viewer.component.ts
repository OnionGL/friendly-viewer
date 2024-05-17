import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ViewerService } from "../../services/viewer/viewer.service";
import { ModalService } from "../../services/modal/modal.service";
import { AddFileModalComponent } from "../modalComponents/addFileModal/addFile.component";
import { AddUserModalComponent } from "../modalComponents/addUserModal/addUser.component";
import { Socket } from "ngx-socket-io";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, Subscription, catchError, finalize, first, forkJoin, fromEvent, map, merge, of, scan, shareReplay, switchMap, tap } from "rxjs";
import { UserApiService } from "../../api-services/users/users.service";
import { UserService } from "../../services/user/user.service";
import { FileUploadService } from "../../api-services/fileUpload/fileUpload.service";
import { ImagesService } from "../../services/image/images.servise";
import { RoomApiService } from "../../api-services/room/roomApi.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { TUser } from "../../types/user";

@Component({
    selector: 'viewer-component',
    templateUrl: 'viewer.component.html',
    styleUrl: 'viewer.component.scss'
})


export class ViewerComponent implements OnInit , OnDestroy {

    @ViewChild('videoPlayer') videoPlayer: any

    @HostListener('window:beforeunload', ['$event'])
    doSomething($event: any) {
        this.ngOnDestroy()
        $event.returnValue = 'Вы уверены, что хотите покинуть страницу?';
    }

    @HostListener('window:unload', ['$event'])
    unloadHandler($event: any): void {
        // this.ngOnDestroy(); // Вызов логики очистки
        // $event.returnValue = 'Вы уверены, что хотите покинуть страницу?';
    }

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

    public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
    
    private roomId: string
    
    private subscriptions: Subscription[] = []

    private historyDataChanges: Observable<any>


    public ngOnInit(): void {
        this.initUsersList()
        this.initWebSocketsData()
        this.initHistoryData()
        this.initVideo()
        this.initWebSocketVideoController()
    }

    private initWebSocketVideoController() {
        this.socket.fromEvent("allStart")
            .subscribe(_ => {
                this.videoPlayer.nativeElement.play()
            })
    
        this.socket.fromEvent("allPause")
            .subscribe(_ => {
                this.videoPlayer.nativeElement.pause()
            })
    }

    public ngOnDestroy(): void {
        this.userService.currentUser
            .pipe(first())
            .subscribe(user => this.socket.emit("leaveRoom" , {roomId: this.roomId , currentUserId: user.id}))
    }

    private initVideo() {
        this.videoData = this.socket.fromEvent<{videoId: number}>("addingVideo").pipe(
            tap(_ => this.isLoadingSubject.next(true)),
            switchMap(({videoId}) => {
                return this.uploadService.get(videoId)
            }),
            map(file => {
                const videoBlob = new Blob([new Uint8Array(file.data.data)], { type: 'video/mp4' });;
                const videoUrl = URL.createObjectURL(videoBlob);
                return this.sanitizer.bypassSecurityTrustUrl(videoUrl)
            }),
            tap(_ => this.isLoadingSubject.next(false)),
            shareReplay()
        )
    }

    public playerController(event: any) {
        
        if(event?.type == "play") {
            this.socket.emit("playVideo" , {roomId: this.roomId})
        }
        
        if(event?.type == "pause") {
            this.socket.emit("pauseVideo" , {roomId: this.roomId})
        }
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
                            catchError(err => {
                                if(err.statusText == "Unauthorized") {
                                    return of("Unauthorized")
                                }
                                throw new Error("Error")
                            }),
                            switchMap((data): Observable<TUser> => {
                                if(data == "Unauthorized") {
                                    return this.userApiService.createGuestUser().pipe(
                                        first()
                                    )
                                }
                                return of(data as TUser)
                            }),
                            tap(user => this.socket.emit("joinRoom" , {
                                roomId,
                                currentUserId: user.id
                            })),
                        )
                    }),
                )
                .subscribe(_ => {})
                window.addEventListener("onbeforeunload", () => {
                    this.ngOnDestroy()
                });
    }

    public openAddVideoPopup() {
        this.modalService.createDialog(AddFileModalComponent , {roomId: this.roomId} , {maxWidth: '500px' , maxHeight: '120px' , height: '100%'})
    }

    public openAddUserPopup() {
        this.modalService.createDialog(AddUserModalComponent , {roomId: this.roomId} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

}