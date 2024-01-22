import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { StudentResponse } from 'src/app/Interface/interface';
import { DocumentService } from 'src/app/Services/document.service';
import { StudentService } from 'src/app/Services/student.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-document-generate',
  templateUrl: './document-generate.component.html',
  styleUrls: ['./document-generate.component.scss'],
})
export class DocumentGenerateComponent {
  @Input() studentWithData!: StudentResponse;
  selectedDocumentType?: string;
  generatedDocumentUrl?: SafeResourceUrl;

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private documentService: DocumentService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  onDocumentTypeChange() {
    this.generatedDocumentUrl = undefined;
  }

  generateDocument() {
    if (this.selectedDocumentType !== undefined) {
      this.documentService
        .generateDocument(
          this.studentWithData!.id.toString(),
          this.selectedDocumentType,
        )
        .subscribe(
          (data: any) => {
            this.generatedDocumentUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(data.documentUrl);
            this.changeDetectorRef.detectChanges();
            window.location.reload();
          },
          (error: any) => {
            this.toastService.show('ERREUR', error.error.detail);
          },
          (error: any) => {
            this.toastService.show('ERREUR', error.error.detail);
          },
        );
    }
  }
}
