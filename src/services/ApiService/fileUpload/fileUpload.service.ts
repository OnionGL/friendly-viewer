import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class FileUploadService {

    constructor(private http: HttpClient) {}

    public upload = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post('/api/upload-file/upload' , formData)
    }

    public getFile = (id: number): Observable<any> => {
        return this.http.get(`/api/upload-file/file/${id}`)
    }

}