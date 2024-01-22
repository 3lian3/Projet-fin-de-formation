import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultAttendanceService } from 'src/app/Services/consultAttendance.service';

@Component({
  selector: 'app-consult-attendance',
  templateUrl: './consult-attendance.component.html',
  styleUrls: ['./consult-attendance.component.scss'],
})
export class ConsultAttendanceComponent implements OnInit {
  data: any[] = [];
  currentPage = 1;
  totalPages: number | undefined;

  constructor(
    private consultAttendanceService: ConsultAttendanceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.consultAttendanceService.get().subscribe((response: any) => {
      this.data = response.data;
    });
  }
}
