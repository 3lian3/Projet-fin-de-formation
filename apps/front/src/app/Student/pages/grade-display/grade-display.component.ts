import { GradeService } from 'src/app/Services/grade.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Grade } from 'src/app/Interface/interface';
import { User } from 'src/app/User/User';
import { ActivatedRoute } from '@angular/router';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { StudentService } from 'src/app/Services/student.service';
import { Subject, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-grade-display',
  templateUrl: './grade-display.component.html',
  styleUrls: ['./grade-display.component.scss'],
})
export class GradeDisplayComponent implements OnInit, OnDestroy {
  grades?: Grade[];
  currentUser?: User;
  currentPage = 1;
  totalPages: number | undefined;
  private destroy$ = new Subject();

  constructor(
    private gradeService: GradeService,
    private GetProfilService: GetProfilService,
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.GetProfilService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user && user.id) {
          this.studentService
            .getStudentByUserId(user.id)
            .subscribe((studentResponse) => {
              if (studentResponse && studentResponse.id) {
                this.loadStudentGrades(studentResponse.id);
              }
            });
        }
      });

    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.loadAllGrades(this.currentPage);
    });
  }

  loadStudentGrades(studentId: string): void {
    console.log('studentId', studentId);
    this.gradeService
      .getGradesForStudent(studentId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
      )
      .subscribe((grades: Grade[] | undefined) => {
        console.log('grades', grades);
        this.grades = grades;
      });
  }

  loadAllGrades(page: number) {
    this.gradeService.getGradesWithPage(page).subscribe((response: any) => {
      this.grades = response['hydra:member'];
      this.currentPage = page;
      this.totalPages = parseInt(
        response['hydra:view']['hydra:last'].split('=')[1],
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.complete();
  }
}
