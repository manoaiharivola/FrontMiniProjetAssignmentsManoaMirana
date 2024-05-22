import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurTemplateComponent } from './professeur-template.component';

describe('ProfesseurTemplateComponent', () => {
  let component: ProfesseurTemplateComponent;
  let fixture: ComponentFixture<ProfesseurTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
