import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGenerateComponent } from './document-generate.component';

describe('DocumentGenerateComponent', () => {
  let component: DocumentGenerateComponent;
  let fixture: ComponentFixture<DocumentGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentGenerateComponent],
    });
    fixture = TestBed.createComponent(DocumentGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
