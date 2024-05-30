import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-etudiant-devoirs-details-pop-up-details-devoir',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './etudiant-devoirs-details-pop-up-details-devoir.component.html',
  styleUrls: [
    './etudiant-devoirs-details-pop-up-details-devoir.component.css',
    '../../../../template/vendors/feather/feather.css',
    '../../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../../template/vendors/css/vendor.bundle.base.css',
    '../../../../template/css/vertical-layout-light/style.css',
  ],
})
export class EtudiantDevoirsDetailsPopUpDetailsDevoirComponent implements OnInit {
  devoir: any;

  constructor(
    public dialogRef: MatDialogRef<EtudiantDevoirsDetailsPopUpDetailsDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.devoir = data.devoir;
  }

  isLate(devoir: any): boolean {
    const now = new Date();
    return now > new Date(devoir.devoir_id.dateDeRendu || '');
  }

  estLivre(devoir: any): boolean {
    return devoir.dateLivraison && !devoir.dateNotation;
  }


  estNote(devoir: any): boolean {
    return devoir.dateLivraison && devoir.dateNotation && devoir.note;
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
