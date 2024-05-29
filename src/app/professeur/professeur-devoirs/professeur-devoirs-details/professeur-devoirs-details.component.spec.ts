import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurDevoirsDetailsComponent } from './professeur-devoirs-details.component';

describe('ProfesseurDevoirsDetailsComponent', () => {
  let component: ProfesseurDevoirsDetailsComponent;
  let fixture: ComponentFixture<ProfesseurDevoirsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurDevoirsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurDevoirsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
