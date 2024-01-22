import { Component, OnInit } from '@angular/core';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { Student } from 'src/app/Student/Student';
import { User } from 'src/app/User/User';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  student?: Student;
  currentUser?: User;

  constructor(private GetProfilService: GetProfilService) {}

  ngOnInit(): void {
    this.GetProfilService.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
}
