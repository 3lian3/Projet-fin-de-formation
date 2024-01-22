import { Component, OnInit } from '@angular/core';
import { PromotionService } from 'src/app/Services/promotion.service';
import { GetProfilService } from 'src/app/Services/getprofil.service';
import { User } from 'src/app/User/User';
import { Promotion } from 'src/app/promotion/promotion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss'],
})
export class ListPromotionComponent implements OnInit {
  promotions?: Promotion[];
  currentUser?: User;
  currentPage = 1;
  totalPages: number | undefined;

  constructor(
    private promotionService: PromotionService,
    private GetProfilService: GetProfilService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.GetProfilService.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.loadPromotions(this.currentPage);
    });
  }

  loadPromotions(page: number) {
    this.promotionService
      .getPromotionsWithPage(page)
      .subscribe((response: any) => {
        this.promotions = response['hydra:member'];
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
