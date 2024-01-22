import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { Grade } from '../Interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradeService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/grades');
  }

  public postGrade(gradeData: any): Promise<any> {
    const payload = {
      date: gradeData.date,
      grade: gradeData.grade,
      appreciation: gradeData.appreciation,
      student: `https://api.lanewschool.wip/api/students/${gradeData.student}`,
      exam: `https://api.lanewschool.wip/api/exams/${gradeData.exam}`,
    };

    return this.post(payload);
  }

  getGradesForStudent(studentId: string): Observable<Grade[]> {
    console.log('studentId', studentId);
    return this.http.get<Grade[]>(`${this.getBaseUrl()}/grades/${studentId}`);
  }

  getGradesWithPage(page = 1) {
    return this.getWithPage<Grade[]>(page);
  }

  getGradeByStudentId(studentId: string): Observable<any> {
    this.setBaseUrl(`/api/grades?student=${studentId}`);
    return this.get();
  }

  getGradeList(): Observable<any> {
    this.setBaseUrl(`/api/grades`);
    return this.get();
  }
}
