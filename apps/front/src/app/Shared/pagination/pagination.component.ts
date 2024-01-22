import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage: number | undefined;
  @Input() totalPages: number | undefined;
  @Output() pageChanged = new EventEmitter<number>();

  constructor(private router: Router) {}

  onPageChange(page: number) {
    // Mettez à jour l'URL avec le nouveau numéro de page
    this.router.navigate([], { queryParams: { page } });
  }
}
