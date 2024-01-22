import { Component, TemplateRef, inject } from '@angular/core';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Link } from 'src/app/Shared/sidebar/sidebar.component';

@Component({
  selector: 'app-roots',
  templateUrl: './roots.component.html',
  styleUrls: ['./roots.component.scss'],
})
export class RootsComponent {
  private offcanvasService = inject(NgbOffcanvas);

  links: Link[] = [
    {
      url: 'profil',
      name: 'Mon profil',
    },
    {
      url: 'attendance',
      name: 'Signaler ma présence',
    },
    {
      url: 'advice',
      name: 'Donner mon avis',
    },
  ];

  closeResult = '';

  openMobileSidebar(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
  }

  private getDismissReason(reason: OffcanvasDismissReasons): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
