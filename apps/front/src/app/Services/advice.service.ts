import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { HttpClient } from '@angular/common/http';
import { AdviceResponse, Question, emojiRating } from '../Interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdviceService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/advices');
  }

  public getAdvicesByStudentId(studentId: string): Observable<any[]> {
    this.setBaseUrl(`/api/advices?student=${studentId}`);
    return this.get<any[]>();
  }

  questions: Question[] = [
    { key: 'question1', text: "Comment s'est passée ta semaine?" },
    { key: 'question2', text: "Comment trouves-tu l'ambiance de ta classe ?" },
    {
      key: 'question3',
      text: 'As tu compris ce que tu as vu cette semaine en cours ?',
    },
    {
      key: 'question4',
      text: 'Les locaux et parties communes te conviennent ?',
    },
    {
      key: 'question5',
      text: 'Les prof de la semaine ont répondu à tes attentes ?',
    },
  ];

  emoji: emojiRating[] = [
    { key: '🙁', value: 1 },
    { key: '😐', value: 2 },
    { key: '🙂', value: 3 },
    { key: '😁', value: 4 },
  ];

  getQuestions(): Question[] {
    return this.questions;
  }

  getEmoji(): emojiRating[] {
    return this.emoji;
  }

  getAdviceListWithPage(page = 1) {
    return this.getWithPage<AdviceResponse[]>(page);
  }
}
