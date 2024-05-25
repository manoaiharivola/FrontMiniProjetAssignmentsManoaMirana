import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurDevoirsComponent } from './professeur-devoirs.component';

describe('ProfesseurDevoirsComponent', () => {
  let component: ProfesseurDevoirsComponent;
  let fixture: ComponentFixture<ProfesseurDevoirsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurDevoirsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
