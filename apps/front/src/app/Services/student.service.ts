import { StudentResponse } from 'src/app/Interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fundings, States, StudentList } from '../Interface/interface';
import { RestService } from './restService';
import { Student } from '../Student/Student';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends RestService {
  private studentSubject$ = new BehaviorSubject<Student | null>(null);
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/students');
  }

  states: States[] = [
    { name: `En cours d'inscription` },
    { name: `Inscrit` },
    { name: 'Exclu' },
    { name: 'Abandon' },
  ];

  getFakeStates(): States[] {
    return this.states;
  }

  fundings: States[] = [
    { name: 'France Travail' },
    { name: 'Région' },
    { name: 'Entreprise' },
    { name: 'Autre' },
  ];

  getFundings(): Fundings[] {
    return this.fundings;
  }

  getStudentByUserId(userId: string): Observable<StudentResponse> {
    return this.http.get<StudentResponse>(
      `${this.getBaseUrl()}/user/${userId}`,
    );
  }

  getStudentListWithPage(page = 1) {
    return this.getWithPage<StudentList[]>(page);
  }
}
