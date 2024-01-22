import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddStudentComponent } from 'src/app/Admin/pages/add-student/add-student.component';
import { AppComponent } from 'src/app/app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AddPromotionComponent } from 'src/app/Admin/pages/add-promotion/add-promotion.component';
import { SharedModule } from '../shared/shared.module';
import { RootComponent } from 'src/app/Admin/pages/root/root.component';
import { StudentListComponent } from 'src/app/Admin/pages/student-list/student-list.component';
import { AdviceListComponent } from 'src/app/Admin/pages/advice-list/advice-list.component';
import { EditPromotionComponent } from 'src/app/Admin/pages/edit-promotion/edit-promotion.component';
import { ConsultAttendanceComponent } from 'src/app/Admin/pages/consult-attendance/consult-attendance.component';
import { StudentDetailComponent } from 'src/app/Admin/pages/student-detail/student-detail.component';
import { ListAttendanceByPromotionComponent } from 'src/app/Admin/pages/list-attendance-by-promotion/list-attendance-by-promotion.component';
import { DetailStudentPromotionComponent } from 'src/app/pages/detail-student-promotion/detail-student-promotion.component';
import { ProfilDetailStudentComponent } from 'src/app/Admin/pages/student-detail/profil/profil-detail-student.component';
import { AttendanceStudentListComponent } from 'src/app/Admin/pages/student-detail/attendance-student/attendance-student-list/attendance-student-list.component';
import { AttendanceStudentItemComponent } from 'src/app/Admin/pages/student-detail/attendance-student/attendance-student-item/attendance-student-item.component';
import { AdviceStudentComponent } from 'src/app/Admin/pages/student-detail/advice/advice-student/advice-student.component';
import { DocumentGenerateComponent } from 'src/app/Admin/pages/student-detail/document/document-generate/document-generate.component';
import { DocumentItemComponent } from 'src/app/Admin/pages/student-detail/document/document-item/document-item.component';
import { DocumentListComponent } from 'src/app/Admin/pages/student-detail/document/document-list/document-list.component';

@NgModule({
  declarations: [
    AddStudentComponent,
    AddPromotionComponent,
    RootComponent,
    StudentListComponent,
    AdviceListComponent,
    EditPromotionComponent,
    ConsultAttendanceComponent,
    StudentDetailComponent,
    ListAttendanceByPromotionComponent,
    DetailStudentPromotionComponent,
    ProfilDetailStudentComponent,
    AttendanceStudentListComponent,
    AttendanceStudentItemComponent,
    AdviceStudentComponent,
    DocumentGenerateComponent,
    DocumentListComponent,
    DocumentItemComponent,
    AdviceStudentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AdminModule {}
