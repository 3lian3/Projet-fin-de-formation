import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportAdviceComponent } from 'src/app/Student/pages/report-advice/report-advice.component';
import { ProfilComponent } from 'src/app/Student/pages/profil/profil.component';
import { ReportAttendanceComponent } from 'src/app/Student/pages/report-attendance/report-attendance.component';
import { RootsComponent } from 'src/app/Student/pages/roots/roots.component';
import { GradeDisplayComponent } from 'src/app/Student/pages/grade-display/grade-display.component';

const routes: Routes = [
  {
    path: '',
    component: RootsComponent,
    children: [
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'attendance',
        component: ReportAttendanceComponent,
      },
      {
        path: 'advice',
        component: ReportAdviceComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
