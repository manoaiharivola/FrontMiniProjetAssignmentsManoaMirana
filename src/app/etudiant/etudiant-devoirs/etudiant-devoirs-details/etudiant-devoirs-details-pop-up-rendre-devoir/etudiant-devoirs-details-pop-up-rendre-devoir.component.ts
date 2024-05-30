import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-etudiant-devoirs-details-pop-up-rendre-devoir',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './etudiant-devoirs-details-pop-up-rendre-devoir.component.html',
  styleUrl: './etudiant-devoirs-details-pop-up-rendre-devoir.component.css',
})
export class EtudiantDevoirsDetailsPopUpRendreDevoirComponent {
  constructor(
    public dialogRef: MatDialogRef<EtudiantDevoirsDetailsPopUpRendreDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
