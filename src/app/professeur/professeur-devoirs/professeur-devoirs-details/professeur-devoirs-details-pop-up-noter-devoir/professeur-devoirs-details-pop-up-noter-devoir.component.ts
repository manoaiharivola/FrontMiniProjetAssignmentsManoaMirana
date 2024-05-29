import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DevoirsService } from '../../../../shared/services/devoir.service';

@Component({
  selector: 'app-professeur-devoirs-details-pop-up-noter-devoir',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './professeur-devoirs-details-pop-up-noter-devoir.component.html',
  styleUrls: ['./professeur-devoirs-details-pop-up-noter-devoir.component.css']
})
export class ProfesseurDevoirsDetailsPopUpNoterDevoirComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfesseurDevoirsDetailsPopUpNoterDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private devoirsService: DevoirsService
  ) {
    this.form = this.fb.group({
      note: [null, [Validators.required, Validators.min(0), Validators.max(20)]],
      remarques_note: ['']
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const payload = {
        note: this.form.value.note,
        remarques_note: this.form.value.remarques_note
      };
      this.devoirsService.noterDevoir(this.data.devoirEtudiant._id, payload).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
