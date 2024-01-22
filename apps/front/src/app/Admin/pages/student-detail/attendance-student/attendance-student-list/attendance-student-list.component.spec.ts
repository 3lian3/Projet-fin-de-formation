import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceStudentListComponent } from './attendance-student-list.component';

describe('AttendanceStudentListComponent', () => {
  let component: AttendanceStudentListComponent;
  let fixture: ComponentFixture<AttendanceStudentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceStudentListComponent],
    });
    fixture = TestBed.createComponent(AttendanceStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
