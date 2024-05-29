import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantTemplateComponent } from './etudiant-template.component';

describe('EtudiantTemplateComponent', () => {
  let component: EtudiantTemplateComponent;
  let fixture: ComponentFixture<EtudiantTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
