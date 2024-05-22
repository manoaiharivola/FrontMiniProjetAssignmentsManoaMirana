import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurMatieresComponent } from './professeur-matieres.component';

describe('ProfesseurMatieresComponent', () => {
  let component: ProfesseurMatieresComponent;
  let fixture: ComponentFixture<ProfesseurMatieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurMatieresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
