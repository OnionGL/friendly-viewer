import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CompressionService {

    constructor(private http: HttpClient) { }

    public compressVideo(videoFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('video', videoFile);

        return this.http.post<any>('https://example.com/compress-video', formData);
    }
}