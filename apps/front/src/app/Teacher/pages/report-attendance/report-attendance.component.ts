import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AttendanceTeacher } from 'src/app/Attendance/AttendanceTeacher';
import { Lesson, PromotionResponse } from 'src/app/Interface/interface';
import { AttendanceTeacherService } from 'src/app/Services/attendanceTeacher.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { PromotionService } from 'src/app/Services/promotion.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-report-attendance',
  templateUrl: './report-attendance.component.html',
  styleUrls: ['./report-attendance.component.scss'],
})
export class ReportAttendanceComponent implements OnInit {
  submitted = false;
  formDisabled = false;
  promotions: PromotionResponse[] = [];
  lessons: Lesson[] = [];
  constructor(
    private fb: FormBuilder,
    private attendanceTeacherService: AttendanceTeacherService,
    private promotionService: PromotionService,
    private lessonService: LessonService,
    private datePipe: DatePipe,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.promotionService.get<any>().subscribe((promotions) => {
      this.promotions = promotions;
    });
    this.lessonService.get<any>().subscribe((lessons) => {
      this.lessons = lessons;
    });
    this.checkFormStatus();
  }

  attendanceForm = this.fb.group({
    morning: ['', Validators.required],
    afternoon: ['', Validators.required],
    absence: [''],
    promotion: ['', Validators.required],
    lesson: ['', Validators.required],
  });

  onSubmit() {
    this.attendanceForm.markAllAsTouched();

    if (this.attendanceForm.invalid) {
      return;
    }
    let attendance = new AttendanceTeacher();
    attendance = {
      morning: this.morning.value,
      afternoon: this.afternoon.value,
      proofOfAbsence: this.absence.value || null,
      promotion: '/api/promotions/' + this.promotion.value,
      lesson: '/api/lessons/' + this.lesson.value,
    };
    console.log(attendance);
    this.attendanceTeacherService
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

  get promotion() {
    return this.attendanceForm.get('promotion') as FormControl;
  }
  get lesson() {
    return this.attendanceForm.get('lesson') as FormControl;
  }

  checkFormStatus() {
    const day = new Date();
    const today = this.datePipe.transform(day, 'yyyy-MM-dd');
    this.attendanceTeacherService
      .getByDate(today as string)
      .subscribe((response: any) => {
        this.formDisabled = response.length > 0;
      });
  }
}
