import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurMatieresEtudiantsComponent } from './professeur-matieres-etudiants.component';

describe('ProfesseurMatieresEtudiantsComponent', () => {
  let component: ProfesseurMatieresEtudiantsComponent;
  let fixture: ComponentFixture<ProfesseurMatieresEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurMatieresEtudiantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurMatieresEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
