import { Component, Input } from '@angular/core';
import { DocumentResponse } from 'src/app/Interface/interface';
import { DocumentService } from 'src/app/Services/document.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.scss'],
})
export class DocumentItemComponent {
  @Input() documentItem!: DocumentResponse;

  constructor(
    private documentService: DocumentService,
    private toastService: ToastService,
  ) {}

  downloadDocument(documentId: string) {
    this.documentService.downloadDocument(documentId).subscribe(
      (response: any) => {
        if (response instanceof Blob) {
          const blob = new Blob([response], { type: response.type });
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = this.documentItem.path;
          link.click();
          URL.revokeObjectURL(downloadUrl);
          this.toastService.show(
            'Opération réussie',
            'Document téléchargé avec succès',
          );
        } else {
          console.error("La réponse n'est pas de type Blob.");
        }
      },
      (error: any) => {
        this.toastService.show('ERREUR', error.error.detail);
      },
    );
  }
}
