import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { Attendance } from 'src/app/Attendance/Attendance';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-report-presence',
  templateUrl: './report-attendance.component.html',
  styleUrls: ['./report-attendance.component.scss'],
})
export class ReportAttendanceComponent implements OnInit {
  submitted = false;
  formDisabled = false;
  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private datePipe: DatePipe,
    private toastService: ToastService,
  ) {}

  attendanceForm = this.fb.group({
    morning: ['', Validators.required],
    afternoon: ['', Validators.required],
    absence: [''],
  });

  ngOnInit(): void {
    this.checkFormStatus();
  }

  onSubmit() {
    this.attendanceForm.markAllAsTouched();

    if (this.attendanceForm.invalid) {
      return;
    }
    let attendance = new Attendance();
    attendance = {
      morning: this.morning.value,
      afternoon: this.afternoon.value,
      proofOfAbsence: this.absence.value || null,
    };
    this.attendanceService
      .post(attendance)
      .then((response: HttpResponse<any>) => {
        this.attendanceForm.reset();
        this.submitted = false;
        this.formDisabled = true;
      })
      .catch((error) => {
        this.toastService.show('ERREUR', error.error.detail);
      });
    this.submitted = true;
    this.formDisabled = false;
  }

  get morning() {
    return this.attendanceForm.get('morning') as FormControl;
  }

  get afternoon() {
    return this.attendanceForm.get('afternoon') as FormControl;
  }

  get absence() {
    return this.attendanceForm.get('absence') as FormControl;
  }

  checkFormStatus() {
    const day = new Date();
    const today = this.datePipe.transform(day, 'yyyy-MM-dd');
    this.attendanceService
      .getByDate(today as string)
      .subscribe((response: any) => {
        this.formDisabled = response.length > 0;
      });
  }
}
