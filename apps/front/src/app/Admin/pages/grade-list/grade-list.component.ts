import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradeResponse, PromotionResponse } from 'src/app/Interface/interface';
import { GradeService } from 'src/app/Services/grade.service';
import { PromotionService } from 'src/app/Services/promotion.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss'],
})
export class GradeListComponent implements OnInit {
  gradeList: GradeResponse[] = [];
  currentPage = 1;
  totalPages: number | undefined;
  promotions: PromotionResponse[] = [];
  searchTerm?: string;
  selectedPromotionId?: number;

  constructor(
    private promotionService: PromotionService,
    private gradeService: GradeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.promotionService.get<any>().subscribe((promotions) => {
      this.promotions = promotions;
    });
    this.gradeService.get<any>().subscribe((gradeList) => {
      this.gradeList = gradeList;
    });

    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.loadGradeList(this.currentPage);
    });
  }

  loadGradeList(page: number) {
    this.gradeService.getGradesWithPage(page).subscribe((response: any) => {
      this.gradeList = response['hydra:member'];
      this.currentPage = page;
      this.totalPages = 1;

      if (response['hydra:view'] && response['hydra:view']['hydra:last']) {
        this.totalPages = parseInt(
          response['hydra:view']['hydra:last'].split('=')[1],
        );
      }
    });
  }

  onPromotionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const promotionId = Number(selectElement.value);
    this.selectedPromotionId = promotionId;
    this.loadGradesByPromotion(promotionId);
  }

  loadGradesByPromotion(promotionId: number): void {
    this.promotionService
      .getGradesByPromotion(promotionId)
      .subscribe((grades) => {
        this.gradeList = grades;
      });
  }
}
