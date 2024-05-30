import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pop-up-professeurs-devoirs-details-devoir-etudiant',
  templateUrl: './pop-up-professeurs-devoirs-details-devoir-etudiant.component.html',
  styleUrls: ['./pop-up-professeurs-devoirs-details-devoir-etudiant.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent {
  etudiant: any;
  etudiantDevoir: any;

  constructor(
    public dialogRef: MatDialogRef<PopUpProfesseursDevoirsDetailsDevoirEtudiantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.etudiant = data.etudiant;
    this.etudiantDevoir = data.etudiantDevoir;
  }

  isLate(dateLivraison: Date): boolean {
    return new Date(dateLivraison) > new Date();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openNoterDialog(etudiantDevoir: any): void {
    // Implémenter la logique pour ouvrir le dialogue de notation
  }
}
