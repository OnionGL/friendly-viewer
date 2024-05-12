import { Injectable } from "@angular/core";
import { FileUploadService } from "../../api-services/fileUpload/fileUpload.service";
import { UserApiService } from "../../api-services/users/users.service";
import { map } from "rxjs";

@Injectable({providedIn: 'root'})
export class ImagesService {

    constructor(private uploadService: FileUploadService , private userApiService: UserApiService) {}


    public getImageById(id: number) {
        return this.uploadService.get(id).pipe(
            map(data => {

                if(!data) return null

                const  dataImage = data.data

                const buffer = dataImage.data

                const bufferArray = Array.from(new Uint8Array(buffer));

                return 'data:image/jpeg;base64,' + btoa(bufferArray.map(byte => String.fromCharCode(byte)).join(''))

            })
        )
    }


}