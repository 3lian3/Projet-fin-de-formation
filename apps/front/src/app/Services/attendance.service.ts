import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/attendance_students');
  }

  public getAttendancesByStudentId(studentId: string): Observable<any[]> {
    this.setBaseUrl(`/api/attendance_students?student=${studentId}`);
    return this.get<any[]>();
  }

  public patchAttendance(attendanceId: string, data: any): Promise<any> {
    this.setBaseUrl(`/api/attendance_students`);
    return this.patch(attendanceId, data);
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
