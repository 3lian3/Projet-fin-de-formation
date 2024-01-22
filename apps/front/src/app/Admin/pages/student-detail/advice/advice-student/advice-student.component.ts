import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AdviceResponse,
  Question,
  StudentResponse,
} from 'src/app/Interface/interface';
import { AdviceService } from 'src/app/Services/advice.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-advice-student',
  templateUrl: './advice-student.component.html',
  styleUrls: ['./advice-student.component.scss'],
})
export class AdviceStudentComponent {
  questions: Question[] = [];
  studentWithData?: StudentResponse;
  listOfAdvice: AdviceResponse[] = [];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private adviceService: AdviceService,
  ) {}

  ngOnInit(): void {
    this.questions = this.adviceService.questions;
    this.activatedRoute.parent?.params.subscribe((parentParams) => {
      const studentId: string = parentParams['id'];
      this.studentService.getById(studentId).subscribe((student) => {
        this.studentWithData = student;
      });
      this.adviceService
        .getAdvicesByStudentId(studentId)
        .subscribe((advices) => {
          this.listOfAdvice = advices;
          console.log(this.listOfAdvice);
        });
    });
  }

  getEmoji(value: number | null): string {
    const emoji = this.adviceService.emoji.find((item) => item.value === value);
    return emoji ? emoji.key : '';
  }
}
