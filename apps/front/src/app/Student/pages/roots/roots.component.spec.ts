import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootsComponent } from './roots.component';

describe('RootComponent', () => {
  let component: RootsComponent;
  let fixture: ComponentFixture<RootsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RootsComponent],
    });
    fixture = TestBed.createComponent(RootsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
