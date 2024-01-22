import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdviceResponse, Question } from 'src/app/Interface/interface';
import { AdviceService } from 'src/app/Services/advice.service';

@Component({
  selector: 'app-advice-list',
  templateUrl: './advice-list.component.html',
  styleUrls: ['./advice-list.component.scss'],
})
export class AdviceListComponent implements OnInit {
  questions: Question[] = [];
  adviceList: AdviceResponse[] = [];
  currentPage = 1;
  totalPages: number | undefined;

  constructor(
    private adviceService: AdviceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.questions = this.adviceService.questions;
    this.adviceService.get<any>().subscribe((adviceList) => {
      this.adviceList = adviceList;
    });

    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.loadAdviceList(this.currentPage);
    });
  }

  getEmoji(value: number | null): string {
    const emoji = this.adviceService.emoji.find((item) => item.value === value);
    return emoji ? emoji.key : '';
  }

  loadAdviceList(page: number) {
    this.adviceService
      .getAdviceListWithPage(page)
      .subscribe((response: any) => {
        this.adviceList = response['hydra:member'];
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
