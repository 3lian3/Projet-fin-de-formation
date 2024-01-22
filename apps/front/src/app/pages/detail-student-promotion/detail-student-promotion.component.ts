import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionResponse } from 'src/app/Interface/interface';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { PromotionService } from 'src/app/Services/promotion.service';
import { User } from 'src/app/User/User';

@Component({
  selector: 'app-detail-student-promotion',
  templateUrl: './detail-student-promotion.component.html',
  styleUrls: ['./detail-student-promotion.component.scss'],
})
export class DetailStudentPromotionComponent implements OnInit {
  promotion: PromotionResponse | null = null;
  currentUser?: User;
  page = 1;

  constructor(
    private PromotionService: PromotionService,
    private activatedRoute: ActivatedRoute,
    private GetProfilService: GetProfilService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const promotionId: string = params['id'];
      this.PromotionService.getById(promotionId).subscribe((promotion) => {
        this.promotion = promotion;
      });
    });
    this.GetProfilService.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  }
}
