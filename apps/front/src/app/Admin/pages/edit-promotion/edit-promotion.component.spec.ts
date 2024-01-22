import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotionComponent } from './edit-promotion.component';

describe('EditPromotionComponent', () => {
  let component: EditPromotionComponent;
  let fixture: ComponentFixture<EditPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPromotionComponent],
    });
    fixture = TestBed.createComponent(EditPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
