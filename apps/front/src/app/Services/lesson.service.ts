import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LessonService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/lessons');
  }
}
