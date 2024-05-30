import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-professeurs-matieres-ajout-devoir',
  standalone: true,
  imports: [],
  templateUrl: './pop-up-professeurs-matieres-ajout-devoir.component.html',
  styleUrl: './pop-up-professeurs-matieres-ajout-devoir.component.css',
})
export class PopUpProfesseursMatieresAjoutDevoirComponent {
  constructor(
    public dialogRef: MatDialogRef<PopUpProfesseursMatieresAjoutDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
