import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionResponse } from 'src/app/Interface/interface';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { PromotionService } from 'src/app/Services/promotion.service';
import { User } from 'src/app/User/User';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.scss'],
})
export class DetailPromotionComponent implements OnInit {
  promotion: PromotionResponse | null = null;
  currentUser?: User;

  constructor(
    private GetProfilService: GetProfilService,
    private activatedRoute: ActivatedRoute,
    private PromotionService: PromotionService,
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
