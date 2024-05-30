import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent } from './pop-up-professeurs-devoirs-details-devoir-etudiant.component';

describe('PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent', () => {
  let component: PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent;
  let fixture: ComponentFixture<PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
