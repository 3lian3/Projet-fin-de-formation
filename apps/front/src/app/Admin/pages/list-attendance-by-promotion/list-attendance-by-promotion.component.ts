import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceListResponse } from 'src/app/Interface/interface';
import { ConsultAttendanceService } from 'src/app/Services/consultAttendance.service';

@Component({
  selector: 'app-list-attendance-by-promotion',
  templateUrl: './list-attendance-by-promotion.component.html',
  styleUrls: ['./list-attendance-by-promotion.component.scss'],
})
export class ListAttendanceByPromotionComponent implements OnInit {
  data: AttendanceListResponse[] = [];
  promotionId!: number;
  page = 1;
  constructor(
    private consultAttendanceService: ConsultAttendanceService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((parentParams) => {
      this.promotionId = parseInt(parentParams['id']);
    });
    this.consultAttendanceService.get().subscribe((response: any) => {
      this.data = response.data;
    });
  }
}
