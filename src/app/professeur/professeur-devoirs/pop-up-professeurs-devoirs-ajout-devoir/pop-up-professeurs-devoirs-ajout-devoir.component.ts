import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatieresService } from '../../../shared/services/matieres.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Matiere } from '../../../shared/models/matiere.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DevoirsService } from '../../../shared/services/devoir.service';
import { SnackBarService } from '../../../shared/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-pop-up-professeurs-devoirs-ajout-devoir',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    provideNativeDateAdapter(),
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './pop-up-professeurs-devoirs-ajout-devoir.component.html',
  styleUrls: [
    './pop-up-professeurs-devoirs-ajout-devoir.component.css',
    '../../../template/vendors/feather/feather.css',
    '../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../template/vendors/css/vendor.bundle.base.css',
    '../../../template/css/vertical-layout-light/style.css',
  ],
})
export class PopUpProfesseursDevoirsAjoutDevoirComponent implements OnInit {
  matieres: Matiere[] = [];

  constructor(
    public dialogRef: MatDialogRef<PopUpProfesseursDevoirsAjoutDevoirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private matieresService: MatieresService,
    private devoirsService: DevoirsService,
    private snackBarService: SnackBarService
  ) {}

  firstFormGroup: FormGroup = this._formBuilder.group({
    matiereCtrl: ['', Validators.required],
  });
  secondFormGroup: FormGroup = this._formBuilder.group({
    titreCtrl: ['', Validators.required],
    descriptionCtrl: [''],
  });
  thirdFormGroup: FormGroup = this._formBuilder.group({
    dateCtrl: ['', [Validators.required, this.dateValidator]],
  });

  ngOnInit(): void {
    this.matieresService.getProfesseurMatieres().subscribe((data) => {
      this.matieres = data.docs;
    });
  }

  dateValidator(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today ? null : { invalidDate: true };
  }

  ajouterDevoir() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid
    ) {
      const newDevoir = {
        matiere_id: this.firstFormGroup.get('matiereCtrl')?.value,
        nom: this.secondFormGroup.get('titreCtrl')?.value,
        description: this.secondFormGroup.get('descriptionCtrl')?.value,
        dateDeRendu: this.thirdFormGroup.get('dateCtrl')?.value,
        rendu: false,
      };

      this.devoirsService.ajouterDevoir(newDevoir).subscribe(
        (response) => {
          console.log('Devoir ajouté avec succès:', response);
          this.close();
        },
        (error) => {
          console.error("Erreur lors de l'ajout du devoir:", error);

          if (error.error.error) {
            this.snackBarService.openErrorSnackBar(error.error.error);
          } else {
            this.snackBarService.openErrorSnackBar(
              'Erreur serveur:' + error.message
            );
          }
        }
      );
    } else {
      this.snackBarService.openErrorSnackBar('Formulaire invalide');
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
