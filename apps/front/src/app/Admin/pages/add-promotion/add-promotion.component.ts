import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PromotionPost } from 'src/app/Interface/interface';
import { PromotionService } from 'src/app/Services/promotion.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss'],
})
export class AddPromotionComponent {
  addForm = this.fb.group({
    name: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  constructor(
    private promotionService: PromotionService,
    private fb: FormBuilder,
    private toastService: ToastService,
  ) {}

  onSubmit() {
    this.addForm.markAllAsTouched();
    if (this.addForm.invalid) return;
    const promoPost: PromotionPost = {
      name: this.name.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
    };

    this.promotionService
      .post(promoPost)
      .then((response: HttpResponse<any>) => {
        this.toastService.show(
          'Opération réussie',
          'La promotion a bien été ajoutée',
        );
        this.addForm.reset();
      })
      .catch((error) => {
        this.toastService.show('ERREUR', error.error.detail);
      });
  }

  get name() {
    return this.addForm.get('name') as FormControl;
  }

  get startDate() {
    return this.addForm.get('startDate') as FormControl;
  }

  get endDate() {
    return this.addForm.get('endDate') as FormControl;
  }
}
