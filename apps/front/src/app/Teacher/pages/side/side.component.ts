import { Component, TemplateRef, inject } from '@angular/core';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Link } from 'src/app/Shared/sidebar/sidebar.component';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
})
export class SideComponent {
  private offcanvasService = inject(NgbOffcanvas);

  links: Link[] = [
    {
      url: 'reportattendance',
      name: 'Signaler ma présence',
    },
    {
      url: 'promotions',
      name: 'Liste des promotions',
    },
    {
      url: 'gradeexam',
      name: 'Examens',
    },
    {
      url: 'grades',
      name: 'Consulter les notes',
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
