import { Component, OnInit } from "@angular/core";
import { ViewerService } from "../../services/viewer/viewer.service";
import { ModalService } from "../../services/modal/modal.service";
import { AddFileModalComponent } from "../modalComponents/addFileModal/addFile.component";
import { AddUserModalComponent } from "../modalComponents/addUserModal/addUser.component";
import { Socket } from "ngx-socket-io";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../modules/user-module/user.service";
import { BehaviorSubject, Observable, Subscription, first, forkJoin, map, of, scan, switchMap, tap } from "rxjs";
import { TUser } from "../../services/ApiService/apiServices/Login/types";
import { UserApiService } from "../../services/ApiService/users/users.service";

@Component({
    selector: 'viewer-component',
    templateUrl: 'viewer.component.html',
    styleUrl: 'viewer.component.scss'
})


export class ViewerComponent implements OnInit {

    constructor(
        private viewerService: ViewerService,
        private modalService: ModalService, 
        private socket: Socket, 
        private activeRoute: ActivatedRoute,
        private userService: UserService,
        private userApiService: UserApiService
    ){}

    private roomId: string

    public usersInRoom: Observable<Array<any>>

    private subscriptions: Subscription[] = []

    private historyDataChanges: Observable<any>

    public ngOnInit(): void {
        
        this.initUsersList()
        this.initWebSocketsData()
        this.initHistoryData()

        // this.activeRoute.params.subscribe(({roomId}) => {
            
        //     this.roomId = roomId

        //     this.socket.emit("joinRoom" , {
        //         roomId,
        //         currentUserId: 1
        //     })
            
        //     this.socket.on('history' , (history: string[]) => {
        //         console.log("history" , history)
        //     })
    
        //     this.socket.fromEvent("roomMessage").pipe(
    
        //     ).subscribe(data => console.log("roomMessage data" , data))    

        //     this.socket.fromEvent("joinedRoom").pipe(
    
        //     ).subscribe(data => console.log("joinedRoom data" , data)) 

        // })

    }

    private initHistoryData() {
        this.socket.on("history" , (history: string[]) => {
            console.log("history" , history)
            this.historyDataChanges = of(history)
        })
    }

    private initUsersList() {

        this.usersInRoom = this.socket.fromEvent<number[]>("joinedRoom").pipe(
            switchMap(userIds => {
                const getCurrentUsersChanges = userIds.map(userId => {
                   return this.userApiService.getUserById(userId)
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
        this.socket.emit('sendMessage', { room: this.roomId, content: "TEST" });
        this.modalService.createDialog(AddFileModalComponent , {} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

    public openAddUserPopup() {
        this.modalService.createDialog(AddUserModalComponent , {} , {maxWidth: '500px' , maxHeight: '200px' , height: '100%'})
    }

}