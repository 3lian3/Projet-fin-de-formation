import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { HttpClient } from '@angular/common/http';
import { PromotionResponse } from '../Interface/interface';
import { Observable, catchError, map, tap, throwError, of } from 'rxjs';
import { Promotion } from '../promotion/promotion';

@Injectable({
  providedIn: 'root',
})
export class PromotionService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/promotions');
  }

  getPromotions() {
    return this.getTyped<PromotionResponse[]>().pipe(
      map((promotionsResponse) => {
        return promotionsResponse.map(
          (promotionResponse) =>
            new Promotion(
              promotionResponse.id,
              promotionResponse.name,
              promotionResponse.startDate,
              promotionResponse.endDate,
              promotionResponse.students,
            ),
        );
      }),
    );
  }

  getPromotionById(promotionId: number): Observable<PromotionResponse> {
    this.setBaseUrl(`/api/promotions/${promotionId}`);
    return this.getTyped<PromotionResponse>().pipe(
      tap((promotion) => console.log(promotion)),
    );
  }

  getPromotionsWithPage(page = 1) {
    return this.getWithPage<PromotionResponse[]>(page);
  }

  getGradesByPromotion(promotionId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.getBaseUrl()}/${promotionId}/grades`)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of([]);
          } else {
            return throwError(error);
          }
        }),
      );
  }
}
