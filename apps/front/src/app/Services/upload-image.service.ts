import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService extends RestService {
  constructor(http: HttpClient) {
    super(http);
  }

  uploadImage(studentId: number, file: File) {
    const uploadUrl = `${environment.apiUrl}/api/students/${studentId}/image`;

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(uploadUrl, formData);
  }
}
