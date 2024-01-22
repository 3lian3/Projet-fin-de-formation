import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AttendanceStudentResponse,
  StudentResponse,
} from 'src/app/Interface/interface';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-attendance-student-list',
  templateUrl: './attendance-student-list.component.html',
  styleUrls: ['./attendance-student-list.component.scss'],
})
export class AttendanceStudentListComponent implements OnInit {
  studentWithData?: StudentResponse;
  listOfAttendance: AttendanceStudentResponse[] = [];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private attendanceService: AttendanceService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((parentParams) => {
      const studentId: string = parentParams['id'];
      this.studentService.getById(studentId).subscribe((student) => {
        this.studentWithData = student;
      });
      this.attendanceService
        .getAttendancesByStudentId(studentId)
        .subscribe((attendances) => {
          this.listOfAttendance = attendances;
        });
    });
  }
}
