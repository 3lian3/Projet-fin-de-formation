import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttendanceByPromotionComponent } from './list-attendance-by-promotion.component';

describe('ListAttendanceByPromotionComponent', () => {
  let component: ListAttendanceByPromotionComponent;
  let fixture: ComponentFixture<ListAttendanceByPromotionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAttendanceByPromotionComponent],
    });
    fixture = TestBed.createComponent(ListAttendanceByPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
