import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeListComponent } from 'src/app/Admin/pages/grade-list/grade-list.component';
import { DetailPromotionComponent } from 'src/app/pages/detail-promotion/detail-promotion.component';
import { DetailStudentPromotionComponent } from 'src/app/pages/detail-student-promotion/detail-student-promotion.component';
import { ListPromotionComponent } from 'src/app/pages/list-promotion/list-promotion.component';
import { GradeExamComponent } from 'src/app/Teacher/pages/grade-exam/grade-exam.component';
import { ReportAttendanceComponent } from 'src/app/Teacher/pages/report-attendance/report-attendance.component';
import { SideComponent } from 'src/app/Teacher/pages/side/side.component';

const routes: Routes = [
  {
    path: '',
    component: SideComponent,
    children: [
      {
        path: 'reportattendance',
        component: ReportAttendanceComponent,
      },
      {
        path: 'promotions',
        component: ListPromotionComponent,
      },
      {
        path: 'gradeexam',
        component: GradeExamComponent,
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
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
