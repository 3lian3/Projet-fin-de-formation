import { Component, TemplateRef, inject } from '@angular/core';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { Link } from 'src/app/Shared/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  private offcanvasService = inject(NgbOffcanvas);

  links: Link[] = [
    {
      url: 'addpromotion',
      name: 'Ajouter une promotion',
    },
    {
      url: 'promotions',
      name: 'Liste des promotions',
    },
    {
      url: 'addstudent',
      name: 'Ajouter un étudiant',
    },
    {
      url: 'studentlist',
      name: 'Liste des étudiants',
    },
    {
      url: 'attendanceList',
      name: 'Consulter les présences',
    },
    {
      url: 'advices',
      name: 'Consulter les avis',
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
