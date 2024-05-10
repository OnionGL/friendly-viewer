import { Injectable } from "@angular/core";
import { FileUploadService } from "../ApiService/fileUpload/fileUpload.service";
import { UserApiService } from "../ApiService/users/users.service";
import { map } from "rxjs";

@Injectable({providedIn: 'root'})
export class ImagesService {

    constructor(private uploadService: FileUploadService , private userApiService: UserApiService) {}


    public getImageById(id: number) {
        return this.uploadService.getFile(id).pipe(
            map(data => {
                const  dataImage = data.data

                const buffer = dataImage.data

                const bufferArray = Array.from(new Uint8Array(buffer));

                return 'data:image/jpeg;base64,' + btoa(bufferArray.map(byte => String.fromCharCode(byte)).join(''))

            })
        )
    }


}