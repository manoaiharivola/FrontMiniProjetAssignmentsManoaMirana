import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatDatepicker} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { DevoirsService } from '../../../shared/services/devoir.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-pop-up-professeurs-devoirs-modifier-devoir',
  providers: [
    provideNativeDateAdapter(),
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDatepicker,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  templateUrl: './pop-up-professeurs-devoirs-modifier-devoir.component.html',
  styleUrls: [
    './pop-up-professeurs-devoirs-modifier-devoir.component.css',
    '../../../template/vendors/feather/feather.css',
    '../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../template/vendors/css/vendor.bundle.base.css',
    '../../../template/css/vertical-layout-light/style.css',
  ],
})
export class PopUpProfesseursDevoirsModifierDevoirComponent implements OnInit {
  form: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<PopUpProfesseursDevoirsModifierDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private devoirsService: DevoirsService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      _id: [data.devoir._id, Validators.required],
      matiere_nom: [{ value: data.devoir.matiere_id.nom, disabled: true }, Validators.required],
      nom: [data.devoir.nom, Validators.required],
      description: [data.devoir.description],
      dateDeRendu: [data.devoir.dateDeRendu, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.loading = true;
      this.errorMessage = null;
      const payload = this.form.getRawValue();
      this.devoirsService.updateDevoir(payload).subscribe(
        (response) => {
          this.loading = false;
          this.snackBar.open('Devoir mis à jour avec succès', 'Fermer', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.error.error || 'Erreur lors de la mise à jour du devoir';
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(true);
  }
}
