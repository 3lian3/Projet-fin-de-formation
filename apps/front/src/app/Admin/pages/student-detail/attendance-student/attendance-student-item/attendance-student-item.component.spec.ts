import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceStudentItemComponent } from './attendance-student-item.component';

describe('AttendanceStudentItemComponent', () => {
  let component: AttendanceStudentItemComponent;
  let fixture: ComponentFixture<AttendanceStudentItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceStudentItemComponent],
    });
    fixture = TestBed.createComponent(AttendanceStudentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
