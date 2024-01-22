import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  currentPage = 1;
  totalPages: number | undefined;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.studentService.get<any>().subscribe((students) => {
      this.students = students;
    });

    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.loadStudents(this.currentPage);
    });
  }

  loadStudents(page: number) {
    this.studentService.getWithPage(page).subscribe((response: any) => {
      this.students = response['hydra:member'];
      this.currentPage = page;
      this.totalPages = 1;

      if (response['hydra:view'] && response['hydra:view']['hydra:last']) {
        this.totalPages = parseInt(
          response['hydra:view']['hydra:last'].split('=')[1],
        );
      }
    });
  }
}
