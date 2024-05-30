import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDevoirsDetailsPopUpRendreDevoirComponent } from './etudiant-devoirs-details-pop-up-rendre-devoir.component';

describe('EtudiantDevoirsDetailsPopUpRendreDevoirComponent', () => {
  let component: EtudiantDevoirsDetailsPopUpRendreDevoirComponent;
  let fixture: ComponentFixture<EtudiantDevoirsDetailsPopUpRendreDevoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantDevoirsDetailsPopUpRendreDevoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantDevoirsDetailsPopUpRendreDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
