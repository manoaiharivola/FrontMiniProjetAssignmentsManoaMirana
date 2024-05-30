import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatieresService } from '../../../shared/services/matieres.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-pop-up-professeurs-matieres-ajout-devoir',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './pop-up-professeurs-matieres-ajout-devoir.component.html',
  styleUrls: [
    './pop-up-professeurs-matieres-ajout-devoir.component.css',
    '../../../template/vendors/feather/feather.css',
    '../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../template/vendors/css/vendor.bundle.base.css',
    '../../../template/css/vertical-layout-light/style.css',
  ],
})
export class PopUpProfesseursMatieresAjoutDevoirComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<PopUpProfesseursMatieresAjoutDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private matieresService: MatieresService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.errorMessage = null;
      const payload = this.form.getRawValue();
      this.matieresService.addMatiere(payload).subscribe(
        (response) => {
          this.loading = false;
          this.snackBar.open('Nouvelle matière ajoutée !', 'Fermer', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this.loading = false;
          this.errorMessage =
            error.error.message || "Erreur lors de l'ajout de la matière";
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
