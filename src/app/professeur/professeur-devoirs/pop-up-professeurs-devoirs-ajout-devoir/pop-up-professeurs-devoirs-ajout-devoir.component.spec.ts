import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProfesseursDevoirsAjoutDevoirComponent } from './PopUpProfesseursDevoirsAjoutDevoirComponent';

describe('PopUpProfesseursDevoirsAjoutDevoirComponent', () => {
  let component: PopUpProfesseursDevoirsAjoutDevoirComponent;
  let fixture: ComponentFixture<PopUpProfesseursDevoirsAjoutDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpProfesseursDevoirsAjoutDevoirComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      PopUpProfesseursDevoirsAjoutDevoirComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
