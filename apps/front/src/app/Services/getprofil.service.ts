import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './restService';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { User, UserResponse } from '../User/User';

@Injectable({
  providedIn: 'root',
})
export class GetProfilService extends RestService {
  private userSubject$ = new BehaviorSubject<User | null>(null);

  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/me');
  }

  public clearUser(): void {
    this.userSubject$.next(null);
  }

  private getCurrentUser(): Observable<User> {
    return this.userSubject$.pipe(
      switchMap((user: User | null) => {
        if (user === null) return EMPTY;
        return of(user);
      }),
    );
  }

  public getUser(): Observable<User> {
    if (this.userSubject$.value !== null) {
      return this.getCurrentUser();
    }
    return this.get<UserResponse>().pipe(
      map((userResponse) => {
        return userResponse;
      }),
      tap((user: User) => this.userSubject$.next(user)),
    );
  }
}
