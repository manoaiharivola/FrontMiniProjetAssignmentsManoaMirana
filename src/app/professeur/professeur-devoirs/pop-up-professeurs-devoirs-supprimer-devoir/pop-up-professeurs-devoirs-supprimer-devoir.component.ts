import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pop-up-professeurs-devoirs-supprimer-devoir',
  templateUrl: './pop-up-professeurs-devoirs-supprimer-devoir.component.html',
  styleUrls: ['./pop-up-professeurs-devoirs-supprimer-devoir.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class PopUpProfesseursDevoirsSupprimerDevoirComponent {
  constructor(
    public dialogRef: MatDialogRef<PopUpProfesseursDevoirsSupprimerDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
