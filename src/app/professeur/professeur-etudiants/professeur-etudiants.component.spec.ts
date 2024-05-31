import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurEtudiantsComponent } from './professeur-etudiants.component';

describe('ProfesseurEtudiantsComponent', () => {
  let component: ProfesseurEtudiantsComponent;
  let fixture: ComponentFixture<ProfesseurEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurEtudiantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
