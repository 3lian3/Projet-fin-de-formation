import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAttendanceComponent } from './consult-attendance.component';

describe('ConsultAttendanceComponent', () => {
  let component: ConsultAttendanceComponent;
  let fixture: ComponentFixture<ConsultAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultAttendanceComponent],
    });
    fixture = TestBed.createComponent(ConsultAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
