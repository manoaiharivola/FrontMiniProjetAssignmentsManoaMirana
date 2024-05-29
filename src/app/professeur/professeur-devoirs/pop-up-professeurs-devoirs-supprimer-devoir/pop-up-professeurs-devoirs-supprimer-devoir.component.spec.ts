import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProfesseursDevoirsSupprimerDevoirComponent } from './pop-up-professeurs-devoirs-supprimer-devoir.component';

describe('PopUpProfesseursDevoirsSupprimerDevoirComponent', () => {
  let component: PopUpProfesseursDevoirsSupprimerDevoirComponent;
  let fixture: ComponentFixture<PopUpProfesseursDevoirsSupprimerDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpProfesseursDevoirsSupprimerDevoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpProfesseursDevoirsSupprimerDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
