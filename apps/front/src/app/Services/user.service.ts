import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './restService';
import { BehaviorSubject } from 'rxjs';
import { User } from '../User/User';
import { UserForResetPassword } from '../Interface/interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends RestService {
  private userSubject$ = new BehaviorSubject<User | null>(null);

  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/users');
  }

  public resetPasswordUser(email: UserForResetPassword): Promise<any> {
    this.setBaseUrl('/api/users/ask-reset-password');
    return this.post(email);
  }

  resetPassword(plainPassword: string, hash: string): Promise<any> {
    this.setBaseUrl(`/api/users/${hash}/reset-password`);
    const requestBody = { plainPassword };
    return this.post(requestBody);
  }
}
