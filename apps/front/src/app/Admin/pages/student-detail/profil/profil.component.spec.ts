import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDetailStudentComponent } from './profil-detail-student.component';

describe('ProfilComponent', () => {
  let component: ProfilDetailStudentComponent;
  let fixture: ComponentFixture<ProfilDetailStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilDetailStudentComponent],
    });
    fixture = TestBed.createComponent(ProfilDetailStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
