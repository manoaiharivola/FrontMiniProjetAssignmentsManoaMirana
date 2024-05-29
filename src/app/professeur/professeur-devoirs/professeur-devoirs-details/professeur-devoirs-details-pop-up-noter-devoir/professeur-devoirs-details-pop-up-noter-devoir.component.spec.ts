import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurDevoirsDetailsPopUpNoterDevoirComponent } from './professeur-devoirs-details-pop-up-noter-devoir.component';

describe('ProfesseurDevoirsDetailsPopUpNoterDevoirComponent', () => {
  let component: ProfesseurDevoirsDetailsPopUpNoterDevoirComponent;
  let fixture: ComponentFixture<ProfesseurDevoirsDetailsPopUpNoterDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesseurDevoirsDetailsPopUpNoterDevoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurDevoirsDetailsPopUpNoterDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
