import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { Observable } from 'rxjs';
import { Exam } from '../Interface/interface';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/exams');
  }

  public postExam(examData: any): Promise<any> {
    const payload = {
      date: examData.date,
      name: examData.name,
      promotion: `https://api.lanewschool.wip/api/promotions/${examData.promotion}`,
      lesson: `https://api.lanewschool.wip/api/lessons/${examData.lesson}`,
    };

    return this.post(payload);
  }

  public getExams(): Observable<Exam[]> {
    return this.getTyped<Exam[]>();
  }
}
