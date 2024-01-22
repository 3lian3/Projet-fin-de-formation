import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPromotionComponent } from 'src/app/Admin/pages/add-promotion/add-promotion.component';
import { AddStudentComponent } from 'src/app/Admin/pages/add-student/add-student.component';
import { RootComponent } from 'src/app/Admin/pages/root/root.component';
import { AdviceListComponent } from 'src/app/Admin/pages/advice-list/advice-list.component';
import { ConsultAttendanceComponent } from 'src/app/Admin/pages/consult-attendance/consult-attendance.component';
import { EditPromotionComponent } from 'src/app/Admin/pages/edit-promotion/edit-promotion.component';
import { StudentListComponent } from 'src/app/Admin/pages/student-list/student-list.component';
import { DetailPromotionComponent } from 'src/app/pages/detail-promotion/detail-promotion.component';
import { ListPromotionComponent } from 'src/app/pages/list-promotion/list-promotion.component';
import { DetailStudentPromotionComponent } from 'src/app/pages/detail-student-promotion/detail-student-promotion.component';
import { StudentDetailComponent } from 'src/app/Admin/pages/student-detail/student-detail.component';
import { ProfilDetailStudentComponent } from 'src/app/Admin/pages/student-detail/profil/profil-detail-student.component';
import { AttendanceStudentListComponent } from 'src/app/Admin/pages/student-detail/attendance-student/attendance-student-list/attendance-student-list.component';
import { ListAttendanceByPromotionComponent } from 'src/app/Admin/pages/list-attendance-by-promotion/list-attendance-by-promotion.component';
import { AdviceStudentComponent } from 'src/app/Admin/pages/student-detail/advice/advice-student/advice-student.component';
import { DocumentListComponent } from 'src/app/Admin/pages/student-detail/document/document-list/document-list.component';
import { GradeListComponent } from 'src/app/Admin/pages/grade-list/grade-list.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'addpromotion',
        component: AddPromotionComponent,
      },
      {
        path: 'addstudent',
        component: AddStudentComponent,
      },
      {
        path: 'studentlist',
        component: StudentListComponent,
      },
      {
        path: 'attendanceList',
        component: ConsultAttendanceComponent,
      },
      {
        path: 'advices',
        component: AdviceListComponent,
      },
      {
        path: 'promotions',
        component: ListPromotionComponent,
      },
      {
        path: 'grades',
        component: GradeListComponent,
      },
      {
        path: 'promotions/:id',
        component: DetailPromotionComponent,
        children: [
          {
            path: '',
            component: DetailStudentPromotionComponent,
          },
          {
            path: 'attendance',
            component: ListAttendanceByPromotionComponent,
          },
        ],
      },
      {
        path: 'edit-promotions/:id',
        component: EditPromotionComponent,
      },
      {
        path: 'student-detail/:id',
        component: StudentDetailComponent,
        children: [
          {
            path: '',
            component: ProfilDetailStudentComponent,
          },
          {
            path: 'attendance',
            component: AttendanceStudentListComponent,
          },
          {
            path: 'advices',
            component: AdviceStudentComponent,
          },
          {
            path: 'document-generate',
            component: DocumentListComponent,
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
