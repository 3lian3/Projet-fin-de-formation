import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PromotionResponse,
  Lesson,
  StudentResponse,
} from '../../../Interface/interface';
import { PromotionService } from 'src/app/Services/promotion.service';
import { LessonService } from 'src/app/Services/lesson.service';
import { ExamService } from 'src/app/Services/exam.service';
import { Exam } from 'src/app/Interface/interface';
import { GradeService } from 'src/app/Services/grade.service';

@Component({
  selector: 'app-grade-exam',
  templateUrl: './grade-exam.component.html',
  styleUrls: ['./grade-exam.component.scss'],
})
export class GradeExamComponent implements OnInit {
  promotions: PromotionResponse[] = [];
  lessons: Lesson[] = [];
  exams: Exam[] = [];
  selectedPromotionStudents: StudentResponse[] = [];
  gradeExamForm: FormGroup;
  errorMessage = '';
  submitted = false;
  successMessage = '';

  constructor(
    private promotionService: PromotionService,
    private lessonService: LessonService,
    private examService: ExamService,
    private gradeService: GradeService,
    private fb: FormBuilder,
  ) {
    this.gradeExamForm = this.fb.group({
      promotion: ['', [Validators.required]],
      dateOfExam: ['', [Validators.required]],
      lesson: ['', [Validators.required]],
      exam: ['', [Validators.required]],
      studentGrades: this.fb.array(
        this.selectedPromotionStudents.map(() =>
          this.fb.group({
            note: [''],
            comment: [''],
          }),
        ),
      ),
    });
  }

  ngOnInit(): void {
    this.promotionService.get<any>().subscribe((promotions) => {
      this.promotions = promotions;
    });
    this.lessonService.get<any>().subscribe((lessons) => {
      this.lessons = lessons;
    });
    this.examService.get<any>().subscribe((exams) => {
      this.exams = exams;
    });
  }

  onPromotionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const promotionId = Number(selectElement.value);
    this.promotionService
      .getPromotionById(promotionId)
      .subscribe((promotion) => {
        this.selectedPromotionStudents =
          promotion.students as unknown as StudentResponse[];
        const studentGradesControls = this.selectedPromotionStudents.map(() =>
          this.fb.group({
            note: [''],
            comment: [''],
          }),
        );
        this.gradeExamForm.setControl(
          'studentGrades',
          this.fb.array(studentGradesControls),
        );
      });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.gradeExamForm.valid) {
      try {
        const examData = {
          date: this.gradeExamForm.value.dateOfExam,
          promotion: this.gradeExamForm.value.promotion,
          lesson: this.gradeExamForm.value.lesson,
          name: this.gradeExamForm.value.exam,
        };

        const examResponse = await this.examService.postExam(examData);
        const examId = examResponse.id;

        const studentGradesArray = this.studentGradesArray.controls;
        for (const [index, gradeGroup] of studentGradesArray.entries()) {
          const student: StudentResponse =
            this.selectedPromotionStudents[index];
          if (!student || !student.id) {
            throw new Error(`ID manquant pour l'étudiant à l'index ${index}`);
          }

          const noteControl = gradeGroup.get('note');
          const commentControl = gradeGroup.get('comment');

          let gradeValue = noteControl ? noteControl.value : '';
          gradeValue = gradeValue !== '' ? parseInt(gradeValue) : null;
          const commentValue = commentControl ? commentControl.value : '';
          if (gradeValue !== null && !isNaN(gradeValue)) {
            const gradeData = {
              date: this.gradeExamForm.value.dateOfExam,
              grade: gradeValue,
              appreciation: commentValue,
              student: student.id,
              exam: examId,
            };

            await this.gradeService.postGrade(gradeData);
          }
        }
        console.log('All grades posted successfully');
        this.errorMessage = '';
        this.successMessage = 'Les notes ont été enregistrées avec succès.';
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
        this.selectedPromotionStudents = [];
        this.gradeExamForm.reset();
        this.submitted = false;
      } catch (error) {
        console.error('Error in submitting data:', error);
        this.errorMessage =
          'Erreur lors de la soumission du formulaire. Veuillez réessayer.';
        this.successMessage = '';
      }
    }
  }

  get f() {
    return this.gradeExamForm.controls;
  }

  get studentGradesArray() {
    return this.gradeExamForm.get('studentGrades') as FormArray;
  }

  get promotion() {
    return this.gradeExamForm.get('promotion');
  }

  get lesson() {
    return this.gradeExamForm.get('lesson');
  }
}
