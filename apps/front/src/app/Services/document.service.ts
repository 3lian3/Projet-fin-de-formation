import { Injectable } from '@angular/core';
import { RestService } from './restService';
import { HttpClient } from '@angular/common/http';
import { DocumentResponse } from '../Interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService extends RestService {
  constructor(http: HttpClient) {
    super(http);
    this.setBaseUrl('/api/student_files');
  }

  generateDocument(studentId: string, documentType: string) {
    this.setBaseUrl('/api/students');
    return this.getByIdForDocument(studentId, documentType);
  }

  getDocumentByStudentId(studentId: string): Observable<DocumentResponse[]> {
    this.setBaseUrl(`/api/student_files?student=${studentId}`);
    return this.get();
  }

  downloadDocument(documentId: string): Observable<Blob> {
    this.setBaseUrl(`/api/student_files/${documentId}/download`);
    return this.getPdf();
  }
}
