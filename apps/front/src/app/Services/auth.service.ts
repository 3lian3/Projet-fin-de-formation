import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from './restService';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/auth');
  }

  public logout(body: any = {}, options = {}): Promise<any> {
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/logout`, body, { params: options }),
    );
  }
}
