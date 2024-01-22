import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceTeacherService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/attendance_teachers');
  }

  public getByDate<T>(date: string): Observable<T> {
    return this.http.get<T>(`${this.getBaseUrl()}`, {
      params: {
        date,
      },
      headers: {
        Accept: 'application/json',
      },
    });
  }
}
