import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from 'src/app/Shared/pagination/pagination.component';
import { ToastsComponent } from 'src/app/Shared/toasts/toasts.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SidebarComponent, PaginationComponent, ToastsComponent],
  imports: [CommonModule, RouterModule, NgbToastModule],
  exports: [SidebarComponent, PaginationComponent, ToastsComponent],
})
export class SharedModule {}
