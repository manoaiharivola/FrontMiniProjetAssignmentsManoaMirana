import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProfesseursMatieresAjoutDevoirComponent } from './pop-up-professeurs-matieres-ajout-devoir.component';

describe('PopUpProfesseursMatieresAjoutDevoirComponent', () => {
  let component: PopUpProfesseursMatieresAjoutDevoirComponent;
  let fixture: ComponentFixture<PopUpProfesseursMatieresAjoutDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpProfesseursMatieresAjoutDevoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpProfesseursMatieresAjoutDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
