import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "../BaseApiService.service";

@Injectable()
export class FileUploadService extends BaseApiService<any> {

    constructor(
        injector: Injector
    ) {
        super(injector , "upload-file" , "upload-file")
        this.http = injector.get(HttpClient)
    }

    public upload = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return this.post(formData)
    }

}