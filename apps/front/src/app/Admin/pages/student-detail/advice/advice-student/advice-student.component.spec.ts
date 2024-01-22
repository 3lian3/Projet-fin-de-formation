import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceStudentComponent } from './advice-student.component';

describe('AdviceStudentComponent', () => {
  let component: AdviceStudentComponent;
  let fixture: ComponentFixture<AdviceStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdviceStudentComponent],
    });
    fixture = TestBed.createComponent(AdviceStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
