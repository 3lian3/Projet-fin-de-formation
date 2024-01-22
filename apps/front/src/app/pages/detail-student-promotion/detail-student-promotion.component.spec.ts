import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStudentPromotionComponent } from './detail-student-promotion.component';

describe('DetailStudentPromotionComponent', () => {
  let component: DetailStudentPromotionComponent;
  let fixture: ComponentFixture<DetailStudentPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailStudentPromotionComponent],
    });
    fixture = TestBed.createComponent(DetailStudentPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
