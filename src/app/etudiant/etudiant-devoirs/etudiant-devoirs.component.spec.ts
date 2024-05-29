import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDevoirsComponent } from './etudiant-devoirs.component';

describe('EtudiantDevoirsComponent', () => {
  let component: EtudiantDevoirsComponent;
  let fixture: ComponentFixture<EtudiantDevoirsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantDevoirsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
