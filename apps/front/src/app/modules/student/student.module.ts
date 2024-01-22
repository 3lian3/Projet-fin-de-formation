import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { ReportAttendanceComponent } from 'src/app/Student/pages/report-attendance/report-attendance.component';
import { SharedModule } from '../shared/shared.module';
import { ReportAdviceComponent } from 'src/app/Student/pages/report-advice/report-advice.component';
import { RootsComponent } from 'src/app/Student/pages/roots/roots.component';
import { ProfilComponent } from 'src/app/Student/pages/profil/profil.component';

@NgModule({
  declarations: [
    ProfilComponent,
    ReportAttendanceComponent,
    ReportAdviceComponent,
    RootsComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class StudentModule {}
