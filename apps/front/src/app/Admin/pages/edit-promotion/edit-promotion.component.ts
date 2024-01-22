import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PromotionPost, PromotionResponse } from 'src/app/Interface/interface';
import { PromotionService } from 'src/app/Services/promotion.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss'],
})
export class EditPromotionComponent implements OnInit {
  promotionWithData?: PromotionResponse;
  editForm = this.fb.group({
    name: [this.promotionWithData?.name],
    startDate: [this.promotionWithData?.startDate],
    endDate: [this.promotionWithData?.endDate],
  });

  constructor(
    private promotionService: PromotionService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const promotionId: string = params['id'];
      this.promotionService.getById(promotionId).subscribe((promotion) => {
        this.promotionWithData = promotion;
      });
    });
  }

  onSubmit() {
    this.editForm.markAllAsTouched();
    if (this.editForm.invalid) return;
    const promoPost: PromotionPost = {
      name: this.name.value || this.promotionWithData?.name,
      startDate: this.startDate.value || this.promotionWithData?.startDate,
      endDate: this.endDate.value || this.promotionWithData?.endDate,
    };
    this.promotionService
      .put(this.promotionWithData!.id, promoPost)
      .then((response: HttpResponse<any>) => {
        this.toastService.show(
          'Opération réussie',
          'Promotion modifiée avec succès',
        );
      })
      .catch((error) => {
        this.toastService.show('ERREUR', error.error.detail);
      });
  }

  formatDate(date: Date | undefined): string {
    if (date) {
      return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    } else {
      return '';
    }
  }

  get name() {
    return this.editForm.get('name') as FormControl;
  }

  get startDate() {
    return this.editForm.get('startDate') as FormControl;
  }

  get endDate() {
    return this.editForm.get('endDate') as FormControl;
  }
}
