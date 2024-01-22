import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceListComponent } from './advice-list.component';

describe('AdviceListComponent', () => {
  let component: AdviceListComponent;
  let fixture: ComponentFixture<AdviceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdviceListComponent],
    });
    fixture = TestBed.createComponent(AdviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
