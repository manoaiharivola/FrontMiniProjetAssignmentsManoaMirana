import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProfesseursDevoirsModifierDevoirComponent } from './pop-up-professeurs-devoirs-modifier-devoir.component';

describe('PopUpProfesseursDevoirsModifierDevoirComponent', () => {
  let component: PopUpProfesseursDevoirsModifierDevoirComponent;
  let fixture: ComponentFixture<PopUpProfesseursDevoirsModifierDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpProfesseursDevoirsModifierDevoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpProfesseursDevoirsModifierDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
