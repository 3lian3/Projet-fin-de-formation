import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ReportAttendanceComponent } from 'src/app/Teacher/pages/report-attendance/report-attendance.component';
import { SideComponent } from 'src/app/Teacher/pages/side/side.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SideComponent, ReportAttendanceComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class TeacherModule {}
