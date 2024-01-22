import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentResponse, StudentResponse } from 'src/app/Interface/interface';
import { DocumentService } from 'src/app/Services/document.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit {
  studentWithData!: StudentResponse;
  selectedDocumentType?: string;
  listOfDocument?: DocumentResponse[];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((parentParams) => {
      const studentId: string = parentParams['id'];
      this.studentService.getById(studentId).subscribe((data) => {
        this.studentWithData = data;
        this.documentService
          .getDocumentByStudentId(this.studentWithData.id.toString())
          .subscribe((data) => {
            this.listOfDocument = data;
          });
      });
    });
  }
}
