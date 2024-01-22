import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/Services/exam.service';
import { Exam } from 'src/app/Interface/interface';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.getExams().subscribe((data) => {
      this.exams = data;
    });
  }
}
