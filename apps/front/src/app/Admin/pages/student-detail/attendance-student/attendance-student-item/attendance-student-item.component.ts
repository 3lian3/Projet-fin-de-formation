import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  AttendanceStudentForEdit,
  AttendanceStudentResponse,
} from 'src/app/Interface/interface';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-attendance-student-item',
  templateUrl: './attendance-student-item.component.html',
  styleUrls: ['./attendance-student-item.component.scss'],
})
export class AttendanceStudentItemComponent implements OnInit {
  @Input() attendance: AttendanceStudentResponse | undefined;
  formDisabled = true;
  attendanceForm: FormGroup = this.createAttendanceForm();

  constructor(
    private fb: FormBuilder,
    private attendanceService: AttendanceService,
    private toastService: ToastService,
  ) {
    this.attendanceForm = this.createAttendanceForm();
  }

  ngOnInit(): void {
    this.attendanceForm = this.createAttendanceForm();
  }
  createAttendanceForm(): FormGroup {
    return this.fb.group({
      morning: [
        { value: this.attendance?.morning, disabled: this.formDisabled },
      ],
      afternoon: [
        { value: this.attendance?.afternoon, disabled: this.formDisabled },
      ],
    });
  }

  enableForm() {
    this.attendanceForm.enable();
  }

  onSubmit(id: number) {
    if (this.attendanceForm.invalid) {
      return;
    }
    const attendanceData: AttendanceStudentForEdit = {
      morning: this.morning.value,
      afternoon: this.afternoon.value,
    };
    this.attendanceService.patchAttendance(id.toString(), attendanceData).then(
      () => {
        this.toastService.show(
          'Opération réussie',
          'présence modifiée avec succès',
        );
        this.attendanceForm.disable();
      },
      (error) => {
        this.toastService.show('ERREUR', error.error.detail);
      },
    );
  }

  get morning() {
    return this.attendanceForm.get('morning') as FormControl;
  }

  get afternoon() {
    return this.attendanceForm.get('afternoon') as FormControl;
  }
}
