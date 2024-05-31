import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurProfesseursComponent } from './professeur-professeurs.component';

describe('ProfesseurProfesseursComponent', () => {
  let component: ProfesseurProfesseursComponent;
  let fixture: ComponentFixture<ProfesseurProfesseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurProfesseursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurProfesseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
