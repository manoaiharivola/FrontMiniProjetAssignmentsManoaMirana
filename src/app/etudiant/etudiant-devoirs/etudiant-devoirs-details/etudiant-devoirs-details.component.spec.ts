import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDevoirsDetailsComponent } from './etudiant-devoirs-details.component';

describe('EtudiantDevoirsDetailsComponent', () => {
  let component: EtudiantDevoirsDetailsComponent;
  let fixture: ComponentFixture<EtudiantDevoirsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantDevoirsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudiantDevoirsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
