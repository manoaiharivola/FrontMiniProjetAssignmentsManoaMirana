import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDevoirsDetailsPopUpDetailsDevoirComponent } from './etudiant-devoirs-details-pop-up-details-devoir.component';

describe('EtudiantDevoirsDetailsPopUpDetailsDevoirComponent', () => {
  let component: EtudiantDevoirsDetailsPopUpDetailsDevoirComponent;
  let fixture: ComponentFixture<EtudiantDevoirsDetailsPopUpDetailsDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantDevoirsDetailsPopUpDetailsDevoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantDevoirsDetailsPopUpDetailsDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
