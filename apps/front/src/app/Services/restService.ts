import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class RestService {
  private baseUrl = '';

  public constructor(protected http: HttpClient) {}

  public post(body: any = {}, options = {}): Promise<any> {
    return firstValueFrom(
      this.http.post(this.baseUrl, body, { params: options }),
    );
  }

  public put(id: string | number, body: any = {}, options = {}): Promise<any> {
    return firstValueFrom(
      this.http.put<any>(`${this.baseUrl}/${id}`, body, {
        params: options,
      }),
    );
  }

  public patch(
    id: string | number,
    body: any = {},
    options = {},
  ): Promise<any> {
    return firstValueFrom(
      this.http.patch<any>(`${this.baseUrl}/${id}`, body, {
        params: options,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/merge-patch+json',
        },
      }),
    );
  }

  public get<T>(): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
  public getPdf<T>(): Observable<T> {
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.http.get<T>(`${this.baseUrl}`, httpOptions);
  }

  public getWithPage<T>(page = 1): any {
    return this.http.get<T>(`${this.baseUrl}`, {
      headers: {
        Accept: 'application/ld+json',
      },
      params: {
        page: page.toString(),
      },
    });
  }

  public getTyped<T>(): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  public getByIdForDocument(id: string, docType: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/generate-pdf/${docType}`, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  protected setBaseUrl(url: string): void {
    this.baseUrl = `${environment.apiUrl}${url}`;
  }

  protected getBaseUrl(): string {
    return this.baseUrl;
  }
}
